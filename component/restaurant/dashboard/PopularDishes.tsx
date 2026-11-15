import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export type PopularDish = {
  id: string;
  name: string;
  category: string;
  image: string;
  totalOrders: number;
  revenue: number;
  availability: "Available" | "Unavailable";
};

const popularDishes: PopularDish[] = [
  {
    id: "1",
    name: "Chicken Biryani",
    category: "Main Course",
    image: "https://images.pexels.com/photos/9738983/pexels-photo-9738983.jpeg",
    totalOrders: 86,
    revenue: 17200,
    availability: "Available",
  },
  {
    id: "2",
    name: "Masala Dosa",
    category: "Breakfast",
    image:
      "https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg",
    totalOrders: 58,
    revenue: 5800,
    availability: "Available",
  },
  {
    id: "3",
    name: "Veg Fried Rice",
    category: "Main Course",
    image: "https://images.pexels.com/photos/7593267/pexels-photo-7593267.jpeg",
    totalOrders: 42,
    revenue: 8400,
    availability: "Unavailable",
  },
];

export default function PopularDishes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Dishes</CardTitle>
        <CardDescription>
          Your best-performing dishes based on orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 border-b pb-4 "
            >
              <span className="w-5 text-sm font-semibold text-muted-foreground">
                #{index + 1}
              </span>
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{dish.name}</p>
                <p className="text-xs text-muted-foreground">{dish.category}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dish.totalOrders} orders
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-semibold">₹{dish.revenue}</p>

                <Badge
                  variant="outline"
                  className={
                    dish.availability === "Available"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }
                >
                  {dish.availability}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
