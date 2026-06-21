"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const posts = [
  {
    id: 1,
    title: "Top 10 Fashion Trends to Watch This Season",
    excerpt: "Discover the hottest styles and must-have pieces that are defining this year's fashion landscape across all age groups.",
    date: "5 April, 2025",
    category: "Fashion",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&q=80",
  },
  {
    id: 2,
    title: "How to Choose the Right Smartphone for You",
    excerpt: "With hundreds of models available, picking the perfect phone can be overwhelming. Here's what really matters.",
    date: "12 April, 2025",
    category: "Electronics",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=240&fit=crop&q=80",
  },
  {
    id: 3,
    title: "5 Skincare Routines That Actually Work",
    excerpt: "Experts share the step-by-step skincare routines that deliver real results, no matter your skin type.",
    date: "18 April, 2025",
    category: "Beauty",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=240&fit=crop&q=80",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Healthy Grocery Shopping",
    excerpt: "Learn how to fill your cart with nutritious essentials without breaking the bank or spending hours in the store.",
    date: "25 April, 2025",
    category: "Grocery",
    img: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400&h=240&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Sneaker Culture: From Streets to Runways",
    excerpt: "How footwear went from a functional necessity to a global cultural phenomenon worth billions of dollars.",
    date: "2 May, 2025",
    category: "Footwear",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=240&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Wellness Tips for a Balanced Modern Lifestyle",
    excerpt: "Simple, science-backed habits that can help you feel better, sleep more soundly, and stay energised all day.",
    date: "10 May, 2025",
    category: "Wellness",
    img: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=240&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Bag Trends: The Styles Everyone Is Carrying",
    excerpt: "From mini bags to oversized totes — we break down the bag trends dominating streets and social feeds right now.",
    date: "18 May, 2025",
    category: "Bags",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=240&fit=crop&q=80",
  },
];

const categoryColor: Record<string, string> = {
  Fashion:     "bg-rose-500",
  Electronics: "bg-blue-500",
  Beauty:      "bg-purple-500",
  Grocery:     "bg-emerald-500",
  Footwear:    "bg-amber-500",
  Wellness:    "bg-teal-500",
  Bags:        "bg-pink-500",
};

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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Articles &amp; Tips</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">From The Blog</h2>
        </div>
        <button type="button" className="rounded-full border border-pink-200 px-4 py-1.5 text-sm font-semibold text-pink-500 transition hover:bg-pink-50">
          View All Posts
        </button>
      </div>

      {/* Carousel */}
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

        {canLeft  && <div className="pointer-events-none absolute left-0  top-0 z-10 h-full w-14 bg-linear-to-r from-white/80 to-transparent" />}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-linear-to-l from-white/80 to-transparent" />}

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-none py-2 px-1">
          {posts.map((post) => (
            <article
              key={post.id}
              className="shrink-0 w-64 sm:w-72 flex flex-col rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-md transition cursor-pointer group/card"
            >
              {/* Real photo */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  sizes="300px"
                  className="object-cover transition duration-300 group-hover/card:scale-105"
                />
                {/* Category chip */}
                <span className={`absolute top-3 left-3 ${categoryColor[post.category] ?? "bg-slate-600"} rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow`}>
                  {post.category}
                </span>
                {/* Date badge */}
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow">
                  <FiClock size={10} />
                  {post.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 space-y-2">
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
