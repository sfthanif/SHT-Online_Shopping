"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FaBolt, FaChevronLeft, FaChevronRight, FaStar, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { useProductDetail } from "@/contexts/ProductDetailContext";
import WishlistButton from "@/components/WishlistButton";

type Props = { products: Product[] };

const SALE_HOURS = 8;

function useCountdown(totalSeconds: number) {
  const [left, setLeft] = useState(totalSeconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : totalSeconds)), 1000);
    return () => clearInterval(t);
  }, [totalSeconds]);
  const h = String(Math.floor(left / 3600)).padStart(2, "0");
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return [h, m, s] as const;
}

const FlashSaleSection = ({ products }: Props) => {
  const { addToCart } = useCart();
  const { open } = useProductDetail();
  const [hours, minutes, seconds] = useCountdown(SALE_HOURS * 3600);

  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const velRef    = useRef(0);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  const flashItems = [...products]
    .filter((p) => (p.discount ?? 0) > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    .slice(0, 18);

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
    el.scrollBy({ left: dir === "left" ? -(el.clientWidth - 60) : el.clientWidth - 60, behavior: "smooth" });
  };

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all duration-200 hover:border-pink-400 hover:text-pink-600 hover:shadow-lg opacity-0 group-hover:opacity-100";

  if (flashItems.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-rose-100">
      {/* ── Header bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <FaBolt className="text-xl text-yellow-300" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Flash Sale</h2>
            <p className="text-xs text-white/75">Limited time — deal ends in:</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1.5">
          {[hours, minutes, seconds].map((val, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
                <span className="text-xl font-black text-white leading-none">{val}</span>
                <span className="text-[9px] font-semibold text-white/70 uppercase tracking-widest mt-0.5">
                  {["HRS", "MIN", "SEC"][i]}
                </span>
              </span>
              {i < 2 && <span className="text-xl font-black text-white/60 leading-none">:</span>}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-white/25"
        >
          View All Deals
        </button>
      </div>

      {/* ── Product carousel ── */}
      <div className="bg-gradient-to-b from-rose-50/60 to-white px-4 py-4 sm:px-6">
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

          {canLeft  && <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 bg-gradient-to-r from-rose-50/80 to-transparent" />}
          {canRight && <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-white/80 to-transparent" />}

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-none py-2 px-1">
            {flashItems.map((product) => {
              const stars    = Math.round(product.rating);
              const price    = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product.price);
              const original = product.discount
                ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
                    Math.round(product.price / (1 - product.discount / 100))
                  )
                : null;
              const sold = Math.min(Math.max((product.reviewCount ?? 20) % 100, 15), 88);

              return (
                <article
                  key={product.id}
                  onClick={() => open(product)}
                  className="relative flex shrink-0 flex-col w-36 sm:w-40 md:w-44 lg:w-48 cursor-pointer overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 group/card"
                >
                  {/* Discount badge */}
                  {product.discount && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-black text-white shadow">
                      -{product.discount}%
                    </span>
                  )}

                  {/* Wishlist */}
                  <div className="absolute right-1 top-1 z-10">
                    <WishlistButton productId={product.id} />
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 192px, (min-width: 768px) 176px, (min-width: 640px) 160px, 144px"
                      className="object-cover transition duration-300 group-hover/card:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-pink-500">
                      {product.category}
                    </p>
                    <h3 className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                      {product.name}
                    </h3>

                    {/* Stars */}
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} size={9} className={i < stars ? "text-amber-400" : "text-amber-200"} />
                      ))}
                      <span className="ml-0.5 text-[10px] text-slate-400">({product.reviewCount ?? 0})</span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-2 flex items-center justify-between gap-1">
                      <div>
                        <div className="flex items-baseline gap-0.5 font-black text-rose-600">
                          <span className="text-sm">৳</span>
                          <span className="text-sm">{price}</span>
                        </div>
                        {original && (
                          <span className="text-[11px] text-slate-400 line-through">৳{original}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        disabled={product.stock <= 0}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-rose-500 text-white shadow-sm transition hover:bg-rose-600 disabled:opacity-50"
                        aria-label="Add to cart"
                      >
                        <FaShoppingCart size={13} />
                      </button>
                    </div>

                    {/* Sold progress bar */}
                    <div className="mt-2.5">
                      <p className="mb-1 text-[10px] text-slate-500">
                        Sold: <span className="font-semibold text-rose-500">{sold}%</span>
                      </p>
                      <div className="h-1.5 w-full rounded-full bg-rose-100">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all"
                          style={{ width: `${sold}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;
