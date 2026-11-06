import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Bike,
  CheckCircle2,
  ChefHat,
  Clock3,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";

export type DeliveryStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Picked Up"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed";

export type DeliveryProgressProps = {
  status: DeliveryStatus;
  lastUpdated: string;
};

const deliverySteps = [
  {
    id: 1,
    title: "Order Placed",
    description: "Customer successfully placed the order",
    icon: ShoppingBag,
    timestamp: "02:30 PM",
    status: "Pending",
  },
  {
    id: 2,
    title: "Order Confirmed",
    description: "Restaurant confirmed the order",
    icon: CheckCircle2,
    timestamp: "02:32 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    title: "Preparing Order",
    description: "Restaurant is preparing the order",
    icon: ChefHat,
    timestamp: "02:38 PM",
    status: "Preparing",
  },
  {
    id: 4,
    title: "Picked Up",
    description: "Rider collected the order",
    icon: Bike,
    timestamp: "02:50 PM",
    status: "Picked Up",
  },
  {
    id: 5,
    title: "Order for Delivery",
    description: "Rider is heading to the customer",
    icon: Bike,
    timestamp: "02:55 PM",
    status: "Order for Delivery",
  },
  {
    id: 6,
    title: "Delivered",
    description: "Order Delivered successfully",
    icon: PackageCheck,
    timestamp: "Expected",
    status: "Delivered",
  },
];

const statusOrder: Record<DeliveryStatus, number> = {
  Pending: 0,
  Confirmed: 1,
  Preparing: 2,
  "Picked Up": 3,
  "Out for Delivery": 4,
  Delivered: 5,
  Delayed: 4,
};

export default function DeliveryProgress({
  status,
  lastUpdated,
}: DeliveryProgressProps) {
  const currentStep = statusOrder[status];

  const progressPercentage =
    status === "Delivered"
      ? 100
      : (currentStep / (deliverySteps.length - 1)) * 100;
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Delivery Journey</CardTitle>
            <CardDescription className="mt-1">
              Complete order tracking from placed to deliver
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={
              status === "Delivered"
                ? "border-emerald-500 bg-emerald-500 text-emerald-100"
                : status === "Delayed"
                  ? "border-red-500 bg-red-500 text-red-100"
                  : "border-blue-500 bg-blue-500 text-blue-100"
            }
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl bg-muted p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Overall Delivery Progress</p>
              <p className="mt-1 text-xs text-muted-foreground font-bold">
                {status === "Delivered"
                  ? "Your order has completed its journey"
                  : "Your order is still in progress"}
              </p>
            </div>
            {status !== "Delayed" && (
              <span className="text-xl font-bold">{progressPercentage}%</span>
            )}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                status === "Delayed" ? "beg-red-500" : "bg-emerald-500"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        {status === "Delayed" && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500 bg-red-500 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-black-500" />
            <div>
              <p className="text-sm font-semibold text-white">
                Delivery Delayed
              </p>
              <p className="mt-1 text-xs text-white font-semibold">
                This delivery is taking longer than expected still on the way
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
          {deliverySteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index < currentStep || status === "Delivered";
            const isCurrent = index === currentStep && status !== "Delivered";

            return (
              <div key={step.id} className="relative flex gap-3 lg:flex-col">
                <div className="">
                  <div
                    className={`flex h-full w-full p-1 items-center justify-center rounded-full ${
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isCurrent
                          ? status === "Delayed"
                            ? "border-red-500 bg-red-500 text-red-60"
                            : "border-blue-500 bg-blue-500 text-blue-50"
                          : "border bg-muted text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1 pb-2 ">
                  <div className="flex flex-wrap items-center justify-between">
                    <p
                      className={`text-sm font-bold ${isCompleted ? "text-emerald-600" : isCurrent ? (status === "Delayed" ? "text-red-600" : "text-blue-600") : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </p>
                    {isCurrent && (
                      <span className="rounded-full bg-blue-500 px-2 py-1 text-sm text-white font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground font-bold">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-bold">
                    <Clock3 className="h-3 w-3" />
                    {isCompleted || isCurrent ? step.timestamp : "Waiting"}
                  </div>
                  <div>
                    {index !== deliverySteps.length - 1 && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 top-25 ${isCompleted ? "bg-emerald-500" : "bg-border"}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-bold">
            Last Tracking Update
          </p>
          <p className="text-xs font-medium">{lastUpdated}</p>
        </div>
      </CardContent>
    </Card>
  );
}
