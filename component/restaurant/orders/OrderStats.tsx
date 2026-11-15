import {
  CheckCircle,
  ClipboardList,
  CookingPot,
  ShoppingBag,
} from "lucide-react";

const orderStats = [
  {
    title: "Total Orders",
    value: "248",
    description: "Orders received this month",
    icon: ShoppingBag,
    iconStyle: "bg-blue-100 text-blue-600",
  },
  {
    title: "New Orders",
    value: "12",
    description: "Waiting for confirmation",
    icon: ClipboardList,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  {
    title: "Preparing Orders",
    value: "18",
    description: "Currently being prepared",
    icon: CookingPot,
    iconStyle: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Completed Orders",
    value: "186",
    description: "Successfully completed",
    icon: CheckCircle,
    iconStyle: "bg-green-100 text-green-600",
  },
];

export default function OrderStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {orderStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.iconStyle}`}>
                <Icon className="size-5" />
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
