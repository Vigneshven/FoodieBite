"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Lock, MessageSquare } from "lucide-react";
import { DeliveryNotesData } from "./types/deliveryFormTypes";
import { FieldErrors } from "react-hook-form";
import { DeliveryFormValues } from "./EditDeliveryForm";

type DeliveryNotesProps = {
  value: DeliveryNotesData;
  onChange: (value: DeliveryNotesData) => void;
  errors: FieldErrors<DeliveryFormValues>;
};

export default function DeliveryNotes({
  value,
  onChange,
  errors,
}: DeliveryNotesProps) {
  const handleChange = (field: keyof DeliveryNotesData, newValue: string) => {
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg p-2">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Delivery Notes</CardTitle>
            <CardDescription className="mt-1">
              Record delivery changes and important instructions.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Reason for Delivery Assignment / Reassignment</Label>

          <select
            value={value.reassignmentReason}
            onChange={(event) =>
              handleChange("reassignmentReason", event.target.value)
            }
            className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs "
          >
            <option value="">Select a reason</option>
            <option value="Initial assignment">Initial assignment</option>
            <option value="Partner unavailable">Partner unavailable</option>
            <option value="Partner requested reassignment">
              Partner requested reassignment
            </option>
            <option value="Vehicle issue">Vehicle issue</option>
            <option value="Customer request">Customer request</option>
            <option value="Other">Other</option>
          </select>
          {errors.deliveryNotes?.reassignmentReason && (
            <p className="text-sm text-red-400">
              {errors.deliveryNotes?.reassignmentReason?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <Label>Private Admin Notes</Label>
          </div>

          <Textarea
            value={value.adminNotes}
            onChange={(e) => handleChange("adminNotes", e.target.value)}
            placeholder="Add internal notes about this delivery..."
            rows={3}
          />

          <p className="text-xs text-muted-foreground">
            These notes are intended for administrative use only.
          </p>
          {errors.deliveryNotes?.adminNotes && (
            <p className="text-sm text-red-400">
              {errors.deliveryNotes?.adminNotes?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <Label>Delivery Partner Instructions</Label>
          </div>

          <Textarea
            value={value.partnerInstructions}
            onChange={(e) =>
              handleChange("partnerInstructions", e.target.value)
            }
            placeholder="Enter instructions for the delivery partner..."
            rows={3}
          />

          <p className="text-xs text-muted-foreground">
            Instructions for the assigned delivery partner.
          </p>
          {errors.deliveryNotes?.partnerInstructions && (
            <p className="text-sm text-red-400">
              {errors.deliveryNotes?.partnerInstructions?.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
