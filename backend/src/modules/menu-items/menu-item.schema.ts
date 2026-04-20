import { DietType, MealType } from "@prisma/client";
import { z } from "zod";

const baseMenuItemSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  imageUrl: z.string().url().optional(),
  price: z.number().positive(),
  prepTimeMins: z.number().int().min(1),
  type: z.nativeEnum(MealType),
  category: z.string().min(1),
  diet: z.nativeEnum(DietType),
  isAvailable: z.boolean().optional()
});

export const createMenuItemSchema = baseMenuItemSchema;

export const updateMenuItemSchema = baseMenuItemSchema.partial();

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
