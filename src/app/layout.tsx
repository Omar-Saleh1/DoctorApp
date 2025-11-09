import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(commponent)/Navbar/page";
import { Toaster } from "sonner";
import Footer from '../../src/app/(commponent)/Footer/Footer';
import UserProvider from "./UserProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doctor App",
  description: "Doctor Appointment System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <Navbar />
          <Toaster />
          {children}
          <Footer/>
        </UserProvider>
      </body>
    </html>
  );
}
