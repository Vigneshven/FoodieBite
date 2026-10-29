"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type InputForm = {
  name: string;
  image: string;
  category: "veg" | "non-veg" | "all";
};

const schema = z.object({
  name: z.string(),
  image: z.string(),
  category: z.enum(["veg", "non-veg", "all"]),
});

function ProductAddForm() {
  const { register } = useForm<InputForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      category: "all",
    },
  });

  return (
    <>
      <div className="flex flex-col gap-5 border rounded-2xl justify-center items-center p-15 mt-5">
        <h2 className="font-bold text-2xl">Add Restaurants</h2>
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-7">
            <div className="flex gap-4">
              <label className="text-xl">Enter Restaurants Name: </label>
              <input
                placeholder="Enter Restaurants Name"
                className="p-1 rounded-2xl min-w-2/6"
                {...register("name")}
              />
            </div>
            <div className="flex gap-4">
              <label className="text-xl">Restaurant Image URL : </label>
              <input
                placeholder="Paste Restaurants Image Link Here"
                className="p-1 rounded-2xl min-w-2/6"
                {...register("image")}
              />
            </div>
            <div className="flex gap-4">
              <label>Restaurant Category of Food : </label>
              <select {...register("category")}>
                <option value="all">all</option>
                <option value="veg">veg</option>
                <option value="non-veg">non-veg</option>
              </select>
            </div>
            {/* <div className="flex w-full justify-evenly items-center">
              <button className="hover: cursor-pointer">Add</button>
              <button className="hover:cursor-pointer">Reset</button>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductAddForm;
