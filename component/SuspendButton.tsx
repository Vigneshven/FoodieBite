"use client";

import { statusUpdate } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ButtonProps = {
  email: string;
};

export default function SuspendButton({ email }: ButtonProps) {
  const [change, setChange] = useState(false);
  const router = useRouter();

  async function handleStatusChange() {
    try {
      setChange(true);
      await statusUpdate(email, "inactive");
      toast.success("Customer Status Updated");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Status");
    } finally {
      setChange(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleStatusChange}
      disabled={change}
      className="bg-pink-400 p-2 rounded-xl hover:cursor-pointer"
    >
      {change ? "Suspending" : "Suspend"}
    </button>
  );
}
