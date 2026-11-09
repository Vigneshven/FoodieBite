import { AdminSideBar } from "@/component/admin/AdminSidebar";
import AdminHeader from "@/component/admin/AdminHeader";
import RoleGuard from "@/component/auth/RoleGuard";
import { getCurrentUser } from "@/api/api";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokenCookie = (await cookies()).get("token");

  const user = tokenCookie
    ? await getCurrentUser(`token=${tokenCookie.value}`)
    : null;

  return (
    <RoleGuard allowedRole="admin">
      <div className="min-h-screen bg-gray-50">
        <AdminSideBar />

        <div className="min-h-screen lg:pl-64">
          <AdminHeader />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
