import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FolderOpen, FolderX } from "lucide-react";

type CategoryStatsProps = {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
};

export default function CategoryStats({
  totalCategories,
  activeCategories,
  inactiveCategories,
}: CategoryStatsProps) {
  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      icon: FolderOpen,
      description: "All menu categories",
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Categories",
      value: activeCategories,
      icon: CheckCircle2,
      description: "Currently available",
      iconStyle: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive Categories",
      value: inactiveCategories,
      icon: FolderX,
      description: "Currently unavailable",
      iconStyle: "bg-orange-100 text-orange-600",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className={`rounded-lg p-2 ${stat.iconStyle}`}>
                <Icon className="size-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
