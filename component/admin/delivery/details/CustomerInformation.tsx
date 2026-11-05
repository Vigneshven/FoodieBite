import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";

type CustomerInformationProps = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    customerType: "Regular" | "New" | "VIP";
  };
};

export default function CustomerInformation({
  customer,
}: CustomerInformationProps) {
  const customerInitial = customer.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Personal and contact details</CardDescription>
          </div>
          <UserRound className="size-5 text-muted-foreground font-bold" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full font-bold bg-muted">
            {customerInitial}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{customer.name}</h3>
            <p className="text-sm text-muted-foreground font-bold">Customer</p>
          </div>
          <Badge
            variant="secondary"
            className={
              customer.customerType === "VIP"
                ? "bg-orange-100 text-orange-600"
                : ""
            }
          >
            {customer.customerType}
          </Badge>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Mail className="size-4  text-muted-foreground font-bold " />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-bold">
                Email Address
              </p>
              <p className="break-all text-sm font-medium">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Phone className="size-4  text-muted-foreground font-bold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">
                Phone Number
              </p>
              <p className="break-all text-sm font-medium">{customer.phone}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MapPin className="size-4 text-muted-foreground fint-bold" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-bold">
                Delivery Address
              </p>
              <p className="mt-1 text-sm leading-relaxed font-medium">
                {customer.address}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
