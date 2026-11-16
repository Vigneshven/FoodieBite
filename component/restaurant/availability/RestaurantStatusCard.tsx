"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Store } from "lucide-react";
import { useState } from "react";

export default function RestaurantStatusCard() {
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Restaurant Status</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant's order availability
          </p>
        </div>

        <Badge variant={isAcceptingOrders ? "default" : "secondary"}>
          {isAcceptingOrders ? "Open" : "Closed"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
            <Store className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium">
              {isAcceptingOrders
                ? "Your restaurant is open"
                : "Your restaurant is closed"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isAcceptingOrders
                ? "Customers can place new orders."
                : "Customers cannot place new orders."}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <Label className="font-medium">Accepting Orders</Label>
            <p className="text-sm text-muted-foreground">
              Turn this off to stop receiving new orders.
            </p>
            <Switch
              checked={isAcceptingOrders}
              onCheckedChange={setIsAcceptingOrders}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>
              {isAcceptingOrders
                ? "Your restaurant is accepting orders."
                : "Your restaurant is not accepting orders."}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
