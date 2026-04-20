import { DietType, OrderStatus } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { type RevenuePeriod, getPeriodStartDate, isSameDate } from "../../utils/date.js";

const todayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 1);
  return { start, end };
};

const numberValue = (value: unknown) => Number(value ?? 0);

export const getDashboardCards = async () => {
  const { start, end } = todayRange();

  const [todaysOrders, todaysRevenue, pendingOrders, totalCustomers] = await Promise.all([
    prisma.order.count({
      where: {
        createdAt: {
          gte: start,
          lt: end
        }
      }
    }),
    prisma.order.aggregate({
      where: {
        status: OrderStatus.COMPLETED,
        createdAt: {
          gte: start,
          lt: end
        }
      },
      _sum: {
        totalAmount: true
      }
    }),
    prisma.order.count({
      where: {
        status: OrderStatus.PENDING
      }
    }),
    prisma.customer.count()
  ]);

  return {
    todaysOrders,
    todaysRevenue: numberValue(todaysRevenue._sum.totalAmount),
    pendingOrders,
    totalCustomers
  };
};

export const getRevenueSeries = async (period: RevenuePeriod) => {
  const startDate = getPeriodStartDate(period);
  const now = new Date();

  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.COMPLETED,
      createdAt: {
        gte: startDate,
        lte: now
      }
    },
    select: {
      createdAt: true,
      totalAmount: true
    }
  });

  if (period === "weekly") {
    const points = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      const total = orders
        .filter((order) => isSameDate(order.createdAt, date))
        .reduce((sum, order) => sum + numberValue(order.totalAmount), 0);

      return {
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        revenue: total
      };
    });
    return points;
  }

  if (period === "monthly") {
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const points = Array.from({ length: daysInMonth }).map((_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth(), index + 1);
      const total = orders
        .filter((order) => isSameDate(order.createdAt, date))
        .reduce((sum, order) => sum + numberValue(order.totalAmount), 0);

      return {
        label: `${index + 1}`,
        revenue: total
      };
    });
    return points;
  }

  const points = Array.from({ length: 12 }).map((_, index) => {
    const total = orders
      .filter((order) => order.createdAt.getMonth() === index)
      .reduce((sum, order) => sum + numberValue(order.totalAmount), 0);
    return {
      label: new Date(now.getFullYear(), index, 1).toLocaleDateString("en-US", { month: "short" }),
      revenue: total
    };
  });

  return points;
};

export const getOrderStatusDistribution = async () => {
  const statuses = [OrderStatus.PENDING, OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.COMPLETED];

  const counts = await Promise.all(
    statuses.map((status) =>
      prisma.order.count({
        where: { status }
      })
    )
  );

  return statuses.map((status, index) => ({
    status,
    count: counts[index]
  }));
};

export const getActiveOffers = async () =>
  prisma.offer.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

export const getPopularItems = async () => {
  const orderItems = await prisma.orderItem.findMany({
    include: {
      menuItem: true,
      order: true
    },
    where: {
      order: {
        status: {
          in: [OrderStatus.COMPLETED, OrderStatus.READY]
        }
      }
    }
  });

  const grouped = new Map<
    string,
    { menuItemId: string; name: string; diet: DietType; likes: number }
  >();

  for (const item of orderItems) {
    const existing = grouped.get(item.menuItemId);
    if (!existing) {
      grouped.set(item.menuItemId, {
        menuItemId: item.menuItemId,
        name: item.menuItem.name,
        diet: item.menuItem.diet,
        likes: item.quantity
      });
      continue;
    }
    existing.likes += item.quantity;
  }

  const all = [...grouped.values()].sort((a, b) => b.likes - a.likes);

  return {
    veg: all.filter((item) => item.diet === DietType.VEG),
    nonVeg: all.filter((item) => item.diet === DietType.NON_VEG),
    beverages: all.filter((item) => item.diet === DietType.BEVERAGE)
  };
};
