import { Input } from "@/components/ui/input";
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

type OrderFiltersProps = {
  search: string;
  status: OrderStatusFilter;
  dateRange: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatusFilter) => void;
  onDateChange: (value: string) => void;
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
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-orange-700"/>
        <h3 className="font-semibold text-gray-900">Filter Orders</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <Label className="mb-2 block text-sm font-medium">Search Orders</Label>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3">
          <Search className="shrink-0 text-gray-400"/>
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search order ID,Restaurant..."
          />
        </div>
      </div>
      <div>
        <Label>Order Status</Label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as OrderStatusFilter)}
        >
          {statusOptions.map((options) => (
            <option key={options} value={options}>
              {options === "All" ? "All Statuses" : options}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Date Range</Label>
        <select
          value={dateRange}
          onChange={(e) => onDateChange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="7">7</option>
          <option value="30">30</option>
          <option value="90">90</option>
        </select>
      </div>
    </div>
  );
}
