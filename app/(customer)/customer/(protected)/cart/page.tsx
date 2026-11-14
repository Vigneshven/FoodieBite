"use client";

import CartHeader from "@/component/customer/cart/CartHeader";
import { CartItem } from "@/component/customer/cart/CartItemCard";
import { useState } from "react";
import CartItemList from "@/component/customer/cart/CartItemList";

const inititalItems: CartItem[] = [
  {
    id: "1",
    dishId: "d-1",
    name: "veg biriyani",
    restaurantName: "A2B",
    image: "https://images.pexels.com/photos/7593267/pexels-photo-7593267.jpeg",
    Price: 200,
    Quantity: 1,
    size: "Regular",
    extra: ["Extra rice"],
  },
  {
    id: "2",
    dishId: "d-2",
    name: "mushroom biriyani",
    restaurantName: "A2B",
    image: "https://images.pexels.com/photos/35287413/pexels-photo-35287413.jpeg",
    Price: 150,
    Quantity: 1,
    size: "Regular",
    extra: ["Extra rice"],
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(inititalItems);

  const increaseQty = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.Quantity < 100
          ? { ...item, Quantity: item.Quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.Quantity > 1
          ? { ...item, Quantity: item.Quantity - 1 }
          : item,
      ),
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const itemsCount = cartItems.reduce((total, item) => total + item.Quantity, 0);

  const handleCartClear = () => {
    setCartItems([]);
  };

  return (
    <div className="space-y-5">
      <CartHeader itemsCount={itemsCount} onClearCart={handleCartClear} />
      <CartItemList
        items={cartItems}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeCartItem}
      />
    </div>
  );
}
