import { Card, CardContent } from "@/components/ui/card";
import {
  Ban,
  CheckCircle2,
  Clock,
  Store,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const restaurantStats = [
  {
    title: "Total Restaurants",
    value: "10",
    change: "+2%",
    description: "Compared to last month",
    icon: Store,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    trend: "up",
    trendColor: "text-green-600",
  },
  {
    title: "Active",
    value: "6",
    change: "+2%",
    description: "Compared to last month",
    icon: CheckCircle2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    trend: "up",
    trendColor: "text-green-600",
  },
  {
    title: "Pending Approval",
    value: "2",
    change: "0%",
    description: "Compared to last month",
    icon: Clock,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    trend: "up",
    trendColor: "text-muted-foreground",
  },
  {
    title: "Suspended",
    value: "1",
    change: "-2%",
    description: "Compared to last month",
    icon: Ban,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    trend: "down",
    trendColor: "text-red-600",
  },
];

export default function RestaurantStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {restaurantStats.map((item) => {
        const Icon = item.icon;
        const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <Card key={item.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground">
                    {item.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">{item.value}</h2>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${item.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
              </div>

              <div>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${item.trendColor}`}
                >
                  <TrendIcon className="h-4 w-4" />
                  {item.change}
                </span>
                <span className="text-xs text-muted-foreground font-bold">
                  {item.description}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
