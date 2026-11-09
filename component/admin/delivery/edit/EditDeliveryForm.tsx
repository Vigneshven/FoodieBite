"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";

import OrderInformation from "./OrderInformation";
import DeliveryAssignment from "./DeliveryAssignment";
import DeliveryAddress from "./DeliveryAddress";
import DeliveryNotes from "./DeliveryNotes";
import DeliverySummary from "./DeliverySummary";
import Link from "next/link";

type EditDeliveryFormProps = {
  orderId: string;
};

export default function EditDeliveryForm({ orderId }: EditDeliveryFormProps) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  const handleCancel = () => {
    console.log("cancel");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            <OrderInformation />

            <DeliveryAssignment />

            <DeliveryAddress />

            <DeliveryNotes />
          </div>
          <div className="space-y-6 xl:sticky xl:top-6">
            <DeliverySummary />
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
