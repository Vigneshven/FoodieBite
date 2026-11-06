import DeliveryAssignment from "@/component/admin/delivery/edit/DeliveryAssignment";
import OrderInformation from "@/component/admin/delivery/edit/OrderInformation";

export default function EditDeliveryPage() {
  return (
    <div className="spce-y-6 p-4">
      <h1 className="text-2xl font-bold tracking-tight">Edit Delivery</h1>
      <OrderInformation />
      <DeliveryAssignment />
    </div>
  );
}
