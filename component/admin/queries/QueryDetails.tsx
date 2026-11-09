import {
  AlertCircle,
  CalendarDays,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Tag,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QueryResponse from "./QueryResponse";
import QueryActivity from "./QueryActivity";
import QueryStatusManagement from "./QueryStatusManagement";

type QueryDetailsProps = {
  queryId: string;
};

const queryDetails = {
  id: "QRY-1",
  customer: {
    name: "test1",
    email: "test1@example.com",
    phone: "+91 98765 43210",
    joinedDate: "Nov 10,2026",
  },
  subject: "Payment deducted twice",
  category: "Payment",
  priority: "High",
  status: "Open",
  orderId: "ORD-1",
  createdAt: "November 10, 2026 at 10:30 AM",
  description:
    "I placed an order through the FoodieBite application. During checkout",
};

const statusStyles: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "In Progress": "bg-purple-50 text-purple-700 border-purple-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-gray-100 text-gray-700 border-gray-200",
};

const priorityStyles: Record<string, string> = {
  Low: "bg-gray-100 text-gray-700 border-gray-200",
  Medium: "bg-blue-50 text-blue-700 border-blue-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Urgent: "bg-red-50 text-red-700 border-red-200",
};

export default function QueryDetails({ queryId }: QueryDetailsProps) {
  const query = {
    ...queryDetails,
    id: queryId,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{query.id}</h2>

              <Badge variant="outline" className={statusStyles[query.status]}>
                {query.status}
              </Badge>

              <Badge
                variant="outline"
                className={priorityStyles[query.priority]}
              >
                {query.priority} Priority
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Customer support request submitted on {query.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            {query.createdAt}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="size-5" />
                Query Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <p className="mb-2 text-sm text-muted-foreground">Subject</p>
                <h3 className="text-base font-semibold">{query.subject}</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Tag className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="text-sm font-medium">{query.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Related Order
                    </p>
                    <p className="text-sm font-medium">{query.orderId}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-5">
                <p className="mb-3 text-sm font-medium">Customer Description</p>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {query.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <QueryResponse />
          <QueryActivity />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5" />
                Customer Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {query.customer.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <p className="font-semibold">{query.customer.name}</p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Email Address
                    </p>
                    <p className="break-all text-sm font-medium">
                      {query.customer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="text-sm font-medium">
                      {query.customer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Customer Since
                    </p>
                    <p className="text-sm font-medium">
                      {query.customer.joinedDate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="size-5" />
                Query Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Query ID</span>
                <span className="font-medium">{query.id}</span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{query.category}</span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Priority</span>
                <span className="font-medium">{query.priority}</span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">{query.status}</span>
              </div>
            </CardContent>
          </Card>
          <QueryStatusManagement />
        </div>
      </div>
    </div>
  );
}
