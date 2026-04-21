import { http } from "./http";
import type { DietType, MealType, MenuItem } from "../types/api";

export interface CreateMenuItemPayload {
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  prepTimeMins: number;
  type: MealType;
  category: string;
  diet: DietType;
  isAvailable?: boolean;
}

export interface UpdateMenuItemPayload extends Partial<CreateMenuItemPayload> {}

export const menuApi = {
  list(filters?: { diet?: DietType; type?: MealType; category?: string }) {
    const query = new URLSearchParams();
    if (filters?.diet) query.set("diet", filters.diet);
    if (filters?.type) query.set("type", filters.type);
    if (filters?.category) query.set("category", filters.category);
    const qs = query.toString();
    return http<MenuItem[]>(`/menu-items${qs ? `?${qs}` : ""}`);
  },
  create(payload: CreateMenuItemPayload) {
    return http<MenuItem>("/menu-items", { method: "POST", body: payload });
  },
  update(id: string, payload: UpdateMenuItemPayload) {
    return http<MenuItem>(`/menu-items/${id}`, { method: "PUT", body: payload });
  },
};
