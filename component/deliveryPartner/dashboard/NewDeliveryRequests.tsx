"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Clock,
  IndianRupee,
  MapPin,
  Package,
  Store,
  X,
} from "lucide-react";
import { useState } from "react";

type DeliveryRequest = {
  id: string;
  restaurantName: string;
  pickupAddress: string;
  customerAddress: string;
  distance: string;
  estimatedTime: string;
  deliveryFee: number;
  requestedAt: string;
};

const initialRequests: DeliveryRequest[] = [
  {
    id: "ORD-1",
    restaurantName: "A2B",
    pickupAddress: "Katpadi,vellore",
    customerAddress: "bayagam,vellore",
    distance: "3.2 km",
    estimatedTime: "20-25 min",
    deliveryFee: 65,
    requestedAt: "2 minutes ago",
  },
  {
    id: "ORD-2",
    restaurantName: "Thambi biriyani",
    pickupAddress: "bayagam,vellore",
    customerAddress: "Katpadi,vellore",
    distance: "2.5 km",
    estimatedTime: "15-20 min",
    deliveryFee: 50,
    requestedAt: "5 minutes ago",
  },
];

export default function NewDeliveryRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const [requestStatus, setRequestStatus] = useState<
    Record<string, "Accepted" | "Declined">
  >({});

  const handleRequest = (id: string, status: "Accepted" | "Declined") => {
    setRequestStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <Card className="min-w-3xl">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle>New Delivery Requests</CardTitle>
          <p className="text-sm text-muted-foreground">
            Respond to your incoming delivery assignments.
          </p>
        </div>

        <Badge variant="secondary" className="shrink-0 self-start sm:self-auto">
          {requests.filter((request) => !requestStatus[request.id]).length} New
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {requests.length === 0 ? (
          <div className="py-8 text-center">
            <Package className="mx-auto mb-3 size-8 text-muted-foreground" />
            <p className="font-medium">No delivery requests</p>
            <p className="text-sm text-muted-foreground">
              New assignments will appear here.
            </p>
          </div>
        ) : (
          requests.map((request) => {
            const status = requestStatus[request.id];
            return (
              <div
                key={request.id}
                className="flex h-full flex-col rounded-xl border bg-card p-4 sm:p-5"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold">{request.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Requested {request.requestedAt}
                    </p>
                  </div>
                  {status ? (
                    <Badge
                      variant="outline"
                      className={
                        status === "Accepted"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {status}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">New Request</Badge>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="grid flex-1 content-start gap-3 xl:grid-cols-2">
                  <div className="flex gap-3 rounded-lg bg-muted p-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background">
                      <Store className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Pickup Restaurant</p>
                      <p className="text-sm">{request.restaurantName}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.pickupAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-0 gap-3 rounded-lg bg-muted/40 p-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background">
                      <MapPin className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Customer Location</p>
                      <p className="text-sm">{request.customerAddress}</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="mt-1 text-sm font-semibold">
                      {request.distance}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Est. Time</p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                      <Clock className="size-3.5" />
                      {request.estimatedTime}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">
                      Delivery Fee
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                      <IndianRupee className="size-3.5" />
                      {request.deliveryFee}
                    </p>
                  </div>
                </div>
                {!status && (
                  <div className="mt-auto flex gap-2 pt-5 sm:justify-end">
                    <Button
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRequest(request.id, "Declined")}
                    >
                      <X className="mr-2 size-4" />
                      Reject
                    </Button>

                    <Button
                      onClick={() => handleRequest(request.id, "Accepted")}
                    >
                      <Check className="mr-2 size-4" />
                      Accept Delivery
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
