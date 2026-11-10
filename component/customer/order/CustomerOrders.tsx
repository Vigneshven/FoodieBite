"use client"

import OrderFilters from "./OrderFilters";

export default function CustomerOrders() {
  return (
    <div>
      <div>
        <h1>My Orders</h1>
        <p>Track,manage and review all your food orders</p>
      </div>
      <div>
        <OrderFilters />
      </div>
    </div>
  );
}
