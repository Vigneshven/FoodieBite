export default function RestaurantDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Restaurant Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your restaurant, menu, and orders.
        </p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Get started</h2>
        <p className="mt-2 text-sm text-gray-600">
          Add your restaurant profile to start setting up your FoodieBite page.
        </p>
      </section>
    </div>
  );
}
