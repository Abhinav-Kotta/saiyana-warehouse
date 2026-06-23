// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saiyana Group - Warehousing & 3PL Logistics Solutions",
  description: "Pioneering warehousing, C&F services, 3PL logistics, and super stockist services. Located in Hyderabad, providing logistics excellence across India since 1996.",
  keywords: "warehousing, 3pl logistics, logistics, C&F services, super stockist, supply chain solutions, Hyderabad, India",
  authors: [{ name: "Saiyana Group" }],
  openGraph: {
    title: "Saiyana Group - Warehousing & 3PL Logistics Solutions",
    description: "Pioneering warehousing, C&F services, 3PL logistics, and super stockist services in Hyderabad, India since 1996.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}