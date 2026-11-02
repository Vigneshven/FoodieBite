import { getRestaurants } from "@/api/api";

async function RestaurantReport() {
  const restaurants = await getRestaurants();

  return (
    <>
      {restaurants.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="font-bold text-font-primary">
            Add Restaurant To View Here
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-2 items-center">
          <div>
            <h2 className="text-font-primary">Restauarnt List</h2>
          </div>
          <div className="overflow-y-auto max-w-full rounded-xl border border-border max-h-7/12">
            <table className="border-border border-spacing-x-80">
              <thead className="p-3 border-b-2">
                <tr className="border-t-1.2 text-center p-3">
                  <td className="p-3 font-bold text-font-primary border-r">
                    Restaurant Name
                  </td>
                  <td className="p-3 font-bold text-font-primary">
                    Restaurant Category
                  </td>
                </tr>
              </thead>
              <tbody className="p-3">
                {restaurants.map((restaurant) => (
                  <tr
                    className="border-border text-center p-3"
                    key={restaurant.id}
                  >
                    <td className="p-3 font-bold text-font-primary border-r">
                      {restaurant.name}
                    </td>
                    <td className="p-3 font-bold text-font-primary">
                      {restaurant.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-font-primary font-bold">Total No of Restaurant : {restaurants.length}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantReport;
