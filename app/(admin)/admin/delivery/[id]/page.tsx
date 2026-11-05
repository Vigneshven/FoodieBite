import CustomerInformation from "@/component/admin/delivery/details/CustomerInformation";
import DeliveryOverview from "@/component/admin/delivery/details/DeliveryOverview";
import DeliveryPartnerInformation from "@/component/admin/delivery/details/DeliveryPartnerInformation";
import RestaurantInformation from "@/component/admin/delivery/details/RestaurantInformation";

type DeliverDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const customer = {
  name: "test1",
  email: "test1@gmail.com",
  phone: "+91 12345 67890",
  address: "vellore",
  customerType: "VIP",
};

const restaurant = {
  name: "Pizza Palace",
  cuisine: "Italian, Pizza",
  phone: "+91 98765 12345",
  address: "10,New Street, Vellore, Tamil Nadu - 632002",
  status: "Active" as const,
};

const partner = {
  name: "test2",
  email: "test2@gmail.com",
  phone: "+91 12345 56785",
  vehicle: "Motorcycle",
  vehicleNo: "TN23 BA1366",
  rating: 4.5,
  totalDeliveries: 10,
  joinedDate: "Jan 12, 2026",
  status: "On Delivery",
};

export default async function DeliverDetailsPage({
  params,
}: DeliverDetailsPageProps) {
  const { id } = await params;

  return (
    <div>
      <DeliveryOverview orderId={id} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerInformation customer={customer} />
        <RestaurantInformation restaurant={restaurant} />
      </div>
      <div>
        <DeliveryPartnerInformation partner={partner} />
      </div>
    </div>
  );
}
