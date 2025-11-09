"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

function About() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-extrabold text-5xl mb-6 bg-gradient-to-r underline-offset-1 from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent ">
            About Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            At our hospital, we’re dedicated to delivering world-class healthcare
            through experienced doctors, state-of-the-art facilities, and
            compassionate service. Our mission is to ensure every patient
            receives the personalized attention, comfort, and care they truly
            deserve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/pexels-jmeyer1220-668300.jpg"
              alt="Hospital Services"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>

          {/* النص */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-700">
              We combine advanced medical technology with{" "}
              <span className="font-semibold text-sky-600">
                human empathy
              </span>{" "}
              to build trust, promote healing, and improve lives — one patient
              at a time.
            </p>
            <blockquote className="border-l-4 border-sky-500 pl-4 italic text-sky-700 text-xl font-medium">
              “Your health is our highest priority — excellence, compassion, and
              innovation in every step of your journey.”
            </blockquote>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
