import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}