"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Heart,
  UserRound,
  MapPin,
  UtensilsCrossed,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/api/api";
import { toast } from "sonner";

const navigation = [
  {
    title: "Overview",
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    title: "My Orders",
    href: "/customer/orders",
    icon: ShoppingBag,
  },
  {
    title: "Payments",
    href: "/customer/payments",
    icon: CreditCard,
  },
  {
    title: "Favorites",
    href: "/customer/favorites",
    icon: Heart,
  },
  {
    title: "My Profile",
    href: "/customer/settings",
    icon: UserRound,
  },
  {
    title: "Addresses",
    href: "/customer/addresses",
    icon: MapPin,
  },
];

export default function CustomerSidebar() {
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
        <Link href="/customer" className="flex items-center gap-2">
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
          Customer Menu
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/customer"
                ? pathname === "/customer"
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
        <div className="rounded-xl bg-orange-50 p-4">
          <p className="text-sm font-semibold text-gray-900">Hungry again?</p>

          <p className="mt-1 text-xs text-gray-500">
            Discover something delicious today.
          </p>

          <Link
            href="/customer/restaurant"
            className="mt-3 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Browse Restaurants →
          </Link>
        </div>
      </div>
      <div className="border-t p-4">
        <Link
          href="/customer/settings"
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
