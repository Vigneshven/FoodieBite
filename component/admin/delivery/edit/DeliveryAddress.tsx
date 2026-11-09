"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, MapPinned, Navigation, Phone } from "lucide-react";
import { DeliveryAddressData } from "./types/deliveryFormTypes";
import { FieldErrors } from "react-hook-form";
import { DeliveryFormValues } from "./EditDeliveryForm";

type DeliveryAddressProps = {
  value: DeliveryAddressData;
  onChange: (value: DeliveryAddressData) => void;
  errors: FieldErrors<DeliveryFormValues>;
};

export default function DeliveryAddress({
  value,
  onChange,
  errors,
}: DeliveryAddressProps) {
  const handleChange = (field: keyof DeliveryAddressData, newValue: string) => {
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <MapPin className="h-5 w-5 text-primary" />
          </div>

          <div>
            <CardTitle>Delivery Address</CardTitle>
            <CardDescription className="mt-1">
              Update the customer's delivery location and instructions.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Street Address</Label>
          <Input
            value={value.street}
            onChange={(e) => handleChange("street", e.target.value)}
            placeholder="Enter street address"
          />
          {errors.deliveryAddress?.street && (
            <p className="text-sm text-red-400">
              {errors.deliveryAddress?.street.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={value.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter city"
            />
            {errors.deliveryAddress?.city && (
              <p className="text-sm text-red-400">
                {errors.deliveryAddress?.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Input
              value={value.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Enter state"
            />
            {errors.deliveryAddress?.state && (
              <p className="text-sm text-red-400">
                {errors.deliveryAddress?.state.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              value={value.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              placeholder="Enter postal code"
            />
            {errors.deliveryAddress?.postalCode && (
              <p className="text-sm text-red-400">
                {errors.deliveryAddress?.postalCode.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Nearby Landmark</Label>
            <Input
              value={value.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
              placeholder="Enter landmark"
            />
            {errors.deliveryAddress?.landmark && (
              <p className="text-sm text-red-400">
                {errors.deliveryAddress?.landmark.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Delivery Contact Number</Label>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={value.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="pl-10"
              placeholder="Enter contact number"
            />
            {errors.deliveryAddress?.phone && (
              <p className="text-sm text-red-400">
                {errors.deliveryAddress?.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Special Delivery Instructions</Label>

          <Textarea
            value={value.specialInstructions}
            onChange={(e) =>
              handleChange("specialInstructions", e.target.value)
            }
            placeholder="Enter special delivery instructions..."
            rows={4}
          />

          <p className="text-xs text-muted-foreground">
            Add instruction to inform delivery partner
          </p>
          {errors.deliveryAddress?.specialInstructions && (
            <p className="text-sm text-red-400">
              {errors.deliveryAddress?.specialInstructions.message}
            </p>
          )}
        </div>

        <div className="rounded-lg border bg-muted p-4">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold">Delivery Location</h3>
          </div>

          <div className="mt-3 flex items-start gap-2">
            <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              {value.street}, {value.city}, {value.state} - {value.postalCode}
            </p>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Location preview updates as you edit the address.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
