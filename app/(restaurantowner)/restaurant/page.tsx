import PopularDishes from "@/component/restaurant/dashboard/PopularDishes";
import RecentOrders from "@/component/restaurant/dashboard/RecentOrders";
import RecentReviews from "@/component/restaurant/dashboard/RecentReviews";
import RestaurantOverviewStats from "@/component/restaurant/dashboard/RestaurantOverviewStats";
import RevenueAnalytics from "@/component/restaurant/dashboard/RevenueAnalytics";

export default function RestaurantDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Welcome back! Here's your restaurant's performance.
        </p>
      </div>

      <RestaurantOverviewStats />
      <RevenueAnalytics />
      <RecentOrders />
      <PopularDishes />
      <RecentReviews />
    </div>
  );
}
