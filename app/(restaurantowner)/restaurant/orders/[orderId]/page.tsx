"use client";

import CustomerInformation from "@/component/restaurant/orders/details/CustomerInformation";
import OrderActions from "@/component/restaurant/orders/details/OrderActions";
import OrderDetailsHeader from "@/component/restaurant/orders/details/OrderDetailsHeader";
import OrderItems from "@/component/restaurant/orders/details/OrderItems";
import OrderPaymentSummary from "@/component/restaurant/orders/details/OrderPaymentSummary";
import OrderStatusTimeline from "@/component/restaurant/orders/details/OrderStatusTimeline";
import OrderSummary from "@/component/restaurant/orders/details/OrderSummary";
import type { RestaurantOrder } from "@/component/restaurant/orders/types";
import { useParams } from "next/navigation";

const restaurantOrders: RestaurantOrder[] = [
  {
    id: "ORD-101",
    customer: "Viki",
    amount: 650,
    totalItems: 4,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Preparing",
    date: "November 16, 2026, 12:30 PM",

    items: [
      {
        id: "item-1",
        name: "Chicken Biriyani",
        image:
          "https://images.pexels.com/photos/9738983/pexels-photo-9738983.jpeg",
        category: "Main Course",
        price: 220,
        quantity: 2,
        specialInstructions: "Less spicy",
      },
      {
        id: "item-2",
        name: "Mushroom Biriyani",
        image:
          "https://images.pexels.com/photos/35287413/pexels-photo-35287413.jpeg",
        category: "Main Course",
        price: 60,
        quantity: 2,
      },
    ],

    customerDetails: {
      name: "Viki",
      phone: "+919876543210",
      email: "viki@example.com",
      address: "12, New Street, Vellore, Tamil Nadu",
      landmark: "Near Blue Cinema",
      deliveryInstructions: "Please ring the doorbell.",
    },

    payment: {
      subtotal: 560,
      deliveryFee: 40,
      tax: 50,
      discount: 0,
    },

    timestamps: {
      New: "12:30 PM",
      Confirmed: "12:32 PM",
      Preparing: "12:35 PM",
    },
  },
];
export default function OrderDetailsPage() {
  const params = useParams<{ orderId: string }>();
  const order = restaurantOrders.find((item) => item.id === params.orderId);

  if (!order) {
    return <div className="p-6">Order not found.</div>;
  }
  return (
    <div className="space-y-6 p-6">
      <OrderDetailsHeader
        id={order.id}
        date={order.date}
        status={order.status}
      />

      <OrderSummary
        totalAmount={order.amount}
        totalItems={order.totalItems}
        paymentMethod={order.paymentMethod}
        paymentStatus={order.paymentStatus}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <OrderItems items={order.items} />

        <CustomerInformation customer={order.customerDetails} />
        <OrderPaymentSummary
          subtotal={order.payment.subtotal}
          deliveryFee={order.payment.deliveryFee}
          tax={order.payment.tax}
          discount={order.payment.discount}
        />
        <OrderStatusTimeline
          currentStatus={order.status}
          timestamps={order.timestamps}
        />
        <OrderActions
          status={order.status}
          customerPhone={order.customerDetails.phone}
          onConfirm={() => console.log("Order confirmed")}
          onStartPreparing={() => console.log("Preparation started")}
          onMarkReady={() => console.log("Order ready")}
          onComplete={() => console.log("Order completed")}
          onCancel={() => console.log("Order cancelled")}
        />
      </div>
    </div>
  );
}
