"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";

import OrderInformation from "./OrderInformation";
import DeliveryAssignment from "./DeliveryAssignment";
import DeliveryAddress from "./DeliveryAddress";
import DeliveryNotes from "./DeliveryNotes";
import DeliverySummary from "./DeliverySummary";
import Link from "next/link";
import { useState } from "react";
import {
  DeliveryAddressData,
  DeliveryAssignmentData,
  DeliveryNotesData,
  DeliverySummaryData,
  OrderInformationData,
} from "./types/deliveryFormTypes";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const deliverySchema = z.object({
  orderInfo: z.object({
    restaurant: z.string().min(1, "Restaurant is required"),
    status: z.enum([
      "Pending",
      "Confirmed",
      "Preparing",
      "Picked Up",
      "Out for Delivery",
      "Delivered",
      "Delayed",
    ]),
    priority: z.enum(["Normal", "High", "Urgent"]),
  }),

  deliveryAssignment: z.object({
    partnerId: z.string().min(1, "Select a delivery partner"),
    vehicleType: z.string().min(1, "Vehicle type is required"),
    vehicleNumber: z.string().trim().min(1, "Vehicle number is required"),
  }),

  deliveryAddress: z.object({
    street: z.string().trim().min(1, "Street address is required"),
    apartment: z.string(),
    city: z.string().trim().min(1, "City is required"),
    state: z.string().trim().min(1, "State is required"),
    postalCode: z
      .string()
      .regex(/^[0-9]{6}$/, "Enter a valid 6-digit postal code"),
    landmark: z.string(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a valid phone number"),
    specialInstructions: z.string(),
  }),

  deliveryNotes: z.object({
    reassignmentReason: z.string().min(1, "Select a reassignment reason"),
    adminNotes: z.string().max(1000, "Maximum 1000 characters"),
    partnerInstructions: z.string().max(1000, "Maximum 1000 characters"),
  }),
});

export type DeliveryFormValues = z.infer<typeof deliverySchema>;

type EditDeliveryFormProps = {
  orderId: string;
};

export default function EditDeliveryForm({ orderId }: EditDeliveryFormProps) {
  const [orderInfo, setOrderInfo] = useState<OrderInformationData>({
    restaurants: "Pizza Palace",
    status: "Out for Delivery",
    priority: "Normal",
  });

  const [deliveryAssignment, setDeliveryAssignment] =
    useState<DeliveryAssignmentData>({
      partnerId: "RD-1",
      vehicleType: "Motorcycle",
      vehicleNumber: "TN 23 BB 1234",
    });

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressData>({
    street: "126, New Street",
    city: "Vellore",
    state: "Tamil Nadu",
    postalCode: "632001",
    landmark: "Near Blue Cinema",
    phone: "+91 98765 43210",
    specialInstructions: "Please call before delivery.",
  });

  const [deliveryNotes, setDeliveryNotes] = useState<DeliveryNotesData>({
    reassignmentReason: "Initial assignment",
    adminNotes: "",
    partnerInstructions: "Please call the customer before arriving.",
  });

  const [orderSummary] = useState<DeliverySummaryData>({
    items: [
      {
        id: "1",
        name: "Chicken Biryani",
        description: "Bucket",
        quantity: 1,
        price: 150,
      },
    ],
    subtotal: 690,
    deliveryFee: 30,
    discount: 50,
    tax: 35,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
  });

  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      orderInfo: {
        restaurant: "Pizza Palace",
        status: "Out for Delivery",
        priority: "Normal",
      },
      deliveryAssignment: {
        partnerId: "RD-1",
        vehicleType: "Motorcycle",
        vehicleNumber: "TN 23 BB 1234",
      },
      deliveryAddress: {
        street: "126, New Street",
        apartment: "",
        city: "Vellore",
        state: "Tamil Nadu",
        postalCode: "632001",
        landmark: "Near Blue Cinema",
        phone: "+91 98765 43210",
        specialInstructions: "Please call before delivery.",
      },
      deliveryNotes: {
        reassignmentReason: "Initial assignment",
        adminNotes: "",
        partnerInstructions: "Please call the customer before arriving.",
      },
    },
  });
  const handleSubmit = form.handleSubmit((values) => {
    console.log("submitted", values);
  });

  const handleCancel = () => {
    console.log("cancel");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="mb-2 -ml-2"
          >
            <Link
              href="/admin/delivery/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Delivery
            </Link>
          </Button>

          <h1 className="text-2xl font-bold tracking-tight">Edit Delivery</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update delivery information for order #{orderId}.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Update Delivery
          </Button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <OrderInformation
              value={orderInfo}
              onChange={(value) => {
                setOrderInfo(value);

                form.setValue(
                  "orderInfo",
                  {
                    restaurant: value.restaurants,
                    status: value.status,
                    priority: value.priority,
                  },
                  { shouldValidate: true },
                );
              }}
              errors={form.formState.errors}
            />

            <DeliveryAssignment
              value={deliveryAssignment}
              onChange={(value) => {
                setDeliveryAssignment(value);

                form.setValue("deliveryAssignment", value, {
                  shouldValidate: true,
                });
              }}
              errors={form.formState.errors}
            />

            <DeliveryAddress
              value={deliveryAddress}
              onChange={(value) => {
                setDeliveryAddress(value);

                form.setValue(
                  "deliveryAddress",
                  { ...value, apartment: "" },
                  { shouldValidate: true },
                );
              }}
              errors={form.formState.errors}
            />

            <DeliveryNotes
              value={deliveryNotes}
              onChange={(value) => {
                setDeliveryNotes(value);

                form.setValue("deliveryNotes", value, { shouldValidate: true });
              }}
              errors={form.formState.errors}
            />
          </div>
          <div className="space-y-6 xl:sticky xl:top-6">
            <DeliverySummary summary={orderSummary} />
            <div className="rounded-xl border bg-muted p-4">
              <h3 className="text-sm font-semibold">Before updating</h3>

              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>Verify the delivery partner assignment.</li>
                <li>Check the customer's delivery address.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>

        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}
