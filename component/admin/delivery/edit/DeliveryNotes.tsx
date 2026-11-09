"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, MessageSquare, ShieldCheck, Info, Lock } from "lucide-react";
import { DeliveryNotesData } from "./types/deliveryFormTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const handleChange = (
    field: keyof DeliveryNotesData,
    newValue: string | null,
  ) => {
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

          <Select
            value={value.reassignmentReason}
            onValueChange={(newValue) =>
              handleChange("reassignmentReason", newValue)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Initial assignment">
                Initial assignment
              </SelectItem>
              <SelectItem value="Partner unavailable">
                Partner unavailable
              </SelectItem>
              <SelectItem value="Partner requested reassignment">
                Partner requested reassignment
              </SelectItem>
              <SelectItem value="Vehicle issue">Vehicle issue</SelectItem>
              <SelectItem value="Customer request">Customer request</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
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
