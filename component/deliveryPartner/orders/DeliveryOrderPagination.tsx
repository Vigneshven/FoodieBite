import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DeliveryOrderPaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function DeliveryOrderPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DeliveryOrderPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>{" "}
        delivery orders
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Rows per page</label>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-9 rounded-md border bg-background px-2 text-sm outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 w-9"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <Button
              key={page}
              type="button"
              variant={page === currentPage ? "default" : "outline"}
              className="h-9 w-9"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 w-9"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
