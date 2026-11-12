"use client";

import FavoritesStats from "@/component/customer/favorites/FavoritesStats";
import FavoritesTabs, {
  FavoriteTabs,
} from "@/component/customer/favorites/FavoritesTabs";
import { useState } from "react";

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<FavoriteTabs>("all");
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
    </div>
  );
}
