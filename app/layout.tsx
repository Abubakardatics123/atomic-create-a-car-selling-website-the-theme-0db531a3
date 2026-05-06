import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareBar from "@/components/CompareBar";

export const metadata: Metadata = {
  title: {
    default: "Aurum Motors | World's Premier Luxury Car Dealership",
    template: "%s | Aurum Motors",
  },
  description:
    "Discover the world's most prestigious automobiles at Aurum Motors. Rolls-Royce, Bentley, Ferrari, Lamborghini, and more. Luxury car dealership since 1998.",
  keywords: ["luxury cars", "premium vehicles", "Rolls-Royce", "Bentley", "Ferrari", "Lamborghini", "car dealership"],
  openGraph: {
    type: "website",
    siteName: "Aurum Motors",
    title: "Aurum Motors | World's Premier Luxury Car Dealership",
    description: "Discover the world's most prestigious automobiles. Curated for those who demand perfection.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CompareBar />
      </body>
    </html>
  );
}
