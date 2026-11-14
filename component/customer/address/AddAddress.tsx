import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddAddress() {
  const router = useRouter();

  return (
    <div className="space-y-5 border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center p-5 justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900">
            Manage your address by add address
          </h2>
        </div>
        <Button
          onClick={() => router.push("/customer/addresses/add")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground
          transition hover:cursor-pointer"
        >
          <Plus size={18} />
          Add Address
        </Button>
      </div>
    </div>
  );
}
