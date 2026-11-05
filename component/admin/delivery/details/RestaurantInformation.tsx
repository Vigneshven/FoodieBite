import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Store, Utensils } from "lucide-react";

type RestaurantInformationProps = {
  restaurant: {
    name: string;
    cuisine: string;
    phone: string;
    address: string;
    status: "Active" | "Pending" | "Suspended";
  };
};

export default function RestaurantInformation({
  restaurant,
}: RestaurantInformationProps) {
  const restaurantInitial = restaurant.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <div>
            <CardTitle>Restaurant Information</CardTitle>
            <CardDescription>Restauarant and contact details</CardDescription>
          </div>
        </div>
        <Store className="siz-5 text-muted-foreground font-bold" />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-sm text-orange-700">
            <div>{restaurantInitial}</div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{restaurant.name}</h3>
            <div className="mt-1 flex items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-700">
              <Utensils className="size-3" />
              {restaurant.cuisine}
            </div>
          </div>
          <Badge
            variant="secondary"
            className={
              restaurant.status === "Active"
                ? "bg-green-100 text-green-700"
                : restaurant.status === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
            }
          >
            {restaurant.status}
          </Badge>
        </div>
        <Separator />
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Phone className="size-4 text-muted-foreground font-bold" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold">
              Contact Number
            </p>
            <p className="text-sm font-medium">{restaurant.phone}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center bg-muted rounded-lg">
            <MapPin className="size-4 text-muted-foreground font-bold" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Restaurant Address</p>
            <p className="mt-1 text-sm leading-relaxed font-medium">
              {restaurant.address}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
