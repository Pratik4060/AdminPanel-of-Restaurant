import bcrypt from "bcryptjs";
import { PrismaClient, DietType, MealType, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: { email: "admin@zhonix.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@zhonix.com",
      passwordHash
    }
  });

  const items = await Promise.all([
    prisma.menuItem.create({
      data: {
        name: "Paneer Lababdar",
        description: "Rich and creamy paneer curry",
        price: 320,
        prepTimeMins: 15,
        type: MealType.LUNCH,
        category: "North Indian",
        diet: DietType.VEG
      }
    }),
    prisma.menuItem.create({
      data: {
        name: "Chicken Tikka Masala",
        description: "Smoky chicken gravy",
        price: 390,
        prepTimeMins: 18,
        type: MealType.DINNER,
        category: "North Indian",
        diet: DietType.NON_VEG
      }
    }),
    prisma.menuItem.create({
      data: {
        name: "Mojito (Virgin)",
        description: "Minty chilled drink",
        price: 160,
        prepTimeMins: 5,
        type: MealType.LUNCH,
        category: "Beverages",
        diet: DietType.BEVERAGE
      }
    })
  ]);

  await prisma.offer.createMany({
    data: [
      {
        title: "Weekend Special",
        description: "Any 3 dishes + 2 drinks",
        discountText: "20% OFF",
        isActive: true
      },
      {
        title: "Lunch Combo Deal",
        description: "Starter + Main Course",
        discountText: "10% OFF",
        isActive: true
      }
    ]
  });

  const customer = await prisma.customer.create({
    data: {
      name: "Rohit Shukla",
      phone: "9999999999"
    }
  });

  await prisma.order.create({
    data: {
      orderNumber: "ORD-1001",
      customerId: customer.id,
      customerName: customer.name,
      tableNumber: "T-1",
      status: OrderStatus.PENDING,
      totalAmount: 480,
      items: {
        create: [
          {
            menuItemId: items[0].id,
            quantity: 1,
            unitPrice: items[0].price,
            totalPrice: items[0].price
          },
          {
            menuItemId: items[2].id,
            quantity: 1,
            unitPrice: items[2].price,
            totalPrice: items[2].price
          }
        ]
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
