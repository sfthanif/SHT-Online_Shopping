"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

const looks = [
  {
    id: 1,
    title: "Summer Chic",
    desc: "Flowy dresses & sandals",
    items: "3 items",
    tag: "Trending",
    tagBg: "bg-rose-500",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=520&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Office Ready",
    desc: "Sharp suits & blazers",
    items: "4 items",
    tag: "Work Wear",
    tagBg: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=520&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Weekend Vibes",
    desc: "Casual tees & sneakers",
    items: "3 items",
    tag: "Casual",
    tagBg: "bg-amber-500",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=520&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Night Out",
    desc: "Elegant evening wear",
    items: "5 items",
    tag: "Evening",
    tagBg: "bg-purple-600",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=520&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Boho Dream",
    desc: "Earthy tones & layers",
    items: "4 items",
    tag: "Bohemian",
    tagBg: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=400&h=520&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Street Style",
    desc: "Hoodies, joggers & caps",
    items: "3 items",
    tag: "Streetwear",
    tagBg: "bg-slate-700",
    img: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=400&h=520&fit=crop&q=80",
  },
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
        <Link href="#" className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition">
          View All Looks →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {looks.map((look) => (
          <div
            key={look.id}
            className="relative overflow-hidden rounded-2xl cursor-pointer group transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{ minHeight: 220 }}
          >
            {/* Real photo background */}
            <Image
              src={look.img}
              alt={look.title}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`${look.tagBg} rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow`}>
                {look.tag}
              </span>
            </div>

            {/* Heart button */}
            <button
              type="button"
              onClick={() => toggle(look.id)}
              className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/50"
              aria-label={liked.has(look.id) ? "Unlike" : "Like"}
            >
              <FaHeart size={12} className={liked.has(look.id) ? "text-rose-400" : "text-white"} />
            </button>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <h3 className="text-sm font-black text-white leading-tight">{look.title}</h3>
              <p className="mt-0.5 text-[11px] text-white/75">{look.desc}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] text-white/65">
                  <FaShoppingBag size={9} /> {look.items}
                </span>
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
