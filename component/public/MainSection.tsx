import Link from "next/link";
import { ArrowRight, Search, Star } from "lucide-react";

export default function MainSection() {
  return (
    <section className="overflow-hidden bg-orange-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-600">
            <Star size={15} className="fill-orange-500 text-orange-500" />
            Delicious food, delivered with love
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Discover the
            <span className="block text-orange-500">taste of happiness.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            Explore amazing restaurants, discover your favourite dishes, and
            enjoy delicious meals from the comfort of your home.
          </p>
          <div className="mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
            <Search className="ml-3 shrink-0 text-gray-400" size={21} />

            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />

            <Link
              href="#restaurants"
              className="shrink-0 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Explore
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="#restaurants"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Explore Restaurants
              <ArrowRight size={18} />
            </Link>

            <span className="text-sm text-gray-500">
              No login required to browse!
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-5 top-10 h-28 w-28 rounded-full bg-orange-200/60 blur-2xl" />
          <div className="absolute -bottom-5 right-5 h-36 w-36 rounded-full bg-yellow-200/70 blur-2xl" />

          <div
            className="relative aspect-5/4 overflow-hidden rounded-[2rem] bg-gray-200 bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:-left-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                🍽️
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Something delicious
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Your next favourite meal awaits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
