import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type HistoryDelivery = {
  id: string;
  restaurant: string;
  customer: string;
  date: string;
  earnings: number;
  status: "Completed" | "Rejected" | "Cancelled";
};

type HistoryTableProps = {
  deliveries: HistoryDelivery[];
};

const statusStyles = {
  Completed: "bg-green-100 text-green-700 hover:bg-green-100",
  Rejected: "bg-red-100 text-red-700 hover:bg-red-100",
  Cancelled: "bg-orange-100 text-orange-700 hover:bg-orange-100",
};

export default function HistoryTable({ deliveries }: HistoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b p-5">
        <h2 className="font-semibold">Delivery Records</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A record of your previous delivery assignments.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.id}</TableCell>
                <TableCell>{delivery.restaurant}</TableCell>
                <TableCell>{delivery.customer}</TableCell>
                <TableCell className="text-muted-foreground">
                  {delivery.date}
                </TableCell>
                <TableCell className="font-medium">
                  ₹{delivery.earnings}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[delivery.status]}
                  >
                    {delivery.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No delivery records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
