"use client";

import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaStar } from "react-icons/fa";

const CATEGORIES = ["Fashion", "Electronics", "Bags", "Footwear", "Groceries", "Beauty", "Wellness"];
const SIZES = ["Small", "Medium", "Large", "XL", "XXL"];

type Props = {
  selectedCategories: string[];
  onCategoryChange: (v: string[]) => void;
  inStock: boolean;
  outOfStock: boolean;
  onAvailabilityChange: (inStock: boolean, outOfStock: boolean) => void;
  selectedSizes: string[];
  onSizeChange: (v: string[]) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  selectedRating: number | null;
  onRatingChange: (v: number | null) => void;
  onReset: () => void;
};

const MAX_PRICE = 10000;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-slate-100 pb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3"
      >
        <span className="text-base font-bold text-slate-800">{title}</span>
        {open ? <FaChevronUp size={12} className="text-slate-400" /> : <FaChevronDown size={12} className="text-slate-400" />}
      </button>
      {open && <div className="space-y-2.5 mt-1">{children}</div>}
    </div>
  );
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded accent-pink-500"
      />
      <span className="text-sm text-slate-600 group-hover:text-pink-500 transition">{label}</span>
    </label>
  );
}

const ShopSidebar = ({
  selectedCategories, onCategoryChange,
  inStock, outOfStock, onAvailabilityChange,
  selectedSizes, onSizeChange,
  minPrice, maxPrice, onPriceChange,
  selectedRating, onRatingChange,
  onReset,
}: Props) => {
  const toggleArr = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  return (
    <aside className="w-64 shrink-0 space-y-1 self-start sticky top-24">
      {/* Category */}
      <Section title="Shop by Category">
        {CATEGORIES.map((cat) => (
          <CheckItem
            key={cat}
            label={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() => toggleArr(selectedCategories, cat, onCategoryChange)}
          />
        ))}
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <CheckItem label="In Stock" checked={inStock} onChange={() => onAvailabilityChange(!inStock, outOfStock)} />
        <CheckItem label="Out of Stock" checked={outOfStock} onChange={() => onAvailabilityChange(inStock, !outOfStock)} />
      </Section>

      {/* Size */}
      <Section title="Size">
        {SIZES.map((s) => (
          <CheckItem
            key={s}
            label={s}
            checked={selectedSizes.includes(s)}
            onChange={() => toggleArr(selectedSizes, s, onSizeChange)}
          />
        ))}
      </Section>

      {/* Price range */}
      <Section title="Filter By Price">
        <div className="pt-1 space-y-3">
          {/* Track */}
          <div className="relative h-1.5 rounded-full bg-slate-200">
            <div
              className="absolute h-full rounded-full bg-pink-500"
              style={{
                left: `${(minPrice / MAX_PRICE) * 100}%`,
                right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
              }}
            />
            {/* Min thumb */}
            <input
              type="range" min={0} max={MAX_PRICE} step={100} value={minPrice}
              onChange={(e) => onPriceChange(Math.min(+e.target.value, maxPrice - 100), maxPrice)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            {/* Max thumb */}
            <input
              type="range" min={0} max={MAX_PRICE} step={100} value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, Math.max(+e.target.value, minPrice + 100))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            {/* Thumb dots */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-pink-500 border-2 border-white shadow pointer-events-none z-10"
              style={{ left: `calc(${(minPrice / MAX_PRICE) * 100}% - 8px)` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-pink-500 border-2 border-white shadow pointer-events-none z-10"
              style={{ left: `calc(${(maxPrice / MAX_PRICE) * 100}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>From: <strong className="text-slate-800">৳{minPrice.toLocaleString()}</strong></span>
            <span>To: <strong className="text-slate-800">৳{maxPrice.toLocaleString()}</strong></span>
          </div>
        </div>
      </Section>

      {/* Rating */}
      <Section title="Filter By Rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => onRatingChange(selectedRating === stars ? null : stars)}
              className={`flex items-center gap-1 rounded-lg px-2 py-1 w-full transition ${
                selectedRating === stars ? "bg-pink-50 ring-1 ring-pink-300" : "hover:bg-slate-50"
              }`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} size={13} className={i < stars ? "text-amber-400" : "text-slate-200"} />
              ))}
              <span className="text-xs text-slate-500 ml-1">& up</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="w-full mt-2 rounded-lg bg-pink-500 py-2.5 text-sm font-bold text-white hover:bg-pink-600 transition"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default ShopSidebar;
