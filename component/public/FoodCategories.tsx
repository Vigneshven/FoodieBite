import Link from "next/link";

const categories = [
  {
    name: "Pizza",
    description: "Cheesy and delicious",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    color: "bg-orange-50",
    category: "pizza",
  },
  {
    name: "Burgers",
    description: "Juicy and satisfying",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    color: "bg-yellow-50",
    category: "burgers",
  },
  {
    name: "Biryani",
    description: "Rich and flavourful",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    color: "bg-red-50",
    category: "biryani",
  },
  {
    name: "Noodles",
    description: "Tasty Asian favourites",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
    color: "bg-amber-50",
    category: "noodles",
  },
  {
    name: "Desserts",
    description: "Sweet little happiness",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
    color: "bg-pink-50",
    category: "desserts",
  },
  {
    name: "Healthy Food",
    description: "Fresh and nutritious",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    color: "bg-green-50",
    category: "healthy",
  },
];

export default function FoodCategories() {
  return (
    <section id="categories" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
              Explore by taste
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What are you craving?
            </h2>

            <p className="mt-3 text-gray-500">
              Discover delicious food from your favourite categories.
            </p>
          </div>

          <Link
            href="#restaurants"
            className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
          >
            Explore all food →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.category}
              href={`/restaurants?category=${category.category}`}
              className={`group overflow-hidden rounded-2xl ${category.color} p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-white">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="px-1 pb-2 pt-4">
                <h3 className="font-bold text-gray-900">{category.name}</h3>

                <p className="mt-1 text-xs text-gray-500">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
