"use client";
import { useState } from "react";
import OrderFilters, {
  OrderDateFilter,
  OrderStatusFilter,
} from "./OrderFilters";
import OrderTable, { CustomerOrder } from "./OrdersTable";
import { CheckCircle2, Clock, Package, ShoppingBag } from "lucide-react";
import CustomerOrderPagination from "./CustomerOrderPagination";

const orders: CustomerOrder[] = [
  {
    id: "OR-01",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-11-11",
    amount: 280,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "OR-02",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-11-11",
    amount: 1000,
    status: "Out for Delivery",
    paymentStatus: "Paid",
  },
  {
    id: "OR-03",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-11-11",
    amount: 700,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "OR-04",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-11-10",
    amount: 120,
    status: "Pending",
    paymentStatus: "Failed",
  },
  {
    id: "OR-05",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-11-11",
    amount: 300,
    status: "Preparing",
    paymentStatus: "Pending",
  },
  {
    id: "OR-06",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-11-11",
    amount: 280,
    status: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "OR-07",
    restaurant: "Burger King",
    items: "Burger",
    date: "2026-08-11",
    amount: 280,
    status: "Cancelled",
    paymentStatus: "Refunded",
  },
];

const order_per_page = 5;

const totalOrder = orders.length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered",
).length;

const activeOrders = orders.filter((order) =>
  ["Preparing", "Out for Delivery", "Confirmed", "Pending"].includes(
    order.status,
  ),
).length;

const totalSpend = orders
  .filter((orders) => orders.paymentStatus === "Paid")
  .reduce((total, order) => total + order.amount, 0);

const summaryCards = [
  {
    title: "Total Orders",
    value: totalOrder,
    icon: ShoppingBag,
    style: "bg-orange-100 text-orange-600",
    description: "All orders placed",
  },
  {
    title: "Delivered",
    value: deliveredOrders,
    icon: CheckCircle2,
    style: "bg-green-100 text-green-600",
    description: "Successfully Delivered",
  },
  {
    title: "Active Orders",
    value: activeOrders,
    icon: Clock,
    style: "bg-blue-100 text-blue-600",
    description: "Currently processing",
  },
  {
    title: "Total Spends",
    value: `₹${totalSpend}`,
    icon: Package,
    style: "bg-orange-100 text-orange-600",
    description: "Successfull Payments",
  },
];

export default function CustomerOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatusFilter>("All");
  const [dateRange, setDateRange] = useState<OrderDateFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(order_per_page);

  const searchValue = search.toLowerCase().trim();
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const matchingOrders = orders.filter((order) => {
    const matchedStatus = status === "All" || order.status === status;

    const matchedSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.restaurant.toLowerCase().includes(searchValue) ||
      order.items.toLowerCase().includes(searchValue) ||
      order.paymentStatus.toLowerCase().includes(searchValue);

    return matchedSearch && matchedStatus;
  });

  const filteredOrders = matchingOrders.filter((order) => {
    if (dateRange === "all") return true;

    const [year, month, day] = order.date.split("-").map(Number);
    const orderDate = new Date(year, month - 1, day);
    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - Number(dateRange) + 1);

    return orderDate >= startDate && orderDate <= today;
  });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;

  const pageOrder = filteredOrders.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: OrderStatusFilter) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value: OrderDateFilter) => {
    setDateRange(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start gap-1 tracking-tight">
        <h1 className="text-sm font-bold text-muted-foreground">My Orders</h1>
        <p className="text-sm font-bold text-muted-foreground">
          Track,manage and review all your food orders
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground">
                    {card.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{card.value}</h2>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.style}`}
                >
                  <Icon size={23} />
                </div>
              </div>
              <p className="text-xs font-bold text-muted-foreground">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="space-y-5">
        <OrderFilters
          search={search}
          status={status}
          dateRange={dateRange}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onDateChange={handleDateChange}
        />
        <OrderTable orders={pageOrder} totalOrders={filteredOrders.length} />
        <CustomerOrderPagination
          currentPage={currentPage}
          totalItems={filteredOrders.length}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
