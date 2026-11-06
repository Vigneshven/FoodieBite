import { Card } from "@/components/ui/card";
import {
  Bike,
  CheckCircle2,
  ChefHat,
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

export default function DeliveryProgress({ status, lastUpdated }:DeliveryProgressProps) {
  return <Card></Card>;
}
