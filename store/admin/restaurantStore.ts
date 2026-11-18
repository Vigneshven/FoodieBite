import { Restaurant, RestaurantStatsData } from "@/api/type/admin/types-api";
import { create } from "zustand";

type RestaurantStore = {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  stats: RestaurantStatsData;
  setStats: (stats: RestaurantStatsData) => void;
  updateRestaurant: (
    id: number,
    status: "active" | "pending" | "suspended",
  ) => void;
  removeRestaurant: (id: number) => void;
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurants: [],
  stats: {
    totalRestaurants: 0,
    activeRestaurants: 0,
    pendingApproval: 0,
    suspendedRestaurants: 0,
  },
  setRestaurants: (restaurants) => set({ restaurants }),
  setStats: (stats) => set({ stats }),
  updateRestaurant: (id, status) =>
    set((state) => ({
      restaurants: state.restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, status } : restaurant,
      ),
    })),
  removeRestaurant: (id) =>
    set((state) => ({
      restaurants: state.restaurants.filter(
        (restaurant) => restaurant.id !== id,
      ),
    })),
}));
