"use client";

import Link from "next/link";
import { ArrowRight, Fuel, Settings, Gauge, GitBranch } from 'lucide-react';
import type { Car } from "@/lib/data";

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

const badgeColors: Record<string, string> = {
  Flagship: "#7c3aed",
  "Best Seller": "#059669",
  Hot: "#dc2626",
  CPO: "#2563eb",
  "Ultra Luxury": "#7c3aed",
  Electric: "#0891b2",
};

interface CarCardProps {
  car: Car;
  onCompare?: (id: string) => void;
  inCompare?: boolean;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CarCard({ car, onCompare, inCompare }: CarCardProps) {
  return (
    <div
      className="group relative flex flex-col rounded-sm overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(180deg, #111111 0%, #0d0d0d 100%)",
        border: "1px solid rgba(184,134,11,0.2)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.1)";
        el.style.borderColor = "rgba(255,215,0,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = "rgba(184,134,11,0.2)";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={car.images[0]}
          alt={car.year + " " + car.make + " " + car.model}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)" }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.badge && (
            <span
              className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase text-white rounded-sm"
              style={{ background: badgeColors[car.badge] || "#B8860B" }}
            >
              {car.badge}
            </span>
          )}
          <span
            className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm"
            style={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "#FFD700",
            }}
          >
            {car.condition}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="text-lg font-bold" style={{ color: "#FFD700" }}>
            {formatPrice(car.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#B8860B" }}>
            {car.make}
          </p>
          <h3 className="text-lg font-serif font-bold text-white">
            {car.year} {car.model}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Fuel size={13} style={{ color: "#B8860B" }} />
            <span className="text-xs text-white/50">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings size={13} style={{ color: "#B8860B" }} />
            <span className="text-xs text-white/50">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={13} style={{ color: "#B8860B" }} />
            <span className="text-xs text-white/50">{car.horsepower} hp</span>
          </div>
          <div className="flex items-center gap-2">
            <GitBranch size={13} style={{ color: "#B8860B" }} />
            <span className="text-xs text-white/50">{car.acceleration}</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-4"
          style={{ background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.3), transparent)" }}
        />

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={"/listings/" + car.id}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            style={{ background: goldGradient, color: "#000" }}
          >
            View Details
            <ArrowRight size={12} />
          </Link>
          {onCompare && (
            <button
              onClick={() => onCompare(car.id)}
              className="px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
              style={{
                border: inCompare ? "1px solid #FFD700" : "1px solid rgba(184,134,11,0.4)",
                color: inCompare ? "#FFD700" : "rgba(255,255,255,0.5)",
                background: inCompare ? "rgba(255,215,0,0.1)" : "transparent",
              }}
              title={inCompare ? "Remove from compare" : "Add to compare"}
            >
              {inCompare ? "✓" : "+"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
