"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cars, brands, fuelTypes, transmissions, conditions } from "@/lib/data";
import CarCard from "@/components/CarCard";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import { useCompareStore } from "@/lib/compareStore";

const goldGradient = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";
const CARS_PER_PAGE = 6;

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [condition, setCondition] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompareStore();

  const handleCompare = (id: string) => {
    if (isInCompare(id)) {
      removeFromCompare(id);
    } else if (compareIds.length < 3) {
      addToCompare(id);
    }
  };

  const filtered = useMemo(() => {
    let result = cars.filter((car) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        car.make.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.year.toString().includes(q) ||
        car.bodyType.toLowerCase().includes(q);
      const matchBrand = brand === "All" || car.make === brand;
      const matchFuel = fuel === "All" || car.fuelType === fuel;
      const matchTrans = transmission === "All" || car.transmission === transmission;
      const matchCond = condition === "All" || car.condition === condition;
      const matchPrice = car.price >= minPrice && car.price <= maxPrice;
      return matchSearch && matchBrand && matchFuel && matchTrans && matchCond && matchPrice;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "year-desc") result = [...result].sort((a, b) => b.year - a.year);
    else if (sortBy === "hp-desc") result = [...result].sort((a, b) => b.horsepower - a.horsepower);
    else result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return result;
  }, [search, brand, fuel, transmission, condition, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filtered.length / CARS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE);

  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setFuel("All");
    setTransmission("All");
    setCondition("All");
    setMinPrice(0);
    setMaxPrice(1000000);
    setSortBy("featured");
    setPage(1);
  };

  const selectStyle = {
    background: "rgba(26,26,26,0.9)",
    border: "1px solid rgba(184,134,11,0.3)",
    color: "white",
    padding: "8px 12px",
    borderRadius: "2px",
    fontSize: "13px",
    width: "100%",
    outline: "none",
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: "#000" }}>
      {/* Page Header */}
      <div
        className="py-16 relative"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #000 100%)", borderBottom: "1px solid rgba(184,134,11,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: "#B8860B" }}>
            Our Collection
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Explore{" "}
            <span
              style={{ background: goldGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Inventory
            </span>
          </h1>
          <p className="text-white/50 max-w-xl">
            {filtered.length} exceptional vehicles available. Filter by your preferences to find your perfect match.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#B8860B" }} />
            <input
              type="text"
              placeholder="Search by make, model, year..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 text-sm rounded-sm outline-none"
              style={{ background: "rgba(26,26,26,0.9)", border: "1px solid rgba(184,134,11,0.3)", color: "white" }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ ...selectStyle, width: "auto", minWidth: "180px" }}
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Newest First</option>
            <option value="hp-desc">Most Powerful</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium tracking-wider uppercase rounded-sm transition-all"
            style={{ border: "1px solid rgba(184,134,11,0.4)", color: "#FFD700", background: showFilters ? "rgba(184,134,11,0.15)" : "transparent" }}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div
            className="p-6 rounded-sm mb-8"
            style={{ background: "rgba(17,17,17,0.9)", border: "1px solid rgba(184,134,11,0.2)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#FFD700" }}>
                Filter Options
              </h3>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <X size={12} /> Reset All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Brand</label>
                <select value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }} style={selectStyle}>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Fuel Type</label>
                <select value={fuel} onChange={(e) => { setFuel(e.target.value); setPage(1); }} style={selectStyle}>
                  {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Transmission</label>
                <select value={transmission} onChange={(e) => { setTransmission(e.target.value); setPage(1); }} style={selectStyle}>
                  {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Condition</label>
                <select value={condition} onChange={(e) => { setCondition(e.target.value); setPage(1); }} style={selectStyle}>
                  {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
                  Max Price: ${maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={50000}
                  max={1000000}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                  className="w-full accent-yellow-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {paginated.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg mb-4">No vehicles match your criteria.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 text-sm font-semibold tracking-widest uppercase text-black"
              style={{ background: goldGradient }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onCompare={handleCompare}
                inCompare={isInCompare(car.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium tracking-wider uppercase transition-all disabled:opacity-30"
              style={{ border: "1px solid rgba(184,134,11,0.4)", color: "#FFD700" }}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className="w-10 h-10 text-sm font-medium transition-all"
                style={{
                  background: page === i + 1 ? goldGradient : "transparent",
                  color: page === i + 1 ? "#000" : "rgba(255,255,255,0.5)",
                  border: page === i + 1 ? "none" : "1px solid rgba(184,134,11,0.3)",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium tracking-wider uppercase transition-all disabled:opacity-30"
              style={{ border: "1px solid rgba(184,134,11,0.4)", color: "#FFD700" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
