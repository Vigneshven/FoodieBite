import {
  CheckCircle2,
  Clock,
  CreditCard,
  RotateCcw,
  XCircle,
} from "lucide-react";

type RefundStatus = "Requested" | "Processing" | "Completed" | "Failed";

type RefundStatusProps = {
  refundId: string;
  amount: number;
  status: RefundStatus;
  requestedDate: string;
  completedDate?: string;
  paymentMethod: string;
  refundReference?: string;
};

const refundStatusConfig: Record<
  RefundStatus,
  { label: string; description: string; icon: typeof Clock; styles: string }
> = {
  Requested: {
    label: "Refund Requested",
    description: "Your refund request received",
    icon: Clock,
    styles: "bg-yellow-50 text-yellow-700",
  },
  Processing: {
    label: "Refund Processing",
    description: "Your refund request is being processing",
    icon: RotateCcw,
    styles: "bg-blue-50 text-blue-700",
  },
  Completed: {
    label: "Refund Completed",
    description: "Your refund completed",
    icon: CheckCircle2,
    styles: "bg-blue-50 text-blue-700",
  },
  Failed: {
    label: "Refund Failed",
    description: "Your refund not completed",
    icon: XCircle,
    styles: "bg-blue-50 text-blue-700",
  },
};

export default function RefundDetails({
  refundId,
  amount,
  status,
  requestedDate,
  completedDate,
  paymentMethod,
  refundReference,
}: RefundStatusProps) {
  const config = refundStatusConfig[status];
  const StatusIcon = config.icon;

  const steps = [
    {
      label: "Refund Requested",
      date: requestedDate,
      completed: true,
    },
    {
      label: "Refund Processing",
      date: status === "Processing" ? "Waiting" : "In Progress",
      completed: ["Processing", "Completed"].includes(status),
    },
    {
      label: "Refund Completed",
      date: completedDate ?? "Await for completion",
      completed: status === "Completed",
    },
  ];

  return (
    <section className="rounded-xl border bprder-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center">
          <RotateCcw size={20} />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Refund Details</h2>
          <p className="text-sm text-gray-500">Track your refund details</p>
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-500">Refund Amount</p>
            <h3 className="mt-1 text-2xl font-bold text-gray-900">{amount}</h3>
            <p className="mt-1 text-xs text-gray-500">Refund ID: {refundId}</p>
          </div>
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${config.styles}`}
          >
            <StatusIcon size={16} />
            {config.label}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-5 font-semibold text-gray-900">Refund Progress</h3>
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8  shrink-0 items-center justify-center rounded-full ${step.completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                >
                  {step.completed ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <Clock size={17} />
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute flex flex-col h-16">
                    <div
                      className={`relative top-4 h-full w-0.5 ${step.completed ? "bg-emerald-500" : "bg-border"}`}
                    />
                  </div>
                )}
              </div>
              <div className="pb-2">
                <p className="text-sm font-medium text-gray-900">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-gray-500">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5">
        <h3 className="mb-4 font-semibold text-gray-900">Refund Details</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Refund Method</span>
            <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <CreditCard size={16} className="text-gray-400" />
              {paymentMethod}
            </span>
          </div>
          {refundReference && (
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">Refund Reference</span>
              <span className="text-right text-sm font-medium text-gray-900">
                {refundReference}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Requested Date</span>
            <span className="text-right text-sm font-medium text-gray-900">
              {requestedDate}
            </span>
          </div>
          {completedDate && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">Completed Date</span>
              <span className="text-right text-sm font-medium text-gray-900">
                {completedDate}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={`mt-5 rounded-lg p-4 ${config.styles}`}>
        <p className="text-sm font-medium">{config.description}</p>
      </div>
    </section>
  );
}
