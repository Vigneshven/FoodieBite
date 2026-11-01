"use client";
import { registerCustomer, RegisterCustomer } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 character "),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "password must be at least 8 character"),
  role: z.enum(["customer", "restaurant_owner"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "customer",
    },
  });

  const handleRegister = async (data: RegisterCustomer) => {
    setIsLoading(true);
    try {
      await registerCustomer(data);
      toast.success("Register Successfully");
      reset();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center items-center">
      <form
        className="w-96 bg-amber-50 flex flex-col p-3 rounded-xl gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h4 className="text-center font-bold text-font-primary text-text-secondary">
          Register
        </h4>
        <label className="font-bold text-font-primary text-text-secondary">
          UserName
        </label>
        <input
          type="text"
          {...register("username")}
          className="rounded-lg border border-border bg-input-background p-2 text-heading text-text-secondary"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
        <label className="font-bold text-font-primary text-text-secondary">
          Email
        </label>
        <input
          type="text"
          {...register("email")}
          className="rounded-lg border border-border bg-input-background p-2 text-heading text-text-secondary"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <label className="font-bold text-font-primary text-text-secondary">
          Password
        </label>
        <input
          type="text"
          {...register("password")}
          className="rounded-lg border border-border bg-input-background p-2 text-heading text-text-secondary"
        />
        {errors.password && (
          <p className="text-red-500  text-sm">{errors.password.message}</p>
        )}
        <div className="flex gap-2">
          <label className="font-bold text-font-primary text-text-secondary">
            Select Your Account Type:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="restaurant_owner"
              value="restaurant_owner"
              {...register("role")}
            />
            <label
              className="font-bold text-font-primary text-text-secondary"
              htmlFor="Restuarant"
            >
              Restuarant Owner
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="customer"
              value="customer"
              {...register("role")}
            />
            <label
              className="font-bold text-font-primary text-text-secondary"
              htmlFor="customer"
            >
              customer
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            disabled={isLoading}
            className="text-font-primary text-text-secondary w-20 p-1 rounded bg-blue-300 hover:cursor-pointer"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
        <p className="text-center font-bold text-font-primary text-text-secondary">
          Already a member?{" "}
          <Link
            className="hover:underline text-primary font-bold text-font-primary"
            href={"/login"}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
