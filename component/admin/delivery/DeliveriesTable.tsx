import { Badge } from "@/components/ui/badge";
import { DeliveryDateFilter, DeliveryStatusFilter } from "./DeliveryFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  Eye,
  MapPin,
  MoreHorizontal,
  Pencil,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DeliveryPagination from "./DeliveryPagination";

type DeliveryStatus = "Delivered" | "In Transit" | "Delayed" | "Cancelled";

type Delivery = {
  id: string;
  customer: string;
  email: string;
  restaurant: string;
  partner: string;
  status: DeliveryStatus;
  deliveryTime: string;
  amount: number;
  orderDate: string;
};

const deliveries: Delivery[] = [
  {
    id: "#OD-1",
    customer: "test1",
    email: "test1@gmail.com",
    restaurant: "Pizza Palace",
    partner: "test1 partner",
    status: "Delivered",
    deliveryTime: "03:35 PM",
    amount: 350,
    orderDate: "2026-11-04",
  },
  {
    id: "#OD-2",
    customer: "test2",
    email: "test2@gmail.com",
    restaurant: "Pizza Palace",
    partner: "test2 partner",
    status: "Delivered",
    deliveryTime: "03:01 PM",
    amount: 350,
    orderDate: "2026-11-04",
  },
  {
    id: "#OD-3",
    customer: "test3",
    email: "test3@gmail.com",
    restaurant: "Pizza Palace",
    partner: "test3 partner",
    status: "In Transit",
    deliveryTime: "03:35 PM",
    amount: 350,
    orderDate: "2026-11-04",
  },
  {
    id: "#OD-4",
    customer: "test4",
    email: "test4@gmail.com",
    restaurant: "Pizza Palace",
    partner: "test4 partner",
    status: "Delayed",
    deliveryTime: "03:35 PM",
    amount: 350,
    orderDate: "2026-11-04",
  },
  {
    id: "#OD-5",
    customer: "test5",
    email: "test5@gmail.com",
    restaurant: "Pizza Palace",
    partner: "test5 partner",
    status: "Delivered",
    deliveryTime: "03:35 PM",
    amount: 350,
    orderDate: "2026-11-04",
  },
  {
    id: "#OD-6",
    customer: "test6",
    email: "test6@gmail.com",
    restaurant: "Healthy Bites",
    partner: "test6 partner",
    status: "Cancelled",
    deliveryTime: "03:04 PM",
    amount: 350,
    orderDate: "2026-10-04",
  },
];

const statusStyles: Record<DeliveryStatus, string> = {
  Delivered: "bg-green-100 text-green-700 hover:bg-green-100",
  "In Transit": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Delayed: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  Cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
};

type DeliveriesTableProps = {
  activeStatus: DeliveryStatusFilter;
  search: string;
  dateRange: DeliveryDateFilter;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function DeliveriesTable({
  activeStatus,
  search,
  dateRange,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DeliveriesTableProps) {
  const searchText = search.toLowerCase().trim();

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchedStatus =
      activeStatus === "All" || delivery.status === activeStatus;

    const matchedSearch =
      delivery.id.toLowerCase().includes(searchText) ||
      delivery.customer.toLowerCase().includes(searchText) ||
      delivery.restaurant.toLowerCase().includes(searchText) ||
      delivery.partner.toLowerCase().includes(searchText);

    return matchedStatus && matchedSearch;
  });

  const dateFilterDeliveries = filteredDeliveries.filter((delivery) => {
    if (dateRange === "all") return true;

    const days = Number(dateRange);
    const orderDate = new Date(`${delivery.orderDate}`);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - days + 1);

    return orderDate >= startDate && orderDate <= today;
  });

  const totalItems = filteredDeliveries.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="font-semibold">Delivery Orders</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor delivery activities
          </p>
        </div>

        <Badge variant="secondary">{dateFilterDeliveries.length} Orders</Badge>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Delivery Partners</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Delivery Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeliveries.length > 0 ? (
              paginatedDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{delivery.customer}</p>
                      <p className="text-xs text-muted-foreground font-bold">
                        {delivery.email}
                      </p>{" "}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {delivery.restaurant}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-2 items-center justify-center rounded-full bg-muted">
                        <UserRound className="w-4 h-4" />
                        <span className="font-medium">{delivery.partner}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`font-bold text-sm ${statusStyles[delivery.status]}`}
                    >
                      {delivery.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {delivery.deliveryTime}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    ₹{delivery.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="outline" size="icon">
                            <MoreHorizontal />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPin className="mr-2 h-4 w-4" />
                          Track Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Delivery
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No Delivery orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DeliveryPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
