"use client";

import { Search } from "lucide-react";

const statuses = [
  "All",
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export type OrderStatusFilter = (typeof statuses)[number];

type OrderFiltersProps = {
  activeStatus: OrderStatusFilter;
  onStatusChange: (status: OrderStatusFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function OrderFilters({
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Orders,Customers"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-lg border bg-background pl-10 pr-3 tex-sm outline-none transition focus:border-primary"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${activeStatus === status ? "bg-orange-600 text-white font-bold text-lg" : "font-medium text-sm"}`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
