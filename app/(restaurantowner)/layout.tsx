import RoleGuard from "@/component/auth/RoleGuard";

export default function RestaurantOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRole="restaurant_owner">{children}</RoleGuard>;
}
