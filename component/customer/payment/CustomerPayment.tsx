"use client";

import { useState } from "react";
import PaymentFilters, {
  PaymentDateFilter,
  PaymentStatusFilter,
} from "./PaymentFilter";
import PaymentStats from "./PaymentStats";
import PaymentTable, {
  CustomerPayment as CustomerPayments,
} from "./PaymentTable";
import CustomerPaymentPagination from "./CustomerPaymentPagination";

const payments: CustomerPayments[] = [
  {
    id: "trac-01",
    orderId: "od-1",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "UPI",
    amount: 250,
    status: "Paid",
  },
  {
    id: "trac-02",
    orderId: "od-2",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "Cash on delivery",
    amount: 250,
    status: "Paid",
  },
  {
    id: "trac-03",
    orderId: "od-3",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "Card",
    amount: 250,
    status: "Pending",
  },
  {
    id: "trac-04",
    orderId: "od-4",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "UPI",
    amount: 250,
    status: "Failed",
  },
  {
    id: "trac-05",
    orderId: "od-5",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "Card",
    amount: 250,
    status: "Failed",
  },
  {
    id: "trac-06",
    orderId: "od-6",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "Cash on delivery",
    amount: 250,
    status: "Paid",
  },
  {
    id: "trac-07",
    orderId: "od-7",
    restaurant: "Burger King",
    date: "2026-08-10",
    paymentMethod: "UPI",
    amount: 250,
    status: "Refunded",
  },
  {
    id: "trac-08",
    orderId: "od-8",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "Cash on delivery",
    amount: 250,
    status: "Refunded",
  },
  {
    id: "trac-09",
    orderId: "od-9",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "Card",
    amount: 250,
    status: "Refunded",
  },
  {
    id: "trac-10",
    orderId: "od-10",
    restaurant: "Burger King",
    date: "2026-11-10",
    paymentMethod: "UPI",
    amount: 250,
    status: "Paid",
  },
];

const payment_per_page = 5;

const totalPayment = payments.length;

export default function CustomerPayment() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PaymentStatusFilter>("All");
  const [dateRange, setDateRange] = useState<PaymentDateFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(payment_per_page);

  const searchValue = search.toLowerCase().trim();
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const matchingPayments = payments.filter((payment) => {
    const matchedStatus = status === "All" || payment.status === status;

    const matchedSearch =
      payment.id.toLowerCase().includes(searchValue) ||
      payment.orderId.toLowerCase().includes(searchValue) ||
      payment.restaurant.toLowerCase().includes(searchValue) ||
      payment.paymentMethod.toLowerCase().includes(searchValue);

    return matchedSearch && matchedStatus;
  });

  const filteredPayments = matchingPayments.filter((payment) => {
    if (dateRange === "all") return true;
    const [year, month, day] = payment.date.split("-").map(Number);
    const orderDate = new Date(year, month - 1, day);
    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - Number(dateRange) + 1);

    return orderDate >= startDate && orderDate <= today;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;

  const pagePayment = filteredPayments.slice(startIndex, startIndex + pageSize);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: PaymentStatusFilter) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value: PaymentDateFilter) => {
    setDateRange(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-muted-foreground">Payments</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Track your payment history,refunds and recent transactions
        </p>
      </div>
      <PaymentStats />
      <div className="space-y-5">
        <PaymentFilters
          search={search}
          status={status}
          dateRange={dateRange}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onDateChange={handleDateChange}
        />
        <PaymentTable
          payments={pagePayment}
          totalPayments={filteredPayments.length}
        />
        <CustomerPaymentPagination
          currentPage={currentPage}
          totalItems={filteredPayments.length}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
