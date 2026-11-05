import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type DeliveryPaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function DeliveryPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DeliveryPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalPages);

  return (
    <div className="flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <p>
          Showing{" "}
          <span className="font-medium text-foreground">{startItem}</span> to{" "}
          <span className="font-medium text-foreground">{endItem}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>{" "}
          deliveries
        </p>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-9 rounded-md border bg-background px-2 text-sm"
        >
          {[5, 10, 20].map((size) => (
            <option value={size} key={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <p className="mr-2 text-sm text-muted-foreground font-bold">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
