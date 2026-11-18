export type RestaurantForm = {
  name: string;
  description: string;
  restaurantType: string;
  category: string;
  cuisines: string;
  phone: string;
  email: string;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  logo: string;
  image: string;
  openingHours: {
    day: string;
    isClosed: boolean;
    is24Hours: boolean;
    openTime: string;
    closeTime: string;
  }[];
};
