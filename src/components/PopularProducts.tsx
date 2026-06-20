"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import PromoBanners from "@/components/PromoBanners";

const TABS = ["Fashion", "Electronics", "Bags", "Footwear", "Groceries", "Beauty", "Wellness"];

type Props = { products: Product[] };

const PopularProducts = ({ products }: Props) => {
  const [activeTab, setActiveTab] = useState("Fashion");

  /* ── tab-strip scroll state ── */
  const [tabCanLeft,  setTabCanLeft]  = useState(false);
  const [tabCanRight, setTabCanRight] = useState(false);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  /* ── card-track scroll state ── */
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const rafRef        = useRef<number | null>(null);
  const velRef        = useRef(0);

  const filtered = products
    .filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase())
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, 20);

  /* ── sync tab arrows ── */
  const syncTabArrows = () => {
    const el = tabScrollRef.current;
    if (!el) return;
    setTabCanLeft(el.scrollLeft > 4);
    setTabCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = tabScrollRef.current;
    if (!el) return;
    syncTabArrows();
    el.addEventListener("scroll", syncTabArrows, { passive: true });
    const ro = new ResizeObserver(syncTabArrows);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", syncTabArrows); ro.disconnect(); };
  }, []);

  /* ── sync card arrows ── */
  const syncCardArrows = () => {
    const el = cardScrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = cardScrollRef.current;
    if (!el) return;
    syncCardArrows();
    el.addEventListener("scroll", syncCardArrows, { passive: true });
    const ro = new ResizeObserver(syncCardArrows);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", syncCardArrows); ro.disconnect(); };
  }, [filtered.length]);

  /* ── hover: continuous scroll via rAF (same as Trending) ── */
  const startHover = (velocity: number) => {
    velRef.current = velocity;
    if (rafRef.current !== null) return;
    const tick = () => {
      const el = cardScrollRef.current;
      if (el && velRef.current !== 0) {
        el.scrollLeft += velRef.current;
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopHover = () => {
    velRef.current = 0;
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  /* ── click: jump by viewport width ── */
  const handleClick = (dir: "left" | "right") => {
    const el = cardScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -(el.clientWidth - 60) : el.clientWidth - 60, behavior: "smooth" });
  };

  const scrollTabs = (dir: "left" | "right") => {
    tabScrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  /* ── shared arrow class (identical to TrendingCarousel) ── */
  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all duration-200 hover:border-pink-400 hover:text-pink-600 hover:shadow-lg opacity-0 group-hover:opacity-100";

  return (
    <section className="space-y-4">
      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Popular Products</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Do not miss the current offers until the end of the season.
          </p>
        </div>

        {/* Tab bar with left/right scroll arrows */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => scrollTabs("left")}
            aria-label="Scroll tabs left"
            className={`flex shrink-0 items-center justify-center px-1 py-2.5 text-slate-400 transition hover:text-pink-500 ${
              tabCanLeft ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <FaChevronLeft size={12} />
          </button>

          <div ref={tabScrollRef} className="flex items-center overflow-x-auto scrollbar-none max-w-xl">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => { setActiveTab(tab); setTimeout(syncCardArrows, 50); }}
                className={`relative shrink-0 px-4 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === tab ? "text-pink-600" : "text-slate-500 hover:text-pink-500"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-3/5 -translate-x-1/2 rounded-full bg-pink-500" />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTabs("right")}
            aria-label="Scroll tabs right"
            className={`flex shrink-0 items-center justify-center px-1 py-2.5 text-slate-400 transition hover:text-pink-500 ${
              tabCanRight ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Card carousel — identical arrows & hover-scroll to TrendingCarousel */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => handleClick("left")}
          onMouseEnter={() => startHover(-2.5)}
          onMouseLeave={stopHover}
          aria-label="Scroll left"
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
          aria-label="Scroll right"
          style={{ right: 4 }}
          className={`${arrowBase} ${!canRight ? "opacity-0! pointer-events-none" : ""}`}
        >
          <FaChevronRight className="text-sm" />
        </button>

        {/* Edge fades — same as Trending */}
        {canLeft  && <div className="pointer-events-none absolute left-0  top-0 z-10 h-full w-14 bg-linear-to-r from-white/70 to-transparent" />}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-linear-to-l from-white/70 to-transparent" />}

        <div
          ref={cardScrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-none py-2 px-1"
        >
          {filtered.length === 0 ? (
            <p className="py-12 text-sm text-slate-400">No products in this category.</p>
          ) : (
            filtered.map((product) => (
              <div key={product.id} className="flex shrink-0 flex-col w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Promo banners — part of the Popular Products section */}
      <PromoBanners />
    </section>
  );
};

export default PopularProducts;
