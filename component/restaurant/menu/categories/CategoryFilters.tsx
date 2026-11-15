import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";

type CategoryFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  onAddCategory: () => void;
};

export default function CategoryFilters({
  search,
  setSearch,
  status,
  setStatus,
  onAddCategory,
}: CategoryFiltersProps) {
  const hasFilters = search !== "" || status !== "All";

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Filter status
            </option>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {hasFilters && (
            <Button variant="ghost" onClick={clearFilters} className="gap-2">
              <X className="size-4" />
              Clear
            </Button>
          )}
        </div>
        <Button onClick={onAddCategory} className="gap-2">
          <Plus className="size-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}
