import RoleGuard from "@/component/auth/RoleGuard";
import RestaurantHeader from "@/component/restaurant/RestaurantHeader";
import RestaurantSidebar from "@/component/restaurant/RestaurantSidebar";

export default function RestaurantOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="restaurant_owner">
      <div className="min-h-screen bg-gray-50">
        <RestaurantSidebar />

        <div className="lg:pl-64">
          <RestaurantHeader />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
