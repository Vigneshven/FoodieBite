import OrderStatusAnalytics from "@/component/admin/OrderStatusAnalytics";
import RevenueAnalytics from "@/component/admin/RevenueAnalytics";
import TotalCustomersCard from "@/component/admin/TotalCustomersCard";
import TotalOrderCard from "@/component/admin/TotalOrderCard";
import TotalRestaurantsCard from "@/component/admin/TotalRestaurantsCard";
import TotalRevenueCard from "@/component/admin/TotalRevenueCard";

function AdminDashBoard() {
  return (
    <div>
      {/* <div className="flex flex-col w-full justify-center items-center h-screen bg-primary">
        <div className="flex w-full h-1/2 border-border">
          <div className="border-border w-1/2 flex flex-col gap-10 items-center justify-start bg-secondary ">
            <h2 className="font-bold text-font-primary text-black-50 mt-3">
              Restaurants Reports
            </h2>
            <RestaurantReport />
          </div>

          <div className="border-border w-1/2 flex justify-center bg-secondary">
            <div className="border-border w-1/2 flex flex-col gap-10 items-center justify-start bg-secondary">
              <h2 className="font-bold text-font-primary text-black-50 mt-3">
                Customer Reports
              </h2>
              <CustomerReport />
            </div>
          </div>
        </div>
        <div className="flex w-full h-1/3 border-border bg-secondary">
          <div className="border-border w-1/2 flex justify-center">
            <h2 className="font-bold text-font-primary text-black-50">
              Order Reports
            </h2>
          </div>

          <div className="border-border w-1/2 flex justify-center bg-secondary">
            <h2 className="font-bold text-font-primary text-black-50">
              Delivery Partners Reports
            </h2>
          </div>
        </div>
        <div className="border-border flex flex-col items-center w-full justify-start gap-2 h-1/5 bg-secondary">
          <h2 className="font-bold text-font-primary text-black-50">
            Recently Added Restaurants
          </h2>
          <div>
            <RecentAddedRestaurant />
          </div>
        </div>
      </div> */}

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
