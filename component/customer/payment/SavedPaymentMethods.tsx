"use client";

import { Button } from "@/components/ui/button";
import { Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import PaymentMethodCard, { PaymentMethod } from "./PaymentMethodCard";
import { useRouter } from "next/navigation";

const initialMethods: PaymentMethod[] = [
  {
    id: "PM-1",
    type: "CARD",
    label: "Master Card",
    details: "**** **** **** 1510",
    expiry: "08/30",
    isDefault: true,
  },
  {
    id: "PM-2",
    type: "UPI",
    label: "upi",
    details: "viki@upi",
    isDefault: false,
  },
];

export default function SavedPaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);

  const router = useRouter();

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleRemove = (id: string) => {
    const selected = methods.find((method) => method.id === id);

    if (!selected) return;

    setMethods((prev) => {
      const remain = prev.filter((method) => method.id !== id);

      if (selected.isDefault && remain.length > 0) {
        return remain.map((method, index) =>
          index === 0 ? { ...method, isDefault: true } : method,
        );
      }

      return remain;
    });
  };
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Saved Payment Methods
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your payment methods
          </p>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="inline-flex h-10 w-50 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition hover:bg-orange-600 hover:cursor-pointer hover:text-white hover:font-bold"
          onClick={() => router.push("/customer/payments/methods/add")}
        >
          <Plus size={17} />
          Add Payment Method
        </Button>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
        <span className="text-sm text-gray-600">Your saved methods</span>
        <span className="rounded-full bg-orange-300 px-3 py-1 text-xs font-semibold text-orange-600">
          {" "}
          {methods.length} saved
        </span>
      </div>
      {methods.length > 0 ? (
        <div className="space-y-2">
          {methods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onSetDefault={handleSetDefault}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div>
          <div>
            <Plus />
          </div>
          <h3>No saved payment methods</h3>

          <p>Add a payment method for faster payment</p>

          <Button
            size="icon"
            variant="outline"
            className="inline-flex h-10 w-50 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition hover:bg-orange-600 hover:cursor-pointer"
          >
            <Plus size={17} />
            Add Payment Method
          </Button>
        </div>
      )}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <ShieldCheck size={21} className="mt-0.5 shrink-0 text-blue-600" />

        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Your payment information is protected
          </h3>
        </div>
      </div>
    </section>
  );
}
