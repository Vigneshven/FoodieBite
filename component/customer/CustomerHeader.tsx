"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

export default function CustomerHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
          Customer Dashboard
        </h1>

        <p className="hidden text-sm text-gray-500 sm:block">
          Welcome back! Ready for something delicious?
        </p>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 md:flex">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm outline-none placeholder:text-gray-400 lg:w-44"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-gray-600 hover:bg-gray-100"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.6 hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <span className="text-sm font-semibold">JD</span>
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-900">Customer</p>

            <p className="text-xs text-gray-500">My Account</p>
          </div>

          <ChevronDown size={16} className="hidden text-gray-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
