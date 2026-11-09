"use client";

import { login, LoginCustomer } from "@/api/api";
import LoginLayout from "@/component/auth/login/LoginLayout";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginCustomer) => {
    try {
      setIsLoading(true);

      const res = await login(data);

      reset({
        email: "",
        password: "",
      });

      toast.success("Login Successfully");

      const dashboardPath =
        res.role === "admin"
          ? "/admin"
          : res.role === "customer"
            ? "/customer"
            : "/";
      router.replace(dashboardPath);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout>
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <LockKeyhole className="size-3.5" />
            SECURE ACCOUNT ACCESS
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back!
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Sign in to your FoodieBite account and continue enjoying your
            favourite food.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
                className="h-12 pl-10"
              />
            </div>

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password")}
                className="h-12 pl-10 pr-11"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
          </div>

          <Button type="submit" disabled={isLoading} className="h-12 w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <LockKeyhole className="size-3.5" />
          Your login information is securely protected.
        </div>
      </div>
    </LoginLayout>
  );
}
