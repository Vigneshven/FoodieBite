"use client";

import Link from "next/link";
import { Eye, MessageSquare } from "lucide-react";

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

import type {
  QueryStatus,
  QueryCategory,
  QueryPriority,
  QueryDateRange,
} from "./QueryFilters";
import QueryPagination from "./QueriesPagination";

type Query = {
  id: string;
  customer: string;
  email: string;
  subject: string;
  category: Exclude<QueryCategory, "All">;
  priority: Exclude<QueryPriority, "All">;
  status: Exclude<QueryStatus, "All">;
  createdAt: string;
  orderId?: string;
};

const queries: Query[] = [
  {
    id: "QRY-1",
    customer: "test1",
    email: "test1@example.com",
    subject: "Payment deducted twice",
    category: "Payment",
    priority: "High",
    status: "Open",
    createdAt: "2026-11-09",
    orderId: "ORD-1",
  },
  {
    id: "QRY-2",
    customer: "test2",
    email: "test2@example.com",
    subject: "Order not delivered",
    category: "Delivery",
    priority: "Urgent",
    status: "In Progress",
    createdAt: "2026-11-09",
    orderId: "ORD-2",
  },
  {
    id: "QRY-3",
    customer: "test3",
    email: "test3@example.com",
    subject: "Restaurant account issue",
    category: "Restaurant",
    priority: "Medium",
    status: "Pending",
    createdAt: "2026-11-08",
  },
  {
    id: "QRY-4",
    customer: "test4",
    email: "test4@example.com",
    subject: "Refund not received",
    category: "Refund",
    priority: "High",
    status: "Resolved",
    createdAt: "2026-11-08",
    orderId: "ORD-4",
  },
  {
    id: "QRY-5",
    customer: "test5",
    email: "test5@example.com",
    subject: "Unable to login",
    category: "Account",
    priority: "Low",
    status: "Closed",
    createdAt: "2026-11-07",
  },
  {
    id: "QRY-6",
    customer: "test6",
    email: "test6@example.com",
    subject: "Order cancellation request",
    category: "Order",
    priority: "Medium",
    status: "Open",
    createdAt: "2026-11-06",
    orderId: "ORD-6",
  },
  {
    id: "QRY-7",
    customer: "test7",
    email: "test7@example.com",
    subject: "Incorrect food item received",
    category: "Order",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-11-05",
    orderId: "ORD-7",
  },
  {
    id: "QRY-8",
    customer: "test8",
    email: "test8@example.com",
    subject: "General account enquiry",
    category: "Other",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-10-25",
  },
];

type QueriesTableProps = {
  activeStatus: QueryStatus;
  search: string;
  category: QueryCategory;
  priority: QueryPriority;
  dateRange: QueryDateRange;

  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

function getStatusClass(status: Query["status"]) {
  switch (status) {
    case "Open":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "Pending":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "In Progress":
      return "border-violet-200 bg-violet-50 text-violet-700";

    case "Resolved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "Closed":
      return "border-slate-200 bg-slate-100 text-slate-600";
  }
}

function getPriorityClass(priority: Query["priority"]) {
  switch (priority) {
    case "Urgent":
      return "border-red-200 bg-red-50 text-red-700";

    case "High":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "Medium":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "Low":
      return "border-slate-200 bg-slate-100 text-slate-600";
  }
}

function matchesDateRange(date: string, range: QueryDateRange) {
  if (range === "all") return true;

  const queryDate = new Date(date);
  const today = new Date();

  if (range === "today") {
    return queryDate.toDateString() === today.toDateString();
  }

  const days = Number(range);
  const startDate = new Date();
  startDate.setDate(today.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  return queryDate >= startDate && queryDate <= today;
}

export default function QueriesTable({
  activeStatus,
  search,
  category,
  priority,
  dateRange,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: QueriesTableProps) {
  const filteredQueries = queries.filter((query) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      query.id.toLowerCase().includes(searchValue) ||
      query.customer.toLowerCase().includes(searchValue) ||
      query.email.toLowerCase().includes(searchValue) ||
      query.subject.toLowerCase().includes(searchValue);

    const matchesStatus =
      activeStatus === "All" || query.status === activeStatus;

    const matchesCategory = category === "All" || query.category === category;

    const matchesPriority = priority === "All" || query.priority === priority;

    const matchesDate = matchesDateRange(query.createdAt, dateRange);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesPriority &&
      matchesDate
    );
  });

  const totalItems = filteredQueries.length;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedQueries = filteredQueries.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex flex-col gap-1 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold tracking-tight">All Queries</h2>
          <p className="text-sm text-muted-foreground">
            View and manage customer support requests.
          </p>
        </div>

        <Badge variant="secondary">{filteredQueries.length} Queries</Badge>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Query ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredQueries.length > 0 ? (
              paginatedQueries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell className="font-medium">{query.id}</TableCell>

                  <TableCell>
                    <div className="min-w-37.5 space-y-1">
                      <p className="font-medium">{query.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {query.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="min-w-45">
                      <p className="font-medium">{query.subject}</p>
                      {query.orderId && (
                        <p className="text-xs text-muted-foreground">
                          Order #{query.orderId}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{query.category}</span>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getPriorityClass(query.priority)}
                    >
                      {query.priority}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusClass(query.status)}
                    >
                      {query.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(query.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Link href={`/admin/queries/${query.id}`}>
                        <Eye className="mr-2 size-4" />
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare className="size-8 text-muted-foreground" />

                    <p className="font-medium">No queries found</p>

                    <p className="text-sm text-muted-foreground">
                      Try changing your search or filter options.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <QueryPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
