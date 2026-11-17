import EarningsOverview from "@/component/deliveryPartner/earnings/EarningsOverview";
import EarningsPageHeader from "@/component/deliveryPartner/earnings/EarningsPageHeader";
import EarningsStats from "@/component/deliveryPartner/earnings/EarningsStats";
import PayoutSummary from "@/component/deliveryPartner/earnings/PayoutSummary";
import RecentEarnings from "@/component/deliveryPartner/earnings/RecentEarnings";

export default function DeliveryEarningsPage() {
  return (
    <div className="space-y-6">
      <EarningsPageHeader />
      <EarningsStats />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <EarningsOverview />
        </div>
        <PayoutSummary />
      </div>
      <RecentEarnings />
    </div>
  );
}
