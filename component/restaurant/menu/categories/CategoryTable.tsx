import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Utensils } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  description: string;
  dishCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
};

type CategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Dishes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Utensils className="size-5 text-muted-foreground" />
                    </div>

                    <span className="font-medium">{category.name}</span>
                  </div>
                </TableCell>

                <TableCell className="font-medium">
                  {category.description}
                </TableCell>

                <TableCell>{category.dishCount}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      category.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {category.status}
                  </Badge>
                </TableCell>

                <TableCell>{category.createdAt}</TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(category)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(category)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
