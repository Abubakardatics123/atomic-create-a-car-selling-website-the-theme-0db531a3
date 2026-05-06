const brands = [
  "Rolls-Royce",
  "Bentley",
  "Lamborghini",
  "Ferrari",
  "Porsche",
  "Mercedes-Benz",
  "Aston Martin",
  "McLaren",
  "BMW",
  "Tesla",
];

export default function BrandsStrip() {
  return (
    <section
      className="py-8 overflow-hidden"
      style={{ background: "#0a0a0a", borderTop: "1px solid rgba(184,134,11,0.15)", borderBottom: "1px solid rgba(184,134,11,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.4))" }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "#B8860B" }}>
            Authorised Brands
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(184,134,11,0.4), transparent)" }} />
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300 cursor-default"
              style={{ color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#FFD700"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.3)"; }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
