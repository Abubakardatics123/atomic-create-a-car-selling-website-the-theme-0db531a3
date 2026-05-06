"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Inventory" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? { background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,134,11,0.3)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: goldGradient, boxShadow: "0 0 15px rgba(255,215,0,0.4)" }}
            >
              <span className="text-black font-serif font-bold text-lg">A</span>
            </div>
            <div>
              <span
                className="text-xl font-serif font-bold tracking-wider block"
                style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                AURUM
              </span>
              <span className="block text-[10px] text-yellow-700 tracking-[0.3em] uppercase -mt-1">
                Motors
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase transition-all duration-300 relative group"
                style={{ color: pathname === link.href ? "#FFD700" : "rgba(255,255,255,0.7)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    background: goldGradient,
                    width: pathname === link.href ? "100%" : "0%",
                  }}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold tracking-widest uppercase rounded-sm transition-all duration-300 hover:text-black"
              style={{ border: "1px solid #B8860B", color: "#FFD700" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = goldGradient;
                el.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "#FFD700";
              }}
            >
              Book Viewing
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            style={{ color: "#FFD700" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden px-4 py-6 space-y-4"
          style={{ background: "rgba(0,0,0,0.98)", borderTop: "1px solid rgba(184,134,11,0.2)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium tracking-widest uppercase py-2 transition-colors"
              style={{ color: pathname === link.href ? "#FFD700" : "rgba(255,255,255,0.7)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block mt-4 px-5 py-3 text-sm font-semibold tracking-widest uppercase text-center"
            style={{ border: "1px solid #B8860B", color: "#FFD700" }}
          >
            Book Viewing
          </Link>
        </div>
      )}
    </nav>
  );
}
