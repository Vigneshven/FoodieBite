import { prisma } from "../lib/prisma";

const img = (id: string, width = 1200) =>
  `https://unsplash.com{id}?auto=format&fit=crop&w=${width}&q=80`;

type RestaurantStatus = "active" | "pending";

type OpeningHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

const restaurants: {
  id: number;
  imageId: string;
  logoId: string;
  name: string;
  email: string;
  category: string;
  phone: string;
  status: RestaurantStatus;
  createdAt: Date;
  rating: number;
  description: string;
  restaurantType: string;
  cuisines: string;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  openingHours: OpeningHours;
}[] = [
  {
    id: 1,
    imageId: "1517248135467-4c7edcad34c4",
    logoId: "1515003197210-e0cd71810b5f",
    name: "The Spice Route",
    email: "hello@thespiceroute.in",
    category: "North Indian",
    phone: "+919876540001",
    status: "active",
    createdAt: new Date("2026-01-12T10:00:00.000Z"),
    rating: 4.6,
    description: "A warm neighbourhood kitchen serving traditional North Indian favourites.",
    restaurantType: "Casual Dining",
    cuisines: "North Indian, Mughlai, Kebabs",
    streetAddress: "12 Linking Road",
    landmark: "Near City Mall",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    country: "India",
    openingHours: {
      monday: "11:00-23:00",
      tuesday: "11:00-23:00",
      wednesday: "11:00-23:00",
      thursday: "11:00-23:00",
      friday: "11:00-23:30",
      saturday: "11:00-23:30",
      sunday: "11:00-22:30",
    },
  },
  {
    id: 2,
    imageId: "1555396273-367ea4eb4db5",
    logoId: "1601050690597-df0568f70950",
    name: "Coastal Curry House",
    email: "orders@coastalcurry.in",
    category: "South Indian",
    phone: "+919876540002",
    status: "active",
    createdAt: new Date("2026-02-03T10:00:00.000Z"),
    rating: 4.4,
    description: "Fresh coastal flavours, seafood specialities, and comforting regional thalis.",
    restaurantType: "Family Restaurant",
    cuisines: "South Indian, Seafood, Coastal",
    streetAddress: "44 Residency Road",
    landmark: "Opposite Central Park",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560025",
    country: "India",
    openingHours: {
      monday: "12:00-22:30",
      tuesday: "12:00-22:30",
      wednesday: "12:00-22:30",
      thursday: "12:00-22:30",
      friday: "12:00-23:00",
      saturday: "12:00-23:00",
      sunday: "12:00-22:00",
    },
  },
  {
    id: 3,
    imageId: "1579751626657-72bc17010498",
    logoId: "1547592180-85f173990554",
    name: "Wok & Roll",
    email: "eat@wokandroll.in",
    category: "Asian",
    phone: "+919876540003",
    status: "active",
    createdAt: new Date("2026-02-21T10:00:00.000Z"),
    rating: 4.2,
    description: "Pan-Asian comfort food with bold sauces, wok-tossed noodles, and rice bowls.",
    restaurantType: "Quick Service",
    cuisines: "Chinese, Thai, Asian Fusion",
    streetAddress: "8 Park Street",
    landmark: "Beside Metro Gate 3",
    city: "Kolkata",
    state: "West Bengal",
    postalCode: "700016",
    country: "India",
    openingHours: {
      monday: "11:30-22:30",
      tuesday: "11:30-22:30",
      wednesday: "11:30-22:30",
      thursday: "11:30-22:30",
      friday: "11:30-23:00",
      saturday: "11:30-23:00",
      sunday: "11:30-22:30",
    },
  },
  {
    id: 4,
    imageId: "1579684947550-22e945225d9a",
    logoId: "1512621776951-a57141f2eefd",
    name: "Green Bowl Cafe",
    email: "hi@greenbowl.in",
    category: "Healthy Food",
    phone: "+919876540004",
    status: "pending",
    createdAt: new Date("2026-03-06T10:00:00.000Z"),
    rating: 4.0,
    description: "Wholesome grain bowls, fresh salads, smoothies, and plant-forward meals.",
    restaurantType: "Cafe",
    cuisines: "Healthy, Vegan, Continental",
    streetAddress: "27 Jubilee Hills",
    landmark: "Near Film Nagar Junction",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500033",
    country: "India",
    openingHours: {
      monday: "08:00-21:00",
      tuesday: "08:00-21:00",
      wednesday: "08:00-21:00",
      thursday: "08:00-21:00",
      friday: "08:00-22:00",
      saturday: "08:00-22:00",
      sunday: "08:00-21:00",
    },
  },
  {
    id: 5,
    imageId: "1550547660-d9450f859349",
    logoId: "1568901346375-23c9450c58cd",
    name: "Smash Burger Co.",
    email: "contact@smashburgerco.in",
    category: "Fast Food",
    phone: "+919876540005",
    status: "active",
    createdAt: new Date("2026-03-18T10:00:00.000Z"),
    rating: 4.3,
    description: "Crispy fries, loaded burgers, and thick shakes made for easy sharing.",
    restaurantType: "Quick Service",
    cuisines: "Burgers, American, Fast Food",
    streetAddress: "19 FC Road",
    landmark: "Next to Riverside Theatre",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411004",
    country: "India",
    openingHours: {
      monday: "11:00-23:00",
      tuesday: "11:00-23:00",
      wednesday: "11:00-23:00",
      thursday: "11:00-23:00",
      friday: "11:00-00:00",
      saturday: "11:00-00:00",
      sunday: "11:00-23:00",
    },
  },
];

async function main() {
  for (const { imageId, logoId, ...r } of restaurants) {
    const data = {
      ...r,
      image: img(imageId, 1200),
      logo: img(logoId, 400),
    };

    await prisma.restaurants.upsert({
      where: { id: r.id },
      create: data,
      update: data,
    });
  }

  console.log(`Seeded ${restaurants.length} restaurants`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
