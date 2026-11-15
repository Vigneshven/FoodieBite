"use client";

import CategoryDeleteDialog from "@/component/restaurant/menu/categories/CategoryDeleteDialog";
import CategoryFilters from "@/component/restaurant/menu/categories/CategoryFilters";
import CategoryForm from "@/component/restaurant/menu/categories/CategoryForm";
import CategoryStats from "@/component/restaurant/menu/categories/CategoryStats";
import CategoryTable, {
  Category,
} from "@/component/restaurant/menu/categories/CategoryTable";
import type { CategoryFormValues } from "@/component/restaurant/menu/categories/CategoryForm";
import { useState } from "react";

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Main Course",
    description: "Main meals and special dishes",
    dishCount: 15,
    status: "Active",
    createdAt: "Nov 15, 2026",
  },
  {
    id: "2",
    name: "Desserts",
    description: "Sweet dishes and desserts",
    dishCount: 8,
    status: "Inactive",
    createdAt: "Nov 15, 2026",
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState(initialCategories);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setOpenForm(true);
  };

  const handleSaveCategory = (values: CategoryFormValues) => {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, ...values }
            : category,
        ),
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...values,
          dishCount: 0,
          createdAt: new Date().toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
      ]);
    }
    setSelectedCategory(null);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setOpenForm(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryToDelete.id),
    );

    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Menu Categories</h1>
        <p className="text-muted-foreground">
          Manage your restaurant menu categories.
        </p>
      </div>

      <CategoryStats
        totalCategories={12}
        activeCategories={10}
        inactiveCategories={2}
      />
      <CategoryFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAddCategory={handleAddCategory}
      />
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      {openForm && (
        <CategoryForm
          open={openForm}
          onOpenChange={setOpenForm}
          category={selectedCategory}
          onSubmit={handleSaveCategory}
        />
      )}
      {deleteDialogOpen && (
        <CategoryDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          categoryName={categoryToDelete?.name ?? ""}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
