"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, PauseCircle, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function TemporaryCloseCard() {
  const [duration, setDuration] = useState("2");
  const [isPaused, setIsPaused] = useState(false);
  const [pausedDuration, setPausedDuration] = useState("");

  const handlePauseOrders = () => {
    const durationLabels: Record<string, string> = {
      "1": "1 hour",
      "2": "2 hours",
      today: "the rest of today",
      manual: "until manually reopened",
    };

    setPausedDuration(durationLabels[duration]);
    setIsPaused(true);
  };

  const handleResumeOrders = () => {
    setIsPaused(false);
    setPausedDuration("");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Temporary Close</CardTitle>
          <p className="text-sm text-muted-foreground">
            Temporarily pause incoming orders.
          </p>
        </div>

        <Badge variant={isPaused ? "destructive" : "secondary"}>
          {isPaused ? "Paused" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
            {isPaused ? (
              <PauseCircle className="size-5 text-muted-foreground" />
            ) : (
              <Clock className="size-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium">
              {isPaused
                ? "Orders are temporarily paused"
                : "Need a short break?"}
            </p>

            <p className="text-sm text-muted-foreground">
              {isPaused
                ? `Your restaurant is not accepting orders for ${pausedDuration}.`
                : "Pause new orders when your restaurant is unavailable."}
            </p>
          </div>
        </div>
        {!isPaused ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pause duration</label>

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="today">Rest of today</option>
                <option value="manual">Until I reopen manually</option>
              </select>
            </div>

            <Button
              variant="destructive"
              className="w-full"
              onClick={handlePauseOrders}
            >
              <PauseCircle className="mr-2 size-4" />
              Pause Orders
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg border bg-gray-200 p-3">
              <p className="text-sm font-medium">Temporary closure active</p>
              <p className="mt-1 text-sm text-muted-foreground">
                New customers cannot place orders while this pause is active.
              </p>
            </div>

            <Button className="w-full" onClick={handleResumeOrders}>
              <PlayCircle className="mr-2 size-4" />
              Resume Orders
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
