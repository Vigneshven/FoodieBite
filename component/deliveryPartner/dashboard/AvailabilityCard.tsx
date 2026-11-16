"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bike, Info } from "lucide-react";
import { useState } from "react";

export default function AvailabilityCard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base">Delivery Availability</CardTitle>

            <CardDescription>
              Manage your availability for delivery.
            </CardDescription>
          </div>

          <Badge
            variant={isOnline ? "default" : "secondary"}
            className={
              isOnline ? "bg-green-100 text-green-700 hover:bg-green-100" : ""
            }
          >
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-3">
              <Bike className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                {isOnline
                  ? "You're currently Online"
                  : "You're currently Offline"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOnline
                  ? "You can receive new delivery requests."
                  : "You won't receive new delivery requests."}
              </p>
            </div>
          </div>
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
        </div>
        <div className="flex gap-3 rounded-lg bg-muted p-3">
          <Info className="mt-1 size-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-5 text-muted-foreground">
            Offline means you cannot received orders.If you have any pending
            orders finish it before going offline
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
