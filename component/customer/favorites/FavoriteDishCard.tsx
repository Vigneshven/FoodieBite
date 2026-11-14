import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

export type FavoriteDish = {
  id: string;
  name: string;
  imageUrl: string;
  restaurantName: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
};

export type FavoriteDishCardProps = {
  dish: FavoriteDish;
  onViewDish: (dishId: string) => void;
  onAddToCart: (dishId: string) => void;
  onRemove: (dishId: string) => void;
};

export default function FavoriteDishCard({
  dish,
  onViewDish,
  onAddToCart,
  onRemove,
}: FavoriteDishCardProps) {
  return (
    <div className="rounded-xl border bg-white border-gray-200 shadow-sm transition duration-1000 hover:-translate-y-1 hover:shadow-md">
      <div className="flex gap-4">
        <div className="relative h-28 w-28 shrink-0 rounded-lg">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground">{dish.name}</h3>
            <Button
              type="button"
              onClick={() => onRemove(dish.id)}
              className="bg-white rounded-full p-2 text-red-500 transition hover:bg-red-50"
              variant="secondary"
            >
              <Heart size={19} className="fill-red-500" />
            </Button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground font-bold">
            {dish.restaurantName} - {dish.category}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="fill-yellow-300 text-yellow-400" />
            <span className="font-medium text-muted-foreground">
              {dish.rating}
            </span>
            <span className="font-medium text-muted-foreground">
              ({dish.reviewCount} reviews)
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold">₹{dish.price}</span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-bold ${dish.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {dish.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onViewDish(dish.id)}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          View Dish
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onAddToCart(dish.id)}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
