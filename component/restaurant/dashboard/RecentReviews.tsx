import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export type RecentReview = {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
};

const reviews: RecentReview[] = [
  {
    id: "R-01",
    customer: "vignesh",
    rating: 5,
    comment: "The chicken biryani was delicious",
    date: "Today, 10:30 AM",
    replied: true,
  },
  {
    id: "R-02",
    customer: "viki",
    rating: 4,
    comment: "Good taste and quality",
    date: "Today, 09:45 AM",
    replied: false,
  },
];

export default function RecentReviews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>
            See what customers are saying about your restaurant.
          </CardDescription>
        </div>

        <Button variant="outline" size="sm">
          View all reviews
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-3 border-b pb-5">
              <Avatar className="size-10">
                <AvatarFallback>
                  {review.customer
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{review.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>

                <Badge
                  variant="outline"
                  className={
                    review.replied
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-yellow-200 bg-yellow-50 text-yellow-700"
                  }
                >
                  {review.replied ? "Replied" : "Needs response"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
