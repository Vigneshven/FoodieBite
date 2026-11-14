"use client";

import AddressForm, { AddressFormValues } from "@/component/customer/address/AddressForm";

export default function AddAddressPage() {
  const handleAddressSubmit = (values: AddressFormValues) => {
    console.log("New address:", values);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Address</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Save a delivery location for your orders.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <AddressForm onSubmit={handleAddressSubmit} />
      </div>
    </div>
  );
}