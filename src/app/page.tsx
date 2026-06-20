"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { FaTruck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import TrendingCarousel from "@/components/TrendingCarousel";
import PopularProducts from "@/components/PopularProducts";
import { useCatalog } from "@/contexts/CatalogContext";
import { useSearch } from "@/contexts/SearchContext";
import LatestProducts from "@/components/LatestProducts";
import BlogSection from "@/components/BlogSection";
import FeatureStrip from "@/components/FeatureStrip";
import HeroSideCards from "@/components/HeroSideCards";
import PromoSlider from "@/components/PromoSlider";

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function HomePage() {
  const { products } = useCatalog();
  const { query, clearQuery } = useSearch();
  const [page, setPage] = useState(1);

  /* Measure the actual rendered column count from the CSS auto-fill grid */
  const [cols, setCols] = useState(2);
  const [gridEl, setGridEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!gridEl) return;
    const measure = () => {
      const tpl = window.getComputedStyle(gridEl).gridTemplateColumns;
      setCols(tpl.split(" ").length);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(gridEl);
    return () => ro.disconnect();
  }, [gridEl]);

  const ITEMS_PER_PAGE = cols * 2;

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) => {
      const category = product.category?.toLowerCase() ?? "";
      return (
        product.name.toLowerCase().includes(normalized) ||
        category.includes(normalized)
      );
    });
  }, [products, query]);

  useEffect(() => setPage(1), [query]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const goTo = useCallback(
    (p: number) => {
      setPage(Math.min(Math.max(1, p), totalPages));
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages]
  );

  return (
    <div className="space-y-16">
      {/* Hero slider — full width */}
      <section className="flex h-48 sm:h-64 md:h-80 lg:h-96 xl:h-120 overflow-hidden rounded-xl shadow-sm border border-pink-100">
        <HeroSlider />
      </section>

      {/* Featured section below banner — 50/50 split */}
      {!query && (
        <section className="-mt-10 grid grid-cols-2 gap-3 h-52 sm:h-60 md:h-64 lg:h-72">
          {/* Left 50% — promo slider with arrows */}
          <PromoSlider />
          {/* Right 50% — two stacked product cards */}
          <HeroSideCards products={products} />
        </section>
      )}

      {/* Trending carousel — sorted by reviewCount descending */}
      {!query && <TrendingCarousel products={products} />}

      {/* Free Shipping banner */}
      {!query && (
        <div
          className="-mt-8 flex items-center justify-between gap-4 rounded-lg border border-pink-300/40 bg-pink-50/40 px-5 py-5 outline-none"
        >
          <div className="flex items-center gap-3 shrink-0">
            <FaTruck className="text-2xl text-pink-500" />
            <span className="text-sm font-bold text-slate-800">Free Shipping</span>
          </div>
          <p className="hidden sm:block text-sm text-slate-500 text-center flex-1">
            Free Delivery Now On Your First Order and over ৳2000
          </p>
          <span className="shrink-0 text-sm font-bold text-slate-800">– Only ৳2000*</span>
        </div>
      )}

      {/* Popular Products by category */}
      {!query && <PopularProducts products={products} />}

      {/* Latest Products carousel */}
      {!query && <LatestProducts products={products} />}

      {/* Blog section */}
      {!query && <BlogSection />}

      {/* Feature strip */}
      {!query && <FeatureStrip />}

      {/* Products */}
      <section className="space-y-6" id="products">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              All Products
            </h2>
          </div>
          <p className="max-w-xl text-sm text-slate-500">
            {query ? (
              <>
                Showing {filteredProducts.length} result
                {filteredProducts.length === 1 ? "" : "s"} for &quot;{query}
                &quot;.
                <button
                  onClick={clearQuery}
                  className="ml-2 font-semibold text-pink-600 hover:text-pink-700"
                >
                  Clear search
                </button>
              </>
            ) : (
              "Search from the navbar to instantly filter products by name or category."
            )}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="premium-card rounded-[1.75rem] p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No products match your search.
            </p>
            <button
              onClick={clearQuery}
              className="mt-4 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <>
            {paginatedProducts.length === 0 ? (
              <div className="premium-card rounded-[1.75rem] p-10 text-center">
                <p className="text-lg font-semibold text-slate-900">
                  No product available on this page.
                </p>
                <button
                  onClick={() => goTo(1)}
                  className="mt-4 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Go to page 1
                </button>
              </div>
            ) : (
              <div ref={setGridEl} className="product-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 pb-2">
                {/* Prev */}
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a1625] text-white transition hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="text-xs" />
                </button>

                {/* Page numbers */}
                {getPageNumbers(page, totalPages).map((n, i) =>
                  n === "…" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a1625] text-sm text-slate-400 select-none"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => goTo(n as number)}
                      aria-label={`Page ${n}`}
                      aria-current={page === n ? "page" : undefined}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold transition ${
                        page === n
                          ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                          : "bg-[#1a1625] text-white hover:bg-pink-600"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500 text-white shadow-lg shadow-pink-500/30 transition hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
