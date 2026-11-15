"use client";

import z from "zod";
import { MenuItem } from "./MenuItemTable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const menuItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Dish name at least 3 characters")
    .max(60, "Dish name cannot exceed 60 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description  at least 10 characters")
    .max(250, "Description cannot exceed 250 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+$/, "Enter a valid price")
    .refine((price) => Number(price) > 0, "Price must be greater than zero"),
  image: z.string().trim().url("Please enter a valid image URL"),
  availability: z.enum(["Available", "Unavailable"]),
});

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;

type MenuItemFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem?: MenuItem | null;
  categories: string[];
  onSubmit: (values: MenuItemFormValues) => void;
};

export default function MenuItemForm({
  open,
  onOpenChange,
  menuItem,
  categories,
  onSubmit,
}: MenuItemFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      availability: "Available",
    },
  });
  useEffect(() => {
    if (open) {
      reset({
        name: menuItem?.name ?? "",
        description: menuItem?.description ?? "",
        category: menuItem?.category ?? "",
        price: menuItem?.price ?? "",
        image: menuItem?.image ?? "",
        availability: menuItem?.availability ?? "Available",
      });
    }
  }, [open, menuItem, reset]);

  const handleFormSubmit = (values: MenuItemFormValues) => {
    onSubmit(values);
    reset();
    onOpenChange(false);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {menuItem ? "Edit Menu Item" : "Add Menu Item"}
          </SheetTitle>

          <SheetDescription>
            {menuItem
              ? "Update the details of your dish."
              : "Add a new dish to your restaurant menu."}
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 px-4 pb-6"
        >
          <div className="space-y-2">
            <Label>Dish Name</Label>
            <Input placeholder="Enter dish name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              placeholder="Enter Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              {...register("category")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Price (₹)</Label>
            <Input
              type="number"
              min="0"
              placeholder="Enter price"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Dish Image URL</Label>
            <Input type="url" placeholder="Enter url" {...register("image")} />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Availability</Label>
            <select
              {...register("availability")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
            >
              <option value="" disabled>
                Select Availability
              </option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {menuItem ? "Save Changes" : "Create Menu Item"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
