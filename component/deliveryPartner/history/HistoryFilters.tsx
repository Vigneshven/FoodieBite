import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

export type HistoryStatus = "All" | "Completed" | "Rejected" | "Cancelled";

type HistoryFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: HistoryStatus;
  onStatusChange: (value: HistoryStatus) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onReset: () => void;
};

export default function HistoryFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onReset,
}: HistoryFiltersProps) {
  const hasFilters = search !== "" || status !== "All" || dateRange !== "all";

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="grid grid-cols-4 items-end gap-4">
        <div className="col-span-2 space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search order ID or restaurant..."
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
            onChange={(e) => onStatusChange(e.target.value as HistoryStatus)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onReset}>
            <X className="mr-2 size-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
