"use client";
import { addRestaurantInDb } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export type InputForm = {
  name: string;
  image: string;
  category: "veg" | "non-veg" | "all";
};

const schema = z.object({
  name: z.string().min(3, "Enter at least 3 character"),
  image: z.string().url({ message: "Please enter a valid url" }),
  category: z.enum(["veg", "non-veg", "all"]),
});

type RestaurantAddForm = z.infer<typeof schema>;

function RestaurantAddForm() {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  async function handleAddRestaurant() {
    try {
      setAdding(true);

      await addRestaurantInDb({
        name: name,
        image: image,
        category: category,
      });
      toast.success("Restaurant Added Successfully");
    } catch {
      toast.error("Failed to add Restaurants");
    } finally {
      setAdding(false);
    }
  }

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RestaurantAddForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      category: "all",
    },
  });

  const onReset = () => {
    const defaults: InputForm = {
      name: "",
      image: "",
      category: "all",
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
          Add Restaurants
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
            <div className="flex gap-4">
              <label className="text-xl text-text-secondary">
                Restaurant Image URL :{" "}
              </label>
              <div className="flex flex-col">
                <input
                  {...register("image")}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste Restaurants Image Link Here"
                  className="p-2 rounded-xl min-w-2/6 bg-amber-50  placeholder:text-text-third w-40 placeholder: text-font-primary"
                />
                {errors.image && (
                  <p className="text-red-600">{errors.image.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <label className="text-xl text-text-secondary">
                Restaurant Category of Food :{" "}
              </label>
              <select
                {...register("category")}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-amber-50  placeholder:text-text-third rounded-xl w-20"
              >
                <option value="all" className="text-text-third">
                  all
                </option>
                <option value="veg" className="text-text-third">
                  veg
                </option>
                <option value="non-veg" className="text-text-third">
                  non-veg
                </option>
              </select>
            </div>
            <div className="flex w-full justify-evenly items-center">
              <button
                className="hover: cursor-pointer bg-amber-300 w-20 p-2 rounded-xl text-text-secondary font-bold text-font-primary"
                onClick={handleAddRestaurant}
              >
                Add
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

export default RestaurantAddForm;
