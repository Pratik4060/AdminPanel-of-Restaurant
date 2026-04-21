import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createMenuItemThunk } from "../../features/menu/menuSlice";
import type { DietType, MealType } from "../../types/api";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Select } from "../ui/Select";

export function AddMenuItemModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: 1,
    prepTimeMins: 10,
    type: "LUNCH" as MealType,
    category: "Main Course",
    diet: "VEG" as DietType,
    isAvailable: true,
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createMenuItemThunk({ ...form, imageUrl: form.imageUrl || undefined }));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Menu Item">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[11px] text-[#706a63]">Name</label>
          <Input placeholder="Enter Menu Item Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-[#706a63]">Description</label>
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-[#706a63]">Image URL</label>
          <Input placeholder="Paste image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] text-[#706a63]">Price</label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-[#706a63]">Prep Time (mins)</label>
            <Input type="number" value={form.prepTimeMins} onChange={(e) => setForm({ ...form, prepTimeMins: Number(e.target.value) })} required />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as MealType })}>
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
          </Select>
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
          <Select value={form.diet} onChange={(e) => setForm({ ...form, diet: e.target.value as DietType })}>
            <option value="VEG">Veg</option>
            <option value="NON_VEG">Non Veg</option>
            <option value="BEVERAGE">Beverage</option>
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" className="min-w-28" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="min-w-32">Create</Button>
        </div>
      </form>
    </Modal>
  );
}
