"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChefHat, PackageCheck, Phone, X } from "lucide-react";
import type { RestaurantOrderStatus } from "../types";

type OrderActionsProps = {
  status: RestaurantOrderStatus;
  customerPhone: string;
  onConfirm: () => void;
  onStartPreparing: () => void;
  onMarkReady: () => void;
  onComplete: () => void;
  onCancel: () => void;
};

export default function OrderActions({
  status,
  customerPhone,
  onConfirm,
  onStartPreparing,
  onMarkReady,
  onComplete,
  onCancel,
}: OrderActionsProps) {
  const isFinalStatus = status === "Completed" || status === "Cancelled";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage this order based on its current status
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "New" && (
          <>
            <Button className="w-full" onClick={onConfirm}>
              <Check className="mr-2 size-4" />
              Confirm Order
            </Button>
            <Button variant="destructive" className="w-full" onClick={onCancel}>
              <X className="mr-2 size-4" />
              Reject Order
            </Button>
          </>
        )}
        {status === "Confirmed" && (
          <>
            <Button className="w-full" onClick={onStartPreparing}>
              <ChefHat className="mr-2 size-4" />
              Start Preparing
            </Button>
            <Button variant="destructive" className="w-full" onClick={onCancel}>
              <X className="mr-2 size-4" />
              Cancel Order
            </Button>
          </>
        )}
        {status === "Preparing" && (
          <>
            <Button className="w-full" onClick={onMarkReady}>
              <PackageCheck className="mr-2 size-4" />
              Mark as Ready
            </Button>
            <Button variant="destructive" className="w-full" onClick={onCancel}>
              <X className="mr-2 size-4" />
              Cancel Order
            </Button>
          </>
        )}
        {status === "Ready" && (
          <Button className="w-full" onClick={onComplete}>
            <Check className="mr-2 size-4" />
            Mark as Completed
          </Button>
        )}
        {isFinalStatus && (
          <div className="rounded-lg bg-muted p-3 text-center">
            <p className="text-sm font-medium">
              {status === "Completed"
                ? "This order has been completed."
                : "This order has been cancelled."}
            </p>
          </div>
        )}
        <div className="border-t pt-4">
          <Button variant="outline" className="w-full">
            <p className="flex">
              <Phone className="mr-2 size-4" />
              Contact Customer
            </p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
