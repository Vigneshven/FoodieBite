import RecentAddedRestaurant from "@/component/RecentAddedRestaurant";
import RestaurantReport from "@/component/RestaurantReport";

function AdminDashBoard() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center h-screen bg-primary">
        <div className="flex w-full h-1/2 border-border">
          <div className="border-border w-1/2 flex flex-col gap-10 items-center justify-start bg-secondary ">
            <h2 className="font-bold text-font-primary text-black-50 mt-3">
              Restaurants Reports
            </h2>
            <RestaurantReport />
          </div>

          <div className="border-border w-1/2 flex justify-center bg-secondary">
            <h2 className="font-bold text-font-primary text-black-50">
              Customer Reports
            </h2>
          </div>
        </div>
        <div className="flex w-full h-1/3 border-border bg-secondary">
          <div className="border-border w-1/2 flex justify-center">
            <h2 className="font-bold text-font-primary text-black-50">
              Order Reports
            </h2>
          </div>

          <div className="border-border w-1/2 flex justify-center bg-secondary">
            <h2 className="font-bold text-font-primary text-black-50">
              Delivery Partners Reports
            </h2>
          </div>
        </div>
        <div className="border-border flex flex-col items-center w-full justify-start gap-2 h-1/5 bg-secondary">
          <h2 className="font-bold text-font-primary text-black-50">
            Recently Added Restaurants
          </h2>
          <div>
            <RecentAddedRestaurant />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;
