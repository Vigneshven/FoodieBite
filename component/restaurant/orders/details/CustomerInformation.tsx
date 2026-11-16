import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { RestaurantOrderCustomer } from "../types";

type CustomerInformationProps = {
  customer: RestaurantOrderCustomer;
};

export default function CustomerInformation({
  customer,
}: CustomerInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <p className="text-sm text-muted-foreground">
          Customer contact and delivery details
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <UserRound className="mt-1 size-5 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Customer Name</p>
            <p className="font-medium">{customer.name}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-1 size-5 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p>{customer.phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="mt-1 size-5 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium">{customer.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 size-5 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Delivery Address</p>
            <p className="font-medium">{customer.address}</p>

            {customer.landmark && (
              <p className="text-sm text-muted-foreground">
                Landmark: {customer.landmark}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
