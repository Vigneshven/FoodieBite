import { getRestaurants } from "@/api/api";
import Image from "next/image";

async function RecentAddedRestaurant() {
  const recentRestaurant = await getRestaurants();

  const restaurant = recentRestaurant.splice(0, recentRestaurant.length - 1);

  return (
    <>
      <div className="flex gap-4">
        {restaurant.length === 0 ? (
          <div>
            <p>No Recent Restaurant Added</p>
          </div>
        ) : (
          <div className="flex  overflow-y-auto gap-1 custom-scroll">
            {restaurant.map((item) => (
              <div key={item.id} className="shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="h-30 max-w-3xs object-cover mb-3 rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default RecentAddedRestaurant;
