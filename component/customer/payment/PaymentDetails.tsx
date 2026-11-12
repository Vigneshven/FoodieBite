import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Download,
  MapPin,
  Receipt,
  Store,
} from "lucide-react";
import Link from "next/link";
import PaymentStatusBadge from "./PaymentStatusBadge";
import RefundDetails from "./RefundDetails";

type PaymentDetailsProps = {
  transactionId: string;
};

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

const paymentData = {
  "trac-01": {
    transactionId: "TD-01",
    orderId: "OD-01",
    restaurant: "Burger King",
    restaurantAddress: "Vellore",
    paymentDate: "Nov 12,2026",
    paymentMethod: "UPI",
    paymentReference: "od@upi",
    status: "Paid" as PaymentStatus,
    items: [{ name: "Burger", qty: 1, price: 200 }],
    subTotal: 200,
    deliveryFee: 50,
    tax: 5,
    total: 255,
  },
  "trac-07": {
    transactionId: "TD-01",
    orderId: "OD-01",
    restaurant: "Burger King",
    restaurantAddress: "Vellore",
    paymentDate: "Nov 12,2026",
    paymentMethod: "UPI",
    paymentReference: "od@upi",
    status: "Refunded" as PaymentStatus,
    items: [{ name: "Burger", qty: 1, price: 200 }],
    subTotal: 200,
    deliveryFee: 50,
    tax: 5,
    total: 255,
  },
  "trac-03": {
    transactionId: "TD-01",
    orderId: "OD-01",
    restaurant: "Burger King",
    restaurantAddress: "Vellore",
    paymentDate: "Nov 12,2026",
    paymentMethod: "UPI",
    paymentReference: "od@upi",
    status: "Paid" as PaymentStatus,
    items: [{ name: "Burger", qty: 1, price: 200 }],
    subTotal: 200,
    deliveryFee: 50,
    tax: 5,
    total: 255,
  },
};

export default function PaymentDetails({ transactionId }: PaymentDetailsProps) {
  const payment = paymentData[transactionId as keyof typeof paymentData];

  if (!payment) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <Receipt
          className="inline-flex items-center justify-center mb-3 text-gray-400 "
          size={36}
        />
        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          Payment Not Found
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Cannot Find payment with this transaction ID
        </p>
        <Link
          href={`/customer/payments`}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-3"
        >
          <ArrowLeft size={16} />
          Back to Payments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div>
          <Link
            href={`/customer/payments`}
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500"
          >
            <ArrowLeft size={16} />
            Back to Payments
          </Link>
          <h1 className="text-2xl font-bold text-muted-foreground">
            Payment Details
          </h1>
          <p className="mt-1 text-sm texxt-gray-400">
            View your Transaction and payment
          </p>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="inline-flex h-11 w-40 rounded-lg items-center justify-center gap-2 px-4 text-sm font-bold text-muted-foreground hover:cursor-pointer hover:bg-orange-500 hover:text-white"
        >
          <Download size={17} />
          Download Receipt
        </Button>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-gray-500">Total Payment</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              ₹{payment.total}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Transaction ID : {payment.transactionId}
            </p>
          </div>
          <div className="flex gap-4">
            <PaymentStatusBadge status={payment.status} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Receipt size={19} className="text-orange-500" />
            <h2 className="font-medium text-gray-900">
              Transaction Information
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-gray-500">Tranction ID</p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {payment.transactionId}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Order ID : </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {payment.orderId}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Method : </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {payment.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Reference : </p>
              <p className="mt-1 text-xs font-bold text-gray-900">
                {payment.paymentReference}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Date : </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {payment.paymentDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Status</p>
              <PaymentStatusBadge status={payment.status} />
            </div>
          </div>
        </section>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Store size={19} className="text-orange-500" />
            <h2 className="font-medium text-gray-900">
              Restauarnt Information
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-gray-500">Restaurant Name</p>
              <p className="mt-1 font-medium text-gray-900">
                {payment.restaurant}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={14} />
                Location
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {payment.restaurantAddress}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays size={14} />
                Order Date
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {payment.paymentDate}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <CreditCard size={14} />
                Payment Method
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {payment.paymentMethod}
              </p>
            </div>
          </div>
        </section>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 font-semibold text-gray-900">Order Summary</h2>
          <div className="space-y-4">
            {payment.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Quantity : {item.qty}
                  </p>
                </div>
                <p className="font-medium text-gray-900">₹{item.price}</p>
              </div>
            ))}
          </div>
          <div className="my-5 border-t border-dashed border-gray-200" />
          <div className="ml-auto text-sm">
            <div className="flex justify-between text-gray-500">
              <div>
                <span>Subtotal : </span>
                <span className="font-bold text-gray-800">
                  {payment.subTotal}
                </span>
              </div>
              <div>
                <span>Delivery Fee : </span>
                <span className="font-bold text-gray-800">
                  {payment.deliveryFee}
                </span>
              </div>
              <div>
                <span>Tax : </span>
                <span className="font-bold text-gray-800">{payment.tax}</span>
              </div>
              <div>
                <span>Total Paid : </span>
                <span className="font-bold text-gray-800">{payment.total}</span>
              </div>
            </div>
          </div>
        </section>
        {payment.status === "Refunded" && (
          <RefundDetails
            refundId={"REF-01"}
            amount={290}
            status="Completed"
            requestedDate="2026-11-11"
            paymentMethod="UPI"
            refundReference="REF01@12"
          />
        )}
      </div>
    </div>
  );
}
