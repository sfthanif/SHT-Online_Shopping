"use client";

import { useMemo } from "react";
import { FaChevronRight, FaTimes, FaTag } from "react-icons/fa";
import { useCatalog } from "@/contexts/CatalogContext";
import { useSearch } from "@/contexts/SearchContext";

type CategoryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const categoryIcons: Record<string, string> = {
  Tote: "👜",
  Clutch: "👛",
  Shoulder: "👜",
  Sling: "🎒",
  Bucket: "🪣",
  Hobo: "👜",
};

const CategoryDrawer = ({ open, onClose }: CategoryDrawerProps) => {
  const { products } = useCatalog();
  const { query, setQuery } = useSearch();

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    ) as string[];
    return unique.sort();
  }, [products]);

  const handleCategoryClick = (category: string) => {
    setQuery(category);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close categories drawer"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
      />
      <aside className="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col border-r border-pink-100 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.2)]">
        <div className="flex items-center justify-between border-b border-pink-100 bg-linear-to-r from-pink-500 to-rose-400 px-6 py-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              Browse
            </p>
            <h2 className="text-2xl font-semibold">Shop by Categories</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onClose();
            }}
            className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${
              !query.trim()
                ? "bg-pink-50 text-pink-600"
                : "text-slate-700 hover:bg-slate-50 hover:text-pink-600"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
              <FaTag />
            </span>
            <span className="flex-1">All Products</span>
            <FaChevronRight className="text-xs text-slate-400" />
          </button>

          <div className="mt-2 space-y-1">
            {categories.map((category) => {
              const isActive = query.trim().toLowerCase() === category.toLowerCase();
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                    isActive
                      ? "bg-pink-50 text-pink-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-pink-600"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                    {categoryIcons[category] || "📦"}
                  </span>
                  <span className="flex-1">{category}</span>
                  <span className="text-xs text-slate-400">
                    {products.filter(
                      (p) => p.category?.toLowerCase() === category.toLowerCase(),
                    ).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CategoryDrawer;
