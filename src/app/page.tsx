"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  FaArrowRight,
  FaGem,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/contexts/CatalogContext";
import { useSearch } from "@/contexts/SearchContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

export default function HomePage() {
  const { products } = useCatalog();
  const { query, clearQuery } = useSearch();
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(normalized),
    );
  }, [products, query]);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] border border-pink-100 bg-gradient-to-br from-rose-50 via-white to-pink-100 p-6 shadow-[0_25px_70px_rgba(236,72,153,0.16)] sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-pink-200 bg-white/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">
              SHT Signature Collection
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Premium handbags that feel like a quiet luxury statement.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Discover tote, clutch, shoulder, sling, bucket, and hobo
                silhouettes crafted for modern women who want effortless
                elegance with a polished pink aesthetic.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
              >
                Shop handbags <FaArrowRight />
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-semibold text-pink-600 transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md"
              >
                View wishlist <FaGem />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              {
                label: "Handpicked styles",
                value: `${products.length}+`,
                icon: FaGem,
              },
              {
                label: "Wishlist picks",
                value: `${wishlistCount}`,
                icon: FaShieldAlt,
              },
              {
                label: "Cart items",
                value: `${itemCount}`,
                icon: FaShippingFast,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="premium-card rounded-[1.5rem] p-5"
              >
                <item.icon className="text-2xl text-pink-500" />
                <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
