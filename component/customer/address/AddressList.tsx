import AddressCard, { CustomerAddress } from "./AddressCard";

type AddressListProps = {
  addresses: CustomerAddress[];
  onEdit: (addressId: string) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
};

export default function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressListProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Saved Address</h2>
        <span className="text-sm text-muted-foreground">
          {addresses.length} {addresses.length === 1 ? "address" : "addresses"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
          />
        ))}
      </div>
    </section>
  );
}
