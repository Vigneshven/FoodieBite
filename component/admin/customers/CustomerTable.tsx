import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerSortsOption, CustomerStatusFilter } from "./CustomerFilters";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerPagination from "./CustomerPagination";

type CustomerStatus = "Active" | "Inactive";

type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  status: CustomerStatus;
  joinDate: string;
};

const customers: Customer[] = [
  {
    id: "#C-1",
    name: "test1",
    email: "test1@gmail.com",
    orders: 10,
    totalSpent: 6000,
    status: "Active",
    joinDate: "2026-01-10",
  },
  {
    id: "#C-2",
    name: "test2",
    email: "test2@gmail.com",
    orders: 5,
    totalSpent: 1000,
    status: "Active",
    joinDate: "2026-07-10",
  },
  {
    id: "#C-3",
    name: "test3",
    email: "test3@gmail.com",
    orders: 7,
    totalSpent: 3000,
    status: "Inactive",
    joinDate: "2026-04-10",
  },
  {
    id: "#C-4",
    name: "test4",
    email: "test4@gmail.com",
    orders: 3,
    totalSpent: 3460,
    status: "Active",
    joinDate: "2026-09-10",
  },
  {
    id: "#C-5",
    name: "test5",
    email: "test5@gmail.com",
    orders: 8,
    totalSpent: 400,
    status: "Active",
    joinDate: "2026-04-10",
  },
  {
    id: "#C-6",
    name: "test6",
    email: "test6@gmail.com",
    orders: 4,
    totalSpent: 679,
    status: "Inactive",
    joinDate: "2026-02-10",
  },
  {
    id: "#C-7",
    name: "test7",
    email: "test7@gmail.com",
    orders: 7,
    totalSpent: 450,
    status: "Active",
    joinDate: "2026-10-10",
  },
];

const statusStyles: Record<CustomerStatus, string> = {
  Active: "bg-green-100 text-green-700 hover:bg-green-100",
  Inactive: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

function formatJoinDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type CustomersTableProps = {
  activeStatus: CustomerStatusFilter;
  search: string;
  sortBy: CustomerSortsOption;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function CustomerTable({
  activeStatus,
  search,
  sortBy,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: CustomersTableProps) {
  const searchText = search.toLowerCase().trim();

  const filteredCustomers = customers.filter((customer) => {
    const matchedStatus =
      activeStatus === "All" || customer.status === activeStatus;

    const matchedSearch =
      customer.id.toLowerCase().includes(searchText) ||
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText);

    return matchedStatus && matchedSearch;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);

      case "orders":
        return b.orders - a.orders;

      case "spent":
        return b.totalSpent - a.totalSpent;

      case "newest":
      default:
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    }
  });

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedCustomers = sortedCustomers.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">All Customers</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage customers on your platform.
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell className="font-medium">
                    <div>{customer.name}</div>
                  </TableCell>

                  <TableCell className="text-sm font-medium">
                    <div>{customer.email}</div>
                  </TableCell>

                  <TableCell className="text-sm font-medium">
                    {customer.orders}
                  </TableCell>

                  <TableCell className="text-sm font-medium">
                    {customer.totalSpent}
                  </TableCell>

                  <TableCell className="text-sm font-medium">
                    <Badge
                      variant="outline"
                      className={statusStyles[customer.status]}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatJoinDate(customer.joinDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button size="icon" variant="ghost" />}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Detials
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Customer
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
                  No Customer Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomerPagination
        currentPage={currentPage}
        totalItems={sortedCustomers.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
