export type RestaurantReviewDialogProps = {
  restaurantId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
