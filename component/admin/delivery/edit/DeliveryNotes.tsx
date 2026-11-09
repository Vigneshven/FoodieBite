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
import { FileText, MessageSquare, ShieldCheck, Info } from "lucide-react";

const changeReasons = [
  "Delivery partner reassignment",
  "Customer address correction",
  "Delivery time modification",
  "Restaurant delay",
  "Customer request",
  "Other",
];

export default function DeliveryNotes() {
  const [reason, setReason] = useState("Delivery partner reassignment");
  const [adminNotes, setAdminNotes] = useState(
    "Original delivery partner was unavailable. Reassigning to another partner.",
  );
  const [partnerInstructions, setPartnerInstructions] = useState(
    "Please call the customer before reaching the delivery location.",
  );

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
          <div className="flex items-center justify-between gap-2">
            <Label>Reason for Modification</Label>
            <Badge variant="secondary">Required</Badge>
          </div>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="h-10 w-full rounded-md border border-input  px-3 text-sm outline-none"
          >
            {changeReasons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="admin-notes">Internal Admin Notes</Label>
          </div>

          <Textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Explain why this delivery is being modified..."
            rows={4}
          />

          <p className="text-xs text-muted-foreground">
            These notes are intended for administrators, not customers.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <Label>Delivery Partner Instructions</Label>
          </div>

          <Textarea
            value={partnerInstructions}
            onChange={(e) => setPartnerInstructions(e.target.value)}
            placeholder="Add instructions for the delivery partner..."
            rows={4}
          />

          <p className="text-xs text-muted-foreground">
            These instructions can be shared with the assigned delivery partner.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-muted p-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

          <p className="text-xs leading-5 text-muted-foreground">
            Admin notes should remain private. Only delivery partner
            instructions should be shared with the assigned rider.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
