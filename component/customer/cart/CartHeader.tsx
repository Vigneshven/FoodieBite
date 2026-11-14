import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";

type CartHeaderProps = {
  itemsCount: number;
  onClearCart: () => void;
};

export default function CartHeader({
  itemsCount,
  onClearCart,
}: CartHeaderProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <h1 className="text-2xl font-bold">My Cart</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingCart size={16} />
          {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
        </div>
        <div className="w-70 flex items-center justify-between gap-2">
          <Link href="/customer" className="text-sm font-medium">
            <ArrowLeft
              size={16}
              className="inline-flex font-bold text-muted-foreground"
            />
            Continue Shopping
          </Link>
          <Button
            type="button"
            variant="secondary"
            onClick={onClearCart}
            disabled={itemsCount === 0}
            className="transition hover:bg-white hover:text-primary cursor-pointer"
          >
            <Trash2 size={18} />
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
