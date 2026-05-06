"use client";

import Link from "next/link";
import { ArrowRight, Star, ChevronDown } from 'lucide-react';

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/luxury-car-showroom-dark-hero.jpg"
          alt="Luxury Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} />
      </div>

      {/* Decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,215,0,0.3), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,215,0,0.3), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-8"
            style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(255,215,0,0.3)" }}>
            <Star size={12} fill="#FFD700" style={{ color: "#FFD700" }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#FFD700" }}>
              World&apos;s Premier Automotive Dealership
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Drive the</span>
            <br />
            <span
              className="block"
              style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Extraordinary
            </span>
          </h1>

          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Discover an unparalleled collection of the world&apos;s most prestigious automobiles. 
            Each vehicle handpicked for those who demand nothing but perfection.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-10">
            {[
              { value: "200+", label: "Vehicles" },
              { value: "25+", label: "Years" },
              { value: "2,500+", label: "Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-serif font-bold" style={{ color: "#FFD700" }}>{stat.value}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]"
              style={{ background: goldGradient }}
            >
              Explore Inventory
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-white transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Book a Viewing
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest uppercase text-white/30">Scroll</span>
        <ChevronDown size={16} style={{ color: "#B8860B" }} />
      </div>

      {/* Featured car badge */}
      <div
        className="absolute bottom-12 right-8 hidden lg:block p-4 rounded-sm"
        style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(184,134,11,0.3)", backdropFilter: "blur(10px)" }}
      >
        <p className="text-xs text-white/40 tracking-widest uppercase mb-1">Featured Vehicle</p>
        <p className="text-white font-semibold">Rolls-Royce Phantom</p>
        <p className="text-sm" style={{ color: "#FFD700" }}>From $580,000</p>
      </div>
    </section>
  );
}
