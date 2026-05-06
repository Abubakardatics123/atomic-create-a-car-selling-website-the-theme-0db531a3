"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from 'lucide-react';

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#000" }}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(184,134,11,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
          style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(255,215,0,0.3)" }}
        >
          <Mail size={28} style={{ color: "#FFD700" }} />
        </div>

        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
          Stay{" "}
          <span
            style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Informed
          </span>
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
          Be the first to know about exclusive arrivals, private events, and bespoke opportunities. 
          Join our distinguished circle of automotive connoisseurs.
        </p>

        {submitted ? (
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-sm"
            style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}
          >
            <Check size={20} style={{ color: "#FFD700" }} />
            <span className="text-white font-medium">Welcome to the Aurum Circle. We&apos;ll be in touch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-4 text-sm rounded-sm outline-none"
              style={{
                background: "rgba(26,26,26,0.8)",
                border: "1px solid rgba(184,134,11,0.4)",
                color: "white",
              }}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold tracking-widest uppercase text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] rounded-sm"
              style={{ background: goldGradient }}
            >
              Subscribe
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="text-xs text-white/25 mt-4 tracking-wider">
          No spam. Unsubscribe at any time. Your privacy is respected.
        </p>
      </div>
    </section>
  );
}
