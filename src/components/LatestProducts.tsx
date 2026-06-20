"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaShoppingCart } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { useProductDetail } from "@/contexts/ProductDetailContext";
import WishlistButton from "@/components/WishlistButton";
import { currency } from "@/lib/products";
import PromoBanners from "@/components/PromoBanners";

type Props = { products: Product[] };

const LatestProducts = ({ products }: Props) => {
  const { addToCart } = useCart();
  const { open } = useProductDetail();

  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const velRef = useRef(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  /* Show newest first: products with a discount field are the latest additions */
  const latest = [...products]
    .sort((a, b) => ((b.discount ?? -1) >= 0 ? 1 : 0) - ((a.discount ?? -1) >= 0 ? 1 : 0))
    .reverse()
    .slice(0, 24);

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
    return () => { ro.disconnect(); el.removeEventListener("scroll", syncArrows); };
  }, []);

  const startHover = (velocity: number) => {
    velRef.current = velocity;
    if (rafRef.current !== null) return;
    const tick = () => {
      const el = scrollRef.current;
      if (el && velRef.current !== 0) {
        el.scrollLeft += velRef.current;
        rafRef.current = requestAnimationFrame(tick);
      } else { rafRef.current = null; }
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

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          Just Arrived
        </p>
        <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <MdNewReleases className="text-pink-500" />
          Latest Products
        </h2>
      </div>

      {/* Carousel */}
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
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-none py-2 px-1">
          {latest.map((product) => {
            const roundedStars = Math.round(product.rating);
            const amount = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product.price);

            return (
              <article
                key={product.id}
                onClick={() => open(product)}
                className="relative flex shrink-0 flex-col w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 cursor-pointer overflow-hidden rounded-lg border border-pink-100 bg-white/95 shadow-sm transition hover:shadow-md group/card"
              >
                {/* Discount badge */}
                {product.discount && (
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Wishlist */}
                <div className="absolute right-1 top-1 z-10">
                  <WishlistButton productId={product.id} />
                </div>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-linear-to-br from-pink-50 to-rose-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 208px, (min-width: 1024px) 192px, (min-width: 768px) 176px, (min-width: 640px) 160px, 144px"
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
                  <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                    {product.description ?? "Premium quality product."}
                  </p>

                  <div className="mt-auto">
                    {/* Stars */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar key={i} size={10} className={i < roundedStars ? "text-amber-400" : "text-amber-200"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500">({product.reviewCount ?? 0})</span>
                    </div>

                    {/* Price row */}
                    <div className="mt-1.5 flex items-center justify-between gap-1">
                      <div className="flex items-baseline gap-0.5 text-sm font-bold text-pink-600">
                        <span className="text-sm font-black leading-none">৳</span>
                        <span>{amount}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        disabled={product.stock <= 0}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-pink-500 text-white shadow-sm transition hover:bg-pink-600 disabled:opacity-50"
                        aria-label="Add to cart"
                      >
                        <FaShoppingCart size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Promo banners carousel — below the product carousel */}
      <PromoBanners />
    </section>
  );
};

export default LatestProducts;
