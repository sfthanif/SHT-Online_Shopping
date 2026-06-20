"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const banners = [
  {
    id: 1,
    tag: "Flash Sale",
    title: "Smart Deals",
    subtitle: "Trending Electronics",
    offer: "Up to 40% Off",
    gradient: "from-emerald-500 via-teal-500 to-green-400",
    dec: [{ cx: "85%", cy: "20%", r: 90, o: 0.18 }, { cx: "70%", cy: "80%", r: 70, o: 0.12 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <rect x="8" y="20" width="48" height="32" rx="4" /><rect x="20" y="12" width="24" height="12" rx="2" />
        <circle cx="22" cy="46" r="3" fill="rgba(0,0,0,0.3)" /><circle cx="42" cy="46" r="3" fill="rgba(0,0,0,0.3)" />
      </svg>
    ),
  },
  {
    id: 2,
    tag: "New Arrivals",
    title: "Best Deals",
    subtitle: "On Fashion",
    offer: "Min. 50% Off",
    gradient: "from-sky-500 via-blue-400 to-cyan-400",
    dec: [{ cx: "80%", cy: "15%", r: 100, o: 0.15 }, { cx: "90%", cy: "75%", r: 75, o: 0.10 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <path d="M20 12 L32 8 L44 12 L48 20 H16 Z" /><rect x="14" y="20" width="36" height="32" rx="2" />
        <path d="M24 20 Q24 30 32 30 Q40 30 40 20" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 3,
    tag: "Daily Fresh",
    title: "Taste & Enjoy",
    subtitle: "Best Grocery Deals",
    offer: "Save Up to 30%",
    gradient: "from-orange-500 via-amber-400 to-yellow-400",
    dec: [{ cx: "82%", cy: "18%", r: 85, o: 0.20 }, { cx: "75%", cy: "78%", r: 65, o: 0.14 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <ellipse cx="32" cy="48" rx="20" ry="8" /><path d="M12 48 Q14 28 32 24 Q50 28 52 48 Z" />
        <path d="M32 24 Q28 16 22 14 Q26 22 32 24 Z" /><path d="M32 24 Q36 14 42 12 Q38 20 32 24 Z" />
      </svg>
    ),
  },
  {
    id: 4,
    tag: "Winter Sale",
    title: "Winter Savings",
    subtitle: "Carnival — Save Big",
    offer: "50% Off",
    gradient: "from-indigo-600 via-blue-700 to-slate-700",
    dec: [{ cx: "84%", cy: "22%", r: 95, o: 0.16 }, { cx: "88%", cy: "72%", r: 70, o: 0.11 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <polygon points="32,8 36,22 50,22 39,31 43,45 32,36 21,45 25,31 14,22 28,22" />
        <circle cx="14" cy="52" r="5" /><circle cx="32" cy="56" r="4" /><circle cx="50" cy="52" r="5" />
      </svg>
    ),
  },
  {
    id: 5,
    tag: "Beauty Week",
    title: "Glow Up Sale",
    subtitle: "Skincare & Makeup",
    offer: "Flat 35% Off",
    gradient: "from-pink-500 via-rose-400 to-fuchsia-400",
    dec: [{ cx: "80%", cy: "20%", r: 88, o: 0.18 }, { cx: "88%", cy: "70%", r: 60, o: 0.12 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <ellipse cx="32" cy="32" rx="18" ry="22" /><ellipse cx="32" cy="20" rx="10" ry="6" />
        <rect x="28" y="8" width="8" height="6" rx="2" />
      </svg>
    ),
  },
  {
    id: 6,
    tag: "Active Deals",
    title: "Sports & Fitness",
    subtitle: "Gear Up for Less",
    offer: "Up to 45% Off",
    gradient: "from-red-500 via-orange-500 to-amber-500",
    dec: [{ cx: "78%", cy: "18%", r: 92, o: 0.17 }, { cx: "86%", cy: "74%", r: 68, o: 0.11 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <circle cx="32" cy="32" r="20" fill="none" stroke="white" strokeWidth="4" />
        <path d="M20 32 L32 20 L44 32 L32 44 Z" />
      </svg>
    ),
  },
  {
    id: 7,
    tag: "Home Picks",
    title: "Home & Living",
    subtitle: "Furniture & Decor",
    offer: "Buy 2 Get 1 Free",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    dec: [{ cx: "83%", cy: "16%", r: 90, o: 0.16 }, { cx: "72%", cy: "76%", r: 72, o: 0.12 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <path d="M8 40 L32 12 L56 40 Z" /><rect x="18" y="40" width="28" height="16" rx="2" />
        <rect x="28" y="46" width="8" height="10" rx="1" />
      </svg>
    ),
  },
  {
    id: 8,
    tag: "Bag Bonanza",
    title: "Bags & Accessories",
    subtitle: "Top Brands, Best Prices",
    offer: "Up to 60% Off",
    gradient: "from-teal-500 via-cyan-500 to-sky-400",
    dec: [{ cx: "81%", cy: "19%", r: 86, o: 0.17 }, { cx: "89%", cy: "73%", r: 66, o: 0.12 }],
    icon: (
      <svg viewBox="0 0 64 64" className="absolute right-3 bottom-3 h-16 w-16 sm:h-20 sm:w-20 opacity-25" fill="white" aria-hidden="true">
        <rect x="12" y="22" width="40" height="34" rx="4" />
        <path d="M22 22 Q22 10 32 10 Q42 10 42 22" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <rect x="24" y="30" width="16" height="3" rx="1.5" />
      </svg>
    ),
  },
];

const PromoBanners = () => {
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

  /* rAF hover scroll — same pattern as Popular / Latest */
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

  const slide = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -(el.clientWidth - 60) : el.clientWidth - 60, behavior: "smooth" });
  };

  return (
    <section>
      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => slide("left")}
          onMouseEnter={() => startHover(-2.5)}
          onMouseLeave={stopHover}
          aria-label="Previous banners"
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100 text-slate-600 hover:text-pink-500 hover:border-pink-300 transition ${
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <FaChevronLeft size={12} />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => slide("right")}
          onMouseEnter={() => startHover(2.5)}
          onMouseLeave={stopHover}
          aria-label="Next banners"
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100 text-slate-600 hover:text-pink-500 hover:border-pink-300 transition ${
            canRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <FaChevronRight size={12} />
        </button>

        {/* Scrollable track — no snap so smooth scroll speed matches other carousels */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-none"
        >
          {banners.map((b) => (
            <div
              key={b.id}
              className={`relative shrink-0 w-[calc(50%-6px)] lg:w-[calc(25%-9px)] overflow-hidden rounded-xl bg-linear-to-br ${b.gradient} cursor-pointer select-none transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Decorative circles */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                {b.dec.map((d, i) => (
                  <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="white" fillOpacity={d.o} />
                ))}
              </svg>

              {/* Category icon */}
              {b.icon}

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-3.5 sm:p-4 min-h-32 sm:min-h-36">
                <div>
                  <span className="inline-block rounded-full bg-white/25 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                    {b.tag}
                  </span>
                  <p className="mt-2 text-base sm:text-lg font-black text-white leading-tight">{b.title}</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-white/80">{b.subtitle}</p>
                  <p className="mt-1.5 text-sm sm:text-base font-black text-white drop-shadow">{b.offer}</p>
                </div>
                <button
                  type="button"
                  className="mt-3 w-fit rounded-full bg-white px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-slate-800 shadow transition hover:scale-105 active:scale-100"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
