import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

type OrderSummaryProps = {
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  tax: number;
  onCheckout: () => void;
  disable?: boolean;
};

export default function OrderSummary({
  subtotal,
  deliveryFee,
  platformFee,
  tax,
  onCheckout,
  disable = false,
}: OrderSummaryProps) {
  const total = subtotal + deliveryFee + platformFee + tax;

  return (
    <section className="space-y-5 rounded-xl border bg-card p-5 transition duration-1000 hover:-translate-y-1 shadow-sm hover:shadow-xl">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Item subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="font-medium">₹{deliveryFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">PlateForm Fee</span>
          <span className="font-medium">₹{platformFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">₹{tax}</span>
        </div>
      </div>
      <div className="border-t border-dashed" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Total</span>
        <span className="font-medium">₹{total}</span>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          onClick={onCheckout}
          disabled={disable || subtotal <= 0}
          className="flex items-center justify-end hover:cursor-pointer"
        >
          Proceed to Payment
          <ArrowRight />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-bold">
        <ShieldCheck size={15} className="text-green-600" />
        Secure checkout
      </div>
    </section>
  );
}
