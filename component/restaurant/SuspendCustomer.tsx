import type { Customer } from "@/api/type/customer";
import ActivateButton from "@/component/ActivateButton";

type SuspendCustomerProps = {
  customers: Customer[];
};

function SuspendCustomer({ customers }: SuspendCustomerProps) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl bg-amber-50 p-4">
      {customers.length === 0 ? (
        <p className="text-font-primary">No suspended customers</p>
      ) : (
        <table className="min-w-full text-left text-font-primary">
          <thead>
            <tr className="border-b border-amber-200">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-amber-100">
                <td className="px-4 py-3">{customer.username}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.role}</td>
                <td className="px-4 py-3">
                  <ActivateButton email={customer.email} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SuspendCustomer;
