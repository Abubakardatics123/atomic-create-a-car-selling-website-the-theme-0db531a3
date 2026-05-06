"use client";

import Link from "next/link";
import { X, ArrowRight } from 'lucide-react';
import { useCompareStore } from "@/lib/compareStore";
import { cars } from "@/lib/data";

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

export default function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();

  if (compareIds.length === 0) return null;

  const selectedCars = compareIds.map((id) => cars.find((c) => c.id === id)).filter(Boolean);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 py-4"
      style={{ background: "rgba(0,0,0,0.95)", borderTop: "1px solid rgba(184,134,11,0.4)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "#B8860B" }}>
            Comparing ({compareIds.length}/3):
          </span>
          <div className="flex gap-3 flex-wrap">
            {selectedCars.map((car) => {
              if (!car) return null;
              return (
                <div
                  key={car.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm"
                  style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}
                >
                  <span className="text-white/80">{car.year} {car.make} {car.model}</span>
                  <button
                    onClick={() => removeFromCompare(car.id)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCompare}
            className="text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
          >
            Clear All
          </button>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-black"
            style={{ background: goldGradient }}
          >
            Compare Now
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
