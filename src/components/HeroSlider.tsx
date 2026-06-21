"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    tag: "Limited Time Offer",
    title: "End of Season",
    headline: "SALE",
    subtitle: "Up to 50% Off",
    note: "On Selected Merchandise",
    cta: "Shop Now",
    gradient: "from-pink-600 via-pink-500 to-rose-400",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=500&fit=crop&q=80",
  },
  {
    id: 2,
    tag: "New Collection",
    title: "Fashion Week",
    headline: "EXCLUSIVES",
    subtitle: "Trending Styles for Every Season",
    note: "Free Delivery on Orders Above ৳1000",
    cta: "Explore Styles",
    gradient: "from-rose-500 via-pink-400 to-fuchsia-400",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=500&fit=crop&q=80",
  },
  {
    id: 3,
    tag: "Premium Collection",
    title: "Luxury Handbags",
    headline: "CRAFTED PERFECT",
    subtitle: "Elevate Your Style Statement",
    note: "Authentic & Certified Products",
    cta: "View Collection",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=500&fit=crop&q=80",
  },
  {
    id: 4,
    tag: "Flash Sale",
    title: "Today Only",
    headline: "BIG DEALS",
    subtitle: "Grab Before It's Gone",
    note: "Limited Stock Available",
    cta: "Shop Deals",
    gradient: "from-pink-700 via-rose-600 to-pink-400",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop&q=80",
  },
  {
    id: 5,
    tag: "Fine Jewellery",
    title: "Timeless",
    headline: "ELEGANCE",
    subtitle: "Gold, Diamond & Precious Stones",
    note: "Certified & Authenticated",
    cta: "Browse Jewellery",
    gradient: "from-rose-400 via-pink-400 to-fuchsia-300",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=500&fit=crop&q=80",
  },
  {
    id: 6,
    tag: "Self Care",
    title: "Beauty &",
    headline: "WELLNESS",
    subtitle: "Natural & Organic Products",
    note: "Up to 30% Off This Week",
    cta: "Discover Now",
    gradient: "from-pink-500 via-rose-400 to-pink-300",
    img: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&h=500&fit=crop&q=80",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startInterval]);

  const goTo = useCallback((index: number) => { setCurrent(index); startInterval(); }, [startInterval]);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <div className="relative flex-1 overflow-hidden select-none">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 bg-linear-to-br ${s.gradient} transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Product image — right 45% */}
          <div className="absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden">
            <Image
              src={s.img}
              alt={s.headline}
              fill
              sizes="45vw"
              className="object-cover object-center"
              priority={i === 0}
            />
            {/* Left blend */}
            <div className="absolute inset-0 bg-linear-to-r from-pink-500/80 via-pink-400/30 to-transparent" />
          </div>

          {/* Decorative circles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <circle cx="15%" cy="15%" r="120" fill="white" fillOpacity="0.08" />
            <circle cx="8%"  cy="80%" r="80"  fill="white" fillOpacity="0.06" />
          </svg>

          {/* Text content */}
          <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-12 lg:px-16 max-w-[58%]">
            <span className="inline-block w-fit rounded-full bg-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              {s.tag}
            </span>
            <p className="mt-3 text-base sm:text-xl lg:text-2xl font-semibold text-white/90 leading-tight">
              {s.title}
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              {s.headline}
            </h2>
            <p className="mt-2 text-sm sm:text-base font-semibold text-white/80">{s.subtitle}</p>
            <p className="mt-1 text-xs text-white/60">*{s.note}</p>
            <button className="mt-4 w-fit rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-bold text-pink-600 shadow-md transition hover:scale-105 active:scale-100">
              {s.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button type="button" onClick={prev} className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/45" aria-label="Previous slide">
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>
      <button type="button" onClick={next} className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/45" aria-label="Next slide">
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((s, i) => (
          <button key={s.id} type="button" onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 z-20 rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HeroSlider;
