"use client";

import { type CustomerAddress } from "@/component/customer/address/AddressCard";
import AddressList from "@/component/customer/address/AddressList";
import AddressStats from "@/component/customer/address/AddressStats";
import { useState } from "react";

const initialAddresses: CustomerAddress[] = [
  {
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
  },
  {
    id: "address-2",
    fullName: "Vignesh",
    phone: "+91 98765 43210",
    type: "work",
    addressLine: "Office Building, Main Road",
    area: "Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    postalCode: "632002",
    isDefault: false,
  },
];

export default function AddressPage() {
  const [addresses, setAddressess] =
    useState<CustomerAddress[]>(initialAddresses);

  const handleSetDefault = (id: string) => {
    setAddressess((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  const handleRemove = (id: string) => {
    const selected = addresses.find((add) => add.id === id);

    if (!selected) return;

    setAddressess((prev) => {
      const remain = prev.filter((addr) => addr.id !== id);

      if (selected.isDefault && remain.length > 0) {
        return remain.map((addr, index) =>
          index === 0 ? { ...addr, isDefault: true } : addr,
        );
      }
      return remain;
    });
  };

  const totalAddresses = addresses.length;
  const defaultAddresses = addresses.filter((addr) => addr.isDefault).length;
  const otherAddresses = totalAddresses - defaultAddresses;

  return (
    <div className="space-y-5">
      <AddressStats
        totalAddresses={totalAddresses}
        defaultAddresses={defaultAddresses}
        otherAddresses={otherAddresses}
      />
      <AddressList
        addresses={addresses}
        onEdit={(id) => console.log("Edit:", id)}
        onDelete={handleRemove}
        onSetDefault={handleSetDefault}
      />
    </div>
  );
}
