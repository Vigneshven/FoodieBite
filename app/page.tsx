import NavBar from "@/component/NavBar";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/api/api";

export default async function Home() {
  const token = (await cookies()).get("token");
  const user = token ? await getCurrentUser(`token=${token.value}`) : null;
  const dashboardTitle = user
    ? {
        admin: "Administrator dashboard",
        customer: "Customer dashboard",
        restaurant_owner: "Restaurant owner dashboard",
        delivery_partner: "Delivery partner dashboard",
      }[user.role]
    : "Welcome to FoodieBite";

  return (
    <>
      <NavBar user={user} />
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-primary p-8 text-center">
        <h1 className="text-3xl font-bold text-font-primary">
          {user ? `${dashboardTitle}, ${user.username}` : dashboardTitle}
        </h1>
        <p className="text-lg text-font-primary">
          {user
            ? `You are signed in as ${user.role.replaceAll("_", " ")}.`
            : "Sign in or create an account to get started."}
        </p>
      </main>
    </>
  );
}
