import OrderStatusAnalytics from "@/component/admin/OrderStatusAnalytics";
import RevenueAnalytics from "@/component/admin/RevenueAnalytics";
import TotalCustomersCard from "@/component/admin/TotalCustomersCard";
import TotalOrderCard from "@/component/admin/TotalOrderCard";
import TotalRestaurantsCard from "@/component/admin/TotalRestaurantsCard";
import TotalRevenueCard from "@/component/admin/TotalRevenueCard";

function AdminDashBoard() {
  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          DashBoard Overview
          <p className="mt-1 text-gray-600 text-sm">Welcome Back!</p>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-3 ">
        <TotalRevenueCard />
        <TotalOrderCard />
        <TotalCustomersCard />
        <TotalRestaurantsCard />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 mt-3">
        <RevenueAnalytics />
        <OrderStatusAnalytics />
      </div>
    </div>
  );
}

export default AdminDashBoard;
