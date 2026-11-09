import EditDeliveryForm from "@/component/admin/delivery/edit/EditDeliveryForm";

type EditDeliveryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDeliveryPage({
  params,
}: EditDeliveryPageProps) {
  const { id } = await params;

  return (
    <div className="p-4 md:p-6">
      <EditDeliveryForm orderId={id} />
    </div>
  );
}
