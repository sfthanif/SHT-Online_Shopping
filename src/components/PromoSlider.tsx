"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    tag: "Big Saving Days",
    title: "Shop the Latest Collections",
    subtitle: "Starting At Only",
    price: "৳999",
    cta: "Shop Now",
    gradient: "from-pink-100 via-rose-50 to-fuchsia-100",
    tagBg: "bg-pink-500",
    dec: ["bg-pink-200/40", "bg-rose-200/20"],
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=320&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=320&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=320&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=320&fit=crop&q=80",
  },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), []);
  const prev = () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));

  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl bg-linear-to-br ${slide.gradient} border border-pink-100 transition-all duration-500`}
    >
      {/* Decorative circles */}
      <div className={`absolute right-6 top-4 w-36 h-36 rounded-full ${slide.dec[0]} transition-colors duration-500`} />
      <div className={`absolute right-16 bottom-4 w-24 h-24 rounded-full ${slide.dec[1]} transition-colors duration-500`} />
      <div className="absolute -left-6 bottom-0 w-28 h-28 rounded-full bg-white/20" />

      {/* Product image — right side */}
      <div className="absolute right-0 bottom-0 top-0 w-2/5 overflow-hidden pointer-events-none">
        <Image
          key={slide.img}
          src={slide.img}
          alt=""
          fill
          sizes="30vw"
          className="object-cover object-top opacity-90 transition-opacity duration-500"
        />
        {/* Left fade so image blends into text */}
        <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 space-y-3 max-w-[60%]">
        <span
          className={`w-fit rounded-full ${slide.tagBg} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white transition-colors duration-500`}
        >
          {slide.tag}
        </span>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 leading-tight transition-all duration-300">
          {slide.title}
        </h2>
        <p className="text-sm text-slate-500">
          {slide.subtitle}{" "}
          <span className="text-lg font-black text-pink-500">{slide.price}</span>
        </p>
        <button
          type="button"
          className={`w-fit rounded-lg ${slide.tagBg} px-5 py-2 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90 transition`}
        >
          {slide.cta}
        </button>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow text-slate-600 hover:bg-white hover:text-pink-500 transition"
      >
        <FaChevronLeft size={10} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow text-slate-600 hover:bg-white hover:text-pink-500 transition"
      >
        <FaChevronRight size={10} />
      </button>

      {/* Dots */}
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
