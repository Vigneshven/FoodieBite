import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import CartQuantityControl from "./CartQuantityControl";

export type CartItem = {
  id: string;
  dishId: string;
  name: string;
  restaurantName: string;
  image: string;
  Price: number;
  Quantity: number;
  size?: string;
  extra?: string[];
};

type CartItemCardProps = {
  item: CartItem;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  disabled?: boolean;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  disabled = false,
}: CartItemCardProps) {
  const itemTotal = item.Price * item.Quantity;
  return (
    <div className="flex gap-4 rounded-xl border bg-card p-4 transition duration-1000 hover:-translate-y-1 shadow-sm hover:shadow-xl">
      <div className="relative size-24 shrink-0 rounded-lg bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition duration-1000 hover:scale-110 rounded-lg"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {item.restaurantName}
            </p>
            {item.size && (
              <p className="mt-1 text-xs text-muted-foreground">{item.size}</p>
            )}
          </div>
          <Button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={disabled}
            className="rounded-md p-2 text-muted-foreground transition duration-1000 hover:scale-110"
          >
            <Trash2 size={17} />
          </Button>
        </div>
        {item.extra && item.extra.length > 0 && (
          <p className="text-xs font-bold text-muted-foreground">
            {item.extra}
          </p>
        )}
        <div className="flex items-center justify-between gap-3 pt-2">
          <CartQuantityControl
            quantity={item.Quantity}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
            min={1}
            max={100}
            disable={disabled}
          />
          <p className="font-semibold">₹{itemTotal}</p>
        </div>
      </div>
    </div>
  );
}
