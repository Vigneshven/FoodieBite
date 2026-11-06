"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bike } from "lucide-react";
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

  const handlePartner = (partnerId: string) => {
    setSelectedPartnerId(partnerId);

    const partner = deliveryPartners.find((item) => {
      item.id === partnerId;
    });

    if (partner) {
      setVehicleType(partner.vehicle);
      setVehicleNumber(partner.vehicleNo);
    }
  };

  return (
    <Card>
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
      <CardContent>
        <div>
          <Label>Select Delivery Partner</Label>
          <select>
            {deliveryPartners.map((partner) => (
              <option key={partner.id}>
                {partner.name} - {partner.status}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
