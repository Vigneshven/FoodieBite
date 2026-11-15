import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

export type OrderStatus =
  | "New"
  | "Confirmed"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

type OrderFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  paymentStatus: string;
  onPaymentStatusChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  onReset: () => void;
};

export default function OrderFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  paymentStatus,
  onPaymentStatusChange,
  date,
  onDateChange,
  onReset,
}: OrderFiltersProps) {
  const hasFilters =
    search !== "" ||
    status !== "All" ||
    paymentStatus !== "All" ||
    date !== "All";

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2">
          <Label>Search Orders</Label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search order id..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Order Status</Label>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Payment Status</Label>

          <select
            value={paymentStatus}
            onChange={(e) => onPaymentStatusChange(e.target.value)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
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
