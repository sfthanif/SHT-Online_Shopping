"use client";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSidebar } from "@/contexts/SidebarContext";
import { useSearch } from "@/contexts/SearchContext";

const PANEL_W = 288;

const categories = [
  { name: "Fashion",     sub: ["Men", "Women", "Kids", "Boys", "Girls"] },
  { name: "Jewellery",   sub: [] },
  { name: "Watches",     sub: [] },
  { name: "Outerwear",   sub: ["Coats", "Jackets", "Blazers", "Vests"] },
  { name: "Cosmetics",   sub: [] },
  { name: "Accessories", sub: [] },
  { name: "Electronics", sub: [] },
  { name: "Furniture",   sub: [] },
  { name: "Sunglasses",  sub: [] },
  { name: "Bags",        sub: ["Tote", "Clutch", "Shoulder", "Sling", "Bucket", "Hobo"] },
  { name: "Footwear",    sub: [] },
  { name: "Groceries",   sub: [] },
  { name: "Beauty",      sub: [] },
  { name: "Wellness",    sub: [] },
];

const CategorySidebar = () => {
  const { close } = useSidebar();
  const { query, setQuery } = useSearch();
  const [subPanel, setSubPanel] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => close();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (value: string) => {
    setQuery(value === "All" ? "" : value);
    close();
  };

  const isActive = (name: string) =>
    query.trim().toLowerCase() === name.toLowerCase();

  const activeCat = categories.find((c) => c.name === subPanel) ?? null;

  return (
    <aside
      className="shrink-0 bg-white border-r border-slate-200 shadow-2xl overflow-hidden"
      style={{ width: PANEL_W, maxHeight: "calc(100vh - 187px)" }}
    >
      <div
        style={{
          display: "flex",
          width: PANEL_W * 2,
          transform: subPanel ? `translateX(-${PANEL_W}px)` : "translateX(0)",
          transition: "transform 0.28s ease-in-out",
        }}
      >

        {/* ── Panel 1: main list ── */}
        <nav
          className="shrink-0 sidebar-scrollbar overflow-y-auto"
          style={{ width: PANEL_W, maxHeight: "calc(100vh - 187px)" }}
        >
          {categories.map((cat) => {
            const hasSub   = cat.sub.length > 0;
            const active   = isActive(cat.name);
            const handleRow = () => hasSub ? setSubPanel(cat.name) : handleSelect(cat.name);

            return (
              <div
                key={cat.name}
                onClick={handleRow}
                className={`
                  group relative flex cursor-pointer items-center justify-between
                  border-b border-slate-100
                  px-4 sm:px-6 lg:px-8 py-3
                  transition-all duration-200 ease-out
                  ${active
                    ? "bg-pink-100 shadow-[inset_0_-3px_10px_rgba(236,72,153,0.10)]"
                    : "hover:bg-pink-100 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(236,72,153,0.14)] hover:z-10"}
                `}
              >
                <span
                  className={`flex-1 text-sm font-semibold transition-colors ${
                    active ? "text-pink-600" : "text-slate-700 group-hover:text-pink-600"
                  }`}
                >
                  {cat.name}
                </span>

                {hasSub && (
                  <span className="ml-2 shrink-0 text-slate-400 transition-colors group-hover:text-pink-500">
                    <FaChevronRight className="text-[11px]" />
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Panel 2: sub-category list ── */}
        <div
          className="shrink-0 flex flex-col sidebar-scrollbar overflow-y-auto"
          style={{ width: PANEL_W, maxHeight: "calc(100vh - 187px)" }}
        >
          {/* Back */}
          <button
            type="button"
            onClick={() => setSubPanel(null)}
            className="flex w-full shrink-0 items-center gap-2 border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3 text-sm font-semibold text-slate-500 transition-all duration-200 hover:bg-pink-50 hover:text-pink-600"
          >
            <FaChevronLeft className="text-[11px]" />
            Back
          </button>

          {activeCat && (
            <>
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
                <span className="text-base font-semibold text-slate-800">
                  {activeCat.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleSelect(activeCat.name)}
                  className="text-xs font-semibold text-slate-500 underline underline-offset-2 transition hover:text-pink-600"
                >
                  Shop All
                </button>
              </div>

              {/* See All */}
              <button
                type="button"
                onClick={() => handleSelect(activeCat.name)}
                className="w-full shrink-0 border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3 text-left text-sm font-semibold text-pink-600 transition-all duration-200 hover:bg-pink-50 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(236,72,153,0.14)]"
              >
                See All {activeCat.name}
              </button>

              {/* Sub-items */}
              {activeCat.sub.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => handleSelect(sub)}
                  className={`flex w-full shrink-0 items-center border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                    isActive(sub)
                      ? "bg-pink-50 text-pink-600 shadow-[inset_0_-3px_10px_rgba(236,72,153,0.10)]"
                      : "text-slate-700 hover:bg-pink-50 hover:text-pink-600 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(236,72,153,0.14)]"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </>
          )}
        </div>

      </div>
    </aside>
  );
};

export default CategorySidebar;
