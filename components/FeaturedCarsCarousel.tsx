"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cars } from "@/lib/data";
import CarCard from "./CarCard";

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";
const featuredCars = cars.filter((c) => c.featured);

export default function FeaturedCarsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(featuredCars.length - visibleCount, i + 1));

  const visible = featuredCars.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="py-24" style={{ background: "#050505" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "#B8860B" }}>
              Handpicked Selection
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Featured{" "}
              <span
                style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Vehicles
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={startIndex === 0}
                className="w-10 h-10 flex items-center justify-center rounded-sm transition-all duration-300 disabled:opacity-30"
                style={{ border: "1px solid rgba(184,134,11,0.4)", color: "#FFD700" }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={startIndex >= featuredCars.length - visibleCount}
                className="w-10 h-10 flex items-center justify-center rounded-sm transition-all duration-300 disabled:opacity-30"
                style={{ border: "1px solid rgba(184,134,11,0.4)", color: "#FFD700" }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <Link
              href="/listings"
              className="text-sm tracking-widest uppercase font-medium transition-colors"
              style={{ color: "#B8860B" }}
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: featuredCars.length - visibleCount + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: startIndex === i ? "24px" : "8px",
                background: startIndex === i ? "#FFD700" : "rgba(184,134,11,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
