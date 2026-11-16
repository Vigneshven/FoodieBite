import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Circle, Clock } from "lucide-react";
import type { RestaurantOrderStatus, RestaurantOrderTimeline } from "../types";

type OrderStatusTimelineProps = {
  currentStatus: RestaurantOrderStatus;
  timestamps: RestaurantOrderTimeline;
};

const timelineSteps: {
  status: RestaurantOrderStatus;
  description: string;
}[] = [
  {
    status: "New",
    description: "Order received by the restaurant",
  },
  {
    status: "Confirmed",
    description: "Restaurant accepted the order",
  },
  {
    status: "Preparing",
    description: "Kitchen is preparing the dishes",
  },
  {
    status: "Ready",
    description: "Order is ready for pickup",
  },
  {
    status: "Completed",
    description: "Order has been completed",
  },
];

export default function OrderStatusTimeline({
  currentStatus,
  timestamps,
}: OrderStatusTimelineProps) {
  const isCancelled = currentStatus === "Cancelled";

  const currentIndex = timelineSteps.findIndex(
    (step) => step.status === currentStatus,
  );

  const getStepState = (index: number) => {
    if (isCancelled) return "cancelled";

    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";

    return "upcoming";
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Timeline</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track the progress of this order
        </p>
      </CardHeader>
      <CardContent className="space-y-1">
        {timelineSteps.map((step, index) => {
          const state = getStepState(index);
          return (
            <div key={step.status} className="flex gap-4">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                  state === "completed"
                    ? "bg-green-100 text-green-700"
                    : state === "current"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {state === "completed" ? (
                  <Check className="size-4" />
                ) : state === "current" ? (
                  <Clock className="size-4" />
                ) : (
                  <Circle className="size-4" />
                )}
                {index !== timelineSteps.length - 1 && (
                  <div
                    className={`w-1 ${
                      state === "completed" ? "bg-green-500" : "bg-border"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`font-medium ${
                      state === "upcoming" ? "text-muted-foreground" : ""
                    }`}
                  >
                    {step.status}
                  </p>
                  {timestamps[step.status] && (
                    <span className="text-xs text-muted-foreground">
                      {timestamps[step.status]}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
                {state === "current" && (
                  <span className="mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium">
                    Current Status
                  </span>
                )}
                {isCancelled && index === 0 && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    This order has been cancelled.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
