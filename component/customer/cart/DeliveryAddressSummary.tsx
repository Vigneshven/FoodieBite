import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export type DeliveryAddress = {
  id: string;
  fullName: string;
  phone: string;
  type: "home" | "work" | "other";
  address: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
  isDefault: boolean;
};

type DeliveryAddressSummaryProps = {
  address: DeliveryAddress | null;
};

export default function DeliveryAddressSummary({
  address,
}: DeliveryAddressSummaryProps) {
  const router = useRouter();

  const handlChangeAddress = () => {
    router.push(`/customer/addresses`);
  };

  if (!address) {
    return (
      <div className="space-y-4 rounded-xl border bg-card p-4 transition duration-1000 hover:-translate-y-1 shadow-sm hover:shadow-xl">
        <div className="flex items-center gap-2">
          <MapPin className="size-5" />
          <h2 className="font-semibold">Delivery Address</h2>
        </div>

        <div className="rounded-lg bg-muted p-4 text-center">
          <MapPin className="mx-auto size-7 text-muted-foreground" />
          <p className="mt-2 font-medium">No Delivery address selected</p>
          <p className="mt-1 text-sm text-muted-foreground font-bold">
            Add an address to continue
          </p>

          <Button
            type="button"
            onClick={handlChangeAddress}
            className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-10 space-y-4 rounded-xl border bg-card p-4 transition duration-1000 hover:-translate-y-1 shadow-sm hover:shadow-xl">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 ">
          <MapPin className="size-5 " />
          <h2 className="font-medium">Delivery Address</h2>
        </div>
        {address?.isDefault && (
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium">
            Default
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{address?.fullName}</h3>
          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
            {address?.type}
          </span>
        </div>
        <p className="text-sm font-bold text-muted-foreground">
          {address?.phone}
        </p>
        <p className="text-sm">
          {address?.address},{address?.area},{address?.city} {address?.state}-
          {address?.postalCode}
        </p>
        {address?.landmark && (
          <p className="text-xs font-bold text-muted-foreground">
            Landmark : {address.landmark}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="button"
          onClick={handlChangeAddress}
          className="flex items-center justify-center px-4 py-3 font-medium text-sm"
        >
          <Pencil size={15} />
          Change Address
        </Button>
      </div>
    </section>
  );
}
