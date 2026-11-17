import { RestaurantStatsData } from "@/api/type/admin/types-api";
import { create } from "zustand";

type RestaurantStore = {
  stats: RestaurantStatsData;
  setStats: (stats: RestaurantStatsData) => void;
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  customers: [],
  stats: {
    totalRestaurants: 0,
    activeRestaurants: 0,
    pendingApproval: 0,
    suspendedRestaurants: 0,
  },
  setStats: (stats) => set({ stats }),
}));
