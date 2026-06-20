"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const makeBlogImage = (label: string, a: string, b: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${a}"/>
        <stop offset="100%" stop-color="${b}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="260" fill="url(#g)"/>
    <circle cx="320" cy="60" r="80" fill="rgba(255,255,255,0.1)"/>
    <circle cx="60"  cy="200" r="55" fill="rgba(255,255,255,0.08)"/>
    <rect x="60" y="70" width="280" height="120" rx="16" fill="rgba(255,255,255,0.15)"/>
    <text x="200" y="148" font-family="sans-serif" font-size="18" font-weight="bold"
      fill="rgba(255,255,255,0.7)" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const posts = [
  {
    id: 1,
    title: "Top 10 Fashion Trends to Watch This Season",
    excerpt: "Discover the hottest styles and must-have pieces that are defining this year's fashion landscape across all age groups.",
    date: "5 April, 2025",
    category: "Fashion",
    imgA: "#ec4899", imgB: "#f43f5e",
  },
  {
    id: 2,
    title: "How to Choose the Right Smartphone for You",
    excerpt: "With hundreds of models available, picking the perfect phone can be overwhelming. Here's what really matters.",
    date: "12 April, 2025",
    category: "Electronics",
    imgA: "#6366f1", imgB: "#3b82f6",
  },
  {
    id: 3,
    title: "5 Skincare Routines That Actually Work",
    excerpt: "Experts share the step-by-step skincare routines that deliver real results, no matter your skin type.",
    date: "18 April, 2025",
    category: "Beauty",
    imgA: "#f97316", imgB: "#fbbf24",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Healthy Grocery Shopping",
    excerpt: "Learn how to fill your cart with nutritious essentials without breaking the bank or spending hours in the store.",
    date: "25 April, 2025",
    category: "Grocery",
    imgA: "#22c55e", imgB: "#16a34a",
  },
  {
    id: 5,
    title: "Sneaker Culture: From Streets to Runways",
    excerpt: "How footwear went from a functional necessity to a global cultural phenomenon worth billions of dollars.",
    date: "2 May, 2025",
    category: "Footwear",
    imgA: "#8b5cf6", imgB: "#6d28d9",
  },
  {
    id: 6,
    title: "Wellness Tips for a Balanced Modern Lifestyle",
    excerpt: "Simple, science-backed habits that can help you feel better, sleep more soundly, and stay energised all day.",
    date: "10 May, 2025",
    category: "Wellness",
    imgA: "#06b6d4", imgB: "#0284c7",
  },
  {
    id: 7,
    title: "Bag Trends: The Styles Everyone Is Carrying",
    excerpt: "From mini bags to oversized totes — we break down the bag trends dominating streets and social feeds right now.",
    date: "18 May, 2025",
    category: "Bags",
    imgA: "#f472b6", imgB: "#db2777",
  },
];

const BlogSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const velRef    = useRef(0);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

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

  const startHover = (v: number) => {
    velRef.current = v;
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
    "absolute top-[40%] -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all hover:border-pink-400 hover:text-pink-600 opacity-0 group-hover:opacity-100";

  return (
    <section className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Articles &amp; Tips</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">From The Blog</h2>
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
          className={`${arrowBase} ${!canLeft ? "!opacity-0 pointer-events-none" : ""}`}
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
          className={`${arrowBase} ${!canRight ? "!opacity-0 pointer-events-none" : ""}`}
        >
          <FaChevronRight className="text-sm" />
        </button>

        {/* Edge fades */}
        {canLeft  && <div className="pointer-events-none absolute left-0  top-0 z-10 h-full w-14 bg-linear-to-r from-white/80 to-transparent" />}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-linear-to-l from-white/80 to-transparent" />}

        {/* Scrollable track */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-none py-2 px-1">
          {posts.map((post) => (
            <article
              key={post.id}
              className="shrink-0 w-64 sm:w-72 flex flex-col rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-md transition cursor-pointer group/card"
            >
              {/* Image + date badge */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={makeBlogImage(post.category, post.imgA, post.imgB)}
                  alt={post.title}
                  className="w-full h-full object-cover transition duration-300 group-hover/card:scale-105"
                />
                {/* Date badge */}
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                  <FiClock size={10} />
                  {post.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500">
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover/card:text-pink-600 transition">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 leading-5 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
                <button className="mt-auto self-start text-xs font-semibold text-slate-700 hover:text-pink-500 transition flex items-center gap-1">
                  Read More <span className="text-pink-500">&rsaquo;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
