"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useProductDetail } from "@/contexts/ProductDetailContext";
import { currency } from "@/lib/products";

const THEMES = [
  { bg: "bg-[#e8eef6]", accent: "from-blue-100 to-indigo-50",   label: "bg-blue-500"   },
  { bg: "bg-[#e4f3ef]", accent: "from-teal-100 to-emerald-50",  label: "bg-teal-500"   },
];

type Props = { products: Product[] };

const HeroSideCards = ({ products }: Props) => {
  const { open } = useProductDetail();

  const featured = [...products]
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, 2);

  if (featured.length < 2) return null;

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      {featured.map((p, i) => {
        const theme = THEMES[i];
        const price = currency.format(p.price);

        return (
          <div
            key={p.id}
            onClick={() => open(p)}
            className={`relative flex-1 flex items-center justify-between gap-2 rounded-xl overflow-hidden ${theme.bg} cursor-pointer group px-4 hover:shadow-md transition-shadow`}
          >
            {/* Decorative circle */}
            <div className={`absolute -right-6 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-linear-to-br ${theme.accent} opacity-50`} />

            {/* Text */}
            <div className="relative z-10 flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                {p.category}
              </p>
              <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
                {p.name}
              </h3>
              <p className="mt-1.5 text-base font-black text-pink-500">
                {price}
              </p>
              <button
                type="button"
                className="mt-2 text-[11px] font-bold uppercase tracking-widest text-slate-700 underline underline-offset-2 hover:text-pink-500 transition"
              >
                Shop Now
              </button>
            </div>

            {/* Product image */}
            <div className="relative z-10 shrink-0 w-24 h-24 xl:w-28 xl:h-28">
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                sizes="112px"
                className="object-contain drop-shadow-lg transition duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroSideCards;
