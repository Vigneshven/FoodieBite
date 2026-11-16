import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, MapPin, Phone, Star, UserRound } from "lucide-react";

export type DeliveryInformationProps = {
  partnerName: string;
  partnerId: string;
  phone: string;
  rating: number;
  vehicle: string;
  status: "Assigned" | "Picked Up" | "Out for Delivery" | "Delivered";
};

const statusConfig = {
  Assigned: {
    label: "Assigned",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  "Picked Up": {
    label: "Picked Up",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  },
  "Out for Delivery": {
    label: "Out for Delivery",
    className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
  Delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
};

export default function DeliveryInformation({
  partnerName,
  partnerId,
  phone,
  rating,
  vehicle,
  status,
}: DeliveryInformationProps) {
  const currentStatus = statusConfig[status];

  const handleContactPartner = () => {};

  const handleViewTracking = () => {};

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">Delivery Information</CardTitle>

          <Badge className={currentStatus.className}>
            {currentStatus.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback>
              <UserRound className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{partnerName}</p>
            <p className="text-sm text-muted-foreground">
              Delivery Partner · {partnerId}
            </p>
            <div className="mt-1 flex items-center gap-1">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">
                Partner Rating
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-lg border p-3 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-2">
              <Phone className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-sm font-medium">{phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-2">
              <Bike className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Vehicle</p>
              <p className="text-sm font-medium">{vehicle}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Delivery Status</p>
            <p className="text-xs text-muted-foreground">
              Current delivery progress
            </p>
          </div>
          <Badge className={currentStatus.className}>
            {currentStatus.label}
          </Badge>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleContactPartner}
          >
            <Phone className="mr-2 size-4" />
            Contact Partner
          </Button>
          <Button type="button" className="flex-1" onClick={handleViewTracking}>
            <MapPin className="mr-2 size-4" />
            View Tracking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
