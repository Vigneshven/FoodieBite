// order information types
export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Picked Up"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed";

export type DeliveryPriority = "Normal" | "High" | "Urgent";

export type OrderInformationData = {
  restaurants: string;
  status: OrderStatus;
  priority: DeliveryPriority;
};

// deliveryassignment types

export type DeliveryPartnerStatus = "Available" | "On Delivery" | "Offline";

export type DeliveryAssignmentData = {
  partnerId: string | null;
  vehicleType: string;
  vehicleNumber: string;
};

// delivery address

export type DeliveryAddressData = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  landmark: string;
  phone: string;
  specialInstructions: string;
};

// delivery notes

export type DeliveryNotesData = {
  reassignmentReason: string;
  adminNotes: string;
  partnerInstructions: string;
};

// delivery summary

export type DeliveryOrderItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export type DeliverySummaryData = {
  items: DeliveryOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
};
