import {
  fetchRestaurantOwnerRequests,
  fetchRestaurants,
  getRestaurantStats,
} from "@/api/admin/restaurant/api";
import {
  GetRestaurantsParams,
  Restaurant,
  RestaurantOwnerRequest,
  RestaurantStatsData,
} from "@/api/admin/type/admin/types-api";
import { create } from "zustand";

type RestaurantStore = {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  stats: RestaurantStatsData;
  setStats: (stats: RestaurantStatsData) => void;
  updateRestaurant: (
    id: number,
    status: "active" | "pending" | "suspended" | "rejected",
  ) => void;
  removeRestaurant: (id: number) => void;
  ownerRequests: RestaurantOwnerRequest[];
  setOwnerRequests: (requests: RestaurantOwnerRequest[]) => void;
  totalRestaurants: number;
  setTotalRestaurants: (total: number) => void;
  isLoading: boolean;
  refreshData: (params: GetRestaurantsParams) => Promise<number>;
  isAddDialogOpen: boolean;
  isAddingRestaurant: boolean;
  setAddDialogOpen: (open: boolean) => void;
  setIsAddingRestaurant: (loading: boolean) => void;
  addRestaurant: (restaurant: Restaurant) => void;
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurants: [],
  stats: {
    totalRestaurants: 0,
    activeRestaurants: 0,
    pendingApproval: 0,
    suspendedRestaurants: 0,
    rejectedApproval: 0,
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
  ownerRequests: [],
  setOwnerRequests: (requests) => set({ ownerRequests: requests }),
  totalRestaurants: 0,
  setTotalRestaurants: (total) => set({ totalRestaurants: total }),
  isLoading: false,
  refreshData: async (params) => {
    set({ isLoading: true });
    try {
      const [restaurant, stats, ownerRequest] = await Promise.all([
        fetchRestaurants(params),
        getRestaurantStats(),
        fetchRestaurantOwnerRequests(),
      ]);
      set({
        restaurants: restaurant.restaurants,
        stats: stats,
        ownerRequests: ownerRequest,
        totalRestaurants: restaurant.totalRestaurants,
        isLoading: false,
      });
      return restaurant.totalRestaurants;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  isAddDialogOpen: false,
  isAddingRestaurant: false,
  setAddDialogOpen: (open) => set({ isAddDialogOpen: open }),
  setIsAddingRestaurant: (loading) => set({ isAddingRestaurant: loading }),
  addRestaurant: (restaurant) =>
    set((state) => ({
      restaurants: [restaurant, ...state.restaurants],
      stats: {
        ...state.stats,
        totalRestaurants: state.stats.totalRestaurants + 1,
        pendingApproval: state.stats.pendingApproval + 1,
      },
    })),
}));
