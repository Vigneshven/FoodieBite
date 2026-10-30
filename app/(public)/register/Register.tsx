"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 character "),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "password must be at least 8 character"),
});

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const { register } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center items-center">
      <form className="w-96 bg-amber-50 flex flex-col p-3 rounded-xl gap-4">
        <h4 className="text-center font-bold text-font-primary">Register</h4>
        <label className="font-bold text-font-primary">UserName</label>
        <input
          type="text"
          {...register("username")}
          className="rounded-lg border border-border bg-input-background p-2 text-heading"
        />
        <label className="font-bold text-font-primary">Email</label>
        <input
          type="text"
          {...register("email")}
          className="rounded-lg border border-border bg-input-background p-2 text-heading"
        />
        <label className="font-bold text-font-primary">Password</label>
        <input
          type="text"
          {...register("password")}
          className="rounded-lg border border-border bg-input-background p-2 text-heading"
        />
        <button className="font-bold text-font-primary">Register</button>
        <p className="text-center font-bold text-font-primary">
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
