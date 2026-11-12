import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Star, Trash2 } from "lucide-react";

export type PaymentMethod = {
  id: string;
  type: "UPI" | "CARD";
  label: string;
  details: string;
  expiry?: string;
  isDefault: boolean;
};

export type PaymentMethodCardProps = {
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function PaymentMethodCard({
  method,
  onSetDefault,
  onRemove,
}: PaymentMethodCardProps) {
  const Icon = method.type === "UPI" ? Smartphone : CreditCard;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Icon size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{method.label}</h3>
            <p className="mt-1 text-sm text-gray-500">{method.details}</p>
          </div>
        </div>

        {method.isDefault && (
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
            Default
          </span>
        )}
      </div>
      {method.expiry && (
        <p className="mt-4 text-xs text-gray-500 font-bold">
          Expires {method.expiry}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        {!method.isDefault ? (
          <Button
            size="default"
            variant="destructive"
            onClick={() => onSetDefault(method.id)}
            className="inline-flex rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white transition hover:bg-red-500"
          >
            <Star size={15} />
            Set as default
          </Button>
        ) : (
          <span className="text-xs font-medium">Your default method</span>
        )}

        <Button
          size="lg"
          variant="secondary"
          onClick={() => onRemove(method.id)}
          className="inline-flex rounded-full items-center gap-2 text-sm text-red-500 transition hover:text-red-700"
        >
          <Trash2 size={15}/>
          Remove
        </Button>
      </div>
    </div>
  );
}
