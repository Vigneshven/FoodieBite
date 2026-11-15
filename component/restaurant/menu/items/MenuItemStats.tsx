import { CheckCircle, Layers, Utensils, XCircle } from "lucide-react";

const stats = [
  {
    title: "Total Menu Items",
    value: "48",
    description: "Across all categories",
    icon: Utensils,
  },
  {
    title: "Available Items",
    value: "36",
    description: "Currently available",
    icon: CheckCircle,
  },
  {
    title: "Unavailable Items",
    value: "12",
    description: "Currently unavailable",
    icon: XCircle,
  },
  {
    title: "Categories",
    value: "8",
    description: "Organized menu categories",
    icon: Layers,
  },
];

export default function MenuItemStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.title} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.title}</p>

              <div className="rounded-lg bg-muted p-2">
                <Icon className="size-5 text-muted-foreground" />
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{stat.value}</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
