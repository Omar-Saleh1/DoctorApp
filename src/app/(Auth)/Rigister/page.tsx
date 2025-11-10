"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Zod Schema
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name too long"),
  email: z
    .string()
    .nonempty("Email required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email"),
  password: z
    .string()
    .nonempty("Password required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 chars, uppercase, lowercase, number, and special char"
    ),
  dateOfBirth: z.string().optional(),
  phone: z
    .string()
    .nonempty("Phone required")
    .regex(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone number"),
  address: z.string().optional(),
role: z.enum(["user", "admin"]),
});

// ✅ Infer TypeScript type
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [user, setUser] = useState<any>(null);
  const [date, setDate] = useState<Date>();
  const router = useRouter();

  // ✅ Initialize form with correct types
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "user" ,
      dateOfBirth: "",
      address: "",
    },
  });

  // ✅ Submit handler
  async function handleRegister(values: RegisterFormValues) {
    try {
      const res = await fetch(`https://apidoctor.onrender.com/user/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setUser(data);

      if (data.message === "User registered successfully") {
        toast.success(data.message, { position: "top-center" });
        router.push("/Login");
      } else {
        toast.error(data.message || "Registration failed", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Error while registering", { position: "top-center" });
      console.log(error)
    }
  }

  return (
<div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden py-5">
  {/* ✅ خلفية الصورة */}
  <img
    src="/pexels-jmeyer1220-668300.jpg"
    alt="background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  <div className="absolute inset-0 bg-black/50 z-0"></div>

  {/* ✅ الفورم الشفاف */}
  <div className="relative z-10 w-full max-w-md b p-8 rounded-2xl shadow-lg border border-white/30">
    <h2 className="text-3xl font-bold text-center text-white mb-6 shadow-lg">Register</h2>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-white/30 border-white/50 text-white placeholder-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PASSWORD */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="bg-white/30 border-white/50 text-white placeholder-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-white/30 border-white/50 text-white placeholder-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PHONE */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Phone</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-white/30 border-white/50 text-white placeholder-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ADDRESS */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Address</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="bg-white/30 border-white/50 text-white placeholder-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DATE OF BIRTH */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/30 border-white/50 text-white hover:bg-white/40"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      field.onChange(selectedDate?.toISOString().split("T")[0]);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ROLE */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/30 border-white/50 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </Form>

    <p className="text-center text-sm text-white/80 mt-4">
      Already have an account?{" "}
      <a href="/Login" className="text-blue-300 hover:underline">
        Login
      </a>
    </p>
  </div>
</div>


  );
}
