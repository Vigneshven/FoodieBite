import type { OrderStatus, PaymentStatus } from "./OrderFilters";

export type RestaurantOrderStatus = OrderStatus;
export type RestaurantPaymentMethod = "Online" | "Cash on Delivery";

export type RestaurantOrderItem = {
  id: string;
  name: string;
  image?: string;
  category: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
};

export type RestaurantOrderCustomer = {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  deliveryInstructions?: string;
};

export type RestaurantOrderPayment = {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount?: number;
};

export type RestaurantOrderTimeline = Partial<
  Record<RestaurantOrderStatus, string>
>;

export type RestaurantOrder = {
  id: string;
  customer: string;
  amount: number;
  totalItems: number;
  paymentMethod: RestaurantPaymentMethod;
  paymentStatus: PaymentStatus;
  status: RestaurantOrderStatus;
  date: string;
  items: RestaurantOrderItem[];
  customerDetails: RestaurantOrderCustomer;
  payment: RestaurantOrderPayment;
  timestamps: RestaurantOrderTimeline;
};

export type RestaurantOrderListItem = Pick<
  RestaurantOrder,
  | "id"
  | "customer"
  | "totalItems"
  | "amount"
  | "paymentMethod"
  | "paymentStatus"
  | "status"
  | "date"
> & {
  items: string[];
};
