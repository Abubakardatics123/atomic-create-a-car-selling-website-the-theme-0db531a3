import { Star } from 'lucide-react';
import { testimonials } from "@/lib/data";

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: "#080808" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "#B8860B" }}>
            Client Stories
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            What Our{" "}
            <span
              style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Clients Say
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            The trust of our distinguished clientele is our greatest achievement.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="p-8 rounded-sm relative overflow-hidden transition-all duration-300"
              style={{
                background: index % 2 === 0 ? "rgba(17,17,17,0.9)" : "rgba(13,13,13,0.9)",
                border: "1px solid rgba(184,134,11,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,215,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,134,11,0.2)";
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-6 text-8xl font-serif leading-none opacity-10 select-none"
                style={{ color: "#FFD700" }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#FFD700" style={{ color: "#FFD700" }} />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 leading-relaxed mb-6 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid rgba(184,134,11,0.4)" }}>
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40 tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            "Rolls-Royce Authorised",
            "Bentley Approved",
            "Ferrari Certified",
            "Lamborghini Partner",
            "Porsche Centre",
          ].map((badge) => (
            <div
              key={badge}
              className="px-6 py-3 rounded-sm text-xs tracking-widest uppercase font-medium"
              style={{ border: "1px solid rgba(184,134,11,0.25)", color: "rgba(255,215,0,0.6)" }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
