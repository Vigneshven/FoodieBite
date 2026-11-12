"use client";

import FavoritesFilters, {
  FavoritesAvailability,
  FavoriteSortOption,
} from "@/component/customer/favorites/FavoritesFilters";
import FavoritesStats from "@/component/customer/favorites/FavoritesStats";
import FavoritesTabs, {
  FavoriteTabs,
} from "@/component/customer/favorites/FavoritesTabs";
import { useState } from "react";

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<FavoriteTabs>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<FavoriteSortOption>("recent");
  const [availability, setAvailability] =
    useState<FavoritesAvailability>("all");
  return (
    <div className="space-y-5">
      <FavoritesStats
        totalFavorites={20}
        totalRestaurants={12}
        totalDishes={10}
      />
      <FavoritesTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalFavorites={20}
        totalRestaurants={12}
        totalDishes={10}
      />
      <FavoritesFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availability={availability}
        onAvailabilityChange={setAvailability}
      />
    </div>
  );
}
