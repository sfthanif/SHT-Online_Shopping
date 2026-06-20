"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const looks = [
  {
    id: 1,
    title: "Summer Chic",
    desc: "Flowy dresses & sandals",
    items: "3 items · Avg ৳1,200",
    tag: "Trending",
    tagBg: "bg-rose-500",
    gradient: "from-rose-300 via-pink-300 to-fuchsia-300",
  },
  {
    id: 2,
    title: "Office Ready",
    desc: "Sharp suits & blazers",
    items: "4 items · Avg ৳2,800",
    tag: "Work Wear",
    tagBg: "bg-blue-500",
    gradient: "from-slate-400 via-blue-300 to-indigo-300",
  },
  {
    id: 3,
    title: "Weekend Vibes",
    desc: "Casual tees & sneakers",
    items: "3 items · Avg ৳900",
    tag: "Casual",
    tagBg: "bg-amber-500",
    gradient: "from-amber-300 via-orange-300 to-yellow-300",
  },
  {
    id: 4,
    title: "Night Out",
    desc: "Elegant evening wear",
    items: "5 items · Avg ৳3,500",
    tag: "Evening",
    tagBg: "bg-purple-500",
    gradient: "from-purple-400 via-fuchsia-400 to-pink-400",
  },
  {
    id: 5,
    title: "Boho Dream",
    desc: "Earthy tones & layers",
    items: "4 items · Avg ৳1,600",
    tag: "Bohemian",
    tagBg: "bg-emerald-500",
    gradient: "from-emerald-300 via-teal-300 to-cyan-300",
  },
  {
    id: 6,
    title: "Street Style",
    desc: "Hoodies, joggers & caps",
    items: "3 items · Avg ৳1,100",
    tag: "Streetwear",
    tagBg: "bg-slate-700",
    gradient: "from-slate-500 via-gray-400 to-slate-300",
  },
];

/* Fashion silhouette SVGs — each unique */
const silhouettes = [
  /* Dress */
  <svg key="dress" viewBox="0 0 100 200" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <ellipse cx="50" cy="22" rx="16" ry="18" />
    <path d="M34 40 Q22 56 18 90 L22 90 Q28 66 38 60 L38 200 L62 200 L62 60 Q72 66 78 90 L82 90 Q78 56 66 40 Q58 56 50 56 Q42 56 34 40Z" />
  </svg>,
  /* Suit */
  <svg key="suit" viewBox="0 0 100 200" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <ellipse cx="50" cy="20" rx="15" ry="17" />
    <path d="M36 37 L24 58 L36 64 L36 200 L64 200 L64 64 L76 58 L64 37 Q56 54 50 54 Q44 54 36 37Z" />
    <path d="M36 37 Q42 50 50 54 Q58 50 64 37 L56 90 L44 90Z" fill="rgba(255,255,255,0.15)" />
  </svg>,
  /* Casual hoodie */
  <svg key="hoodie" viewBox="0 0 100 200" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <ellipse cx="50" cy="20" rx="16" ry="18" />
    <path d="M30 38 L16 62 L30 70 L30 120 L70 120 L70 70 L84 62 L70 38 Q62 54 50 54 Q38 54 30 38Z" />
    <rect x="34" y="120" width="14" height="80" rx="5" />
    <rect x="52" y="120" width="14" height="80" rx="5" />
  </svg>,
  /* Gown */
  <svg key="gown" viewBox="0 0 100 220" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <ellipse cx="50" cy="20" rx="15" ry="17" />
    <path d="M35 37 Q24 56 20 88 L12 220 L88 220 L80 88 Q76 56 65 37 Q57 53 50 53 Q43 53 35 37Z" />
  </svg>,
  /* Flowy */
  <svg key="flowy" viewBox="0 0 100 200" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <ellipse cx="50" cy="22" rx="16" ry="18" />
    <path d="M34 40 Q25 55 22 75 L28 75 Q32 60 38 55 L30 200 L70 200 L62 55 Q68 60 72 75 L78 75 Q75 55 66 40 Q58 55 50 55 Q42 55 34 40Z" />
  </svg>,
  /* Street */
  <svg key="street" viewBox="0 0 100 200" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <ellipse cx="50" cy="18" rx="17" ry="16" />
    <path d="M30 34 L16 54 L30 62 L30 110 L70 110 L70 62 L84 54 L70 34 Q62 50 50 50 Q38 50 30 34Z" />
    <rect x="32" y="110" width="16" height="90" rx="6" />
    <rect x="52" y="110" width="16" height="90" rx="6" />
  </svg>,
];

const ShopTheLook = () => {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Style Edit</p>
          <h2 className="mt-0.5 text-2xl font-semibold text-slate-900">Shop the Look</h2>
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
        >
          View All Looks →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {looks.map((look, i) => (
          <div
            key={look.id}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${look.gradient} cursor-pointer group transition duration-200 hover:-translate-y-1 hover:shadow-xl`}
            style={{ minHeight: 200 }}
          >
            {/* Silhouette */}
            <div className="absolute inset-0 flex items-end justify-center pb-16 px-6 text-white/30 pointer-events-none">
              {silhouettes[i % silhouettes.length]}
            </div>

            {/* Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`${look.tagBg} rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow`}>
                {look.tag}
              </span>
            </div>

            {/* Heart */}
            <button
              type="button"
              onClick={() => toggle(look.id)}
              className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm transition hover:bg-white/40"
              aria-label={liked.has(look.id) ? "Unlike" : "Like"}
            >
              <FaHeart
                size={12}
                className={liked.has(look.id) ? "text-rose-500" : "text-white"}
              />
            </button>

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 pt-10 z-10">
              <h3 className="text-sm font-black text-white leading-tight">{look.title}</h3>
              <p className="mt-0.5 text-[10px] text-white/75">{look.desc}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-white/65">{look.items}</span>
                <button
                  type="button"
                  className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition hover:bg-pink-500 hover:text-white"
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopTheLook;
