import { Package } from "lucide-react";

export default function OrdersPageHeader() {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage your assigned delivery orders and track their progress.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
        <Package className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">Delivery Assignments</span>
      </div>
    </div>
  );
}
