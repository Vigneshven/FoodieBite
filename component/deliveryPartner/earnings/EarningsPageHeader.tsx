"use client";

import { CalendarDays, Wallet } from "lucide-react";
import { useState } from "react";

export default function EarningsPageHeader() {
  const [dateRange, setDateRange] = useState("all");

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Earnings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your delivery income and payout transactions.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border px-3">
          <CalendarDays className="size-4 text-muted-foreground" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 bg-transparent text-sm outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 months</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          <Wallet className="size-4" />
          <span className="text-sm font-medium">Earnings Overview</span>
        </div>
      </div>
    </div>
  );
}
