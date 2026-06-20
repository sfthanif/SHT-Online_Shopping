"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaTshirt, FaUserTie, FaChild, FaBaby, FaHome, FaGem,
  FaShoppingBag, FaTag, FaSpa, FaLeaf,
} from "react-icons/fa";
import { GiRunningShoe, GiLipstick, GiWatch } from "react-icons/gi";
import { MdKitchen, MdSportsSoccer } from "react-icons/md";

const categories = [
  { label: "Women",    icon: FaTshirt,       bg: "bg-rose-50",    ring: "hover:ring-rose-300",    text: "text-rose-500"    },
  { label: "Men",      icon: FaUserTie,      bg: "bg-blue-50",    ring: "hover:ring-blue-300",    text: "text-blue-600"    },
  { label: "Kids",     icon: FaChild,        bg: "bg-yellow-50",  ring: "hover:ring-yellow-300",  text: "text-yellow-500"  },
  { label: "Baby",     icon: FaBaby,         bg: "bg-pink-50",    ring: "hover:ring-pink-300",    text: "text-pink-400"    },
  { label: "Home",     icon: FaHome,         bg: "bg-emerald-50", ring: "hover:ring-emerald-300", text: "text-emerald-600" },
  { label: "Beauty",   icon: GiLipstick,     bg: "bg-purple-50",  ring: "hover:ring-purple-300",  text: "text-purple-500"  },
  { label: "Jewelry",  icon: FaGem,          bg: "bg-amber-50",   ring: "hover:ring-amber-300",   text: "text-amber-500"   },
  { label: "Shoes",    icon: GiRunningShoe,  bg: "bg-sky-50",     ring: "hover:ring-sky-300",     text: "text-sky-600"     },
  { label: "Bags",     icon: FaShoppingBag,  bg: "bg-indigo-50",  ring: "hover:ring-indigo-300",  text: "text-indigo-500"  },
  { label: "Watches",  icon: GiWatch,        bg: "bg-slate-100",  ring: "hover:ring-slate-300",   text: "text-slate-600"   },
  { label: "Sports",   icon: MdSportsSoccer, bg: "bg-green-50",   ring: "hover:ring-green-300",   text: "text-green-600"   },
  { label: "Kitchen",  icon: MdKitchen,      bg: "bg-teal-50",    ring: "hover:ring-teal-300",    text: "text-teal-600"    },
  { label: "Wellness", icon: FaSpa,          bg: "bg-fuchsia-50", ring: "hover:ring-fuchsia-300", text: "text-fuchsia-500" },
  { label: "Organic",  icon: FaLeaf,         bg: "bg-lime-50",    ring: "hover:ring-lime-300",    text: "text-lime-600"    },
  { label: "Sale",     icon: FaTag,          bg: "bg-red-50",     ring: "hover:ring-red-300",     text: "text-red-500"     },
];

const CategoryIconsStrip = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", sync); ro.disconnect(); };
  }, [sync]);

  const slide = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Shop by Category</h2>
        <Link href="#" className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition">
          View All →
        </Link>
      </div>

      <div className="relative group">
        {/* Left arrow */}
        {canLeft && (
          <button
            type="button"
            onClick={() => slide("left")}
            aria-label="Scroll categories left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-pink-500 hover:border-pink-300 transition opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft size={12} />
          </button>
        )}
        {/* Right arrow */}
        {canRight && (
          <button
            type="button"
            onClick={() => slide("right")}
            aria-label="Scroll categories right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-pink-500 hover:border-pink-300 transition opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight size={12} />
          </button>
        )}

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none pb-2 px-1"
        >
          {categories.map(({ label, icon: Icon, bg, ring, text }) => (
            <Link
              key={label}
              href="#"
              className="flex shrink-0 flex-col items-center gap-2 group/item"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} ring-2 ring-transparent ${ring} transition-all duration-200 group-hover/item:shadow-md`}
              >
                <Icon size={26} className={text} />
              </div>
              <span className="text-xs font-semibold text-slate-700 group-hover/item:text-pink-600 transition whitespace-nowrap">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIconsStrip;
