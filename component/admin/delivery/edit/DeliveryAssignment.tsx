"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Mail, Phone, Star, User, UserRound } from "lucide-react";
import { useState } from "react";

const deliveryPartners = [
  {
    id: "RD-1",
    name: "test1",
    phone: "+91 12345 67893",
    email: "test1@gmail.com",
    vehicle: "MotorCycle",
    vehicleNo: "TN 23 BB 1234",
    rating: 4.5,
    totalDeliveries: 20,
    status: "Available",
  },
  {
    id: "RD-2",
    name: "test2",
    phone: "+91 12345 67893",
    email: "test2@gmail.com",
    vehicle: "MotorCycle",
    vehicleNo: "TN 23 BB 1234",
    rating: 4.5,
    totalDeliveries: 20,
    status: "On Delivery",
  },
  {
    id: "RD-3",
    name: "test3",
    phone: "+91 12345 67893",
    email: "test3@gmail.com",
    vehicle: "MotorCycle",
    vehicleNo: "TN 23 BB 1234",
    rating: 4.5,
    totalDeliveries: 20,
    status: "Available",
  },
  {
    id: "RD-4",
    name: "test4",
    phone: "+91 12345 67893",
    email: "test4@gmail.com",
    vehicle: "MotorCycle",
    vehicleNo: "TN 23 BB 1234",
    rating: 4.5,
    totalDeliveries: 20,
    status: "Offline",
  },
];

export default function DeliveryAssignment() {
  const [selectedPartnerId, setSelectedPartnerId] = useState("RD-1");
  const [vehicleType, setVehicleType] = useState("Motorcycle");
  const [vehicleNumber, setVehicleNumber] = useState("TN 23 BB 1234");

  const selectedPartner = deliveryPartners.find(
    (partner) => partner.id === selectedPartnerId,
  );

  const handlePartnerChange = (partnerId: string) => {
    setSelectedPartnerId(partnerId);

    const partner = deliveryPartners.find((item) => item.id === partnerId);

    if (partner) {
      setVehicleType(partner.vehicle);
      setVehicleNumber(partner.vehicleNo);
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg w-5 h-5">
            <Bike />
          </div>
          <div>
            <CardTitle>Delivery Assignment</CardTitle>
            <CardDescription className="mt-1">
              Assign delivery partner and delivery details
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Select Delivery Partner</Label>
          <select
            value={selectedPartnerId}
            onChange={(e) => handlePartnerChange(e.target.value)}
            className="h-10 w-50 rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none"
          >
            {deliveryPartners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.name} - {partner.status}
              </option>
            ))}
          </select>
        </div>
        {selectedPartner && (
          <div className="rounded-xl border bg-muted p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                  <UserRound className="h-5 w-5 text-muted-foreground font-bold" />
                </div>
                <div>
                  <p className="font-semibold">{selectedPartner.name}</p>
                  <p className="text-xs text-muted-foreground font-bold">
                    Partner ID: {selectedPartner.id}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  selectedPartner.status === "Available"
                    ? "default"
                    : "secondary"
                }
              >
                {selectedPartner.status}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2 text-muted-foreground font-bold">
                <Phone className="h-4 w-4" />
                {selectedPartner.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-bold">
                <Mail className="h-4 w-4" />
                <span>{selectedPartner.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-bold">
                <Star className="h-4 w-4" />
                <span className="font-bold">{selectedPartner.rating}</span>
                <span className="text-muted-foreground font-bold">Rating</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-bold">
                <User className="h-4 w-4" />
                {selectedPartner.totalDeliveries} Deliveries
              </div>
            </div>
          </div>
        )}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bike className="h-4 w-4 text-muted-foreground font-bold" />
            <h3 className="text-sm font-semibold">Vehicle Information</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
              >
                <option value="Motorcycle">Motorcycle</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Car">Car</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Vehicle Number</Label>
              <Input
                value={vehicleNumber}
                placeholder="Enter Vehicle Number"
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        {selectedPartner && selectedPartner?.status !== "Available" && (
          <div className="rounded-lg border border-amber-500">
            <p className="text-sm font-medium text-amber-700 ">
              {selectedPartner?.status === "On Delivery"
                ? "Partner is currently have another delivery on hand"
                : "Partner is currently offline"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check partner availablity before assigning order
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
