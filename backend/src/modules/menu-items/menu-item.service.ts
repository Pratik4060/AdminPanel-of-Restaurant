import { DietType, MealType  } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import type { CreateMenuItemInput, UpdateMenuItemInput } from "./menu-item.schema.js";

type MenuItemFilters = {
  diet?: DietType;
  type?: MealType;
  category?: string;
};

const toNumber = (value: unknown): number => Number(value ?? 0);

export const listMenuItems = async (filters: MenuItemFilters) => {
  const where: MenuItemFilters = {};

  if (filters.diet !== undefined) where.diet = filters.diet;
  if (filters.type !== undefined) where.type = filters.type;
  if (filters.category !== undefined) where.category = filters.category;

  const items = await prisma.menuItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

return items.map((item: (typeof items)[number]) => ({
  ...item,
  price: toNumber(item.price),
}));
};

export const createMenuItem = async (payload: CreateMenuItemInput) =>
  prisma.menuItem.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      prepTimeMins: payload.prepTimeMins,
      type: payload.type,
      category: payload.category,
      diet: payload.diet,
      ...(payload.imageUrl !== undefined ? { imageUrl: payload.imageUrl } : {}),
      ...(payload.isAvailable !== undefined ? { isAvailable: payload.isAvailable } : {}),
    },
  });

export const updateMenuItem = async (menuItemId: string, payload: UpdateMenuItemInput) => {
  const data: Record<string, unknown> = {};

  if (typeof payload.name === "string") data.name = payload.name;
  if (typeof payload.description === "string") data.description = payload.description;
  if (typeof payload.imageUrl === "string") data.imageUrl = payload.imageUrl;
  if (typeof payload.price === "number") data.price = payload.price;
  if (typeof payload.prepTimeMins === "number") data.prepTimeMins = payload.prepTimeMins;
  if (payload.type !== undefined) data.type = payload.type;
  if (typeof payload.category === "string") data.category = payload.category;
  if (payload.diet !== undefined) data.diet = payload.diet;
  if (typeof payload.isAvailable === "boolean") data.isAvailable = payload.isAvailable;

  return prisma.menuItem.update({
    where: { id: menuItemId },
    data,
  });
};


export const deleteMenuItem = async (menuItemId: string) =>
  prisma.menuItem.delete({
    where: { id: menuItemId },
  });
