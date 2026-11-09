"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertCircle, Check, Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const statuses = [
  "Open",
  "Pending",
  "In Progress",
  "Resolved",
  "Closed",
] as const;

const priorities = ["Low", "Medium", "High", "Urgent"] as const;

const categories = [
  "Order",
  "Payment",
  "Delivery",
  "Refund",
  "Restaurant",
  "Account",
  "Other",
] as const;

// 1. Zod validation schema
const queryStatusSchema = z.object({
  status: z.enum(statuses, {
    message: "Please select a query status",
  }),

  priority: z.enum(priorities, {
    message: "Please select a priority",
  }),

  category: z.enum(categories, {
    message: "Please select a category",
  }),

  adminNote: z
    .string()
    .max(500, "Internal update cannot exceed 500 characters"),
});

// 2. TypeScript type inferred from Zod
type QueryStatusFormValues = z.infer<typeof queryStatusSchema>;

export default function QueryStatusManagement() {
  const [saved, setSaved] = useState(false);

  // 3. React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QueryStatusFormValues>({
    resolver: zodResolver(queryStatusSchema),

    defaultValues: {
      status: "Open",
      priority: "High",
      category: "Payment",
      adminNote: "",
    },
  });

  // 4. Form submission
  const onSubmit = (data: QueryStatusFormValues) => {
    console.log("Updated query:", data);

    // UI-only confirmation
    setSaved(true);

    // Clear only the internal note.
    reset({
      ...data,
      adminNote: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="size-5" />
          Manage Query
        </CardTitle>

        <CardDescription>
          Update the status and classification of this support request.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="query-status">Query Status</Label>

            <select
              id="query-status"
              {...register("status")}
              onChange={(event) => {
                register("status").onChange(event);
                setSaved(false);
              }}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.status && (
              <p className="text-sm text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="query-priority">Priority</Label>

            <select
              id="query-priority"
              {...register("priority")}
              onChange={(event) => {
                register("priority").onChange(event);
                setSaved(false);
              }}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {priorities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.priority && (
              <p className="text-sm text-destructive">
                {errors.priority.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="query-category">Category</Label>

            <select
              id="query-category"
              {...register("category")}
              onChange={(event) => {
                register("category").onChange(event);
                setSaved(false);
              }}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-update">Internal Update (Optional)</Label>

            <Textarea
              id="admin-update"
              {...register("adminNote")}
              onChange={(event) => {
                register("adminNote").onChange(event);
                setSaved(false);
              }}
              placeholder="Add a note about this status update..."
              rows={3}
              maxLength={500}
              className="resize-none"
            />

            <p className="text-right text-xs text-muted-foreground">
              {errors.adminNote ? (
                <span className="text-destructive">
                  {errors.adminNote.message}
                </span>
              ) : (
                "Maximum 500 characters"
              )}
            </p>
          </div>
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {saved ? (
                <>
                  <Check className="size-4" />
                  Changes Saved
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>

            {saved && (
              <Badge
                variant="outline"
                className="w-full justify-center border-green-200 bg-green-50 py-2 text-green-700"
              >
                Changes saved locally for this preview.
              </Badge>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
