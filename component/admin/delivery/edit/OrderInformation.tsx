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
import { OrderInformationData } from "./types/deliveryFormTypes";
import { FieldErrors } from "react-hook-form";
import { DeliveryFormValues } from "./EditDeliveryForm";

type OrderInformationProps = {
  value: OrderInformationData;
  onChange: (value: OrderInformationData) => void;
  errors: FieldErrors<DeliveryFormValues>;
};

export default function OrderInformation({
  value,
  onChange,
  errors,
}: OrderInformationProps) {
  const handleChange = <K extends keyof OrderInformationData>(
    field: K,
    newValue: OrderInformationData[K],
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
            <select
              value={value.restaurants}
              onChange={(event) =>
                handleChange("restaurants", event.target.value)
              }
              className="h-9 w-full rounded-md border border-input bg-background py-1 pr-3 pl-9 text-sm shadow-xs"
            >
              <option value="" disabled>
                Select restaurant
              </option>
              <option value="Pizza Palace">Pizza Palace</option>
              <option value="Burger House">Burger House</option>
              <option value="Sushi World">Sushi World</option>
              <option value="Pasta House">Pasta House</option>
              <option value="Healthy Bites">Healthy Bites</option>
            </select>
            {errors.orderInfo?.restaurant && (
              <p className="text-sm text-red-400">
                {errors.orderInfo.restaurant.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Order Status</Label>
            <select
              value={value.status}
              onChange={(event) =>
                handleChange(
                  "status",
                  event.target.value as OrderInformationData["status"],
                )
              }
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>
            {errors.orderInfo?.status && (
              <p className="text-sm text-red-400">
                {errors.orderInfo.status.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Delivery Priority</Label>
            <select
              value={value.priority}
              onChange={(event) =>
                handleChange(
                  "priority",
                  event.target.value as OrderInformationData["priority"],
                )
              }
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
            {errors.orderInfo?.priority && (
              <p className="text-sm text-red-400">
                {errors.orderInfo.priority.message}
              </p>
            )}
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
