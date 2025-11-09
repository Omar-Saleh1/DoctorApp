"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  description: string;
  experienceYears: number;
  image?: string;
}

export default function page() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getDoctor();
  }, [id]);

  async function getDoctor() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch doctor details");
      setDoctor(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Doctor not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - image */}
        <div className="md:w-1/2 bg-gradient-to-br  flex items-center justify-center p-10">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50">
            <img
              src={
                doctor.image
                  ? `http://localhost:5000/uploads/${doctor.image}`
                  : "/default-doctor.jpg"
              }
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - details */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">
            Dr. {doctor.name}
          </h1>
          <h2 className="text-xl  text-gray-600 mb-2">
              specialty:{" "} 
           <span className="text-gray-700 font-semibold">{doctor.specialty}</span>
          </h2>
          <p className="text-gray-500 mb-4">
            Experience:{" "}
            <span className="text-gray-700 font-semibold">
              {doctor.experienceYears} years
            </span>
          </p>
          
          <p className="text-gray-700 leading-relaxed text-lg">
                 description:{" "}
            <span className="text-xl  text-gray-600">{doctor.description || "No description available."}</span>
          </p>

         <Link href={'/ADDdoctors'}>
          <button className="mt-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all">
            Book Appointment
          </button>
         </Link>
        </div>
      </div>
    </section>
  );
}
