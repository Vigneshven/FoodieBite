import { getRestaurants } from "@/api/api";
import ProductAddForm from "@/component/ProductAddForm";
import Image from "next/image";
import Link from "next/link";

async function Restaurant() {
  const restaurants = await getRestaurants();

  return (
    <>
      <div>
        <div>
          {restaurants.length === 0 ? (
            <div>Add Restaurants</div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center mt-7">
                <div className="flex flex-col gap-10">
                  <h1 className="text-center text-2xl font-bold">
                    List of Restaurant
                  </h1>
                  <div className="flex flex-1/4 gap-1 overflow-x-auto w-full">
                    {restaurants.map((restaurant) => (
                      <Link key={restaurant.id} href={""} className="shrink-0 ">
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
              <div className="flex flex-1 justify-center items-center mt-5">
                <div>
                  <h2 className="font-bold text-2xl text-center">Restaurants To Add</h2>
                  <ProductAddForm />
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
