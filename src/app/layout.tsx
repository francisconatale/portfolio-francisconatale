import type { Metadata } from "next";
import "./globals.css";
import PremiumLoader from "@/components/PremiumLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio Natale",
  description: "Portfolio of Natale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0f0f11] text-white overflow-y-auto overflow-x-hidden">
        <PremiumLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
