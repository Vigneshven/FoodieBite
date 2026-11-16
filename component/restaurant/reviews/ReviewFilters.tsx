import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Search } from "lucide-react";

export type ReviewFiltersType = {
  search: string;
  rating: string;
  replyStatus: string;
};

type ReviewFiltersProps = {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
};

export default function ReviewFilters({
  filters,
  onFiltersChange,
}: ReviewFiltersProps) {
  const handleChange = (field: keyof ReviewFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleReset = () => {
    onFiltersChange({
      search: "",
      rating: "all",
      replyStatus: "all",
    });
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Filter Reviews</h3>
          <p className="text-sm text-muted-foreground">
            Search and filter customer feedback.
          </p>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="mr-2 size-4" />
          Reset Filters
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Search Reviews</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customer or review..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Rating</Label>
          <select
            value={filters.rating}
            onChange={(e) => handleChange("rating", e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Reply Status</Label>
          <select
            value={filters.replyStatus}
            onChange={(e) => handleChange("replyStatus", e.target.value)}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="all">All Reviews</option>
            <option value="replied">Replied</option>
            <option value="not-replied">Not Replied</option>
          </select>
        </div>
      </div>
    </div>
  );
}
