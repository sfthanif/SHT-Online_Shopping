"use client";

import { useState } from "react";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useSidebar } from "@/contexts/SidebarContext";
import { useSearch } from "@/contexts/SearchContext";

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
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setQuery(value === "All" ? "" : value);
  };

  const isActive = (name: string) =>
    query.trim().toLowerCase() === name.toLowerCase();

  return (
    <aside className="w-52 shrink-0 flex flex-col overflow-hidden bg-white border-r border-slate-200">
      {/* Header — matches reference image */}
      <div className="flex items-center justify-between bg-[#2c3e6e] px-4 py-3">
        <span className="text-sm font-bold text-white tracking-wide">
          Shop By Categories
        </span>
        <button
          type="button"
          onClick={close}
          aria-label="Close sidebar"
          className="text-white/70 transition hover:text-white"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      {/* Scrollable category list */}
      <nav className="flex-1 overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.name} className="border-b border-slate-100">
            <div className={`flex items-center justify-between px-4 py-2.5 ${isActive(cat.name) ? "bg-slate-50" : "hover:bg-slate-50"}`}>
              <button
                type="button"
                onClick={() => handleSelect(cat.name)}
                className={`flex-1 text-left text-sm transition ${
                  isActive(cat.name)
                    ? "font-semibold text-pink-600"
                    : "text-slate-800 hover:text-pink-600"
                }`}
              >
                {cat.name}
              </button>

              {cat.sub.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => (prev === cat.name ? null : cat.name))
                  }
                  aria-label={`Toggle ${cat.name}`}
                  className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center border border-slate-300 text-slate-500 transition hover:border-pink-400 hover:text-pink-500"
                >
                  {expanded === cat.name ? (
                    <FaMinus className="text-[7px]" />
                  ) : (
                    <FaPlus className="text-[7px]" />
                  )}
                </button>
              )}
            </div>

            {expanded === cat.name && cat.sub.length > 0 && (
              <div className="bg-slate-50">
                {cat.sub.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleSelect(sub)}
                    className={`flex w-full items-center gap-2 px-7 py-2 text-left text-xs transition ${
                      isActive(sub)
                        ? "font-semibold text-pink-600"
                        : "text-slate-500 hover:text-pink-600"
                    }`}
                  >
                    <span className="text-slate-300">›</span>
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
