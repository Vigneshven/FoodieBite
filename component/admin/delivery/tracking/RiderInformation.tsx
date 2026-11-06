import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bike,
  CalendarDays,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  Star,
} from "lucide-react";

export type RiderStatus = "Available" | "On Delivery" | "Offline";

export type RiderInformationProps = {
  rider: {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicle: string;
    vehicleNo: string;
    rating: number;
    totalDeliveries: number;
    joinedDate: string;
    status: RiderStatus;
  };
};

const statuStyles: Record<RiderStatus, string> = {
  Available: "bg-emerald-500 text-emerald-600 border-emerald-500",
  "On Delivery": "bg-blue-500 text-blue-600 border-blue-500",
  Offline: "bg-muted text-muted-foreground border-border",
};

export default function RiderInformation({ rider }: RiderInformationProps) {
  const riderInitils = rider.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <Card className="h-full border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold">
              Delivery Partner
            </CardTitle>
            <CardDescription className="mt-1">
              Assigned rider information
            </CardDescription>
          </div>
          <Badge variant="outline" className={statuStyles[rider.status]}>
            <p className="text-sm font-bold text-white">{rider.status}</p>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-orange-500 rounded-full text-lg font-bold text-white">
            {riderInitils}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-muted-foreground">
              {rider.name}
            </h3>
            <p className="text-xs text-muted-foreground font-bold">
              Rider ID: {rider.id}
            </p>
            <div className="mt-1 flex items-center gap-1 text-sm font-bold">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-500" />
              <span className="font-bold text-muted-foreground">
                {rider.rating}
              </span>
              <span className="text-muted-foreground font-bold">
                Rider Rating
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-3 border-t pt-4">
          <p className="text-sm front-bold text-muted-foreground">
            Contact Information
          </p>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-lg bg-muted p-2">
              <Phone className="h-4 w-4 text-muted-foreground font-bold" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-bold">
                Phone Number
              </p>
              <p className="font-medium">{rider.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-lg bg-muted p-2">
              <Mail className="h-4 w-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">
                Email Address
              </p>
              <p>{rider.email}</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 border-t pt-4">
          <p className="text-sm front-bold text-muted-foreground">
            Vehicle Information
          </p>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-lg bg-muted p-2">
              <Bike className="h-4 w-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">
                {rider.vehicle}
              </p>
              <p className="text-xs text-muted-foreground font-bold">
                {rider.vehicleNo}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3 border-t pt-4">
            <div className="rounded-lg bg-muted p-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <PackageCheck className="h-4 w-4 text-muted-foreground font-bold" />
                <span className="text-xs text-muted-foreground font-bold">
                  Deliveries
                </span>
                <p className="text-xs text-muted-foreground font-bold">
                  {rider.totalDeliveries}
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-2 ">
              <div className="flex items-center gap-3 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground font-bold" />
                <span className="text-xs text-muted-foreground font-bold">
                  Joined Date
                </span>
                <p className="text-xs text-muted-foreground font-bold">
                  {rider.joinedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 border-t pt-4">
          <Button variant="outline" className="flex-1 hover:cursor-pointer">
            <Phone className="h-4 w-4 mr-2" />
            Call Rider
          </Button>
          <Button variant="outline" className="flex-1 hover:cursor-pointer">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
