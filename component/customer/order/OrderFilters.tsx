import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";

export type OrderStatusFilter =
  | "All"
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type OrderDateFilter = "7" | "30" | "90" | "all";

type OrderFiltersProps = {
  search: string;
  status: OrderStatusFilter;
  dateRange: OrderDateFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatusFilter) => void;
  onDateChange: (value: OrderDateFilter) => void;
};

const statusOptions: OrderStatusFilter[] = [
  "All",
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export default function OrderFilters({
  search,
  status,
  dateRange,
  onSearchChange,
  onStatusChange,
  onDateChange,
}: OrderFiltersProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-1 flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-orange-600" />
        <h3 className=" text-muted-foreground font-bold text-sm">
          Filter Orders
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <Label className="mb-2 text-muted-foreground text-sm font-bold">
            Search Orders
          </Label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3">
            <Search size={18} className="shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search OrderID..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 w-full bg-background rounded-lg pl-10 pr-3 text-sm outline-none"
            />
          </div>
        </div>
        <div>
          <Label className="mb-2 text-sm font-bold text-muted-foreground">
            Order Status
          </Label>
          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as OrderStatusFilter)
            }
            className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-muted-foreground font-bold outline-none"
          >
            {statusOptions.map((options) => (
              <option key={options} value={options}>
                {options === "All" ? "All Statuses" : options}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="mb-2 text-sm font-bold text-muted-foreground">
            Date Range
          </Label>
          <select
            value={dateRange}
            onChange={(e) => onDateChange(e.target.value as OrderDateFilter)}
            className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-muted-foreground font-bold outline-none"
          >
            <option value="all">All Time</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
