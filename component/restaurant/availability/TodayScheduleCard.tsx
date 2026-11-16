"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Sunrise, Sunset } from "lucide-react";

type TodayScheduleCardProps = {
  openingTime: string;
  closingTime: string;
  isClosed?: boolean;
};

export default function TodayScheduleCard({
  openingTime,
  closingTime,
  isClosed = false,
}: TodayScheduleCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Today's Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your restaurant's operating hours for today.
          </p>
        </div>

        <Badge variant={isClosed ? "secondary" : "default"}>
          {isClosed ? "Closed today" : "Scheduled"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
            <CalendarDays className="size-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              Regular open and close schedule
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sunrise className="size-4" />
              <span className="text-sm">Opening time</span>
            </div>
            <p className="text-lg font-semibold">
              {isClosed ? "--" : openingTime}
            </p>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sunset className="size-4" />
              <span className="text-sm">Closing time</span>
            </div>
            <p className="text-lg font-semibold">
              {isClosed ? "--" : closingTime}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
          <Clock className="mt-1 size-4 text-muted-foreground" />

          <p className="text-sm text-muted-foreground">
            {isClosed
              ? "Your restaurant has no scheduled operating hours today."
              : `Your scheduled hours today are ${openingTime} to ${closingTime}.`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
