"use client";

import { logout } from "@/api/api";
import {
  Clock,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Star,
  Store,
  Tags,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const navigation = [
  {
    title: "Dashboard",
    href: "/restaurant",
    icon: LayoutDashboard,
  },
  {
    title: "Restaurant Profile",
    href: "/restaurant/profile",
    icon: Store,
  },
  {
    title: "Menu Management",
    href: "/restaurant/menu",
    icon: Utensils,
  },
  {
    title: "Categories",
    href: "/restaurant/menu/categories",
    icon: Tags,
  },
  {
    title: "Orders",
    href: "/restaurant/orders",
    icon: ShoppingBag,
  },
  {
    title: "Availability",
    href: "/restaurant/availability",
    icon: Clock,
  },
  {
    title: "Reviews",
    href: "/restaurant/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/restaurant/settings",
    icon: Settings,
  },
];

export default function RestaurantSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logout();
      router.push("/");
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/restaurant" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <UtensilsCrossed size={22} />
          </div>

          <span className="text-xl font-bold text-gray-900">
            Foodie<span className="text-orange-500">Bite</span>
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Restaurant Onwer Panel
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/restaurant"
                ? pathname === "/restaurant"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <Icon size={19} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link
          href="/restaurant/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium tex-gray-500 transition-colors hover:bg-orange-50 hover:text-orange-500"
        >
          <Settings size={19} />
          Settings
        </Link>
        <button
          type="button"
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:cursor-pointer"
          onClick={handleLogOut}
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
