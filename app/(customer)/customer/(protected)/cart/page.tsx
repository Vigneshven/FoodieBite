"use client";

import CartHeader from "@/component/customer/cart/CartHeader";
import { CartItem } from "@/component/customer/cart/CartItemCard";
import { useState } from "react";
import CartItemList from "@/component/customer/cart/CartItemList";
import DeliveryAddressSummary, {
  DeliveryAddress,
} from "@/component/customer/cart/DeliveryAddressSummary";
import OrderSummary from "@/component/customer/cart/OrderSummary";
import { useRouter } from "next/navigation";

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
    image:
      "https://images.pexels.com/photos/35287413/pexels-photo-35287413.jpeg",
    Price: 150,
    Quantity: 1,
    size: "Regular",
    extra: ["Extra rice"],
  },
];

const selectedAddress: DeliveryAddress = {
  id: "1",
  fullName: "vignesh",
  phone: "+91 12345 67890",
  type: "home",
  address: "126,New Street",
  area: "Vellore",
  city: "Vellore",
  state: "Tamilnadu",
  postalCode: "632002",
  landmark: "Near Blue Cinema",
  isDefault: true,
};

export default function CartPage() {
  const router = useRouter();
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

  const itemsCount = cartItems.reduce(
    (total, item) => total + item.Quantity,
    0,
  );

  const handleCartClear = () => {
    setCartItems([]);
  };

  return (
    <div className="space-y-5">
      <CartHeader itemsCount={itemsCount} onClearCart={handleCartClear} />
      <div className="grid grid-cols-2 gap-2">
        <CartItemList
          items={cartItems}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeCartItem}
        />
        <div>
          <DeliveryAddressSummary address={selectedAddress} />
          <OrderSummary
            subtotal={100}
            deliveryFee={10}
            platformFee={5}
            tax={100}
            onCheckout={() => router.push(`/customer/payments`)}
          />
        </div>
      </div>
    </div>
  );
}
