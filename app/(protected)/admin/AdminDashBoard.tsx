function AdminDashBoard() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-2 h-180">
        <div className="flex w-full h-60 border">
          <div className="border w-1/2 flex justify-center">
            <h2>Restaurants Reports</h2>
          </div>

          <div className="border w-1/2 flex justify-center">
            <h2>Customer Reports</h2>
          </div>
        </div>
        <div className="flex w-full h-60 border">
          <div className="border w-1/2 flex justify-center">
            <h2>Order Reports</h2>
          </div>

          <div className="border w-1/2 flex justify-center">
            <h2>Delivery Partners Reports</h2>
          </div>
        </div>
      </div>
      <div className=" border flex w-full ">
        <h2>Recently Added Restaurants</h2>
      </div>
    </>
  );
}

export default AdminDashBoard;
