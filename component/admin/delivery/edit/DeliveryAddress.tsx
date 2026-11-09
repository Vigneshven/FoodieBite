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

export default function DeliveryAddress() {
  const [address, setAddress] = useState({
    street: "No. 126, New Street",
    city: "Vellore",
    state: "Tamil Nadu",
    postalCode: "632001",
    landmark: "Near blue cinema",
    phone: "+91 98765 43210",
  });

  const [instructions, setInstructions] = useState(
    "Please call before arriving. Leave the order at the main entrance if unavailable.",
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
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
            value={address.street}
            onChange={handleChange}
            placeholder="Enter street address"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={address.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Input
              value={address.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              value={address.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
            />
          </div>

          <div className="space-y-2">
            <Label>Nearby Landmark</Label>
            <Input
              value={address.landmark}
              onChange={handleChange}
              placeholder="Enter landmark"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Delivery Contact Number</Label>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={address.phone}
              onChange={handleChange}
              className="pl-10"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Special Delivery Instructions</Label>

          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter special delivery instructions..."
            rows={4}
          />

          <p className="text-xs text-muted-foreground">
            Add instruction to inform delivery partner
          </p>
        </div>

        <div className="rounded-lg border bg-muted p-4">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold">Delivery Location</h3>
          </div>

          <div className="mt-3 flex items-start gap-2">
            <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              {address.street}, {address.city}, {address.state} -{" "}
              {address.postalCode}
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
