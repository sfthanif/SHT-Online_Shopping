"use client";

import { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/contexts/CatalogContext";
import { useSearch } from "@/contexts/SearchContext";

export default function HomePage() {
  const { products } = useCatalog();
  const { query, clearQuery } = useSearch();

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(normalized),
    );
  }, [products, query]);

  return (
    <div className="space-y-10">
      <section className="space-y-6" id="products">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Curated collection
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Premium handbags
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
              "Search from the navbar to instantly filter products by name."
            )}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="premium-card rounded-[1.75rem] p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No handbags match your search.
            </p>
            <button
              onClick={clearQuery}
              className="mt-4 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        )}
      </section>
    </div>
  );
}
