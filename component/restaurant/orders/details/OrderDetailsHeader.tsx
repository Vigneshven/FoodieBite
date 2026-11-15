import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export type RestaurantOrderStatus =
  | "New"
  | "Confirmed"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

type OrderDetailsHeaderProps = {
  orderId: string;
  date: string;
  status: RestaurantOrderStatus;
};

const statusStyles: Record<RestaurantOrderStatus, string> = {
  New: "bg-blue-100 text-blue-700",
  Confirmed: "bg-indigo-100 text-indigo-700",
  Preparing: "bg-yellow-100 text-yellow-700",
  Ready: "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetailsHeader({
  orderId,
  date,
  status,
}: OrderDetailsHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Order #{orderId}</h1>
          <p className="text-sm text-muted-foreground">Placed on {date}</p>
        </div>
      </div>
      <Badge className={`${statusStyles[status]} px-3 py-1`}>{status}</Badge>
    </div>
  );
}
