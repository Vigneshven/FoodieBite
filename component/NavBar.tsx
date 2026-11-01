import { Hotel } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/api/api";
import LogoutButton from "@/component/LogoutButton";

async function NavBar() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const user = tokenCookie
    ? await getCurrentUser(`token=${tokenCookie.value}`)
    : null;

  return (
    <div className="flex justify-around items-center gap-6  p-3 bg-primary">
      <div className="flex justify-center items-center gap-2">
        <Link href={"/admin"}>
          <Hotel className="size-10 border-amber-400" />
        </Link>
        <h2 className="text-xl font-bold text-font-primary">FoodieBite</h2>
      </div>
      <nav className="flex justify-between gap-9 list-none mr-2">
        <Link
          href={"/restaurant"}
          className="font-bold text-xl text-text-primary text-font-primary"
        >
          Restaurant
        </Link>
        <Link
          href={"/customer"}
          className="font-bold text-xl text-text-primary text-font-primary"
        >
          Customer
        </Link>
        <Link
          href={"/order"}
          className="font-bold text-xl text-text-primary text-font-primary"
        >
          Order
        </Link>
        <Link
          href={"/partners"}
          className="font-bold text-xl text-text-primary text-font-primary"
        >
          Delivery Partners
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium text-font-primary">
              {user.username}
            </span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/register" className="font-medium text-font-primary">
              Sign In / Create Account
            </Link>
            <Link href="/login" className="font-medium text-font-primary">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
