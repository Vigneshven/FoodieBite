"use client";

import { login, LoginCustomer } from "@/api/api";
import LoginLayout from "@/component/auth/login/LoginLayout";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [isInvitedOwner, setIsInvitedOwner] = useState(false);
  const [invitationError, setInvitationError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");
    const invitation = params.get("invitation");

    if (invitation === "accepted" && email) {
      setValue("email", email, {
        shouldValidate: true,
      });
      setIsInvitedOwner(true);
    }
    if (invitation === "invalid") {
      setInvitationError(
        "Your invitation link is invalid, expired, or already used.Please contact the administrator.",
      );
    }

    if (invitation === "error") {
      setInvitationError(
        "Unable to verify your invitation. Please try again or contact the administrator.",
      );
    }
  }, [setValue]);

  const handleLogin = async (data: LoginCustomer) => {
    try {
      setIsLoading(true);

      const res = await login(data);

      reset({
        email: "",
        password: "",
      });

      toast.success("Login Successfully");

      let dashboardPath = "/";

      if (res.role === "admin") {
        dashboardPath = "/admin";
      } else if (res.role === "customer") {
        dashboardPath = "/customer";
      } else if (res.role === "restaurant_owner") {
        dashboardPath =
          res.onboardingStatus === "profile_pending"
            ? "/restaurant/profile"
            : "/restaurant";
      } else if (res.role === "delivery_partner") {
        dashboardPath = "/deliverypartner";
      }
      router.replace(dashboardPath);
      router.refresh();
    } catch {
      toast.error("Login Failed");
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
        {isInvitedOwner && (
          <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 className="mt-1 size-5 shrink-0" />

            <div>
              <p className="font-semibold">Restaurant invitation accepted!</p>

              <p className="mt-1">
                Please sign in using your invited email address.
              </p>
            </div>
          </div>
        )}
        {invitationError && (
          <div className="rounded-lg border border-red-30 bg-red-50 p-4 text-sm text-red-500">
            {invitationError}
          </div>
        )}
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
                readOnly={isInvitedOwner}
                {...register("email")}
                className={`h-12 pl-10 ${
                  isInvitedOwner
                    ? "cursor-not-allowed bg-muted text-muted-foreground"
                    : ""
                }`}
              />
            </div>

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
            {isInvitedOwner && (
              <p className="text-xs text-muted-foreground">
                This email address is linked to your restaurant invitation.
              </p>
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
