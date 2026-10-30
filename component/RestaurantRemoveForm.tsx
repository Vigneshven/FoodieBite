"use client";
import { deleteRestaurantInDb } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export type InputForm = {
  name: string;
};

const schema = z.object({
  name: z.string().min(3, "Enter at least 3 character"),
});

type RestaurantRemoveForm = z.infer<typeof schema>;

function RestaurantRemoveForm() {
  const [name, setName] = useState("");
  const [removing, setRemoving] = useState(false);

  async function handleRemoveRestaurant() {
    try {
      setRemoving(true);
      await deleteRestaurantInDb(name);
      toast.success("Restaurant Removed Successfully");
    } catch {
      toast.error("Failed to remove Restarant");
    } finally {
      setRemoving(false);
      setName("");
    }
  }

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RestaurantRemoveForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onReset = () => {
    const defaults: InputForm = {
      name: "",
    };
    reset(defaults);
  };

  const Submit = () => {
    console.log("submitted");
  };

  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl justify-center items-center p-15 mt-5 bg-amber-50">
        <h2 className="font-bold text-2xl text-font-primary">
          Remove Restaurants
        </h2>
        <div className="flex flex-col gap-2 bg-box-primary">
          <form className="flex flex-col gap-7" onSubmit={handleSubmit(Submit)}>
            <div className="flex gap-4">
              <label className="text-xl text-text-secondary">
                Enter Restaurants Name:{" "}
              </label>
              <div>
                <input
                  {...register("name")}
                  placeholder="Enter Restaurants Name "
                  className="p-2 rounded-xl min-w-2/6 bg-amber-50 shadow-black placeholder:text-text-third w-40 placeholder: text-font-primary"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-evenly items-center">
              <button
                className="hover: cursor-pointer bg-amber-300 w-20 p-2 rounded-xl text-text-secondary font-bold text-font-primary"
                onClick={handleRemoveRestaurant}
              >
                Remove
              </button>
              <button
                className="hover:cursor-pointer bg-amber-50 w-20 p-2 rounded-xl text-text-secondary font-bold text-font-primary"
                onClick={onReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RestaurantRemoveForm;
