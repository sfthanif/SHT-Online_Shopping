"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    tag: "Big Saving Days Sale",
    title: "Shop the Latest Collections",
    subtitle: "Starting At Only",
    price: "৳999",
    cta: "Shop Now",
    gradient: "from-pink-100 via-rose-50 to-fuchsia-100",
    tagBg: "bg-pink-500",
    dec: ["bg-pink-200/40", "bg-rose-200/20"],
  },
  {
    tag: "Electronics Week",
    title: "Top Tech Deals This Season",
    subtitle: "Starting At Only",
    price: "৳1,499",
    cta: "Shop Now",
    gradient: "from-blue-100 via-indigo-50 to-sky-100",
    tagBg: "bg-blue-500",
    dec: ["bg-blue-200/40", "bg-indigo-200/20"],
  },
  {
    tag: "Fashion Festival",
    title: "Exclusive Styles for Everyone",
    subtitle: "Starting At Only",
    price: "৳799",
    cta: "Explore Styles",
    gradient: "from-violet-100 via-purple-50 to-fuchsia-100",
    tagBg: "bg-violet-500",
    dec: ["bg-violet-200/40", "bg-purple-200/20"],
  },
  {
    tag: "Fresh Deals",
    title: "Groceries & Wellness Picks",
    subtitle: "Starting At Only",
    price: "৳299",
    cta: "Shop Now",
    gradient: "from-emerald-100 via-green-50 to-teal-100",
    tagBg: "bg-emerald-500",
    dec: ["bg-emerald-200/40", "bg-teal-200/20"],
  },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[current];

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-xl bg-linear-to-br ${slide.gradient} border border-pink-100 transition-all duration-500`}>
      {/* Decorative circles */}
      <div className={`absolute right-8 top-4 w-40 h-40 rounded-full ${slide.dec[0]} transition-colors duration-500`} />
      <div className={`absolute right-20 bottom-4 w-28 h-28 rounded-full ${slide.dec[1]} transition-colors duration-500`} />
      <div className="absolute -left-6 bottom-0 w-32 h-32 rounded-full bg-white/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-12 space-y-3">
        <span className={`w-fit rounded-full ${slide.tagBg} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white transition-colors duration-500`}>
          {slide.tag}
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 leading-tight max-w-xs transition-all duration-300">
          {slide.title}
        </h2>
        <p className="text-sm text-slate-500">
          {slide.subtitle}{" "}
          <span className="text-lg font-black text-pink-500">{slide.price}</span>
        </p>
        <button
          type="button"
          className={`w-fit rounded-lg ${slide.tagBg} px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90 transition`}
        >
          {slide.cta}
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow text-slate-600 hover:bg-white hover:text-pink-500 transition"
      >
        <FaChevronLeft size={11} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow text-slate-600 hover:bg-white hover:text-pink-500 transition"
      >
        <FaChevronRight size={11} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-pink-500" : "w-1.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
