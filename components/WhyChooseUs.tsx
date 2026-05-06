import { Star, Shield, Award, Clock, Users, Truck } from 'lucide-react';

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";

const features = [
  {
    icon: Shield,
    title: "Certified Excellence",
    description: "Every vehicle undergoes a rigorous 150-point inspection by our master technicians before entering our showroom.",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Named Luxury Dealer of the Year for 5 consecutive years. Our commitment to excellence is unmatched.",
  },
  {
    icon: Users,
    title: "Bespoke Concierge",
    description: "Your dedicated personal advisor guides you through every step, from selection to delivery and beyond.",
  },
  {
    icon: Clock,
    title: "Worldwide Delivery",
    description: "White-glove delivery service to your door, anywhere in the world, within your preferred timeframe.",
  },
  {
    icon: Star,
    title: "Exclusive Inventory",
    description: "Access to rare, limited-edition, and bespoke vehicles not available through conventional channels.",
  },
  {
    icon: Truck,
    title: "Flexible Finance",
    description: "Tailored finance and leasing solutions crafted to suit your lifestyle and financial preferences.",
  },
];

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "2,500+", label: "Satisfied Clients" },
  { value: "200+", label: "Vehicles in Stock" },
  { value: "50+", label: "Global Partners" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#000" }}>
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #B8860B 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "#B8860B" }}>
            The Aurum Difference
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Why Choose{" "}
            <span
              style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Aurum Motors
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            We don&apos;t just sell cars. We curate experiences, forge relationships, and deliver the extraordinary.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-sm"
              style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.2)" }}
            >
              <div
                className="text-4xl font-serif font-bold mb-2"
                style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-sm group transition-all duration-300"
                style={{ background: "rgba(17,17,17,0.8)", border: "1px solid rgba(184,134,11,0.15)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,215,0,0.4)";
                  el.style.background = "rgba(26,26,26,0.9)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(184,134,11,0.15)";
                  el.style.background = "rgba(17,17,17,0.8)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                  style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}
                >
                  <Icon size={22} style={{ color: "#FFD700" }} />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
