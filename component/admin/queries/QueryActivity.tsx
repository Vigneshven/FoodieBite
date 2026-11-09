import {
  Activity,
  MessageSquare,
  CheckCircle2,
  Clock,
  UserRound,
  AlertCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    id: 1,
    title: "Query submitted",
    description: "test1 submitted a new support request.",
    date: "Nov 9, 2026",
    time: "10:30 AM",
    type: "created",
    actor: "test1",
  },
  {
    id: 2,
    title: "Priority assigned",
    description: "Query priority was set to High.",
    date: "Nov 9, 2026",
    time: "10:45 AM",
    type: "priority",
    actor: "Admin",
  },
  {
    id: 3,
    title: "Status updated",
    description: "Query status changed from Open to In Progress.",
    date: "Nov 9, 2026",
    time: "11:00 AM",
    type: "status",
    actor: "Admin",
  },
  {
    id: 4,
    title: "Response sent",
    description:
      "We are checking the duplicate payment with our payment team. We will update you shortly.",
    date: "Nov 9, 2026",
    time: "11:15 AM",
    type: "response",
    actor: "Admin",
  },
];

const activityConfig = {
  created: {
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-700",
  },
  priority: {
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-700",
  },
  status: {
    icon: CheckCircle2,
    color: "bg-purple-100 text-purple-700",
  },
  response: {
    icon: MessageSquare,
    color: "bg-green-100 text-green-700",
  },
};

export default function QueryActivity() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5" />
              Query Activity
            </CardTitle>

            <CardDescription className="mt-1">
              Track all updates and interactions for this query.
            </CardDescription>
          </div>

          <Badge variant="outline">{activities.length} Activities</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-0">
          {activities.map((activity, index) => {
            const config =
              activityConfig[activity.type as keyof typeof activityConfig];
            const Icon = config.icon;

            return (
              <div key={activity.id} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`z-10 flex size-9 shrink-0 items-center justify-center rounded-full ${config.color}`}
                  >
                    <Icon className="size-4" />
                  </div>

                  {index !== activities.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-7">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3 className="text-sm font-semibold">{activity.title}</h3>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      {activity.time}
                    </div>
                  </div>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {activity.description}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <UserRound className="size-3.5" />
                    <span>{activity.actor}</span>
                    <span>·</span>
                    <span>{activity.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
