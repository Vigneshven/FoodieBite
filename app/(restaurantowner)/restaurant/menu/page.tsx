"use client";

import MenuItemDeleteDialog from "@/component/restaurant/menu/items/MenuItemDeleteDialog";
import MenuItemFilters from "@/component/restaurant/menu/items/MenuItemFilters";
import MenuItemForm, {
  MenuItemFormValues,
} from "@/component/restaurant/menu/items/MenuItemForm";
import MenuItemStats from "@/component/restaurant/menu/items/MenuItemStats";
import MenuItemTable, {
  MenuItem,
} from "@/component/restaurant/menu/items/MenuItemTable";
import { useState } from "react";

export default function MenuItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Chicken Biryani",
      description: "chicken biriyani",
      image:
        "https://images.pexels.com/photos/9738983/pexels-photo-9738983.jpeg",
      category: "Main Course",
      price: "250",
      availability: "Available",
    },
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [menuItemToDelete, setMenuItemToDelete] = useState<MenuItem | null>(
    null,
  );

  const categories = ["Starters", "Main Course", "Desserts", "Beverages"];

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || item.category === category;

    const matchesAvailability =
      availability === "All" || item.availability === availability;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleEdit = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setOpenForm(true);
  };

  const handleAddMenuItem = () => {
    setSelectedMenuItem(null);
    setOpenForm(true);
  };

  const handleDeleteClick = (item: MenuItem) => {
    setMenuItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!menuItemToDelete) return;

    setMenuItems((prev) =>
      prev.filter((item) => item.id !== menuItemToDelete.id),
    );

    setMenuItemToDelete(null);
  };

  const handleSaveMenuItem = (values: MenuItemFormValues) => {
    if (selectedMenuItem) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === selectedMenuItem.id ? { ...item, ...values } : item,
        ),
      );
    } else {
      const newMenuItem: MenuItem = {
        id: crypto.randomUUID(),
        ...values,
      };

      setMenuItems((prev) => [newMenuItem, ...prev]);
    }

    setSelectedMenuItem(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Menu Items</h1>
        <p className="text-sm text-muted-foreground">
          Manage your restaurant dishes and availability.
        </p>
      </div>

      <MenuItemStats />

      <MenuItemFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        availability={availability}
        onAvailabilityChange={setAvailability}
        categories={categories}
        onAddMenuItem={handleAddMenuItem}
      />
      <MenuItemTable
        menuItems={filteredMenuItems}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <MenuItemForm
        open={openForm}
        onOpenChange={setOpenForm}
        menuItem={selectedMenuItem}
        categories={categories}
        onSubmit={handleSaveMenuItem}
      />
      <MenuItemDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        menuItemName={menuItemToDelete?.name ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
