import { Button } from "@/components/ui/button";
import { Heart, Store, Utensils } from "lucide-react";

export type FavoriteTabs = "all" | "restaurants" | "dishes";

type FavoritesTabsProps = {
  activeTab: FavoriteTabs;
  onTabChange: (tab: FavoriteTabs) => void;
  totalFavorites: number;
  totalRestaurants: number;
  totalDishes: number;
};

export default function FavoritesTabs({
  activeTab,
  onTabChange,
  totalFavorites,
  totalRestaurants,
  totalDishes,
}: FavoritesTabsProps) {
  const tab = [
    {
      id: "all",
      label: "All Favorites",
      count: totalFavorites,
      icon: Heart,
    },
    {
      id: "restaurants",
      label: "Restaurants",
      count: totalRestaurants,
      icon: Store,
    },
    {
      id: "dishes",
      label: "Dishes",
      count: totalDishes,
      icon: Utensils,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {tab.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <Button
            key={tab.id}
            variant="secondary"
            onClick={() => onTabChange(tab.id as FavoriteTabs)}
            className={`w-80 h-10 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            <Icon size={18} />

            <span>{tab.label}</span>

            <span
              className={`rounded-md px-2 py-1 text-xs ${isActive ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"}`}
            >
              {tab.count}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
