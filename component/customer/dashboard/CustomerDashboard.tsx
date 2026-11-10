import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Heart,
  Package,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";

const stats = [
  {
    title: "Total Orders",
    value: "24",
    description: "Orders placed so far",
    icon: ShoppingBag,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  {
    title: "Active Orders",
    value: "02",
    description: "Currently on the way",
    icon: Package,
    iconStyle: "bg-blue-100 text-blue-600",
  },
  {
    title: "Favorites",
    value: "08",
    description: "Restaurants you love",
    icon: Heart,
    iconStyle: "bg-pink-100 text-pink-600",
  },
];

const recentOrders = [
  {
    id: "#FB1024",
    restaurant: "The Burger House",
    items: "Classic Burger, French Fries",
    date: "Nov 08, 2026",
    amount: "₹349",
    status: "Delivered",
  },
  {
    id: "#FB1023",
    restaurant: "Pizza Paradise",
    items: "Margherita Pizza, Coke",
    date: "Nov 07, 2026",
    amount: "₹499",
    status: "On the way",
  },
  {
    id: "#FB1022",
    restaurant: "Spicy Kitchen",
    items: "Chicken Biryani",
    date: "Nov 05, 2026",
    amount: "₹249",
    status: "Delivered",
  },
];

const favoriteRestaurants = [
  {
    name: "The Burger House",
    category: "Burgers • Fast Food",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    color: "bg-orange-100",
  },
  {
    name: "Pizza Paradise",
    category: "Pizza • Italian",
    rating: "4.6",
    image: "https://images.pexels.com/photos/31596394/pexels-photo-31596394.jpeg",
    color: "bg-yellow-100",
  },
  {
    name: "Spicy Kitchen",
    category: "Indian • Biryani",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    color: "bg-red-100",
  },
];

const recommendedRestaurants = [
  {
    name: "Veg Soup",
    category: "Healthy Food",
    rating: "4.5",
    time: "20-30 min",
    image: "https://images.pexels.com/photos/8738014/pexels-photo-8738014.jpeg",
    color: "bg-green-100",
  },
  {
    name: "gulab jamun",
    category: "Desserts",
    rating: "4.9",
    time: "15-25 min",
    image: "https://images.pexels.com/photos/29259167/pexels-photo-29259167.jpeg",
    color: "bg-pink-100",
  },
  {
    name: "Chicken Biryani",
    category: "indian",
    rating: "4.6",
    time: "25-35 min",
    image: "https://images.pexels.com/photos/39536492/pexels-photo-39536492.jpeg",
    color: "bg-yellow-100",
  },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-500 to-orange-400 p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-medium text-orange-100">Welcome back!</p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Good food, good mood!
          </h2>

          <p className="mt-3 text-sm leading-6 text-orange-50 sm:text-base">
            Discover delicious meals from your favorite restaurants and get them
            delivered right to your doorstep.
          </p>

          <Link
            href="/customer/restaurant"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Explore Restaurants
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="absolute -right-5 -top-8 text-[150px] opacity-20 sm:right-10 sm:text-[190px]">
          🍕
        </div>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Your Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            A quick look at your FoodieBite activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon size={23} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <p className="mt-1 text-sm text-gray-500">
              Keep track of your latest orders.
            </p>
          </div>

          <Link
            href="/customer/orders"
            className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900">
                  {order.restaurant}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{order.items}</p>

                <p className="mt-1 text-xs text-gray-400">
                  {order.id} • {order.date}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Favorites</h2>
            <p className="mt-1 text-sm text-gray-500">
              Restaurants you love ordering from.
            </p>
          </div>

          <Link
            href="/customer/favorites"
            className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {favoriteRestaurants.map((restaurant) => (
            <div
              key={restaurant.name}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-36 items-center justify-center text-7xl ${restaurant.color}`}
              >
                <Image
                  className="h-full w-full object-cover"
                  src={restaurant.image}
                  alt={restaurant.name}
                  width={300}
                  height={300}
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                  <Heart size={18} className="fill-pink-500 text-pink-500" />
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {restaurant.category}
                </p>

                <div className="mt-3 flex items-center gap-1 text-sm text-gray-600">
                  <Star size={15} className="fill-yellow-400 text-yellow-400" />
                  {restaurant.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recommended For You
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover something delicious today.
            </p>
          </div>

          <Link
            href="/customer/restaurant"
            className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Explore
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recommendedRestaurants.map((restaurant) => (
            <div
              key={restaurant.name}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
            >
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl ${restaurant.color}`}
              >
                <Image
                  className="h-full w-full object-cover"
                  src={restaurant.image}
                  alt={restaurant.name}
                  width={300}
                  height={300}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-gray-900">
                  {restaurant.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {restaurant.category}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star
                      size={13}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {restaurant.rating}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {restaurant.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
