import { getCustomers } from "@/api/api";
import RemoveButton from "@/component/RemoveButton";
import CustomerAddForm from "@/component/restaurant/CustomerAddForm";

async function Customer() {
  const customers = await getCustomers();

  return (
    <>
      <div className="bg-primary h-screen">
        <div className="flex flex-col gap-2">
          {customers.length === 0 ? (
            <div className="text-text-secondary">Add Customers</div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col gap-10">
                  <h1 className="text-center text-2xl text-text-primary font-bold">
                    List of Customers
                  </h1>
                  <div className="text-xl justify-center items-center">
                    <p className="text-xl font-bold text-font-primary">
                      {customers.length} shows customers
                    </p>
                  </div>
                </div>
                <div className="mt-10 flex flex-1/4 gap-1 overflow-x-auto custom-scroll w-full">
                  {customers.map((customer) => (
                    <div key={customer.id}>
                      <div className="flex flex-col gap-1 justify-center items-center shrink-0 border-amber-50 w-65 h-30 bg-amber-50 rounded-2xl">
                        <h1 className="font-bold text-font-primary">
                          Customer Name : {customer.username}
                        </h1>
                        <h2 className="font-bold text-font-primary">
                          Customer Role :{customer.role}
                        </h2>
                        <div className="flex gap-10 p-1">
                          <RemoveButton email={customer.email} />
                          <button className="bg-pink-400 p-2 rounded-xl hover:cursor-pointer">
                            Suspend
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 justify-evenly items-center mt-5 gap-2">
                <div className="">
                  <h2 className="font-bold text-2xl text-center text-text-secondary text-font-primary">
                    Add Customers
                  </h2>
                  <CustomerAddForm />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Customer;
