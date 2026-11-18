"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerPagination from "./CustomerPagination";
import { Customer } from "@/api/admin/type/admin/types-api";
import type { CustomerStatusFilter } from "./CustomerFilters";
import { useState } from "react";
import {
  fetchCustomerStats,
  updateCustomerStatus,
} from "@/api/admin/customer/api";
import { toast } from "sonner";
import { useCustomerStore } from "@/store/admin/customerStore";

const statusStyles = {
  active: "bg-green-100 text-green-700 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-700 hover:bg-gray-100",
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
  customers: Customer[];
  activeStatus: CustomerStatusFilter;
  loading: boolean;
  totalItems: number;
  onTotalItemsChange: (total: number) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function CustomerTable({
  customers,
  activeStatus,
  loading,
  totalItems,
  onTotalItemsChange,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: CustomersTableProps) {
  const [updateId, setUpdateId] = useState<string | null>(null);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);
  const setStats = useCustomerStore((state) => state.setStats);
  const removeCustomer = useCustomerStore((state) => state.removeCustomer);
  async function handleStatusChange(id: string, status: "active" | "inactive") {
    const newStatus = status === "active" ? "inactive" : "active";
    try {
      setUpdateId(id);

      await updateCustomerStatus(id, newStatus);
      toast.success("Customer status updated successfully");
      const Stats = await fetchCustomerStats();
      setStats(Stats);
      if (activeStatus !== "All") {
        removeCustomer(id);
        onTotalItemsChange(Math.max(0, totalItems - 1));
      } else {
        updateCustomer(id, newStatus);
      }
    } catch {
      toast.error("failed to update status");
    } finally {
      setUpdateId(null);
    }
  }

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  loading customers...
                </TableCell>
              </TableRow>
            ) : customers.length > 0 ? (
              customers.map((customer) => (
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
                    {customer.totalSpend}
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
                        <DropdownMenuItem
                          disabled={updateId === customer.id}
                          onClick={() =>
                            handleStatusChange(customer.id, customer.status)
                          }
                        >
                          {customer.status === "active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate Customer
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate Customer
                            </>
                          )}
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
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
