"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  approveRestaurantProfile,
  getRestaurantReviewDetails,
  rejectRestaurantProfile,
} from "@/api/admin/restaurant/api";
import { RestaurantReview } from "@/api/admin/type/admin/types-api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type RestaurantReviewDialogProps = {
  restaurantId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewComplete: () => Promise<void>;
};

export default function RestaurantReviewDialog({
  restaurantId,
  open,
  onOpenChange,
  onReviewComplete,
}: RestaurantReviewDialogProps) {
  const [restaurant, setRestaurant] = useState<RestaurantReview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (!open || restaurantId === null) {
      return;
    }

    const reviewRestaurantId = restaurantId;

    async function fetchRestaurantDetails() {
      try {
        setIsLoading(true);

        const data = await getRestaurantReviewDetails(reviewRestaurantId);
        setRestaurant(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurantDetails();
  }, [open, restaurantId]);

  async function handleApprove() {
    if (!restaurantId) return;

    try {
      setIsSubmitting(true);
      await approveRestaurantProfile(restaurantId);
      await onReviewComplete();
      toast.success("Restaurant approved successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to approve restaurant");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReject() {
    if (!restaurantId) return;

    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejected reason");
      return;
    }

    try {
      setIsSubmitting(true);
      await rejectRestaurantProfile(restaurantId, rejectionReason.trim());
      await onReviewComplete();
      toast.success("Restaurant rejected successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to reject the restaurant");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Restaurant Profile Review</DialogTitle>
          <DialogDescription>
            Review the information submitted by the restaurant owner.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <p className="py-8 text-center text-muted-foreground">
            Loading restaurant details...
          </p>
        )}

        {!isLoading && restaurant && (
          <div className="space-y-6">
            <div className="space-y-3">
              {restaurant.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.image}`}
                  alt={restaurant.name}
                  width={900}
                  height={400}
                  unoptimized
                  className="h-48 w-full rounded-lg object-cover"
                />
              )}

              <div className="flex items-center gap-4">
                {restaurant.logo && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.logo}`}
                    alt={`${restaurant.name} logo`}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-20 w-20 rounded-lg object-contain"
                  />
                )}

                <div>
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {restaurant.restaurantType} · {restaurant.category}
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold">Restaurant Information</h3>
              <p className="text-sm">{restaurant.description}</p>
              <p className="text-sm">
                <strong>Cuisine:</strong> {restaurant.cuisines}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {restaurant.phone}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {restaurant.email}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold">Owner Information</h3>
              <p className="text-sm">
                <strong>Name:</strong> {restaurant.owner?.username ?? "N/A"}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {restaurant.owner?.email ?? "N/A"}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold">Restaurant Address</h3>
              <p className="text-sm">
                {[
                  restaurant.streetAddress,
                  restaurant.landmark,
                  restaurant.city,
                  restaurant.state,
                  restaurant.postalCode,
                  restaurant.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-semibold">Opening Hours</h3>

              {restaurant.openingHours?.map((hours) => (
                <div
                  key={hours.day}
                  className="flex justify-between border-b py-2 text-sm"
                >
                  <span className="font-medium">{hours.day}</span>

                  <span className="text-muted-foreground">
                    {hours.isClosed
                      ? "Closed"
                      : hours.is24Hours
                        ? "Open 24 hours"
                        : `${hours.openTime} - ${hours.closeTime}`}
                  </span>
                </div>
              ))}
            </section>
            {restaurant?.status === "pending" && (
              <div className="border-t pt-5">
                {!showRejectForm ? (
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isSubmitting}
                      onClick={() => setShowRejectForm(true)}
                    >
                      Reject
                    </Button>

                    <Button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleApprove}
                    >
                      {isSubmitting ? "Processing..." : "Approve"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Reason for rejection</h3>

                    <Textarea
                      value={rejectionReason}
                      onChange={(event) =>
                        setRejectionReason(event.target.value)
                      }
                      placeholder="Explain why this restaurant profile is being rejected..."
                      rows={4}
                      disabled={isSubmitting}
                    />

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSubmitting}
                        onClick={() => {
                          setShowRejectForm(false);
                          setRejectionReason("");
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        disabled={isSubmitting}
                        onClick={handleReject}
                      >
                        {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
