"use client";
import React, { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
Form,
FormField,
FormItem,
FormLabel,
FormControl,
FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import fetchDoctors, { handleAppointments } from "@/app/FunctionAction/AppoimentAction";

type Doctor = {
_id: string;
name: string;
};

export type FormValues = {
doctor: string;
date: string;
reason: string;
};

export default function AppointmentPage() {
const { data: session } = useSession();
const [doctors, setDoctors] = useState<Doctor[]>([]);
const [date, setDate] = useState<Date | undefined>();

const form = useForm<FormValues>({
defaultValues: { doctor: "", date: "", reason: "" },
});

useEffect(() => {
getDoctors();
}, []);

async function getDoctors() {
const data = await fetchDoctors();
if (data.success) setDoctors(data.data);
else toast.error(data.message);
}

async function onSubmit(values: FormValues) {
if (!session?.accessToken) {
toast.error("You must be logged in to book an appointment");
return;
}

const data = await handleAppointments(values, session.accessToken);
if (data.success) {
  toast.success("Appointment booked successfully!");
  form.reset();
  setDate(undefined);
} else {
  toast.error(data.message || "Something went wrong");
  console.log(data);
}

}

return ( <div className="min-h-screen py-10 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100"> <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-blue-300/50">

    {/* Left side */}
    <div className="md:flex-1 bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center p-10 text-white text-center">
      <div className="bg-white/20 p-6 rounded-full shadow-lg mb-6">
        <CalendarIcon className="w-16 h-16 text-white" />
      </div>
      <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">Book Appointment</h2>
      <p className="text-white/90 mt-3 text-lg">Choose your doctor and date!</p>
    </div>

    {/* Right side form */}
    <div className="md:flex-1 flex flex-col justify-center items-center p-10 bg-gray-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">

          {/* Doctor Select */}
          <FormField
            control={form.control}
            name="doctor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Select Doctor</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full p-3 rounded-xl bg-white border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reason */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Reason for Appointment</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Checkup or Consultation"
                    {...field}
                    className="w-full p-3 rounded-xl bg-white border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Appointment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal p-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                      {date ? date.toDateString() : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white rounded-md shadow-md border border-gray-200">
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/40 transition-all mt-4"
          >
            Book Appointment
          </button>
        </form>
      </Form>
    </div>
  </div>
</div>

);
}
