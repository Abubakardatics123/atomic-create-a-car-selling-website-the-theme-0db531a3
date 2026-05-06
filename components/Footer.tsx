import Link from "next/link";
import { Mail, Phone, MapPin, Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Briefcase as Linkedin } from 'lucide-react';

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(184,134,11,0.2)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: goldGradient }}
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
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              The world&apos;s most prestigious automotive dealership. Curating exceptional vehicles for discerning collectors since 1998.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: "1px solid rgba(184,134,11,0.3)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = goldGradient;
                    el.style.color = "#000";
                    el.style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "transparent";
                    el.style.color = "rgba(255,255,255,0.5)";
                    el.style.borderColor = "rgba(184,134,11,0.3)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: "#FFD700" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/listings", label: "Inventory" },
                { href: "/compare", label: "Compare Cars" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px transition-all duration-300 group-hover:w-6" style={{ background: "#B8860B" }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: "#FFD700" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Vehicle Sourcing",
                "Finance & Leasing",
                "Trade-In Valuation",
                "Concierge Delivery",
                "Extended Warranty",
                "Vehicle Storage",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/50 flex items-center gap-2">
                    <span className="w-4 h-px" style={{ background: "#B8860B" }} />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: "#FFD700" }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
                <span className="text-sm text-white/50">
                  1 Mayfair Square, London<br />W1K 6TH, United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: "#B8860B" }} />
                <a href="tel:+442071234567" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">
                  +44 207 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: "#B8860B" }} />
                <a href="mailto:enquiries@aurummotors.com" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">
                  enquiries@aurummotors.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-sm" style={{ background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Showroom Hours</p>
              <p className="text-sm text-white/60">Mon – Sat: 9:00 – 19:00</p>
              <p className="text-sm text-white/60">Sunday: 11:00 – 17:00</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(184,134,11,0.15)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 tracking-wider">
              © 2024 Aurum Motors Ltd. All rights reserved. Registered in England & Wales.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="text-xs text-white/30 hover:text-yellow-600 transition-colors tracking-wider">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
