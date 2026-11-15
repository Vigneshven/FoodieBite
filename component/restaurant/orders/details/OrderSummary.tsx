import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, IndianRupee, ShoppingBag, Wallet } from "lucide-react";

export type OrderSummaryProps = {
  totalAmount: number;
  totalItems: number;
  paymentMethod: "Online" | "Cash on Delivery";
  paymentStatus: "Paid" | "Pending" | "Failed";
};

const paymentStatusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

export default function OrderSummary({
  totalAmount,
  totalItems,
  paymentMethod,
  paymentStatus,
}: OrderSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Order Amount
          </CardTitle>

          <IndianRupee className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹{totalAmount}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Total payable amount
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Items
          </CardTitle>

          <ShoppingBag className="size-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-bold">{totalItems}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Items in this order
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Payment Method
          </CardTitle>

          {paymentMethod === "Online" ? (
            <CreditCard className="size-5 text-muted-foreground" />
          ) : (
            <Wallet className="size-5 text-muted-foreground" />
          )}
        </CardHeader>

        <CardContent>
          <p className="text-lg font-semibold">{paymentMethod}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Customer payment method
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Payment Status
          </CardTitle>

          <CreditCard className="size-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <Badge className={`${paymentStatusStyles[paymentStatus]} border-0`}>
            {paymentStatus}
          </Badge>

          <p className="mt-2 text-xs text-muted-foreground">
            Current payment status
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
