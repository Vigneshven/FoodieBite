"use client";

import { registerCustomer } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Bike, Store, UserRound, Eye, EyeOff } from "lucide-react";
import RegisterLayout from "@/component/auth/register/RegisterLayout";

const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),

  email: z.string().trim().email("Enter a valid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  role: z.enum(["customer", "restaurant_owner", "delivery_partner"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

const accountTypes = [
  {
    value: "customer",
    label: "Customer",
    description: "Order your favourite food",
    icon: UserRound,
  },
  {
    value: "restaurant_owner",
    label: "Restaurant Owner",
    description: "Manage your restaurant",
    icon: Store,
  },
  {
    value: "delivery_partner",
    label: "Delivery Partner",
    description: "Deliver orders and earn",
    icon: Bike,
  },
] as const;

export default function Register() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  const selectedRole = watch("role");

  const handleRegister = async (data: RegisterForm) => {
    setIsLoading(true);

    try {
      await registerCustomer(data);

      toast.success("Registered successfully!");
      reset();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterLayout>
      <div className="space-y-7">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">GET STARTED</p>

          <h2 className="text-3xl font-bold tracking-tight">
            Create your account
          </h2>

          <p className="text-sm text-muted-foreground">
            Join FoodieBite and get started today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold">
                Choose your account type
              </h3>

              <p className="text-xs text-muted-foreground">
                Select how you want to use FoodieBite.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {accountTypes.map((account) => {
                const Icon = account.icon;
                const isSelected = selectedRole === account.value;

                return (
                  <label
                    key={account.value}
                    className={`relative flex cursor-pointer flex-col gap-3 rounded-xl border p-3 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={account.value}
                      {...register("role")}
                      className="sr-only"
                    />

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex size-9 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <div
                        className={`size-4 rounded-full border-2 ${
                          isSelected
                            ? "border-primary bg-primary ring-2 ring-primary/20"
                            : "border-muted-foreground/40"
                        }`}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{account.label}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {account.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            {errors.role && (
              <p className="text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>

            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              {...register("username")}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
            />

            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="test1@example.com"
              {...register("email")}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition"
            />

            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a strong password"
                {...register("password")}
                className="h-11 w-full rounded-lg border border-input bg-background px-3 pr-11 text-sm outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}

            <p className="text-xs text-muted-foreground">
              Password must contain at least 8 characters.
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground transition"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="border-t pt-5 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </RegisterLayout>
  );
}
