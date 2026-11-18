"use client";

import { createRestaurant } from "@/api/admin/restaurant/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRestaurantStore } from "@/store/admin/restaurantStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { type SubmitEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const restaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Restaurant Name is required")
    .max(25, "Restaurant name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must contains at least 10 digit")
    .max(15, "Phone number cannot exceeds 15 digits")
    .regex(/^[0-9]+$/, "Phone must be contains only digits"),

  cuisine: z.string().min(1, "Please select a cuisine"),
});

type RestaurantFormValue = {
  name: string;
  email: string;
  phone: string;
  cuisine: string;
};

export default function AddRestaurantDialog() {
  const open = useRestaurantStore((state) => state.isAddDialogOpen);

  const setOpen = useRestaurantStore((state) => state.setAddDialogOpen);

  const isAdding = useRestaurantStore((state) => state.isAddingRestaurant);

  const setIsAdding = useRestaurantStore(
    (state) => state.setIsAddingRestaurant,
  );

  const addRestaurant = useRestaurantStore((state) => state.addRestaurant);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RestaurantFormValue>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cuisine: "",
    },
  });

  async function onSubmit(data: RestaurantFormValue) {
    try {
      setIsAdding(true);
      const newRestaurant = await createRestaurant(data);

      addRestaurant(newRestaurant);
      toast.success("Restaurant Added Successfully");
      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to add restaurant");
    } finally {
      setIsAdding(false);
    }
  }
  function handleDialogChange(value: boolean) {
    if (!value && isAdding) return;

    setOpen(value);

    if (!value) {
      reset();
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Restaurant
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Add New Restaurant</DialogTitle>
          <DialogDescription>
            Enter the restaurant details to add
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Restaurant Name</Label>
            <Input placeholder="Enter restaurant name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                placeholder="Enter phone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <select
                defaultValue=""
                className="h-10 w-full rounded-md border-input bg-background px-3 text-sm outline-none"
                {...register("cuisine")}
              >
                <option value="" disabled>
                  Select Cuisine
                </option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="natural">natural</option>
              </select>
              {errors.cuisine && (
                <p className="text-sm text-red-500">{errors.cuisine.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isAdding}>
                {isAdding ? "Adding..." : "Add Restaurants"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
