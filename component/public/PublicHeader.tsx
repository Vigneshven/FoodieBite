import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <UtensilsCrossed size={22} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Foodie<span className="text-orange-500">Bite</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-semibold text-orange-500">
            Home
          </Link>

          <Link
            href="#categories"
            className="text-sm font-medium text-gray-600 transition hover:text-orange-500"
          >
            Categories
          </Link>

          <Link
            href="#restaurants"
            className="text-sm font-medium text-gray-600 transition hover:text-orange-500"
          >
            Restaurants
          </Link>

          <Link
            href="#specials"
            className="text-sm font-medium text-gray-600 transition hover:text-orange-500"
          >
            Today's Specials
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:inline-flex"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
