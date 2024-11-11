import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saiyana - Pharmaceutical Care Solutions",
  description: "Professional pharmaceutical care and distribution services. Located in Hyderabad, providing quality healthcare solutions across India.",
  keywords: "pharmaceutical, healthcare, medicine distribution, Hyderabad, pharmaceutical care",
  authors: [{ name: "Saiyana" }],
  openGraph: {
    title: "Saiyana - Pharmaceutical Care Solutions",
    description: "Professional pharmaceutical care and distribution services in Hyderabad",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}