import { Hotel } from "lucide-react";
import Link from "next/link";

function NavBar() {
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
        <Link href={"/order"} className="font-bold text-xl text-text-primary text-font-primary">
          Order
        </Link>
        <Link
          href={"/partners"}
          className="font-bold text-xl text-text-primary text-font-primary"
        >
          Delivery Partners
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
