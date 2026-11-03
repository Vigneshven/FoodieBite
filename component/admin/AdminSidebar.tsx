"use client";

import {
  Bike,
  ChartNoAxesCombined,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "DashBoard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Restaurants",
    href: "/admin/restaurants",
    icon: Utensils,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Delivery",
    href: "/admin/delivery",
    icon: Bike,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: ChartNoAxesCombined,
  },
];

function SideBarContent() {
  const path = usePathname();

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-20 items-center gap-3 border-b px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white">
          F
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">FoodieBite</h2>
          <p className="text-xs text-gray-500">Admin Dashboard</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </p>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? path === "/admin"
                : path.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-orange-500 text-white font-bold shadow-sm"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <Icon size={19} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium tex-gray-500 transition-colors hover:bg-orange-50 hover:text-orange-500"
        >
          <Settings size={19} />
          Settings
        </Link>
        <button
          type="button"
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:cursor-pointer"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </div>
  );
}

export function AdminSideBar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 border-r bg-white lg:block">
      <SideBarContent />
    </aside>
  );
}
