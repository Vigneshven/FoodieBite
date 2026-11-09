import RoleGuard from "@/component/auth/RoleGuard";

export default function DeliveryPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRole="delivery_partner">{children}</RoleGuard>;
}
