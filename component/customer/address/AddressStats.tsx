import { House, MapPin, MapPinned } from "lucide-react";

export type AddressStatsProps = {
  totalAddresses: number;
  defaultAddresses: number;
  otherAddresses: number;
};

export default function AddressStats({
  totalAddresses,
  defaultAddresses,
  otherAddresses,
}: AddressStatsProps) {
  const stats = [
    {
      title: "Total Addresses",
      value: totalAddresses,
      description: "Saved locations",
      icon: MapPin,
    },
    {
      title: "Default Addresses",
      value: defaultAddresses,
      description: "Primary locations",
      icon: House,
    },
    {
      title: "Other Addresses",
      value: otherAddresses,
      description: "Additional locations",
      icon: MapPinned,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-card p-5 transition shadow-sm hover:-translate-y-1"
          >
            <div>
              <div className="h-4 w-4 rounded-lg">
                <Icon size={27} />
              </div>
            </div>
            <div className="space-y-1 mt-5">
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm font-bold">{stat.title}</p>
              <p className="mt-1 text-xs text-muted-foreground font-bold">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
