"use client";
import { login, LoginCustomer } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (data: LoginCustomer) => {
    try {
      setIsLoading(true);
      const res = await login(data);

      reset({
        email: "",
        password: "",
      });
      toast.success("Login Successfully");
      router.replace(res.role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-amber-50 bg-card-background p-8 shadow"
      >
        <h4 className="mb-2 text-center text-2xl font-bold text-heading text-font-primary text-text-secondary">
          Login
        </h4>

        <label
          htmlFor="email"
          className="text-sm font-medium text-heading text-font-primary text-text-secondary"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email")}
          className="rounded border border-border bg-transparent p-2 outline-none focus:ring-2 focus:ring-blue-500 text-font-primary text-text-secondary"
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <label
          htmlFor="password"
          className="text-sm font-medium text-heading text-font-primary text-text-secondary"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="rounded border border-border bg-transparent p-2 outline-none focus:ring-2 focus:ring-blue-500 text-font-primary text-text-secondary"
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="text-font-primary text-text-secondary w-20 p-1 rounded bg-blue-300 hover:cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </div>
        <p className="mt-2  font-bold text-center text-mb text-font-primary text-text-secondary">
          Not a member yet?{" "}
          <Link className="hover:underline text-primary" href={"/register"}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
