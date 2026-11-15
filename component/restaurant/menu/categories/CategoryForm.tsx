"use client";

import z from "zod";
import { Category } from "./CategoryTable";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name at least 3 characters")
    .max(50, "Category name cannot exceed 50 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description at least 10 characters")
    .max(200, "Description cannot exceed 200 characters"),
  status: z.enum(["Active", "Inactive"]),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

type CategoryFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSubmit: (values: CategoryFormValues) => void;
};

export default function CategoryForm({
  open,
  onOpenChange,
  category,
  onSubmit,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "Active",
    },
  });

  useEffect(() => {
    reset({
      name: category?.name ?? "",
      description: category?.description ?? "",
      status: category?.status ?? "Active",
    });
  }, [category, reset, open]);

  const handleFormSubmit = (values: CategoryFormValues) => {
    onSubmit(values);
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {category ? "Edit Category" : "Add New Category"}
          </SheetTitle>
          <SheetDescription>
            {category
              ? "Update your category information."
              : "Create a new menu category."}
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 px-4 pb-6"
        >
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input placeholder="category name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              placeholder="category description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label>Status</Label>
            <select
              {...register("status")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </select>
          </div>
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {category ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
