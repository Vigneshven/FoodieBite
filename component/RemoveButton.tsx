"use client";

import { deleteCustomerInDb } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ButtonProps = {
  email: string;
};

export default function RemoveButton({ email }: ButtonProps) {
  const [remove, setRemoving] = useState(false);
  const router = useRouter();

  async function handleRemoveCustomer() {
    try {
      setRemoving(true);
      await deleteCustomerInDb(email);
      toast.success("Customer Removed Successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove Customer");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemoveCustomer}
      disabled={remove}
      className="bg-blue-300 p-2 rounded-xl hover:cursor-pointer"
    >
      {remove ? "Removing" : "Remove"}
    </button>
  );
}
