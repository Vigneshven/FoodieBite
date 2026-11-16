"use client";

import { useState } from "react";
import ReviewFilters, { ReviewFiltersType } from "./ReviewFilters";

const Reviews = [
  {
    id: "REV-001",
    customerName: "Viki",
    rating: 5,
    comment: "Excellent food!",
    orderId: "OD-01",
    date: "Nov 16, 2026",
    reply: "Thank you for your wonderful feedback!",
  },
  {
    id: "REV-002",
    customerName: "vignesh",
    rating: 4,
    comment: "Good taste and quality",
    orderId: "OD-02",
    date: "Nov 16, 2026",
    reply: "",
  },
];

export type RestaurantReview = (typeof Reviews)[number];

export default function ReviewsList() {
  const [filters, setFilters] = useState<ReviewFiltersType>({
    search: "",
    rating: "all",
    replyStatus: "all",
  });

  const filteredReviews = Reviews.filter((review) => {
    const searchTerm = filters.search.trim().toLowerCase();

    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm) ||
      review.comment.toLowerCase().includes(searchTerm) ||
      review.orderId.toLowerCase().includes(searchTerm);

    const matchesRating =
      filters.rating === "all" || review.rating === Number(filters.rating);

    const matchesReplyStatus =
      filters.replyStatus === "all" ||
      (filters.replyStatus === "replied" && Boolean(review.reply)) ||
      (filters.replyStatus === "not-replied" && !review.reply);

    return matchesSearch && matchesRating && matchesReplyStatus;
  });

  return (
    <div className="space-y-6">
      <ReviewFilters filters={filters} onFiltersChange={setFilters} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customer Reviews</h2>
          <p className="text-sm text-muted-foreground">
            {filteredReviews.length} reviews found
          </p>
        </div>
      </div>
      {filteredReviews.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h3 className="font-semibold">No reviews found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{review.customerName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Order {review.orderId} · {review.date}
                  </p>
                </div>
                <span className="text-sm font-medium">{review.rating}/5</span>
              </div>
              <p className="mt-4 text-sm leading-6">{review.comment}</p>
              {review.reply ? (
                <div className="mt-4 rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">Your Reply</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {review.reply}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  Not replied yet
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
