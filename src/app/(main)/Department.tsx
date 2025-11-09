"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Department {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

function Departments() {
  const departments: Department[] = [
    {
      _id: "1",
      name: "Cardiology",
      description:
        "Our Cardiology department provides state-of-the-art heart care with expert cardiologists and advanced diagnostic equipment.",
      image: "/pexels-cottonbro-6203474 - Copy.jpg",
    },
    {
      _id: "2",
      name: "Neurology",
      description:
        "The Neurology department specializes in brain, spine, and nerve disorders with personalized treatment plans.",
      image: "/pexels-shvetsa-4225880.jpg",
    },
    {
      _id: "3",
      name: "Pediatrics",
      description:
        "We provide comprehensive care for children and infants, ensuring a healthy and happy childhood.",
      image: " /pexels-cottonbro-5867703.jpg",
    },
    {
      _id: "4",
      name: "Dermatology",
      description:
        "Our Dermatology department offers treatments for skin, hair, and nail conditions using modern technology.",
      image: "/pexels-polina-tankilevitch-3738355.jpg",
    },
    {
      _id: "5",
      name: "Orthopedics",
      description:
        "Specialized in bone, joint, and muscle care with advanced orthopedic surgeries and physiotherapy.",
      image: "/pexels-tima-miroshnichenko-8376326.jpg",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(departments[0]._id);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(departments[0]);

  const handleTabClick = (dep: Department) => {
    setActiveTab(dep._id);
    setSelectedDepartment(dep);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
        Our Departments
      </h2>

      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden ">
        {/* Tabs (Left Side) */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-blue-500 to-blue-700 p-6 md:p-10 flex flex-row md:flex-col gap-3 md:gap-6 overflow-x-auto md:overflow-visible">
          {departments.map((dep) => (
            <Button
              key={dep._id}
              onClick={() => handleTabClick(dep)}
              className={`min-w-[140px] md:w-full py-3 px-4 rounded-xl font-semibold text-white text-sm transition-all duration-300 ${
                activeTab === dep._id
                  ? "bg-white text-blue-700 shadow-lg scale-105"
                  : "bg-blue-600/30 hover:bg-blue-600/50"
              }`}
            >
              {dep.name}
            </Button>
          ))}
        </div>

        {/* Department Details (Right Side) */}
        <div className="flex-1 p-8 md:p-12 bg-white flex flex-col justify-center items-center text-center">
          <h3 className="text-3xl font-bold text-blue-700 mb-4">
            {selectedDepartment.name}
          </h3>

          {selectedDepartment.image && (
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg mb-6 border-4 border-blue-100">
              <img
                src={selectedDepartment.image}
                alt={selectedDepartment.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
            {selectedDepartment.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Departments;
