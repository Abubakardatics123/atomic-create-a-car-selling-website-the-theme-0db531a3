"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Phone, Mail, Star, Fuel, Settings, Gauge, Users, Calendar, Activity } from 'lucide-react';
import { cars } from "@/lib/data";
import CarCard from "@/components/CarCard";
import { useCompareStore } from "@/lib/compareStore";

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === params.id);
  if (!car) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const { addToCompare, removeFromCompare, isInCompare } = useCompareStore();

  const similar = cars.filter((c) => c.id !== car.id && (c.make === car.make || c.bodyType === car.bodyType)).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const specs = [
    { label: "Engine", value: car.engine, icon: Activity },
    { label: "Horsepower", value: car.horsepower + " hp", icon: Gauge },
    { label: "Torque", value: car.torque, icon: Activity },
    { label: "0-100 km/h", value: car.acceleration, icon: Gauge },
    { label: "Top Speed", value: car.topSpeed, icon: Gauge },
    { label: "Fuel Type", value: car.fuelType, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Settings },
    { label: "Body Type", value: car.bodyType, icon: Settings },
    { label: "Seats", value: car.seats.toString(), icon: Users },
    { label: "Doors", value: car.doors.toString(), icon: Settings },
    { label: "Year", value: car.year.toString(), icon: Calendar },
    { label: "Mileage", value: car.mileage === 0 ? "Brand New" : car.mileage.toLocaleString() + " km", icon: Gauge },
  ];

  return (
    <div className="min-h-screen pt-20" style={{ background: "#000" }}>
      {/* Breadcrumb */}
      <div
        className="py-4"
        style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(184,134,11,0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Link href="/listings" className="flex items-center gap-2 text-sm text-white/40 hover:text-yellow-400 transition-colors">
            <ArrowLeft size={14} />
            Back to Inventory
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-sm text-white/60">{car.year} {car.make} {car.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div
              className="relative aspect-video rounded-sm overflow-hidden mb-4"
              style={{ border: "1px solid rgba(184,134,11,0.3)" }}
            >
              <img
                src={car.images[activeImage]}
                alt={car.make + " " + car.model}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm"
                style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700" }}
              >
                {car.condition}
              </div>
            </div>
            <div className="flex gap-3">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="flex-1 aspect-video rounded-sm overflow-hidden transition-all duration-300"
                  style={{
                    border: activeImage === i ? "2px solid #FFD700" : "1px solid rgba(184,134,11,0.2)",
                    opacity: activeImage === i ? 1 : 0.6,
                  }}
                >
                  <img src={img} alt={"View " + (i + 1)} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-2 font-medium" style={{ color: "#B8860B" }}>
              {car.make}
            </p>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">
              {car.year} {car.model}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="#FFD700" style={{ color: "#FFD700" }} />
              ))}
              <span className="text-xs text-white/40 ml-1">Premium Certified</span>
            </div>

            <div className="mb-6">
              <span
                className="text-4xl font-serif font-bold"
                style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {formatPrice(car.price)}
              </span>
              {car.mileage > 0 && (
                <span className="text-sm text-white/40 ml-3">{car.mileage.toLocaleString()} km</span>
              )}
            </div>

            <p className="text-white/60 leading-relaxed mb-8">{car.description}</p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "Engine", value: car.engine },
                { label: "Power", value: car.horsepower + " hp" },
                { label: "0-100 km/h", value: car.acceleration },
                { label: "Top Speed", value: car.topSpeed },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 rounded-sm"
                  style={{ background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}
                >
                  <p className="text-xs text-white/40 tracking-widest uppercase mb-1">{spec.label}</p>
                  <p className="text-sm font-semibold text-white">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <a
                href="tel:+442071234567"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold tracking-widest uppercase text-black transition-all duration-300"
                style={{ background: goldGradient }}
              >
                <Phone size={16} />
                Call Now
              </a>
              <button
                onClick={() => isInCompare(car.id) ? removeFromCompare(car.id) : addToCompare(car.id)}
                className="px-5 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                style={{
                  border: isInCompare(car.id) ? "1px solid #FFD700" : "1px solid rgba(184,134,11,0.4)",
                  color: isInCompare(car.id) ? "#FFD700" : "rgba(255,255,255,0.6)",
                  background: isInCompare(car.id) ? "rgba(255,215,0,0.1)" : "transparent",
                }}
              >
                {isInCompare(car.id) ? "✓ Comparing" : "+ Compare"}
              </button>
            </div>

            {/* Features */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "#B8860B" }}>
                Key Features
              </p>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={12} style={{ color: "#FFD700" }} />
                    <span className="text-xs text-white/60">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Specs */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">
            Full{" "}
            <span
              style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Specifications
            </span>
          </h2>
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid rgba(184,134,11,0.2)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between p-4"
                  style={{
                    background: i % 2 === 0 ? "rgba(17,17,17,0.8)" : "rgba(13,13,13,0.8)",
                    borderBottom: "1px solid rgba(184,134,11,0.1)",
                  }}
                >
                  <span className="text-xs text-white/40 tracking-widest uppercase">{spec.label}</span>
                  <span className="text-sm font-medium text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white mb-3">
              Make an{" "}
              <span
                style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Enquiry
              </span>
            </h2>
            <p className="text-white/50 mb-8">
              Interested in this vehicle? Our specialists are ready to assist you with any questions or to arrange a private viewing.
            </p>

            {submitted ? (
              <div
                className="p-8 rounded-sm text-center"
                style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(255,215,0,0.3)" }}
              >
                <Check size={40} className="mx-auto mb-4" style={{ color: "#FFD700" }} />
                <h3 className="text-xl font-serif font-bold text-white mb-2">Enquiry Received</h3>
                <p className="text-white/50">
                  Thank you for your interest in the {car.year} {car.make} {car.model}. 
                  A specialist will contact you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none"
                      style={{ background: "rgba(26,26,26,0.9)", border: "1px solid rgba(184,134,11,0.3)", color: "white" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none"
                      style={{ background: "rgba(26,26,26,0.9)", border: "1px solid rgba(184,134,11,0.3)", color: "white" }}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-sm outline-none"
                    style={{ background: "rgba(26,26,26,0.9)", border: "1px solid rgba(184,134,11,0.3)", color: "white" }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-sm outline-none resize-none"
                    style={{ background: "rgba(26,26,26,0.9)", border: "1px solid rgba(184,134,11,0.3)", color: "white" }}
                    placeholder={"I'm interested in the " + car.year + " " + car.make + " " + car.model + "..."}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold tracking-widest uppercase text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  style={{ background: goldGradient }}
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div
              className="p-6 rounded-sm"
              style={{ background: "rgba(17,17,17,0.8)", border: "1px solid rgba(184,134,11,0.2)" }}
            >
              <h3 className="text-lg font-serif font-bold text-white mb-4">Contact Our Specialists</h3>
              <div className="space-y-4">
                <a href="tel:+442071234567" className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}
                  >
                    <Phone size={16} style={{ color: "#FFD700" }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 tracking-widest uppercase">Phone</p>
                    <p className="text-white group-hover:text-yellow-400 transition-colors">+44 207 123 4567</p>
                  </div>
                </a>
                <a href="mailto:enquiries@aurummotors.com" className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}
                  >
                    <Mail size={16} style={{ color: "#FFD700" }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 tracking-widest uppercase">Email</p>
                    <p className="text-white group-hover:text-yellow-400 transition-colors">enquiries@aurummotors.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div
              className="p-6 rounded-sm"
              style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)" }}
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#FFD700" }}>
                Why Buy From Us
              </h3>
              <ul className="space-y-3">
                {[
                  "150-point vehicle inspection",
                  "Comprehensive warranty included",
                  "Flexible finance options",
                  "Worldwide delivery available",
                  "7-day money-back guarantee",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check size={14} style={{ color: "#FFD700" }} />
                    <span className="text-sm text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-white mb-8">
              Similar{" "}
              <span
                style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Vehicles
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
