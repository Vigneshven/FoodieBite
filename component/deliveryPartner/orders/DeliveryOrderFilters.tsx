import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Label } from "recharts";

export type DeliveryOrderStatus =
  | "All"
  | "New Request"
  | "Accepted"
  | "Picked Up"
  | "Out for Delivery"
  | "Delivered"
  | "Rejected";

type DeliveryOrderFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: DeliveryOrderStatus;
  onStatusChange: (value: DeliveryOrderStatus) => void;
  date: string;
  onDateChange: (value: string) => void;
  onReset: () => void;
};

export default function DeliveryOrderFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  date,
  onDateChange,
  onReset,
}: DeliveryOrderFiltersProps) {
  const hasFilters = search !== "" || status !== "All" || date !== "All";
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="space-y-2 col-span-2">
          <Label>Search Orders</Label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search order ID, restaurant, customer..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Delivery Status</Label>

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as DeliveryOrderStatus)
            }
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="New Request">New Request</option>
            <option value="Accepted">Accepted</option>
            <option value="Picked Up">Picked Up</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Order Date</Label>

          <select
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
        {hasFilters && (
          <div className="flex items-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="gap-2"
            >
              <X className="size-4" />
              Clear
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
