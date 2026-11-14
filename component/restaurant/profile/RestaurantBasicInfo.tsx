"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const restaurantType = ["Restaurant", "Cafe", "Fast Food", "Bakery"];

export const cuisineType = [
  "Indian",
  "South Indian",
  "Italian",
  "North Indian",
  "Chinese",
  "Mexican",
];

const restaurantSchema = z.object({
  name: z
    .string()
    .min(3, "Restaurant name at least 3 characters")
    .max(100, "Restaurant name cannot exceed 100 characters"),
  description: z
    .string()
    .min(20, "Description at least 20 characters")
    .max(500, "Description cannot exceed 500 characters"),
  restaurantType: z.string().min(1, "Please select a restaurant type"),
  cuisines: z.string().min(1, "Select at least one cuisine"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10 digit number"),
  email: z.string().email("Enter a valid email address"),
  streetAddress: z
    .string()
    .min(5, "Enter a valid street address")
    .max(200, "Street address cannot exceed 200 characters"),
  landmark: z.string().max(100, "Landmark cannot exceed 100 characters"),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Enter your state"),
  postalCode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  country: z.string().min(2, "Enter your country"),
});

type RestaurantForm = z.infer<typeof restaurantSchema>;

export default function RestaurantBasicInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantForm>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      restaurantType: "",
      cuisines: "",
      phone: "",
      email: "",
      streetAddress: "",
      landmark: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  });

  const onSubmit = (data: RestaurantForm) => {
    console.log("Restaurant information:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Restaurant Information</h2>
      </div>
      <div className="space-y-2">
        <Label>Restaurant Name</Label>
        <Input
          placeholder="Enter your restaurant name"
          {...register("name")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Restaurant Description</Label>
        <textarea
          placeholder="describe your restauranta and food"
          rows={5}
          maxLength={500}
          {...register("description")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Restaurant Type</Label>
        <select
          {...register("restaurantType")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select restaurant type</option>
          {restaurantType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.restaurantType && (
          <p className="text-sm text-red-500">
            {errors.restaurantType.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Select Cuisines</Label>
        <select
          {...register("cuisines")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select cuisine</option>
          {restaurantType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.cuisines && (
          <p className="text-sm text-red-500">{errors.cuisines.message}</p>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Restaurant Phone</Label>
          <Input
            placeholder="Enter your restaurant phone"
            {...register("phone")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Restaurant Email</Label>
          <Input
            placeholder="Enter your restaurant email"
            {...register("email")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Street Address</Label>
        <Input
          placeholder="Enter building name, street and area"
          {...register("streetAddress")}
        />
        {errors.streetAddress && (
          <p className="text-sm text-red-500">{errors.streetAddress.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Landmark (Optional)</Label>
        <Input placeholder="Nearby landmark" {...register("landmark")} />
        {errors.landmark && (
          <p className="text-sm text-red-500">{errors.landmark.message}</p>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>City</Label>
          <Input placeholder="Enter city" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input placeholder="Enter state" {...register("state")} />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Postal Code</Label>
          <Input
            placeholder="Enter 6-digit PIN code"
            maxLength={6}
            {...register("postalCode")}
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Input {...register("country")} />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Restaurant Information</Button>
      </div>
    </form>
  );
}
