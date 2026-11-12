import { Button } from "@/components/ui/button";
import { Clock, Heart, HeartOff, MapPin, Star } from "lucide-react";
import Image from "next/image";

export type FavoriteRestaurant = {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  location: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  isAvailable: boolean;
};

export type FavoriteRestaurantCardProps = {
  restaurant: FavoriteRestaurant;
  onViewRestaurant: (restaurantId: string) => void;
  onRemove: (restaurantId: string) => void;
};

export default function FavoriteRestaurantCard({
  restaurant,
  onViewRestaurant,
  onRemove,
}: FavoriteRestaurantCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${restaurant.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {restaurant.isAvailable ? "Open Now" : "Currently Closed"}
          </span>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onRemove(restaurant.id)}
          className={
            "absolute right-3 top-3 flex size-9 items-center justify-center bg-white rounded-full shadow-md transition hover:bg-red-50"
          }
        >
          <Heart size={19} className="fill-red-500 text-red-500" />
        </Button>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {restaurant.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{restaurant.cuisine}</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={15} />
            <span>{restaurant.location}</span>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1 text-sm">
              <Star size={17} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-800">
                {restaurant.rating}
              </span>
              <span className="text-xs text-gray-400">
                ({restaurant.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={14} />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-sm text-gray-500">Delivery</span>
              <span
                className={`text-xs font-semibold ${
                  restaurant.isAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {restaurant.isAvailable ? "Available" : "UnAvailable"}
              </span>
            </div>
            <div className="flex gap-2 border-t border-gray-100 pt-3">
              <Button
                type="button"
                disabled={!restaurant.isAvailable}
                onClick={() => onViewRestaurant(restaurant.id)}
                className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                View Restaurant
              </Button>
              <Button
                type="button"
                onClick={() => onRemove(restaurant.id)}
                className="flex items-center justify-center rounded-lg border border-gray-200 px-3 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                <HeartOff />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
