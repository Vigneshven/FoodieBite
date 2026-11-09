import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { DeliverySummaryData } from "./types/deliveryFormTypes";
import { Separator } from "@/components/ui/separator";

type DeliverySummaryProps = {
  summary: DeliverySummaryData;
};

export default function DeliverySummary({ summary }: DeliverySummaryProps) {
  const total =
    summary.subtotal + summary.deliveryFee + summary.tax - summary.discount;

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <CardTitle>Order Summary</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          {summary.items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(summary.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span>{formatPrice(summary.deliveryFee)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-green-600">
              -{formatPrice(summary.discount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatPrice(summary.tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between font-semibold">
          <span>Total Amount</span>
          <span className="text-lg">{formatPrice(total)}</span>
        </div>

        <div className="space-y-3 rounded-lg bg-muted/40 p-3">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Payment Method</span>
            <span className="ml-auto font-medium">{summary.paymentMethod}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Receipt className="h-4 w-4" />
              Payment Status
            </span>

            <Badge
              variant={
                summary.paymentStatus === "Paid" ? "default" : "secondary"
              }
            >
              {summary.paymentStatus}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
