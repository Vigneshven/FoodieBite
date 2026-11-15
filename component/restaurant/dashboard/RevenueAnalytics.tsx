"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const weeklyRevenue = [
  { period: "Mon", revenue: 3200 },
  { period: "Tue", revenue: 4500 },
  { period: "Wed", revenue: 3800 },
  { period: "Thu", revenue: 5200 },
  { period: "Fri", revenue: 6100 },
  { period: "Sat", revenue: 7500 },
  { period: "Sun", revenue: 6800 },
];

const monthlyRevenue = [
  { period: "Jan", revenue: 18000 },
  { period: "Feb", revenue: 22000 },
  { period: "Mar", revenue: 19500 },
  { period: "Apr", revenue: 28000 },
  { period: "May", revenue: 24500 },
  { period: "Jun", revenue: 32000 },
  { period: "Jul", revenue: 35000 },
  { period: "Aug", revenue: 29000 },
  { period: "Sep", revenue: 38000 },
  { period: "Oct", revenue: 42000 },
  { period: "Nov", revenue: 39000 },
  { period: "Dec", revenue: 46000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function RevenueAnalytics() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const chartData = period === "weekly" ? weeklyRevenue : monthlyRevenue;

  const totalRevenue = chartData.reduce(
    (total, item) => total + item.revenue,
    0,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            Track your restaurant's revenue performance.
          </CardDescription>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={period === "weekly" ? "default" : "outline"}
            onClick={() => setPeriod("weekly")}
          >
            Weekly
          </Button>

          <Button
            size="sm"
            variant={period === "monthly" ? "default" : "outline"}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <p className="text-sm text-muted-foreground">
            Total revenue ({period})
          </p>

          <h2 className="text-2xl font-semibold">₹{totalRevenue}</h2>
        </div>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `₹${Number(value)}`}
                />
              }
            />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="var(--color-revenue)"
              fillOpacity={0.25}
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
