"use client";

import FavoriteDishCard, {
  FavoriteDish,
} from "@/component/customer/favorites/FavoriteDishCard";
import FavoriteRestaurantCard, {
  FavoriteRestaurant,
} from "@/component/customer/favorites/FavoriteRestaurantCard";
import FavoritesFilters, {
  FavoritesAvailability,
  FavoriteSortOption,
} from "@/component/customer/favorites/FavoritesFilters";
import FavoritesStats from "@/component/customer/favorites/FavoritesStats";
import FavoritesTabs, {
  FavoriteTab,
} from "@/component/customer/favorites/FavoritesTabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const initialRestaurant: FavoriteRestaurant[] = [
  {
    id: "REST-101",
    name: "Biriyani House",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    cuisine: "South Indian",
    location: "Vellore",
    startingPrice: 2000,
    rating: 4.5,
    reviewCount: 250,
    deliveryTime: "30-40 min",
    isAvailable: true,
  },
  {
    id: "REST-102",
    name: "Spice House",
    imageUrl:
      "https://images.pexels.com/photos/38896835/pexels-photo-38896835.jpeg",
    cuisine: "South Indian",
    location: "Vellore",
    startingPrice: 3000,
    rating: 4.5,
    reviewCount: 250,
    deliveryTime: "30-40 min",
    isAvailable: true,
  },
  {
    id: "REST-103",
    name: "A2B",
    imageUrl:
      "https://images.pexels.com/photos/18090414/pexels-photo-18090414.jpeg",
    cuisine: "South Indian",
    location: "Chennai",
    startingPrice: 1000,
    rating: 4.5,
    reviewCount: 250,
    deliveryTime: "30-40 min",
    isAvailable: true,
  },
];

const initialDishes: FavoriteDish[] = [
  {
    id: "D-01",
    name: "Biriyani",
    imageUrl:
      "https://images.pexels.com/photos/9738983/pexels-photo-9738983.jpeg",
    restaurantName: "Thambi biriyani",
    category: "non-veg",
    price: 250,
    rating: 4.5,
    reviewCount: 100,
    isAvailable: true,
  },
  {
    id: "D-02",
    name: "Mutton Biriyani",
    imageUrl:
      "https://images.pexels.com/photos/9609863/pexels-photo-9609863.jpeg",
    restaurantName: "Thambi biriyani",
    category: "non-veg",
    price: 500,
    rating: 4.5,
    reviewCount: 100,
    isAvailable: true,
  },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<FavoriteTab>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<FavoriteSortOption>("recent");
  const [availability, setAvailability] =
    useState<FavoritesAvailability>("all");

  const router = useRouter();

  const [restaurant, setRestaurant] =
    useState<FavoriteRestaurant[]>(initialRestaurant);

  const handleRemove = (id: string) => {
    setRestaurant((prev) => prev.filter((restaurant) => restaurant.id !== id));
  };

  const handleView = (id: string) => {
    router.push(`/restaurants/${id}`);
  };

  const [dishes, setDishes] = useState<FavoriteDish[]>(initialDishes);

  const handleDishRemove = (id: string) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  const handleDishView = (id: string) => {
    router.push(`/dish/${id}`);
  };

  const handleAddToCart = (id: string) => {
    toast.success(`${id} is added to cart`);
  };

  const filteredRestaurant = restaurant
    .filter((rest) => {
      const searchValue = search.toLowerCase().trim();

      const matchedSearch =
        rest.name.toLowerCase().includes(searchValue) ||
        rest.cuisine.toLowerCase().includes(searchValue) ||
        rest.location.toLowerCase().includes(searchValue);

      const matchedAvailability =
        availability === "all" ||
        (availability === "available" && rest.isAvailable) ||
        (availability === "unavailable" && !rest.isAvailable);

      return matchedSearch && matchedAvailability;
    })
    .sort((a, b) => {
      if (sortBy === "name(a-z)") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name(z-a)") {
        return b.name.localeCompare(a.name);
      }

      if (sortBy === "price(low-high)") {
        return a.startingPrice - b.startingPrice;
      }

      if (sortBy === "price(high-low)") {
        return b.startingPrice - a.startingPrice;
      }

      return 0;
    });

  const filteredDishes = dishes
    .filter((dish) => {
      const searchValue = search.toLowerCase().trim();

      const matchedSearch =
        dish.name.toLowerCase().includes(searchValue) ||
        dish.restaurantName.toLowerCase().includes(searchValue) ||
        dish.category.toLowerCase().includes(searchValue);

      const matchedAvailability =
        availability === "all" ||
        (availability === "available" && dish.isAvailable) ||
        (availability === "unavailable" && !dish.isAvailable);

      return matchedSearch && matchedAvailability;
    })
    .sort((a, b) => {
      if (sortBy === "name(a-z)") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name(z-a)") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "price(low-high)") {
        return a.price - b.price;
      }
      if (sortBy === "price(high-low)") {
        return b.price - a.price;
      }

      return 0;
    });

  const resultCount =
    activeTab === "restaurants"
      ? filteredRestaurant.length
      : activeTab === "dishes"
        ? filteredDishes.length
        : filteredRestaurant.length + filteredDishes.length;

  return (
    <div className="space-y-5">
      <FavoritesStats
        totalFavorites={restaurant.length + dishes.length}
        totalRestaurants={restaurant.length}
        totalDishes={dishes.length}
      />
      <FavoritesTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalFavorites={restaurant.length + dishes.length}
        totalRestaurants={restaurant.length}
        totalDishes={dishes.length}
      />
      <FavoritesFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availability={availability}
        onAvailabilityChange={setAvailability}
        resultCount={resultCount}
      />
      {activeTab === "all" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {filteredRestaurant.map((restaurant) => (
              <FavoriteRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onViewRestaurant={handleView}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {filteredDishes.map((dish) => (
              <FavoriteDishCard
                key={dish.id}
                dish={dish}
                onAddToCart={handleAddToCart}
                onViewDish={handleDishView}
                onRemove={handleDishRemove}
              />
            ))}
          </div>
        </div>
      )}
      {activeTab === "restaurants" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
          {filteredRestaurant.map((restaurant) => (
            <FavoriteRestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onViewRestaurant={handleView}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
      {activeTab === "dishes" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
          {filteredDishes.map((dish) => (
            <FavoriteDishCard
              key={dish.id}
              dish={dish}
              onAddToCart={handleAddToCart}
              onViewDish={handleDishView}
              onRemove={handleDishRemove}
            />
          ))}
        </div>
      )}
      {resultCount === 0 && (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold">No favorites found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {search && `No results found for "${search}". Try another search.`}
          </p>

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSearch("");
              setAvailability("all");
              setSortBy("recent");
              setActiveTab("all");
            }}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:bg-orange-400 hover:text-white"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
