"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFire } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

type Props = { products: Product[] };

const TrendingCarousel = ({ products }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const velRef   = useRef(0);

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  // Sort by reviewCount descending
  const trending = [...products].sort(
    (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
  );

  /* ── arrow visibility ── */
  const syncArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncArrows();
    const ro = new ResizeObserver(syncArrows);
    ro.observe(el);
    el.addEventListener("scroll", syncArrows, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", syncArrows);
    };
  }, []);

  /* ── hover: continuous scroll via rAF ── */
  const startHover = (velocity: number) => {
    velRef.current = velocity;
    if (rafRef.current !== null) return;
    const tick = () => {
      const el = scrollRef.current;
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
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  /* ── click: jump by ~one viewport width ── */
  const handleClick = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth - 60;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  /* ── shared arrow classes ── */
  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all duration-200 hover:border-pink-400 hover:text-pink-600 hover:shadow-lg opacity-0 group-hover:opacity-100";

  return (
    <section className="space-y-4">
      {/* ── header ── */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          Most Reviewed
        </p>
        <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <FaFire className="text-orange-500" />
          Trending
        </h2>
      </div>

      {/* ── carousel wrapper ── */}
      <div className="relative group">

        {/* Left arrow */}
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

        {/* Right arrow */}
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

        {/* Edge fades */}
        {canLeft  && <div className="pointer-events-none absolute left-0  top-0 z-10 h-full w-14 bg-linear-to-r from-white/70 to-transparent" />}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-linear-to-l from-white/70 to-transparent" />}

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-none py-2 px-1"
        >
          {trending.map((product) => (
            <div
              key={product.id}
              className="relative flex shrink-0 flex-col w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCarousel;
