export default function CarCardSkeleton() {
  return (
    <div
      className="rounded-sm overflow-hidden animate-pulse"
      style={{ background: "#111", border: "1px solid rgba(184,134,11,0.1)" }}
    >
      <div className="aspect-video" style={{ background: "#1a1a1a" }} />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded" style={{ background: "#222" }} />
        <div className="h-5 w-40 rounded" style={{ background: "#222" }} />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-24 rounded" style={{ background: "#1a1a1a" }} />
          ))}
        </div>
        <div className="h-px" style={{ background: "rgba(184,134,11,0.1)" }} />
        <div className="h-10 rounded" style={{ background: "#1a1a1a" }} />
      </div>
    </div>
  );
}
