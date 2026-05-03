"use client";

import { useMemo } from "react";
import { X } from "lucide-react";

import { Select } from "@/components/ui/select";
import { Product } from "@/types";

const colorSwatches = [
  { name: "Blush", hex: "#F4E1E1" },
  { name: "Noir", hex: "#1C1A1A" },
  { name: "Ivory", hex: "#F8EFE5" },
  { name: "Sage", hex: "#A4B9A4" },
  { name: "Burgundy", hex: "#7D2E3A" },
];

interface FiltersSidebarProps {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function FiltersSidebar({
  products,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}: FiltersSidebarProps) {
  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  return (
    <aside className="space-y-5 rounded-3xl border border-white/45 bg-white/55 p-5 shadow-glass backdrop-blur">
      <h3 className="font-heading text-2xl text-rose">Filters</h3>

      <Select
        label="Sort By"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="featured">Featured</option>
        <option value="low">Price Low-High</option>
        <option value="high">Price High-Low</option>
        <option value="new">Newest</option>
        <option value="best">Best Selling</option>
      </Select>

      <section>
        <h4 className="font-ui text-xs uppercase tracking-[0.16em] text-rose/80">
          Category
        </h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                className={`rounded-full border px-3 py-1 font-ui text-[11px] uppercase tracking-[0.14em] ${
                  active
                    ? "border-champagne bg-champagne/20 text-rose"
                    : "border-champagne/40 bg-white/40 text-rose/70"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h4 className="font-ui text-xs uppercase tracking-[0.16em] text-rose/80">
          Color
        </h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {colorSwatches.map((swatch) => (
            <button
              key={swatch.name}
              className="h-8 w-8 rounded-full border border-white/70"
              style={{ backgroundColor: swatch.hex }}
              aria-label={swatch.name}
            />
          ))}
        </div>
      </section>

      <section>
        <h4 className="font-ui text-xs uppercase tracking-[0.16em] text-rose/80">
          Material
        </h4>
        <div className="mt-2 space-y-2 font-ui text-xs uppercase tracking-[0.12em] text-rose/80">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Leather
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Suede
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Canvas
          </label>
        </div>
      </section>

      {activeCategory !== "All" ? (
        <button
          className="inline-flex items-center gap-1 rounded-full border border-champagne/40 px-3 py-1 font-ui text-[11px] uppercase tracking-[0.14em] text-rose"
          onClick={() => setActiveCategory("All")}
        >
          <X className="h-3 w-3" /> {activeCategory}
        </button>
      ) : null}
    </aside>
  );
}
