"use client";

import { statusUpdate } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ButtonProps = {
  email: string;
};

export default function ActivateButton({ email }: ButtonProps) {
  const [activating, setActivating] = useState(false);
  const router = useRouter();

  async function handleActivate() {
    try {
      setActivating(true);
      await statusUpdate(email, "active");
      toast.success("Customer activated");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to activate customer");
    } finally {
      setActivating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleActivate}
      disabled={activating}
      className="rounded-xl bg-green-400 px-3 py-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    >
      {activating ? "UnSuspending" : "UnSuspend"}
    </button>
  );
}
