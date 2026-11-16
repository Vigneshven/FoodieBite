import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RestaurantOrderItem } from "../types";

type OrderItemsProps = {
  items: RestaurantOrderItem[];
};

export default function OrderItems({ items }: OrderItemsProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
        <p className="text-sm text-muted-foreground">
          {items.length} different dishes in this order
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{item.name}</h3>

                <p className="text-sm text-muted-foreground">{item.category}</p>

                <p className="text-sm text-muted-foreground">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
              <p className="font-semibold sm:text-right">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            {index !== items.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
        <Separator />
        <div className="flex items-center justify-between">
          <p className="font-medium">Items Subtotal</p>
          <p className="text-lg font-bold">₹{subtotal}</p>
        </div>
      </CardContent>
    </Card>
  );
}
