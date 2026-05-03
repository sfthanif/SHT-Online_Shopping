"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FiltersSidebar } from "@/components/product/filters-sidebar";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data";

const pageSize = 6;

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const categoryProducts =
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory);

    const sorted = [...categoryProducts].sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      if (sortBy === "new") return Number(b.isNew) - Number(a.isNew);
      if (sortBy === "best")
        return Number(b.isBestSeller) - Number(a.isBestSeller);
      return 0;
    });

    return sorted;
  }, [activeCategory, sortBy]);

  const pages = Math.ceil(filtered.length / pageSize);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav className="ui-label">Home / Products</nav>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h1 className="section-title">All Handbags</h1>
        <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose/70">
          {filtered.length} products
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
        <FiltersSidebar
          products={products}
          activeCategory={activeCategory}
          setActiveCategory={(value) => {
            setActiveCategory(value);
            setPage(1);
          }}
          sortBy={sortBy}
          setSortBy={(value) => {
            setSortBy(value);
            setPage(1);
          }}
        />

        <section>
          {activeCategory !== "All" ? (
            <div className="mb-4 flex flex-wrap gap-2">
              <button className="rounded-full border border-champagne/40 bg-champagne/20 px-3 py-1 font-ui text-[11px] uppercase tracking-[0.14em] text-rose">
                {activeCategory} ×
              </button>
            </div>
          ) : null}

          {visible.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-champagne/40 p-10 text-center">
              <p className="font-body text-3xl text-rose">No products found.</p>
              <Link href="/products" className="ui-label mt-2 inline-block">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {pages > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: pages }).map((_, index) => {
                const current = index + 1;
                return (
                  <button
                    key={current}
                    className={`h-9 w-9 rounded-full border font-ui text-xs ${
                      current === page
                        ? "border-champagne bg-champagne/30 text-rose"
                        : "border-champagne/40 text-rose/70"
                    }`}
                    onClick={() => setPage(current)}
                  >
                    {current}
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
