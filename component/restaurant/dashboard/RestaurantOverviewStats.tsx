import {
  CheckCircle,
  ShoppingBag,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹373000",
    change: "+11%",
    description: "Compared to last month",
    icon: Wallet,
  },
  {
    title: "Total Orders",
    value: "128",
    change: "+10%",
    description: "Compared to last month",
    icon: ShoppingBag,
  },
  {
    title: "Completed Orders",
    value: "96",
    change: "+56%",
    description: "Compared to last month",
    icon: CheckCircle,
  },
  {
    title: "Average Rating",
    value: "4.8 / 5",
    change: "+1",
    description: "Compared to last month",
    icon: Star,
  },
];

export default function RestaurantOverviewStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="rounded-xl border bg-card p-5">
            <div>
              <div>
                <Icon className="size-5 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp className="size-4" />
                {stat.change}
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl font-semibold">{stat.value}</h3>

              <p className="text-sm font-medium">{stat.title}</p>

              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
