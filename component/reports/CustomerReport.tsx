import { getCustomers } from "@/api/api";

async function CustomerReport() {
  const customers = await getCustomers();

  return (
    <>
      {customers.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="font-bold text-font-primary">
            Add Customers To View Here
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-8 items-center">
          <div>
            <h2 className="text-font-primary">Customer List</h2>
          </div>
          <div className="overflow-y-auto max-w-full rounded-xl border border-border max-h-7/12">
            <table className="border-border border-spacing-x-80">
              <thead className="p-3 border-b-2">
                <tr className="border-t-1.2 text-center p-3">
                  <td className="p-3 font-bold text-font-primary border-r">
                    {" "}
                    Customer Name
                  </td>
                  <td className="p-3 font-bold text-font-primary border-r">
                    {" "}
                    Customer Role
                  </td>
                </tr>
              </thead>
              <tbody className="p-3">
                {customers.map((customer) => (
                  <tr
                    className="border-border text-center p-3"
                    key={customer.id}
                  >
                    <td className="p-3 font-bold text-font-primary border-r">
                      {customer.username}
                    </td>
                    <td className="p-3 font-bold text-font-primary">
                      {customer.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-font-primary font-bold">
              Total No of Customer : {customers.length}
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerReport;
