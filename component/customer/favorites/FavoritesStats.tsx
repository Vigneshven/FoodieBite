import { Card, CardContent } from "@/components/ui/card";
import { Heart, Store, Utensils } from "lucide-react";

type FavoritesStatsProps = {
  totalFavorites: number;
  totalRestaurants: number;
  totalDishes: number;
};

export default function FavoritesStats({
  totalFavorites,
  totalRestaurants,
  totalDishes,
}: FavoritesStatsProps) {
  const favoritesStats = [
    {
      title: "Total Favorites",
      value: totalFavorites,
      description: "All saved favorites",
      icon: Heart,
      iconStyle: "bg-orange-50 text-orange-600",
    },
    {
      title: "Total Restaurants",
      value: totalRestaurants,
      description: "Saved Restaurants",
      icon: Store,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Dishes",
      value: totalDishes,
      description: "Saved food items",
      icon: Utensils,
      iconStyle: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {favoritesStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="border shadow-sm transition duration-1000 hover:shadow-xl"
          >
            <CardContent className="p-3 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Icon size={29} className={`${stat.iconStyle}`} />
                  <p className="text-sm text-gray-400 font-bold">
                    {stat.title}
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-700">{stat.value}</p>
              <p className="text-sm text-gray-400 font-bold">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
