import PaymentDetails from "@/component/customer/payment/PaymentDetails";

type PaymentDetailsPageProps = {
  params: Promise<{ transactionId: string }>;
};

export default async function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { transactionId } = await params;

  return <PaymentDetails transactionId={transactionId} />;
}
