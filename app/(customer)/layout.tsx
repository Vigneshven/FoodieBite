import RoleGuard from "@/component/auth/RoleGuard";
import CustomerHeader from "@/component/customer/CustomerHeader";
import CustomerSidebar from "@/component/customer/CustomerSidebar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="customer">
      <div className="min-h-screen bg-gray-50">
        <CustomerSidebar />

        <div className="lg:pl-64">
          <CustomerHeader />

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
