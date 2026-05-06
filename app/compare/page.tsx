"use client";

import { useCompareStore } from "@/lib/compareStore";
import { cars } from "@/lib/data";
import Link from "next/link";
import { X, ArrowRight, Check } from 'lucide-react';

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

const specRows = [
  { label: "Price", key: "price", format: (v: unknown) => formatPrice(v as number) },
  { label: "Year", key: "year", format: (v: unknown) => String(v) },
  { label: "Condition", key: "condition", format: (v: unknown) => String(v) },
  { label: "Engine", key: "engine", format: (v: unknown) => String(v) },
  { label: "Horsepower", key: "horsepower", format: (v: unknown) => v + " hp" },
  { label: "Torque", key: "torque", format: (v: unknown) => String(v) },
  { label: "0-100 km/h", key: "acceleration", format: (v: unknown) => String(v) },
  { label: "Top Speed", key: "topSpeed", format: (v: unknown) => String(v) },
  { label: "Fuel Type", key: "fuelType", format: (v: unknown) => String(v) },
  { label: "Transmission", key: "transmission", format: (v: unknown) => String(v) },
  { label: "Body Type", key: "bodyType", format: (v: unknown) => String(v) },
  { label: "Seats", key: "seats", format: (v: unknown) => String(v) },
  { label: "Mileage", key: "mileage", format: (v: unknown) => (v === 0 ? "Brand New" : (v as number).toLocaleString() + " km") },
  { label: "Color", key: "color", format: (v: unknown) => String(v) },
];

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const selectedCars = compareIds.map((id) => cars.find((c) => c.id === id)).filter(Boolean);
  const colCount = selectedCars.length;

  return (
    <div className="min-h-screen pt-20" style={{ background: "#000" }}>
      <div
        className="py-16"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #000 100%)", borderBottom: "1px solid rgba(184,134,11,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "#B8860B" }}>
            Side by Side
          </p>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Compare{" "}
              <span
                style={{
                  background: goldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Vehicles
              </span>
            </h1>
            {selectedCars.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-sm text-white/40 hover:text-white/70 transition-colors tracking-wider"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {selectedCars.length === 0 ? (
          <div className="text-center py-24">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.3)" }}
            >
              <ArrowRight size={32} style={{ color: "#B8860B" }} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">No Vehicles Selected</h2>
            <p className="text-white/40 mb-8">
              Browse our inventory and add up to 3 vehicles to compare side by side.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-black"
              style={{ background: goldGradient }}
            >
              Browse Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Car Headers */}
            <div className="min-w-[600px]">
              <div className="flex gap-4 mb-6">
                <div className="w-48 flex-shrink-0" />
                {selectedCars.map((car) => {
                  if (!car) return null;
                  return (
                    <div
                      key={car.id}
                      className="flex-1 rounded-sm overflow-hidden"
                      style={{ border: "1px solid rgba(184,134,11,0.3)" }}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={car.images[0]}
                          alt={car.make + " " + car.model}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromCompare(car.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.8)", color: "rgba(255,255,255,0.6)" }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="p-4" style={{ background: "#111" }}>
                        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#B8860B" }}>
                          {car.make}
                        </p>
                        <h3 className="font-serif font-bold text-white">
                          {car.year} {car.model}
                        </h3>
                        <p className="text-lg font-bold mt-1" style={{ color: "#FFD700" }}>
                          {formatPrice(car.price)}
                        </p>
                        <Link
                          href={"/listings/" + car.id}
                          className="mt-3 block text-center py-2 text-xs font-semibold tracking-widest uppercase text-black"
                          style={{ background: goldGradient }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Specs Table */}
              <div className="rounded-sm overflow-hidden" style={{ border: "1px solid rgba(184,134,11,0.2)" }}>
                {specRows.map((row, rowIndex) => (
                  <div
                    key={row.label}
                    className="flex"
                    style={{
                      background: rowIndex % 2 === 0 ? "rgba(17,17,17,0.9)" : "rgba(13,13,13,0.9)",
                      borderBottom: "1px solid rgba(184,134,11,0.08)",
                    }}
                  >
                    <div
                      className="w-48 flex-shrink-0 px-4 py-3"
                      style={{ borderRight: "1px solid rgba(184,134,11,0.1)" }}
                    >
                      <span className="text-xs text-white/40 tracking-widest uppercase">{row.label}</span>
                    </div>
                    {selectedCars.map((car) => {
                      if (!car) return null;
                      const rawVal = car[row.key as keyof typeof car];
                      const displayVal = row.format(rawVal);
                      return (
                        <div
                          key={car.id}
                          className="flex-1 px-4 py-3 text-center"
                          style={{ borderRight: "1px solid rgba(184,134,11,0.08)" }}
                        >
                          <span className="text-sm text-white/80">{displayVal}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-6 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(184,134,11,0.2)" }}>
                <div
                  className="px-4 py-3"
                  style={{ background: "rgba(184,134,11,0.1)", borderBottom: "1px solid rgba(184,134,11,0.2)" }}
                >
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#FFD700" }}>
                    Key Features
                  </span>
                </div>
                <div className="flex">
                  <div className="w-48 flex-shrink-0" />
                  {selectedCars.map((car) => {
                    if (!car) return null;
                    return (
                      <div
                        key={car.id}
                        className="flex-1 p-4"
                        style={{ borderLeft: "1px solid rgba(184,134,11,0.1)" }}
                      >
                        <ul className="space-y-2">
                          {car.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <Check size={12} style={{ color: "#FFD700" }} />
                              <span className="text-xs text-white/60">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {colCount < 3 && (
              <div className="mt-8 text-center">
                <p className="text-white/40 text-sm mb-4">
                  Add {3 - colCount} more vehicle{3 - colCount !== 1 ? "s" : ""} to compare.
                </p>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-widest uppercase text-black"
                  style={{ background: goldGradient }}
                >
                  Add More Vehicles
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
