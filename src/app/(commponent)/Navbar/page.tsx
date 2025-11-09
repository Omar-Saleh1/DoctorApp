"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut, LogIn, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${id}`;
      }
    }
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* ===== Logo ===== */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleScroll("home")}
        >
          <Image
            src="/image-1754131493134-851803676.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold text-[#008e9b]">Doctor App</h1>
        </div>

        {/* ===== Desktop Menu ===== */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => handleScroll("about")} className="hover:text-[#008e9b] transition">
            About
          </button>
          <button onClick={() => handleScroll("departments")} className="hover:text-[#008e9b] transition">
            Departments
          </button>
          <button onClick={() => handleScroll("doctors")} className="hover:text-[#008e9b] transition">
            Doctors
          </button>

          {isLoggedIn && (
            <>
              <Link href="/ADDdepartments" className="text-blue-600 hover:text-blue-800 transition">
                               Add Doctors

              </Link>
              <Link href="/ADDdoctors" className="text-blue-600 hover:text-blue-800 transition">
                 ADD Appoimints
              </Link>
               <Link href="/myAppoimints" className="text-blue-600 hover:text-blue-800 transition">
                 My Appoimints
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => signOut()}
              className="flex cursor-pointer items-center gap-2 text-red-500 hover:text-red-600 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <Link
              href="/Login"
              className="flex  cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>

        {/* ===== Mobile Menu Button ===== */}
        <button
          className="md:hidden text-[#008e9b]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 flex flex-col items-center gap-4 py-4">
          <button onClick={() => handleScroll("about")} className="hover:text-[#008e9b] transition">
            About
          </button>
          <button onClick={() => handleScroll("departments")} className="hover:text-[#008e9b] transition">
            Departments
          </button>
          <button onClick={() => handleScroll("doctors")} className="hover:text-[#008e9b] transition">
            Doctors
          </button>
          <button onClick={() => handleScroll("contact")} className="hover:text-[#008e9b] transition">
            Contact
          </button>

          {isLoggedIn && (
            <>
              <Link href="/ADDdepartments" className="text-blue-600 hover:text-blue-800 transition">
                               Add Doctors
              </Link>
              <Link href="/ADDdoctors" className="text-blue-600 hover:text-blue-800 transition">
                                ADD Appoimints

              </Link>
                <Link href="/myAppoimints" className="text-blue-600 hover:text-blue-800 transition">
                 My Appoimints
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => signOut()}
              className="flex cursor-pointer items-center gap-2 text-red-500 hover:text-red-600 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <Link
              href="/Login"
              className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
