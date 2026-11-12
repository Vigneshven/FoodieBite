"use client";

import FavoriteRestaurantCard, {
  FavoriteRestaurant,
} from "@/component/customer/favorites/FavoriteRestaurantCard";
import FavoritesFilters, {
  FavoritesAvailability,
  FavoriteSortOption,
} from "@/component/customer/favorites/FavoritesFilters";
import FavoritesStats from "@/component/customer/favorites/FavoritesStats";
import FavoritesTabs, {
  FavoriteTabs,
} from "@/component/customer/favorites/FavoritesTabs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialRestaurant: FavoriteRestaurant = {
  id: "REST-101",
  name: "The Spice House",
  imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  cuisine: "Indian • Biryani • South Indian",
  location: "Vellore, Tamil Nadu",
  rating: 4.5,
  reviewCount: 250,
  deliveryTime: "30–40 min",
  isAvailable: true,
};

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<FavoriteTabs>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<FavoriteSortOption>("recent");
  const [availability, setAvailability] =
    useState<FavoritesAvailability>("all");

  const router = useRouter();

  const [restaurant, setRestaurant] = useState<FavoriteRestaurant | null>(
    initialRestaurant,
  );

  const handleRemove = (id: string) => {
    setRestaurant(null);
    alert(`${id} removed from favorites`);
  };

  const handleView = (id: string) => {
    router.push(`/restaurants/${id}`);
  };

  if (!restaurant) {
    return (
      <p className="rounded-xl border p-6 text-center text-gray-500">
        Restaurant removed from favorites.
      </p>
    );
  }

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
        resultCount={2}
      />
      <FavoriteRestaurantCard
        restaurant={restaurant}
        onViewRestaurant={handleView}
        onRemove={handleRemove}
      />
    </div>
  );
}
