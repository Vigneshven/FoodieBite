import CustomerInformation from "@/component/admin/delivery/details/CustomerInformation";
import DeliveryOverview from "@/component/admin/delivery/details/DeliveryOverview";
import DeliveryPartnerInformation from "@/component/admin/delivery/details/DeliveryPartnerInformation";
import DeliveryTimeline from "@/component/admin/delivery/details/DeliveryTimeline";
import OrderSummary from "@/component/admin/delivery/details/OrderSummary";
import RestaurantInformation from "@/component/admin/delivery/details/RestaurantInformation";
import {
  Bike,
  CheckCircle2,
  Package,
  PackageCheck,
  Store,
  UserCheck,
} from "lucide-react";

type DeliverDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const customer = {
  name: "test1",
  email: "test1@gmail.com",
  phone: "+91 12345 67890",
  address: "vellore",
  customerType: "VIP",
};

const restaurant = {
  name: "Pizza Palace",
  cuisine: "Italian, Pizza",
  phone: "+91 98765 12345",
  address: "10,New Street, Vellore, Tamil Nadu - 632002",
  status: "Active" as const,
};

const partner = {
  name: "test2",
  email: "test2@gmail.com",
  phone: "+91 12345 56785",
  vehicle: "Motorcycle",
  vehicleNo: "TN23 BA1366",
  rating: 4.5,
  totalDeliveries: 10,
  joinedDate: "Jan 12, 2026",
  status: "On Delivery",
};

const orderItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Medium · Extra cheese",
    quantity: 2,
    price: 180,
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Regular · Spicy",
    quantity: 1,
    price: 150,
  },
  {
    id: 3,
    name: "Cold Coffee",
    description: "Large",
    quantity: 2,
    price: 90,
  },
];

const timelineEvents = [
  {
    id: 1,
    title: "Order Placed",
    description: "Customer successfully placed the order.",
    timestamp: "November 05, 2026 · 03:10 PM",
    completed: true,
    icon: Package,
  },
  {
    id: 2,
    title: "Restaurant Confirmed",
    description: "Pizza Palace accepted the order.",
    timestamp: "November 05, 2026 · 03:12 PM",
    completed: true,
    icon: Store,
  },
  {
    id: 3,
    title: "Delivery Partner Assigned",
    description: "test3 was assigned to this order.",
    timestamp: "November 05, 2026 · 03:18 PM",
    completed: true,
    icon: UserCheck,
  },
  {
    id: 4,
    title: "Order Picked Up",
    description: "test3 collected the order from the restaurant.",
    timestamp: "November 05, 2026 · 03:25 PM",
    completed: true,
    icon: PackageCheck,
  },
  {
    id: 5,
    title: "Out for Delivery",
    description: "The order is on its way to the customer.",
    timestamp: "November 05, 2026 · 03:30 PM",
    completed: true,
    icon: Bike,
  },
  {
    id: 6,
    title: "Delivered",
    description: "Order successfully delivered to test2.",
    timestamp: "November 05, 2026 · 03:42 PM",
    completed: true,
    icon: CheckCircle2,
  },
];

export default async function DeliverDetailsPage({
  params,
}: DeliverDetailsPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6 p-4 shadow-sm">
      <DeliveryOverview orderId={id} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerInformation customer={customer} />
        <RestaurantInformation restaurant={restaurant} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DeliveryPartnerInformation partner={partner} />
        <OrderSummary
          items={orderItems}
          subtotal={690}
          deliveryFee={30}
          discount={50}
          tax={35}
          paymentMethod="UPI"
          paymentStatus="Paid"
        />
      </div>
      <DeliveryTimeline events={timelineEvents} />
    </div>
  );
}
