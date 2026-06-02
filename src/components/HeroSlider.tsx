"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    gradient: "bg-linear-to-br from-pink-600 via-pink-500 to-rose-400",
    decoration: [
      { cx: "78%", cy: "20%", r: "120", opacity: "0.15" },
      { cx: "88%", cy: "78%", r: "160", opacity: "0.10" },
      { cx: "60%", cy: "52%", r: "240", opacity: "0.06" },
    ],
  },
  {
    id: 2,
    tag: "New Collection",
    title: "Fashion Week",
    headline: "EXCLUSIVES",
    subtitle: "Trending Styles for Every Season",
    note: "Free Delivery on Orders Above ৳1000",
    cta: "Explore Styles",
    gradient: "bg-linear-to-br from-rose-500 via-pink-400 to-fuchsia-400",
    decoration: [
      { cx: "75%", cy: "25%", r: "110", opacity: "0.18" },
      { cx: "90%", cy: "80%", r: "90", opacity: "0.12" },
      { cx: "55%", cy: "55%", r: "200", opacity: "0.07" },
    ],
  },
  {
    id: 3,
    tag: "Premium Collection",
    title: "Luxury Handbags",
    headline: "CRAFTED PERFECT",
    subtitle: "Elevate Your Style Statement",
    note: "Authentic & Certified Products",
    cta: "View Collection",
    gradient: "bg-linear-to-br from-fuchsia-500 via-pink-500 to-rose-400",
    decoration: [
      { cx: "80%", cy: "30%", r: "100", opacity: "0.2" },
      { cx: "70%", cy: "70%", r: "140", opacity: "0.12" },
      { cx: "50%", cy: "50%", r: "220", opacity: "0.06" },
    ],
  },
  {
    id: 4,
    tag: "Flash Sale",
    title: "Today Only",
    headline: "BIG DEALS",
    subtitle: "Grab Before It's Gone",
    note: "Limited Stock Available",
    cta: "Shop Deals",
    gradient: "bg-linear-to-br from-pink-700 via-rose-600 to-pink-400",
    decoration: [
      { cx: "82%", cy: "22%", r: "95", opacity: "0.2" },
      { cx: "88%", cy: "78%", r: "130", opacity: "0.13" },
      { cx: "62%", cy: "48%", r: "210", opacity: "0.07" },
    ],
  },
  {
    id: 5,
    tag: "Fine Jewellery",
    title: "Timeless",
    headline: "ELEGANCE",
    subtitle: "Gold, Diamond & Precious Stones",
    note: "Certified & Authenticated",
    cta: "Browse Jewellery",
    gradient: "bg-linear-to-br from-rose-400 via-pink-400 to-fuchsia-300",
    decoration: [
      { cx: "76%", cy: "28%", r: "105", opacity: "0.2" },
      { cx: "88%", cy: "72%", r: "130", opacity: "0.14" },
      { cx: "58%", cy: "52%", r: "200", opacity: "0.07" },
    ],
  },
  {
    id: 6,
    tag: "Self Care",
    title: "Beauty &",
    headline: "WELLNESS",
    subtitle: "Natural & Organic Products",
    note: "Up to 30% Off This Week",
    cta: "Discover Now",
    gradient: "bg-linear-to-br from-pink-500 via-rose-400 to-pink-300",
    decoration: [
      { cx: "78%", cy: "24%", r: "100", opacity: "0.18" },
      { cx: "86%", cy: "76%", r: "125", opacity: "0.12" },
      { cx: "56%", cy: "50%", r: "195", opacity: "0.07" },
    ],
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      startInterval();
    },
    [startInterval],
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <div className="relative flex-1 overflow-hidden select-none">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 ${s.gradient} transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Decorative circles */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {s.decoration.map((d, di) => (
              <circle
                key={di}
                cx={d.cx}
                cy={d.cy}
                r={d.r}
                fill="white"
                fillOpacity={d.opacity}
              />
            ))}
          </svg>

          {/* Slide content */}
          <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-12 lg:px-16">
            <span className="inline-block w-fit rounded-full bg-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              {s.tag}
            </span>
            <p className="mt-3 text-base sm:text-xl lg:text-2xl font-semibold text-white/90 leading-tight">
              {s.title}
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              {s.headline}
            </h2>
            <p className="mt-2 text-sm sm:text-base font-semibold text-white/80">
              {s.subtitle}
            </p>
            <p className="mt-1 text-xs text-white/60">*{s.note}</p>
            <button className="mt-4 w-fit rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-bold text-pink-600 shadow-md transition hover:scale-105 active:scale-100">
              {s.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Left arrow */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/45"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/45"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
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
