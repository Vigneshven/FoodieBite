"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, ShoppingBag } from "lucide-react";
import { useState } from "react";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Picked Up"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed";

type OrderPriority = "Normal" | "High" | "Urgent";

export default function OrderInformation() {
  const [status, setStatus] = useState<OrderStatus>("Out for Delivery");
  const [priority, setPriority] = useState<OrderPriority>("Normal");
  const [restaurant, setRestaurant] = useState("Pizza Palace");

  const restaurants = [
    "Pizza Palace",
    "Burger House",
    "Sushi World",
    "Pasta House",
    "Healthy Bites",
  ];
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-card">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Order Information</CardTitle>
            <CardDescription className="mt-1">
              Manage order details and delivery partners
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Order ID</Label>
            <Input value="OD-1" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Order Date</Label>
            <Input value="Nov 06,2026 - 05:01 PM" readOnly />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Customer Name</Label>
          <Input value="test1" readOnly />
        </div>
        <div className="space-y-2">
          <Label>Restaurant</Label>
          <div className="relative">
            <ShoppingBag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none"
            >
              {restaurants.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Order Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Delivery Priority</Label>
            <select
              value={priority}
              onChange={(e) => e.target.value as OrderPriority}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <p className="text-sm font-medium">Current Order Status</p>
            <p className="text-xs text-muted-foreground font-bold">
              Status selected for this order
            </p>
          </div>
          <Badge variant="secondary">{status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

