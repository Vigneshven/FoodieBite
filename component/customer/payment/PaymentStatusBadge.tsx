type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusStyles: Record<Exclude<PaymentStatus, "all">, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
  Refunded: "bg-green-100 text-green-700",
};

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
