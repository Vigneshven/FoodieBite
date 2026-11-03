import { OrderStatusFilter } from "./OrderFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

type Order = {
  id: string;
  customer: string;
  email: string;
  restaurant: string;
  amount: number;
  payment: string;
  status: OrderStatus;
  date: string;
};

const orders: Order[] = [
  {
    id: "#ORD-1",
    customer: "viki",
    email: "viki13@gmail.com",
    restaurant: "Pizza Hunt",
    amount: 400,
    payment: "UPI",
    status: "Delivered",
    date: "03 Nov 2026",
  },
  {
    id: "#ORD-2",
    customer: "test2",
    email: "test2@gmail.com",
    restaurant: "Pizza Spicy",
    amount: 300,
    payment: "Card",
    status: "Preparing",
    date: "03 Nov 2026",
  },
  {
    id: "#ORD-3",
    customer: "test3",
    email: "test3@gmail.com",
    restaurant: "kitchen hunt",
    amount: 200,
    payment: "Cash",
    status: "Pending",
    date: "01 Nov 2026",
  },
  {
    id: "#ORD-4",
    customer: "test4",
    email: "test4@gmail.com",
    restaurant: "Pizza Palace",
    amount: 1000,
    payment: "UPI",
    status: "Out for Delivery",
    date: "03 Nov 2026",
  },
  {
    id: "#ORD-5",
    customer: "test5",
    email: "test5@gmail.com",
    restaurant: "Burgur king",
    amount: 400,
    payment: "Card",
    status: "Cancelled",
    date: "03 Nov 2026",
  },
  {
    id: "#ORD-6",
    customer: "test6",
    email: "test6@gmail.com",
    restaurant: "Spicy Kitchen",
    amount: 780,
    payment: "UPI",
    status: "Delivered",
    date: "01 Nov 2026",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  Pending: "border-yellow-200 bg-yellow-50 text-yellow-700",
  Preparing: "border-orange-200 bg-orange-50 text-orange-700",
  "Out for Delivery": "border-blue-200 bg-blue-50 text-blue-700",
  Delivered: "border-green-200 bg-green-50 text-green-700",
  Cancelled: "border-red-200 bg-red-50 text-red-700",
};

type OrdersTableProps = {
  activeStatus: OrderStatusFilter;
  search: string;
};

export default function OrdersTable({
  activeStatus,
  search,
}: OrdersTableProps) {
  const filteredOrders = orders.filter((order) => {
    const matchedStatus =
      activeStatus === "All" || order.status === activeStatus;

    const searchText = search.toLowerCase().trim();

    const matchedSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.email.toLowerCase().includes(searchText) ||
      order.restaurant.toLowerCase().includes(searchText);

    return matchedStatus && matchedSearch;
  });
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View and Manage all customer order
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-xs text-muted-foreground font-bold">
                      {order.email}
                    </div>
                  </TableCell>
                  <TableCell>{order.restaurant}</TableCell>
                  <TableCell className="font-medium">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-bold">{order.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Order Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
