export default function HistoryPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Delivery History
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your completed, rejected, and cancelled delivery assignments.
        </p>
      </div>
    </div>
  );
}
