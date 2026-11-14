"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import CartItemCard, { CartItem } from "./CartItemCard";

interface CartItemListProps {
  items: CartItem[];
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  disabled?: boolean;
}

export default function CartItemList({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  disabled = false,
}: CartItemListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </div>

        <h2 className="text-lg font-semibold">Your cart is empty</h2>

        <Link
          href="/customer"
          className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Explore Restaurants
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Items</h2>

        <span className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "Dish" : "Dishes"}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}
