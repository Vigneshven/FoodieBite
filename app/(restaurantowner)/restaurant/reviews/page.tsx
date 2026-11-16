import ReviewsList from "@/component/restaurant/reviews/ReviewsList";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Reviews</h1>
        <p className="text-muted-foreground">
          Manage customer feedback and respond to reviews.
        </p>
      </div>

      <ReviewsList />
    </div>
  );
}
