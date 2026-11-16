import AvailabilityCard from "@/component/deliveryPartner/dashboard/AvailabilityCard";
import CurrentDeliveryCard from "@/component/deliveryPartner/dashboard/CurrentDeliveryCard";
import DeliveryStats from "@/component/deliveryPartner/dashboard/DeliveryStats";
import DeliveryWelcome from "@/component/deliveryPartner/dashboard/DeliveryWelcome";
import NewDeliveryRequests from "@/component/deliveryPartner/dashboard/NewDeliveryRequests";
import RecentDeliveryActivity from "@/component/deliveryPartner/dashboard/RecentDeliveryActivity";

export default function DeliveryDashboardPage() {
  return (
    <div className="space-y-6">
      <DeliveryWelcome partnerName="Vignesh" isOnline={true} />
      <DeliveryStats />
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <AvailabilityCard />
        </div>
        <div className="sm:col-span-2">
          <CurrentDeliveryCard />
        </div>
      </div>
      <NewDeliveryRequests />
      <RecentDeliveryActivity />
    </div>
  );
}
