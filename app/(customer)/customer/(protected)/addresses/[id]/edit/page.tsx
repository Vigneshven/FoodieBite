"use client";

import type { CustomerAddress } from "@/component/customer/address/AddressCard";
import AddressForm, {
  AddressFormValues,
} from "@/component/customer/address/AddressForm";

const initialAddress: CustomerAddress = {
  id: "address-1",
  fullName: "Vignesh",
  phone: "+91 98765 43210",
  type: "home",
  addressLine: "12, New Street",
  area: "Near Blue Cinema",
  city: "Vellore",
  state: "Tamil Nadu",
  postalCode: "632001",
  landmark: "City Hospital",
  isDefault: true,
};

export default function EditAddressPage() {
  const handleAddressUpdate = (values: AddressFormValues) => {
    console.log("Updated address:", values);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Address</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your saved delivery information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <AddressForm
          initialAddress={initialAddress}
          onSubmit={handleAddressUpdate}
        />
      </div>
    </div>
  );
}
