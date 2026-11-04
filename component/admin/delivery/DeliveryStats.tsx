import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Bike,
  CircleCheck,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const deliveryStats = [
  {
    title: "Total Deliveries",
    value: "123",
    change: "+11%",
    description: "Compared to last month",
    icon: Bike,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    trend: "up",
  },
  {
    title: "On-Time Delivery",
    value: "50%",
    change: "+11%",
    description: "Compared to last month",
    icon: CircleCheck,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    trend: "up",
  },
  {
    title: "In Transit",
    value: "54%",
    change: "+19",
    description: "Currently on the way",
    icon: Clock,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    trend: "up",
  },
  {
    title: "Delayed",
    value: "110",
    change: "-2%",
    description: "Compared to last month",
    icon: AlertCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    trend: "down",
  },
];

export default function DeliveryStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {deliveryStats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <Card key={stat.title} className="rounded-xl shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground">
                  {stat.title}
                </p>
                <h2 className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </h2>
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <span
                    className={`flex items-center gap-1 font-semibold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground font-bold">
                    {stat.description}
                  </span>
                </div>
              </div>
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
