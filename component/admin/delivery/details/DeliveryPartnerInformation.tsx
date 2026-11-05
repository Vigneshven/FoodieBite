import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bike,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

type DeliveryPartnerInformationProps = {
  partner: {
    name: string;
    email: string;
    phone: string;
    vehicle: string;
    vehicleNo: string;
    rating: number;
    totalDeliveries: number;
    joinedDate: string;
    status: "On Delivery" | "Available" | "Offline";
  };
};

export default function DeliveryPartnerInformation({
  partner,
}: DeliveryPartnerInformationProps) {
  const partnerInitial = partner.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <div>
            <CardTitle>Delivery Partner</CardTitle>
            <CardDescription>
              Assigned delivery rider information
            </CardDescription>
          </div>
          <Bike className="size-5 text-muted-foreground font-bold" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-sm text-blue-700">
            {partnerInitial}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{partner.name}</h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground font-bold">
              <Star className="s-3 fill-amber-400 text-amber-500" />
              <span className="font-medium">{partner.rating}</span>
              <span>Rider Rating</span>
            </div>
          </div>
          <Badge
            className={
              partner.status === "Available"
                ? "bg-green-100 text-green-700"
                : partner.status === "On Delivery"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
            }
          >
            {partner.status}
          </Badge>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Phone className="size-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">
                Phone Number
              </p>
              <p className="text-sm font-medium">{partner.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Mail className="size-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">
                Email Address
              </p>
              <p className="text-sm font-medium">{partner.email}</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-bold">
            Vehicle Information
          </p>
          <div>
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Bike className="size-4 text-muted-foreground font-bold" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-bold">
                  Vehicle Type
                </span>
                <p className="text-sm font-medium">{partner.vehicle}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <MapPin className="size-4 text-muted-foreground font-bold" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-bold">
                  Vehicle Number
                </span>
                <p className="text-sm font-medium">{partner.vehicleNo}</p>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck className="size-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-bold">
                Total Deliveries
              </span>
              <p className="text-sm font-medium">{partner.totalDeliveries}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CalendarDays className="size-4 text-muted-foreground font-bold" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-bold">
                Joined Date
              </span>
              <p className="text-sm font-medium">{partner.joinedDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
