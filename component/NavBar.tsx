import { Hotel } from "lucide-react";
import Link from "next/link";
import type { CurrentUser } from "@/api/api";
import LogoutButton from "@/component/LogoutButton";

function NavBar({ user }: { user: CurrentUser | null }) {
  const isAdmin = user?.role === "admin";
  return (
    <div className="flex justify-around items-center gap-6  p-3 bg-primary">
      <div className="flex justify-center items-center gap-2">
        <Link href={isAdmin ? "/admin" : "/"}>
          <Hotel className="size-10 border-amber-400" />
        </Link>
        <h2 className="text-xl font-bold text-font-primary">FoodieBite</h2>
      </div>
      <nav className="flex justify-between gap-9 list-none mr-2">
        {isAdmin ? (
          <>
            <Link href="/restaurant" className="font-bold text-xl text-font-primary">Restaurants</Link>
            <Link href="/customer" className="font-bold text-xl text-font-primary">Customers</Link>
          </>
        ) : (
          <Link href="/" className="font-bold text-xl text-font-primary">Home</Link>
        )}
      </nav>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium text-font-primary">
              {user.username} ({user.role.replaceAll("_", " ")})
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
