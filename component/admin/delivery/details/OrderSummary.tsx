import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Receipt, ShoppingBag, Tag } from "lucide-react";

export type OrderItem = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export type OrderSummaryProps = {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
};

export default function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  discount,
  tax,
  paymentMethod,
  paymentStatus,
}: OrderSummaryProps) {
  const total = subtotal + deliveryFee + tax - discount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Ordered Items and payment details</CardDescription>
          </div>
          <Receipt className="size-5 text-muted-foreground font-bold" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-muted-foreground font-bold" />
            <h3 className="text-sm font-semibold">
              Ordered Items ({items.length})
            </h3>
          </div>
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-bold text-muted-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground">
                    Qty : {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))
          ) : (
            <p className="shrink-0 text-sm font-semibold text-muted-foreground">
              No order items available
            </p>
          )}
        </div>
        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Payment Details</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-bold">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-bold">
              Delivery Fee
            </span>
            <span className="font-medium">{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-bold">
              <Tag className="size-3 text-red-500" />
              Discount
            </span>
            <span className="font-medium text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-bold">Tax</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>

          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-bold">
              Total Amount
            </span>
            <span className="text-xl font-medium">{formatPrice(total)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center">
              <CreditCard className="size-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">
                Payment Method
              </p>
              <p className="text-sm font-medium">{paymentMethod}</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={
              paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : paymentStatus === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
            }
          >
            {paymentStatus}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
