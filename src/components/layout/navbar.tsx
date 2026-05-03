"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { currencies } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { useWishlistStore } from "@/store/wishlist-store";

import { Button } from "@/components/ui/button";

const categories = [
  "Totes",
  "Clutches",
  "Crossbody",
  "Satchels",
  "Limited Edition",
];

export function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const { theme, setTheme } = useTheme();

  const cartCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const openCart = useCartStore((state) => state.open);
  const openAuthModal = useUiStore((state) => state.openAuthModal);
  const openMobileMenu = useUiStore((state) => state.openMobileMenu);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/35 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        <button
          className="rounded-full border border-champagne/40 p-2 lg:hidden"
          aria-label="Open menu"
          onClick={openMobileMenu}
        >
          <Menu className="h-5 w-5 text-rose" />
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="font-ui text-xs uppercase tracking-[0.18em] text-rose/85 transition hover:text-rose"
            >
              {category}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="font-heading text-3xl tracking-[0.25em] text-rose"
        >
          ROSEQUI
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={`overflow-hidden transition-all ${expanded ? "w-44" : "w-10"}`}
          >
            <label className="flex h-10 items-center rounded-full border border-champagne/40 bg-white/55 px-3">
              <Search className="h-4 w-4 text-rose" />
              <input
                className="ml-2 w-full bg-transparent font-ui text-xs uppercase tracking-[0.14em] text-rose outline-none"
                placeholder="Search"
                onFocus={() => setExpanded(true)}
                onBlur={() => setExpanded(false)}
              />
            </label>
          </div>

          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="h-10 rounded-full border border-champagne/40 bg-white/55 px-3 font-ui text-xs uppercase tracking-[0.14em] text-rose"
            aria-label="Select currency"
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            className="relative rounded-full border border-champagne/40 bg-white/55 p-2"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4 text-rose" />
            {wishlistCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-champagne px-1.5 text-[10px] text-charcoal">
                {wishlistCount}
              </span>
            ) : null}
          </button>

          <button
            className="relative rounded-full border border-champagne/40 bg-white/55 p-2"
            aria-label="Cart"
            onClick={openCart}
          >
            <ShoppingBag className="h-4 w-4 text-rose" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-champagne px-1.5 text-[10px] text-charcoal">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            className="rounded-full border border-champagne/40 bg-white/55 p-2"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-rose" />
            ) : (
              <Moon className="h-4 w-4 text-rose" />
            )}
          </button>

          <Button
            variant="secondary"
            className="hidden md:inline-flex"
            onClick={openAuthModal}
          >
            <User className="mr-1 h-3.5 w-3.5" /> Account
          </Button>
        </div>
      </nav>
    </header>
  );
}
