import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

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
};

export default function FavoritesFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  availability,
  onAvailabilityChange,
}: FavoritesFiltersProps) {
  return (
    <section>
      <div>
        <h2>Find Your Favorites</h2>
        <p>Search your favorites restaurants and food items</p>
      </div>
      <div>
        <Search />
        <input />
      </div>
      <div>
        <div>
          <Label>SortBy</Label>
          <select>
            <option value="recent">recent</option>
            <option value="name(a-z)">name(a-z)</option>
            <option value="name(z-a)">name(z-a)</option>
            <option value="price(low-high)">price(low-high)</option>
            <option value="price(high-low)">price(high-low)</option>
          </select>
        </div>
        <div>
          <Label>Availability</Label>
          <select>
            <option value="all">all</option>
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>
          </select>
        </div>
      </div>
      <div>
        <div>
          <p>Showing</p>
        </div>
      </div>
    </section>
  );
}
