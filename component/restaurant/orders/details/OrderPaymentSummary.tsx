import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RestaurantOrderPayment } from "../types";

export default function OrderPaymentSummary({
  subtotal,
  deliveryFee,
  tax,
  discount = 0,
}: RestaurantOrderPayment) {
  const total = subtotal + deliveryFee + tax - discount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
        <p className="text-sm text-muted-foreground">
          Details of the order payment
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="font-medium">₹{deliveryFee}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">₹{tax}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-green-600">-₹{discount}</span>
          </div>
        )}
        <Separator />
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total Amount</span>
          <span className="text-xl font-bold">₹{total}</span>
        </div>
      </CardContent>
    </Card>
  );
}
