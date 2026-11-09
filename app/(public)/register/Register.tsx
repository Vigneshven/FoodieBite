"use client";

import { registerCustomer } from "@/api/api";
import RegisterLayout from "@/component/auth/register/RegisterLayout";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Bike, Store, UserRound, Eye, EyeOff, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

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
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
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

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
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
                  <label key={account.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={account.value}
                      {...register("role")}
                      className="sr-only"
                    />

                    <Card
                      className={`h-full transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="flex h-full flex-col gap-3 p-3">
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
                            className={`flex size-5 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/40"
                            }`}
                          >
                            {isSelected && <Check className="size-3" />}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {account.label}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {account.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </label>
                );
              })}
            </div>

            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>

            <Input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              {...register("username")}
            />

            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a strong password"
                {...register("password")}
                className="pr-11"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Password must contain at least 8 characters.
            </p>
          </div>
          <Button type="submit" disabled={isLoading} className="h-11 w-full">
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
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
