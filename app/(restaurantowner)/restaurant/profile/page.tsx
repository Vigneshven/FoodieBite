import RestaurantBasicInfo from "@/component/restaurant/profile/RestaurantBasicInfo";

export default function RestaurantProfilePage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex bg-card flex-col items-center justify-center rounded-lg p-4 gap-2">
        <h1 className="text-xl font-semibold">Add Your Restaurant</h1>
        <p className="text-sm text-muted-foreground">
          Provide your restaurant information
        </p>
      </div>

      <RestaurantBasicInfo />
    </div>
  );
}
