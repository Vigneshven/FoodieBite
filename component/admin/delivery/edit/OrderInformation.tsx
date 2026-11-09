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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderInformationData } from "./types/deliveryFormTypes";

type OrderInformationProps = {
  value: OrderInformationData;
  onChange: (value: OrderInformationData) => void;
};

export default function OrderInformation({
  value,
  onChange,
}: OrderInformationProps) {
  const handleChange = (
    field: keyof OrderInformationData,
    newValue: string | null,
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    });
  };
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
            <Select
              value={value.restaurants}
              onValueChange={(newValue) =>
                handleChange("restaurants", newValue)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select restaurant" className="pl-5" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Pizza Palace">Pizza Palace</SelectItem>
                <SelectItem value="Burger House">Burger House</SelectItem>
                <SelectItem value="Sushi World">Sushi World</SelectItem>
                <SelectItem value="Pasta House">Pasta House</SelectItem>
                <SelectItem value="Healthy Bites">Healthy Bites</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Order Status</Label>
            <Select
              value={value.status}
              onValueChange={(newValue) => handleChange("status", newValue)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Preparing">Preparing</SelectItem>
                <SelectItem value="Picked Up">Picked Up</SelectItem>
                <SelectItem value="Out for Delivery">
                  Out for Delivery
                </SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Delivery Priority</Label>
            <Select
              value={value.priority}
              onValueChange={(newValue) => handleChange("priority", newValue)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <p className="text-sm font-medium">Current Order Status</p>
            <p className="text-xs text-muted-foreground font-bold">
              Status selected for this order
            </p>
          </div>
          <Badge variant="secondary">{value.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
