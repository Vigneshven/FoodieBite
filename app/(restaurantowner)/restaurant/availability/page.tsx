import RestaurantStatusCard from "@/component/restaurant/availability/RestaurantStatusCard";
import TemporaryCloseCard from "@/component/restaurant/availability/TemporaryCloseCard";
import TodayScheduleCard from "@/component/restaurant/availability/TodayScheduleCard";
import WeeklySchedule from "@/component/restaurant/availability/WeeklySchedule";

export default function AvailabilityPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Availability</h1>
        <p className="text-sm text-muted-foreground">
          Manage your restaurant's operating hours and order availability.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RestaurantStatusCard />
        <TemporaryCloseCard />
      </div>

      <TodayScheduleCard openingTime="09:00 AM" closingTime="10:00 PM" />
      <WeeklySchedule />
    </div>
  );
}
