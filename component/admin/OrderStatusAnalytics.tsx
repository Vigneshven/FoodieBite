"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

const orderData = [
  {
    status: "delivered",
    orders: 20,
    fill: "var(--color-delivered)",
  },
  {
    status: "preparing",
    orders: 10,
    fill: "var(--color-preparing)",
  },
  {
    status: "pending",
    orders: 5,
    fill: "var(--color-pending)",
  },
  {
    status: "cancelled",
    orders: 3,
    fill: "var(--color-cancelled)",
  },
];

const chartConfig = {
  orders: {
    label: "Orders",
  },
  delivered: {
    label: "Delivered",
    color: "#16a34a",
  },
  preparing: {
    label: "preparing",
    color: "#f59e0b",
  },
  pending: {
    label: "pending",
    color: "#3b82f6",
  },
  cancelled: {
    label: "cancelled",
    color: "#ef4444",
  },
};

const totalOrders = orderData.reduce((total, item) => total + item.orders, 0);

export default function OrderStatusAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Analytics</CardTitle>

        <CardDescription>Overview of Order</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold">
                        {String(name)}
                      </span>
                      <span className="text-sm font-semibold">
                        {Number(value).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={orderData}
              dataKey="orders"
              nameKey="status"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={1}
              strokeWidth={3}
            >
              {orderData.map((item) => (
                <Cell key={item.status} fill={item.fill} />
              ))}
            </Pie>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              className="text-xl font-bold"
            >
              {totalOrders}
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              className="text-xs font-bold"
            >
              Total Orders
            </text>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {orderData.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-sm capitalize text-muted-foreground">
                  {item.status}
                </span>
                <span className="text-sm font-semibold">{item.orders}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
