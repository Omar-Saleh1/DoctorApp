'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Doctor = {
  _id: string;
  name: string;
  specialization?: string;
  image?: string;
};

export default function AllDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllDoctor();
  }, []);

  async function GetAllDoctor() {
    try {
      const res = await fetch(`https://apidoctor.onrender.com/doctors/allDoctors`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch doctors');
      setDoctors(data.slice(0, 3))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Meet Our Expert Doctors
        </h2>
        <p className="text-gray-600 text-lg mb-14">
          Professional, caring, and highly experienced specialists ready to help
          you.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading doctors...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {doctors.map((doc) => (
              <Link href={`/Detiels/${doc._id}`}>
                <div
                  key={doc._id}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Doctor Image */}
                  <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden shadow-md ring-4 ring-blue-100 group-hover:ring-blue-400 transition-all duration-300">
                    <img
                      src={doc.image? 'https://apidoctor.onrender.com/uploads/${doc.image}'
                          : "/default-doctor.jpg"
                      }
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {doc.name}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium mt-1">
                      {doc.specialization || "General Practitioner"}
                    </p>
                  </div>

                  {/* View Profile Button */}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-blue-300 via-white to-transparent rounded-3xl"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
       <Link href={'/SeeAllDoctor'}>
        <button className="px-6 mt-5 cursor-pointer flex  py-2.5 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          View All Doctors <ArrowRight/>
        </button>
       </Link>
      </div>
    </section>
  );
}
