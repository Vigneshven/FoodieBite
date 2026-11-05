import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export type TimelineEvent = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  icon: React.ElementType;
};

export type DeliveryTimelineProps = {
  events: TimelineEvent[];
};

export default function DeliveryTimeline({ events }: DeliveryTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Delivery Timeline</CardTitle>
            <CardDescription>
              Complete order journey and delivery updates
            </CardDescription>
          </div>
          <Clock className="size-5 text-muted-foreground font-bold" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center ${event.completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  {!isLast && (
                    <div
                      className={`my-1 min-h-12 w-px flex-1 ${event.completed ? "bg-green-300" : "bg-border"}`}
                    ></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-semibold ${event.completed ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {event.title}
                    </h3>
                    {event.completed ? (
                      <span className="flex items-center gap-2 text-xs font-medium text-green-600">
                        <CheckCircle2 className="size-7" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground font-bold">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground font-bold">
                    {event.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground font-bold">
                    {event.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
