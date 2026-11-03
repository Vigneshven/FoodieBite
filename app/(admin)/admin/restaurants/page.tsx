"use client";

import RestaurantFilters, {
  RestaurantSortOption,
  RestaurantStatusFilter,
} from "@/component/admin/restaurants/RestaurantFilters";
import RestaurantTable from "@/component/admin/restaurants/RestaurantsTable";
import RestaurantStats from "@/component/admin/restaurants/RestaurantStats";
import { useState } from "react";

export default function RestaurantPage() {
  const [activeStatus, setActiveStatus] =
    useState<RestaurantStatusFilter>("All");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<RestaurantSortOption>("newest");
  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Restaurants</h1>
          <p className="text-sm text-muted-foreground">
            Manage all restaurants
          </p>
        </div>
      </div>
      <RestaurantStats />
      <RestaurantFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <RestaurantTable
        activeStatus={activeStatus}
        search={search}
        sortBy={sortBy}
      />
    </div>
  );
}
