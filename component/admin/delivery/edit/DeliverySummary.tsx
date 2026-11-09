import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, ShoppingBag, CreditCard, Truck } from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Bucket biryani",
    quantity: 2,
    price: 180,
  },
];

const subtotal = orderItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);

const deliveryFee = 30;
const discount = 50;
const tax = 35;
const total = subtotal + deliveryFee + tax - discount;

export default function DeliverySummary() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg p-2">
            <Receipt className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Delivery Summary</CardTitle>
            <CardDescription className="mt-1">
              Review order items and payment details.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Ordered Items</h3>
          <Badge variant="secondary">{orderItems.length} Items</Badge>
        </div>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description} x {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <h3 className="mb-3 text-sm font-semibold">Payment Details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                Delivery Fee
              </span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>₹{tax}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <span className="font-semibold">Total Amount</span>
          <span className="text-xl font-bold">₹{total}</span>
        </div>
        <div className="flex items-center justify-between gap-3 border-t pt-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Payment Method</p>
              <p className="text-xs text-muted-foreground">UPI</p>
            </div>
          </div>

          <Badge variant="default">Paid</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
