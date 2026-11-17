import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, Building2, CalendarDays, Clock3, Wallet } from "lucide-react";

export default function PayoutSummary() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payout Summary</CardTitle>
          <Wallet className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Pending Payout</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">₹2,450</h2>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
              <Clock3 className="mr-1 size-3" />
              Pending
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Payment awaiting.</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Next Payout</p>
              <p className="font-medium">November 20, 2026</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <Building2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">Bank Transfer</p>
              <p className="text-xs text-muted-foreground">
                Account ending in **** 1234
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Payout Schedule</p>
            <p className="text-xs text-muted-foreground">
              Payouts are processed weekly by FoodieBite.
            </p>
          </div>
        </div>
        <Button variant="outline" className="w-full" disabled>
          View Payout Details
          <ArrowUpRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
