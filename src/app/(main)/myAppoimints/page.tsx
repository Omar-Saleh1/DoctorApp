

'use client'

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Doctor {
  _id: string;
  name: string;
  specialty?: string;
  image?: string;
}

interface Appointment {
  _id: string;
  user: string;
  doctor?: Doctor | null;
  date: string;
  reason: string;
}

export default function MyAppointments() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = session?.accessToken ;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/myAppointments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch appointments");
        setAppointments(data);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        toast.error(error.message);
      }
    };

    fetchAppointments();
  }, [session]);

  const cancelAppointment = async (id: string) => {
    try {
      const token =
        session?.accessToken

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/deleteAppointment/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete appointment");

      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success("Appointment cancelled successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-10">
  <h2 className="text-4xl font-extrabold text-center mb-10 text-[#008e9b] tracking-wide drop-shadow-sm">
    🩺 My Appointments
  </h2>

  {error && (
    <p className="text-red-500 text-center font-medium mb-6 animate-pulse">
      {error}
    </p>
  )}

  <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {appointments.length === 0 ? (
      <p className="text-center text-gray-500 col-span-full">
        No appointments found.
      </p>
    ) : (
      appointments.map((app) => {
        const doctor = app.doctor;
        const doctorImage = doctor?.image
          ? `https://apidoctor.onrender.com/uploads/${doctor.image}`
          : "/default-doctor.jpg";

        return (
          <div
            key={app._id}
            className="group relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 via-transparent to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            <div className="relative flex flex-col items-center text-center z-10">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-[#008e9b]/40 shadow-sm mb-3"
                src={doctorImage}
                alt={doctor?.name || "Doctor"}
              />

              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {doctor?.name || "Unknown Doctor"}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {doctor?.specialty || "General Practitioner"}
              </p>

              <div className="bg-gray-100 rounded-xl px-3 py-1 text-xs text-gray-700 font-medium mb-3">
                {new Date(app.date).toLocaleDateString()}
              </div>

              <p className="text-gray-700 italic mb-4">
                "{app.reason || "No reason provided"}"
              </p>

              <button
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-700 transition-all duration-300"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this appointment?"
                    )
                  ) {
                    cancelAppointment(app._id);
                  }
                }}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        );
      })
    )}
  </div>
</div>

  );
}

