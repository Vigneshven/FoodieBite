import QueryDetails from "@/component/admin/queries/QueryDetails";

type QueryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QueryPage({ params }: QueryPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Query Details</h1>
        <p className="text-sm text-muted-foreground">
          Review customer information and manage their support request.
        </p>
      </div>

      <QueryDetails queryId={id} />
    </div>
  );
}
