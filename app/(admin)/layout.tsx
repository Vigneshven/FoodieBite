import NavBar from "@/component/NavBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/api/api";
import { AdminSideBar } from "@/component/admin/AdminSidebar";
import AdminHeader from "@/component/admin/AdminHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokenCookie = (await cookies()).get("token");

  if (!tokenCookie) redirect("/login");

  const user = await getCurrentUser(`token=${tokenCookie.value}`);
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/");

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <AdminSideBar />

        <div className="min-h-screen lg:pl-64">
          <AdminHeader user={user}/>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </>
  );
}
