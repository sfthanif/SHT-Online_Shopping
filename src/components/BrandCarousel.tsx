"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const brands = [
  { name: "Nike",         tagline: "Just Do It",          color: "#111827", bg: "#f9fafb", border: "#e5e7eb" },
  { name: "Adidas",       tagline: "Impossible is Nothing",color: "#000000", bg: "#f3f4f6", border: "#d1d5db" },
  { name: "Puma",         tagline: "Forever Faster",       color: "#dc2626", bg: "#fff1f2", border: "#fecdd3" },
  { name: "Zara",         tagline: "New Collection",       color: "#1e293b", bg: "#f8fafc", border: "#e2e8f0" },
  { name: "H&M",          tagline: "Fashion & Quality",    color: "#dc2626", bg: "#fff5f5", border: "#fecaca" },
  { name: "Uniqlo",       tagline: "Made for All",         color: "#dc2626", bg: "#fff1f2", border: "#fecdd3" },
  { name: "Levi's",       tagline: "Live in Levi's",       color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { name: "Calvin Klein", tagline: "Minimalist Style",     color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
  { name: "Tommy",        tagline: "Classic American",     color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { name: "Gucci",        tagline: "Luxury Fashion",       color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
  { name: "Chanel",       tagline: "Timeless Elegance",    color: "#111827", bg: "#fafafa", border: "#e5e7eb" },
  { name: "Versace",      tagline: "Medusa Power",         color: "#92400e", bg: "#fefce8", border: "#fde68a" },
  { name: "Dior",         tagline: "French Luxury",        color: "#1e293b", bg: "#f8fafc", border: "#e2e8f0" },
  { name: "Burberry",     tagline: "British Heritage",     color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
];

const BrandCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const velRef    = useRef(0);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  const syncArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });
    const ro = new ResizeObserver(syncArrows);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", syncArrows); ro.disconnect(); };
  }, [syncArrows]);

  const startHover = (velocity: number) => {
    velRef.current = velocity;
    if (rafRef.current !== null) return;
    const tick = () => {
      const el = scrollRef.current;
      if (el && velRef.current !== 0) { el.scrollLeft += velRef.current; rafRef.current = requestAnimationFrame(tick); }
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  const stopHover = () => {
    velRef.current = 0;
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };
  const handleClick = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all duration-200 hover:border-pink-400 hover:text-pink-600 hover:shadow-lg opacity-0 group-hover:opacity-100";

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Trusted Names</p>
          <h2 className="mt-0.5 text-2xl font-semibold text-slate-900">Featured Brands</h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-pink-200 px-4 py-1.5 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
        >
          View All Brands
        </button>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => handleClick("left")}
          onMouseEnter={() => startHover(-2.5)}
          onMouseLeave={stopHover}
          aria-label="Scroll brands left"
          style={{ left: 4 }}
          className={`${arrowBase} ${!canLeft ? "opacity-0! pointer-events-none" : ""}`}
        >
          <FaChevronLeft className="text-sm" />
        </button>

        <button
          type="button"
          onClick={() => handleClick("right")}
          onMouseEnter={() => startHover(2.5)}
          onMouseLeave={stopHover}
          aria-label="Scroll brands right"
          style={{ right: 4 }}
          className={`${arrowBase} ${!canRight ? "opacity-0! pointer-events-none" : ""}`}
        >
          <FaChevronRight className="text-sm" />
        </button>

        {canLeft  && <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white/90 to-transparent" />}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white/90 to-transparent" />}

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-none py-2 px-1">
          {brands.map((brand) => (
            <button
              key={brand.name}
              type="button"
              style={{ background: brand.bg, borderColor: brand.border }}
              className="shrink-0 flex flex-col items-center justify-center gap-1.5 w-28 h-24 sm:w-32 sm:h-28 rounded-2xl border shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group/brand"
            >
              <span
                className="text-base sm:text-lg font-black tracking-tight leading-none text-center px-2"
                style={{ color: brand.color }}
              >
                {brand.name}
              </span>
              <span className="text-[10px] text-slate-400 group-hover/brand:text-pink-500 transition text-center px-2 leading-tight">
                {brand.tagline}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
