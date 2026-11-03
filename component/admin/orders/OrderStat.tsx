import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  CookingPot,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

const orderStats = [
  {
    title: "Total Orders",
    value: "1000",
    change: "+12",
    description: "Compared to last month",
    icon: ShoppingBag,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    trend: "up",
    trendColor: "text-green-600",
  },
  {
    title: "Delivered",
    value: "50",
    change: "+18",
    description: "Compared to last month",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    trend: "up",
    trendColor: "text-green-600",
  },
  {
    title: "Preparing",
    value: "100",
    change: "+12",
    description: "Compared to last month",
    icon: CookingPot,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    trend: "up",
    trendColor: "text-green-600",
  },
  {
    title: "Cancelled",
    value: "10",
    change: "-10",
    description: "Compared to last month",
    icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    trend: "down",
    trendColor: "text-red-600",
  },
];

export default function OrderStat() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {orderStats.map((item) => {
        const Icon = item.icon;
        const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <Card key={item.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600">
                    {item.title}
                  </p>
                  <h2 className="text-sm font-bold text-gray-600">
                    {item.value}
                  </h2>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${item.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span
                  className={`flex items-center gap-1 text-sm font-bold ${item.trendColor}`}
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
