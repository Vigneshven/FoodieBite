"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";
import { Plus, Search, X } from "lucide-react";

type MenuItemFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  availability: string;
  onAvailabilityChange: (value: string) => void;
  categories: string[];
  onAddMenuItem: () => void;
};

export default function MenuItemFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  availability,
  onAvailabilityChange,
  categories,
  onAddMenuItem,
}: MenuItemFiltersProps) {
  const hasFilters =
    search !== "" || category !== "All" || availability !== "All";

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("All");
    onAvailabilityChange("All");
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-white p-2 rounded-lg w-100"
          />
        </div>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none"
        >
          <option value="All">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none"
        >
          <option value="All">All Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={clearFilters}
            className="gap-2"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}
      </div>
      <Button type="button" onClick={onAddMenuItem}>
        <Plus className="mr-2 size-4" />
        Add Menu Item
      </Button>
    </div>
  );
}
