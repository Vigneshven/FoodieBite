import RoleGuard from "@/component/auth/RoleGuard";
import DeliveryHeader from "@/component/deliveryPartner/DeliveryHeader";
import DeliverySidebar from "@/component/deliveryPartner/DeliverySidebar";

export default function DeliveryPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="delivery_partner">
      <div className="min-h-screen bg-gray-50">
        <DeliverySidebar />
        <div className="lg:pl-64">
          <DeliveryHeader />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
