"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { getMyRestaurant, updateMyRestaurant } from "@/api/restaurantOwner/api";
import { toast } from "sonner";

export const restaurantType = ["Restaurant", "Cafe", "Fast Food", "Bakery"];

export const cuisineType = [
  "Indian",
  "South Indian",
  "Italian",
  "North Indian",
  "Chinese",
  "Mexican",
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const openingHoursSchema = z.object({
  day: z.enum(daysOfWeek),
  isClosed: z.boolean(),
  is24Hours: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

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
  category: z.string().min(1, "Please select food category"),
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
  logo: z.string().url("Enter a valid logo image URL"),
  image: z.string().url("Enter a valid cover image URL"),
  openingHours: z.array(openingHoursSchema).length(7),
});

type RestaurantForm = z.infer<typeof restaurantSchema>;

export default function RestaurantBasicInfo() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<RestaurantForm>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      restaurantType: "",
      cuisines: "",
      category: "",
      phone: "",
      email: "",
      streetAddress: "",
      landmark: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      logo: "",
      image: "",
      openingHours: [
        {
          day: "Monday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
        {
          day: "Tuesday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
        {
          day: "Wednesday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
        {
          day: "Thursday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
        {
          day: "Friday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
        {
          day: "Saturday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
        {
          day: "Sunday",
          isClosed: false,
          is24Hours: false,
          openTime: "09:00",
          closeTime: "22:00",
        },
      ],
    },
  });

  const onSubmit = async (data: RestaurantForm) => {
    try {
      const updatedData = Object.keys(dirtyFields).reduce((result, key) => {
        if (dirtyFields[key as keyof RestaurantForm]) {
          Object.assign(result, {
            [key]: data[key as keyof RestaurantForm],
          });
        }
        return result;
      }, {} as Partial<RestaurantForm>);
      if (Object.keys(updatedData).length === 0) {
        return;
      }
      await updateMyRestaurant(data);
      reset(data);
    } catch {
      toast.error("failed to update restaurant");
    }
  };

  const logoUrl = useWatch({
    control,
    name: "logo",
  });

  const imageUrl = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const restaurant = await getMyRestaurant();

        reset({
          name: restaurant.name ?? "",
          description: restaurant.description ?? "",
          restaurantType: restaurant.restaurantType ?? "",
          category: restaurant.category ?? "",
          cuisines: restaurant.cuisines ?? "",
          phone: restaurant.phone ?? "",
          email: restaurant.email ?? "",
          streetAddress: restaurant.streetAddress ?? "",
          landmark: restaurant.landmark ?? "",
          city: restaurant.city ?? "",
          state: restaurant.state ?? "",
          postalCode: restaurant.postalCode ?? "",
          country: restaurant.country ?? "India",
          logo: restaurant.logo ?? "",
          image: restaurant.image ?? "",
          openingHours: restaurant.openingHours,
        });
      } catch {
        toast.error("Failed to fetch restaurant");
      }
    }
    fetchRestaurant();
  }, [reset]);

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
          {cuisineType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.cuisines && (
          <p className="text-sm text-red-500">{errors.cuisines.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Food Category</Label>
        <select
          {...register("category")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select food category</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="both">Both</option>
        </select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
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
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label>Restaurant Logo URL</Label>

          <Input
            type="url"
            placeholder="Enter a valid url"
            {...register("logo")}
          />

          {errors.logo && (
            <p className="text-sm text-red-500">{errors.logo.message}</p>
          )}

          <div className="flex h-40 items-center justify-center rounded-lg border bg-muted/30 p-4">
            {logoUrl ? (
              <Image
                src={logoUrl}
                width={400}
                height={400}
                alt="Restaurant logo preview"
                className="h-full max-w-full object-contain"
              />
            ) : (
              <p className="text-sm text-muted-foreground">Logo preview</p>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <Label>Image URL</Label>

          <Input
            type="url"
            placeholder="enter a valid url"
            {...register("image")}
          />

          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}

          <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg border bg-muted/30">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={400}
                height={400}
                alt="Restaurant cover preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="text-sm text-muted-foreground">Image preview</p>
            )}
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-lg font-semibold">Restaurant Opening Hours</h2>
            <p className="text-sm text-muted-foreground">
              Set the operating hours for each day of the week.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-28">
                  <p className="font-medium">{day}</p>
                </div>

                <Input
                  type="time"
                  className="w-32"
                  {...register(`openingHours.${index}.openTime`)}
                />

                <Input
                  type="time"
                  className="w-32"
                  {...register(`openingHours.${index}.closeTime`)}
                />

                <Label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Input
                    type="checkbox"
                    className="h-4 w-4"
                    {...register(`openingHours.${index}.isClosed`)}
                  />
                  Closed
                </Label>

                <Label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Input
                    type="checkbox"
                    className="h-4 w-4"
                    {...register(`openingHours.${index}.is24Hours`)}
                  />
                  Open 24 hours
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Restaurant Information</Button>
      </div>
    </form>
  );
}
