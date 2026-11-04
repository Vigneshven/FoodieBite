"use client";

import { CalendarDays, Search } from "lucide-react";

export const deliveryStatuses = [
  "All",
  "In Transit",
  "Delivered",
  "Delayed",
  "Cancelled",
];

export type DeliveryStatusFilter = (typeof deliveryStatuses)[number];

export type DeliveryDateFilter = "7" | "30" | "90" | "all";

type DeliveryFiltersProps = {
  activeStatus: DeliveryStatusFilter;
  onStatusChange: (status: DeliveryStatusFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
  dateRange: DeliveryDateFilter;
  onDateRangeChange: (value: DeliveryDateFilter) => void;
};

export default function DeliveryFilters({
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: DeliveryFiltersProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            placeholder="Search by order id,customer or delivery partners"
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {deliveryStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeStatus === status ? "bg-orange-500 text-lg text-white font-bold hover:cursor-pointer" : "text-sm font-medium hover:cursor-pointer"}`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select
            value={dateRange}
            onChange={(e) =>
              onDateRangeChange(e.target.value as DeliveryDateFilter)
            }
            className="h-11 rounded-lg border bg-background px-3 text-sm outline-none"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
    </div>
  );
}
