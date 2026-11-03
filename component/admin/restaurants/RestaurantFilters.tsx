"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export const restaurantStatuses = ["All", "Active", "Pending", "Suspended"];

export type RestaurantStatusFilter = (typeof restaurantStatuses)[number];

export type RestaurantSortOption = "newest" | "name" | "rating";

type RestaurantFiltersProps = {
  activeStatus: RestaurantStatusFilter;
  onStatusChange: (status: RestaurantStatusFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: RestaurantSortOption;
  onSortChange: (value: RestaurantSortOption) => void;
};

export default function RestaurantFilters({
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}: RestaurantFiltersProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Restaurants"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg bg-background pl-10 pr-3 text-sm outline-none"
          />
        </div>
      </div>
      <div>
        {restaurantStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeStatus === status
                ? "bg-orange-600 text-white font-medium shadow-sm text-lg"
                : "text-sm font-medium "
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as RestaurantSortOption)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="newest">Newest</option>
          <option value="name">Restaurant Name</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>
    </div>
  );
}
