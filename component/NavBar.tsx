import { Hotel } from "lucide-react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex justify-around items-center gap-6 border p-3">
      <div className="flex justify-center items-center gap-2">
        <Hotel className="size-10 border-amber-400" />
        <h2 className="text-xl font-bold">FoodieBite</h2>
      </div>
      <nav className="flex justify-between gap-9 list-none mr-2">
        <Link href={"/restaurant"} className="font-bold text-xl">
          Restaurant
        </Link>
        <Link href={"/customer"} className="font-bold text-xl">
          Customer
        </Link>
        <Link href={"/order"} className="font-bold text-xl">
          Order
        </Link>
        <Link href={"/partners"} className="font-bold text-xl">
          Delivery Partners
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
