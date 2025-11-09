"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react"; // ✅ أضف هذا

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    ),
  password: z
    .string()
    .nonempty("Password required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 chars, uppercase, lowercase, number, and special char"
    ),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleLogin(values: LoginFormValues) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, 
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden py-5">
      <img
        src="/pexels-jmeyer1220-668300.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 w-full max-w-md b p-8 rounded-2xl shadow-lg border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6 shadow-lg">
          Login
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="bg-white/30 border-white/50 text-white placeholder-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="bg-white/30 border-white/50 text-white placeholder-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </Form>

        <p className="text-center text-sm text-white/80 mt-4">
          Don’t have an account?{" "}
          <a href="/Rigister" className="text-blue-300 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
