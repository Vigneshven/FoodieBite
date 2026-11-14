"use client";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Home,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

export type AddressType = "home" | "work" | "other";

export type CustomerAddress = {
  id: string;
  fullName: string;
  phone: string;
  type: AddressType;
  addressLine: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
  isDefault: boolean;
};

type AddressCardProps = {
  address: CustomerAddress;
  onEdit: (addressId: string) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
};

const addressTypeConfig = {
  home: {
    label: "Home",
    icon: Home,
  },
  work: {
    label: "Work",
    icon: BriefcaseBusiness,
  },
  other: {
    label: "Other",
    icon: MapPin,
  },
};

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const typeConfig = addressTypeConfig[address.type];
  const TypeIcon = typeConfig.icon;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg">
            <TypeIcon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{typeConfig.label}</h3>
              {address.isDefault && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground font-bold">
              Saved delivery address
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="secondary"
            className="rounded-lg p-2 text-muted-foreground font-bold transition hover:bg-muted hover:text-foreground"
            onClick={() => onEdit(address.id)}
          >
            <Pencil size={17} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="rounded-lg p-2 text-muted-foreground font-bold transition hover:bg-muted hover:text-foreground"
            onClick={() => onDelete(address.id)}
          >
            <Trash2 size={17} />
          </Button>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        <div>
          <p className="font-medium">{address.fullName}</p>
          <p className="mt-1 tex-sm text-muted-foreground">{address.phone}</p>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={17} className="text-muted-foreground font-bold" />
          <div>
            <p>{address.addressLine}</p>
            <p>{address.area}</p>
            {address.landmark && <p>Near {address.landmark}</p>}
            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t pt-4">
        {address.isDefault ? (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Star size={16} />
            Primary delivery address
          </div>
        ) : (
          <Button
            type="button"
            className="text-sm font-medium"
            onClick={() => onSetDefault(address.id)}
          >
            Set as Default
          </Button>
        )}
      </div>
    </div>
  );
}
