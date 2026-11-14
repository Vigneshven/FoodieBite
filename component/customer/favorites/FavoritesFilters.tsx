import { Label } from "@/components/ui/label";
import { RotateCcw, Search } from "lucide-react";

export type FavoriteSortOption =
  | "recent"
  | "name(a-z)"
  | "name(z-a)"
  | "price(low-high)"
  | "price(high-low)";

export type FavoritesAvailability = "all" | "available" | "unavailable";

type FavoritesFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;

  sortBy: FavoriteSortOption;
  onSortChange: (value: FavoriteSortOption) => void;

  availability: FavoritesAvailability;
  onAvailabilityChange: (value: FavoritesAvailability) => void;

  resultCount: number;
};

export default function FavoritesFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  availability,
  resultCount,
  onAvailabilityChange,
}: FavoritesFiltersProps) {
  const handleClearFilters = () => {
    onSearchChange("");
    onSortChange("recent");
    onAvailabilityChange("all");
  };

  const hasActiveFilters =
    search !== "" || sortBy !== "recent" || availability !== "all";
  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-1000 hover:shadow-xl">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          Find Your Favorites
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Search your favorites restaurants and food items
        </p>
      </div>
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search restaurants or dishes"
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            SortBy
          </Label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as FavoriteSortOption)}
            className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none"
          >
            <option value="recent">recent</option>
            <option value="name(a-z)">name(a-z)</option>
            <option value="name(z-a)">name(z-a)</option>
            <option value="price(low-high)">price(low-high)</option>
            <option value="price(high-low)">price(high-low)</option>
          </select>
        </div>
        <div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Availability
            </Label>
            <select
              value={availability}
              onChange={(e) =>
                onAvailabilityChange(e.target.value as FavoritesAvailability)
              }
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none"
            >
              <option value="all">all</option>
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">{resultCount}</span>{" "}
          {resultCount === 1 ? "favorite" : "favorites"}
        </p>
        <button
          type="button"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition duration-1000 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={15} />
          Clear filters
        </button>
      </div>
    </section>
  );
}
