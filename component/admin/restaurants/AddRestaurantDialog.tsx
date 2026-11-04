"use client";

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
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AddRestaurantDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const restaurantData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cuisine: formData.get("cuisine"),
    };

    void restaurantData;
    setOpen(false);
    event.currentTarget.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter restaurant name"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <select name="cuisine" id="cuisine" defaultValue="" required
              className="h-10 w-full rounded-md border-input bg-background px-3 text-sm outline-none">
                <option value="" disabled>
                  Select Cuisine
                </option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="natural">natural</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Restaurant</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
