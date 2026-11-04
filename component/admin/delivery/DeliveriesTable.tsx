import { DeliveryDateFilter, DeliveryStatusFilter } from "./DeliveryFilters";

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
    orderDate: "2026-11-04",
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
};

export default function DeliveriesTable({
  activeStatus,
  search,
  dateRange,
}: DeliveriesTableProps) {
  return (
    <div>
      <div>
        <div>
          <h2>Delivery Orders</h2>
          <p>Manage and monitor delivery activities</p>
        </div>
      </div>
    </div>
  );
}
