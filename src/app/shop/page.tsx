"use client";

import { useMemo, useState, useCallback } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { useCatalog } from "@/contexts/CatalogContext";
import ProductCard from "@/components/ProductCard";
import ShopSidebar from "@/components/ShopSidebar";

const ITEMS_PER_PAGE = 12;

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function ShopPage() {
  const { products } = useCatalog();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStock, setInStock]       = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0)
      result = result.filter((p) => selectedCategories.includes(p.category ?? ""));

    if (inStock && !outOfStock)   result = result.filter((p) => p.stock > 0);
    if (outOfStock && !inStock)   result = result.filter((p) => p.stock === 0);

    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (selectedRating !== null)
      result = result.filter((p) => p.rating >= selectedRating);

    return result;
  }, [products, selectedCategories, inStock, outOfStock, minPrice, maxPrice, selectedRating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const goTo = useCallback(
    (p: number) => {
      setPage(Math.min(Math.max(1, p), totalPages));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages]
  );

  const resetFilters = () => {
    setSelectedCategories([]);
    setInStock(false);
    setOutOfStock(false);
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedRating(null);
    setPage(1);
  };

  return (
    <div className="flex gap-6 items-start">
      <ShopSidebar
        selectedCategories={selectedCategories}
        onCategoryChange={(v) => { setSelectedCategories(v); setPage(1); }}
        inStock={inStock}
        outOfStock={outOfStock}
        onAvailabilityChange={(i, o) => { setInStock(i); setOutOfStock(o); setPage(1); }}
        selectedSizes={selectedSizes}
        onSizeChange={(v) => { setSelectedSizes(v); setPage(1); }}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={(min, max) => { setMinPrice(min); setMaxPrice(max); setPage(1); }}
        selectedRating={selectedRating}
        onRatingChange={(v) => { setSelectedRating(v); setPage(1); }}
        onReset={resetFilters}
      />

      <div className="flex-1 min-w-0 space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/80 px-4 py-3 text-sm text-slate-500 shadow-sm">
          <span className="font-medium text-slate-700">
            There are <strong className="text-pink-500">{filtered.length}</strong> products
          </span>
          {totalPages > 1 && (
            <span className="ml-auto text-xs text-slate-400">
              Page {page} of {totalPages}
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-2">
            <p className="text-lg font-semibold">No products match your filters.</p>
            <p className="text-sm">Try adjusting or resetting the filters.</p>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 pt-4 pb-2 flex-wrap">
                {/* First */}
                <button
                  onClick={() => goTo(1)}
                  disabled={page === 1}
                  aria-label="First page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-pink-400 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleLeft size={12} />
                </button>

                {/* Prev */}
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-pink-400 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft size={11} />
                </button>

                {/* Page numbers */}
                {getPageNumbers(page, totalPages).map((n, i) =>
                  n === "…" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-400 select-none"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => goTo(n as number)}
                      aria-label={`Page ${n}`}
                      aria-current={page === n ? "page" : undefined}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                        page === n
                          ? "border-pink-500 bg-pink-500 text-white shadow-sm shadow-pink-300"
                          : "border-slate-200 bg-white text-slate-600 hover:border-pink-400 hover:text-pink-500"
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-pink-400 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronRight size={11} />
                </button>

                {/* Last */}
                <button
                  onClick={() => goTo(totalPages)}
                  disabled={page === totalPages}
                  aria-label="Last page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-pink-400 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleRight size={12} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
