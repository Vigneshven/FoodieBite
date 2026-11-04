import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, User, UserCheck, UserPlus, UserX } from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "10",
    change: "+2%",
    description: "Compared to last month",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Active Customers",
    value: "10",
    change: "+2%",
    description: "Currently Active",
    icon: UserCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "New This Month",
    value: "10",
    change: "+2%",
    description: "Joined This month",
    icon: UserPlus,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    title: "Inactive Customers",
    value: "10",
    change: "+2%",
    description: "No Recent Activity",
    icon: UserX,
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

export default function CustomerStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground">
                    {stat.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    {stat.value}
                  </h2>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${stat.bg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${stat.color}`}
                >
                  <TrendingUp size={14} />
                  <span>{stat.change}</span>
                </span>
                <div className="flex gap-2 items-center justify-between text-sm font-bold text-muted-foreground">
                  <span>{stat.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
