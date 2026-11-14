"use client";

import z from "zod";
import type { CustomerAddress } from "./AddressCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const addressSchema = z.object({
  fullName: z.string().min(2, "Enter at least 2 character"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10 digit number"),
  type: z.enum(["home", "work", "others"]),
  addressLine: z.string().min(5, "Enter at least 5 character"),
  area: z.string().min(2, "Enter at least 2 characters"),
  city: z.string().min(2, "Enter at least 2 character"),
  state: z.string().min(4, "Enter at least 4 character"),
  postalCode: z.string().regex(/^\d{6}$/, "Enter a valid 6 digit pincode"),
  landmark: z.string().optional(),
  isDefault: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

type AddressFormProps = {
  initialAddress?: CustomerAddress;
  onSubmit: (value: AddressFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export default function AddressForm({
  initialAddress,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: initialAddress?.fullName ?? "",
      phone: initialAddress?.phone ?? "",
      type: initialAddress?.type ?? "home",
      addressLine: initialAddress?.addressLine ?? "",
      area: initialAddress?.area ?? "",
      city: initialAddress?.city ?? "",
      state: initialAddress?.state ?? "",
      postalCode: initialAddress?.postalCode ?? "",
      landmark: initialAddress?.landmark ?? "",
      isDefault: initialAddress?.isDefault ?? false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <section className="space-y-4">
        <div>
          <h2>Contact Information</h2>
        </div>
        <div>
          <div>
            <Label className="mb-2 text-sm font-medium">Full Name</Label>
            <Input
              placeholder="Enter your full name"
              className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="mt-1 text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 text-sm font-medium">Phone</Label>
            <Input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="9876543210"
              {...register("phone")}
              className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
            />
            {errors.phone && (
              <p className="mt-1 text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </section>

      <div className="border-t-2 m-[20] w-[650]" />

      <section className="space-y-4">
        <div className="mt-1">
          <h2>Delivery Address</h2>
        </div>
        <div>
          <Label className="mb-2 text-sm font-medium">House / Office</Label>
          <Input
            placeholder="House number,Office number"
            {...register("addressLine")}
            className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
          />
          {errors.addressLine && (
            <p className="mt-1 text-red-500">{errors.addressLine.message}</p>
          )}
        </div>
        <div>
          <Label className="mb-2 text-sm font-medium">Area</Label>
          <Input
            placeholder="Streat name"
            {...register("area")}
            className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
          />
          {errors.area && (
            <p className="mt-1 text-red-500">{errors.area.message}</p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-2 text-sm font-medium">City</Label>
            <Input
              placeholder="Enter City"
              {...register("city")}
              className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
            />
            {errors.city && (
              <p className="mt-1 text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 text-sm font-medium">PostalCode</Label>
            <Input
              placeholder="Enter 6 digit pincode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              {...register("postalCode")}
              className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
            />
            {errors.postalCode && (
              <p className="mt-1 text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
        </div>
        <div>
          <Label className="mb-2 text-sm font-medium">State</Label>
          <Input
            type="text"
            placeholder="Enter State"
            {...register("state")}
            className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
          />
          {errors.state && (
            <p className="mt-1 text-red-500">{errors.state.message}</p>
          )}
        </div>
        <div>
          <Label className="mb-2 text-sm font-medium">LandMark</Label>
          <Input
            type="text"
            placeholder="Nearby landmark"
            {...register("landmark")}
            className="w-full rounded-lg border bg-background p-5 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>
      <div className="border-t-2 m-[20] w-[650]" />
      <section className="space-y-4">
        <div>
          <h2>Address Type</h2>
        </div>
        <div className="flex gap-3">
          {["home", "work", "others"].map((type) => (
            <Label
              key={type}
              className="flex cursor-pointer items-center rounded-lg border p-3 text-sm capitalize"
            >
              <Input type="radio" value={type} {...register("type")} />
              {type}
            </Label>
          ))}
        </div>
      </section>
      <div className="rounded-lg border p-4">
        <Label className="flex cursor-pointer items-start gap-3">
          <Input
            type="checkbox"
            {...register("isDefault")}
            className="mt-1 size-4"
          />
          <span>
            <span className="block text-sm font-medium">Set as default</span>
            <span className="block mt-1 text-xs text-muted-foreground">
              Use this address as your primary address
            </span>
          </span>
        </Label>
      </div>
      <div className="flex justify-end gap-3">
        {onCancel && <Button type="button">Cancel</Button>}
        <Button type="submit">
          {isSubmitting
            ? "Saving..."
            : initialAddress
              ? "Update Address"
              : "Save Address"}
        </Button>
      </div>
    </form>
  );
}
