import NavBar from "@/component/NavBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAccess } from "@/api/api";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokenCookie = (await cookies()).get("token");

  if (!tokenCookie) redirect("/login");

  const admin = await getAdminAccess(`token=${tokenCookie.value}`);
  if (!admin) redirect("/");

  return (
    <>
      <NavBar />
      <>{children}</>
    </>
  );
}
