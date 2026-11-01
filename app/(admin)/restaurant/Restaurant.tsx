import { getRestaurants } from "@/api/api";
import RestuarantAddForm from "@/component/RestaurantAddForm";
import RestaurantRemoveForm from "@/component/RestaurantRemoveForm";
import Image from "next/image";
import Link from "next/link";

async function Restaurant() {
  const restaurants = await getRestaurants();

  return (
    <>
      <div className="bg-primary h-screen">
        <div className="flex flex-col gap-2">
          {restaurants.length === 0 ? (
            <div className="text-text-secondary">Add Restaurants</div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col gap-10">
                  <h1 className="text-center text-2xl text-text-primary font-bold">
                    List of Restaurant
                  </h1>
                  <div className="flex justify-items-start items-center">
                    <p className="text-xl font-bold text-font-primary">
                      {restaurants.length} shows restaurants
                    </p>
                  </div>
                  <div className="flex flex-1/4 gap-1 overflow-x-auto custom-scroll w-full">
                    {restaurants.map((restaurant) => (
                      <Link key={restaurant.id} href={""} className="shrink-0">
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          width={500}
                          height={500}
                          className="h-56 object-cover rounded-2xl"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-evenly items-center mt-5 gap-2">
                <div className="bg-primary">
                  <h2 className="font-bold text-2xl text-center text-text-secondary text-font-primary">
                    Restaurants To Add
                  </h2>
                  <RestuarantAddForm />
                </div>
                <div>
                  <h2 className="font-bold text-2xl text-center text-text-secondary text-font-primary">
                    Remove Restarant
                  </h2>
                  <RestaurantRemoveForm />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Restaurant;
