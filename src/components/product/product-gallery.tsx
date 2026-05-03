"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";

import { Product } from "@/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(product.gallery[0]);

  return (
    <section className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/40">
        <Image
          src={active}
          alt={product.name}
          fill
          className="object-cover transition hover:scale-105"
        />
        <button
          className="absolute right-3 top-3 rounded-full bg-white/65 p-2"
          aria-label="Open zoom view"
        >
          <Expand className="h-4 w-4 text-rose" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {product.gallery.map((image) => (
          <button
            key={image}
            className={`relative aspect-square overflow-hidden rounded-xl border ${
              active === image ? "border-champagne" : "border-white/40"
            }`}
            onClick={() => setActive(image)}
            aria-label="Select product image"
          >
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
