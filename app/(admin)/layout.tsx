import NavBar from "@/component/NavBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/api/api";

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
      <NavBar user={user} />
      <>{children}</>
    </>
  );
}
