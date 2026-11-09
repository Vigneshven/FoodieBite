import { getCurrentUser } from "@/api/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Role = "admin" | "customer" | "delivery_partner" | "restaurant_owner";

type RoleGuardProps = {
  children: React.ReactNode;
  allowedRole: Role;
};

export default async function RoleGuard({
  children,
  allowedRole,
}: RoleGuardProps) {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie?.value) {
    redirect("/login");
  }
  const cookieHeader = `token=${tokenCookie.value}`;

  const user = await getCurrentUser(cookieHeader);

  if (!user) {
    redirect("/login");
  }

  if (user.role !== allowedRole) {
    redirect("/");
  }

  return <>{children}</>;
}
