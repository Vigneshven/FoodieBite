import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bike, Medal, Star, TrendingUp } from "lucide-react";

const deliveryPartners = [
  {
    id: 1,
    name: "test1",
    email: "test1@gmail.com",
    deliveries: 10,
    rating: 4.8,
    successRate: 99,
    rank: "Top Performer",
  },
  {
    id: 2,
    name: "test2",
    email: "test2@gmail.com",
    deliveries: 6,
    rating: 4.5,
    successRate: 39,
    rank: "Excellent",
  },
  {
    id: 3,
    name: "test3",
    email: "test3@gmail.com",
    deliveries: 7,
    rating: 4.8,
    successRate: 90,
    rank: "Excellent",
  },
  {
    id: 4,
    name: "test4",
    email: "test4@gmail.com",
    deliveries: 5,
    rating: 3.7,
    successRate: 78,
    rank: "Good",
  },
];

export default function TopDeliveryPartners() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Top Delivery Partners</CardTitle>
            <CardDescription>Best-performing riders this week</CardDescription>
          </div>
          <Badge variant="secondary">This week</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {deliveryPartners.map((partners, index) => (
          <div key={partners.id} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
              {index === 0 ? (
                <Medal className="h-5 w-5 text-yellow-500" />
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">
                  {index + 1}
                </span>
              )}
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Bike className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">{partners.name}</p>
                {index === 0 && (
                  <Badge className="text-yellow-500 bg-yellow-100 font-bold text-sm">
                    Top Performer
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs font-bold text-muted-foreground">
              {partners.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-bold">
              <span>{partners.deliveries}</span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                {partners.rating}
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1 text-sm font-bold text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 font-bold" />
                {partners.successRate}%
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-bold">
                Success rate
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
