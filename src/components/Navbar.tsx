"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCamera,
  FaSearch,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaChevronDown,
  FaRocket,
} from "react-icons/fa";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import CategorySidebar from "@/components/CategorySidebar";
import { useAuth } from "@/contexts/AuthContext";

import { useCart } from "@/contexts/CartContext";
import { useSearch } from "@/contexts/SearchContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useSidebar } from "@/contexts/SidebarContext";

type NavbarProps = {
  onCartOpen: () => void;
  onLoginOpen: () => void;
};

const Navbar = ({ onCartOpen, onLoginOpen }: NavbarProps) => {
  const { toggle: toggleSidebar, isOpen: isSidebarOpen, close: closeSidebar } = useSidebar();
  const router = useRouter();

  const { isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const { query, setQuery } = useSearch();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideExtras, setHideExtras] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const getScrollY = () => window.scrollY || document.documentElement.scrollTop || 0;
    lastScrollY.current = getScrollY();

    const handleScroll = () => {
      const currentY = getScrollY();

      closeSidebar();

      if (currentY <= 10) {
        setHideExtras(false);
        document.documentElement.classList.remove("nav-compact");
      } else if (currentY > lastScrollY.current + 2) {
        setHideExtras(true);
        document.documentElement.classList.add("nav-compact");
      } else if (currentY < lastScrollY.current - 2) {
        setHideExtras(false);
        document.documentElement.classList.remove("nav-compact");
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeSidebar]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setMenuOpen(false);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const handleCameraClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setQuery(file.name);
          console.log("Selected image:", file);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  return (
    <>
    <header
      className="hidden sm:block fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl transition-shadow duration-300"
      style={{ boxShadow: hideExtras ? "0 2px 16px 0 rgba(236,72,153,0.10), 0 1px 4px 0 rgba(0,0,0,0.06)" : "0 1px 4px 0 rgba(0,0,0,0.04)" }}
    >
      {/* Top Navbar — collapses on scroll down */}
      <div
        className="hidden md:block"
        style={{
          maxHeight: hideExtras ? "0px" : "60px",
          opacity: hideExtras ? 0 : 1,
          overflow: "hidden",
          transition: "max-height 0.35s ease-in-out, opacity 0.25s ease-in-out",
        }}
      >
        <div className="border-b border-pink-100 bg-slate-50 text-xs text-slate-600">
          <div className="flex w-full items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <span>Get up to 50% off new season styles, limited time only</span>
            <div className="flex items-center gap-4 font-semibold">
              <Link href="#" className="hover:text-pink-600 transition">
                Help Center
              </Link>
              <Link href="#" className="hover:text-pink-600 transition">
                Order Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-pink-100/80 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/SHT_logo.png"
                alt="SHT Shop"
                width={56}
                height={56}
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-contain"
              />
            </Link>
          </div>

          {/* Search bar: top / center */}
          <div className="relative order-2 mx-2 lg:mx-8 flex items-center">
            <FaSearch className="absolute left-4 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-md bg-slate-100/60 py-2.5 pl-10 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-500 focus:bg-slate-200/70 focus:ring-2 focus:ring-pink-200 sm:py-3"
            />
            <button
              type="button"
              onClick={() => {
                if (query.trim()) {
                  setQuery("");
                  searchInputRef.current?.focus();
                } else {
                  handleCameraClick();
                }
              }}
              className="absolute right-4 text-slate-500 transition hover:text-pink-600"
              aria-label={query.trim() ? "Clear search" : "Camera search"}
            >
              {query.trim() ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaCamera className="text-lg" />
              )}
            </button>
          </div>

          {/* Login / User - right on small, right on sm+ */}
          <div className="flex items-center justify-end gap-4 lg:gap-6 order-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((current) => !current)}
                    className="flex items-center justify-center text-pink-500 hover:text-pink-600 transition"
                    aria-label="Open profile menu"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                  >
                    <FaUserCircle className="text-[1.6rem]" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-8 z-50 w-56 overflow-hidden rounded-xl border border-pink-100 bg-white shadow-xl">
                      <div className="border-b border-pink-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
                          Account
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          Signed in
                        </p>
                      </div>
                      <div className="px-2 py-2">
                        <Link
                          href="/profile"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                        >
                          <FaUserCircle className="text-pink-500" /> Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                        >
                          <FaSignOutAlt className="text-pink-500" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3 text-sm font-semibold">
                <button
                  type="button"
                  onClick={onLoginOpen}
                  className="text-slate-700 hover:text-pink-600 transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={onLoginOpen}
                  className="rounded-full bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600 shadow-sm shadow-pink-200"
                >
                  Register
                </button>
              </div>
            )}

            <div className="flex items-center gap-4 text-slate-500">

              {/* Wishlist */}
              <div className="group relative">
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2">
                  <div className="relative opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="whitespace-nowrap rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      Wishlist
                    </div>
                    {/* Arrow pointing down */}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rotate-45 bg-pink-500" />
                  </div>
                </div>
                <Link
                  href="/wishlist"
                  className="relative block hover:text-pink-600 text-pink-500 transition cursor-pointer"
                  aria-label="Wishlist"
                >
                  <FiHeart className="text-[1.4rem]" />
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-sm">
                    {wishlistCount}
                  </span>
                </Link>
              </div>

              {/* Cart */}
              <div className="group relative">
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2">
                  <div className="relative opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="whitespace-nowrap rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      Cart
                    </div>
                    <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rotate-45 bg-pink-500" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onCartOpen}
                  className="relative hover:text-pink-600 text-pink-500 transition cursor-pointer"
                  aria-label="Open cart"
                >
                  <FiShoppingCart className="text-[1.4rem]" />
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-sm">
                    {itemCount}
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar — collapses on scroll down */}
      <div
        className="hidden lg:block"
        style={{
          maxHeight: hideExtras ? "0px" : "80px",
          opacity: hideExtras ? 0 : 1,
          overflow: "hidden",
          transition: "max-height 0.35s ease-in-out, opacity 0.25s ease-in-out",
        }}
      >
      <div className="border-b border-pink-100 bg-white">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8 text-sm font-semibold text-slate-700">
          {/* Left: Categories toggle */}
          <button
            type="button"
            onClick={toggleSidebar}
            className={`flex shrink-0 items-center gap-2 transition font-semibold ${
              isSidebarOpen
                ? "text-pink-600"
                : "hover:text-pink-600 text-slate-700"
            }`}
          >
            <FaBars className="text-lg" />
            <span>SHOP BY CATEGORIES</span>
            <FaChevronDown
              className={`text-xs ml-1 transition-transform duration-300 ${
                isSidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Center: Nav Links */}
          <div className="flex items-center justify-center gap-6 overflow-x-auto scrollbar-none">
            {[
              "Home",
              "Fashion",
              "Electronics",
              "Bags",
              "Footwear",
              "Groceries",
              "Beauty",
              "Wellness",
              "Jewellery",
            ].map((link) => (
              <div key={link} className="relative group cursor-pointer shrink-0">
                <Link
                  href={link === "Home" ? "/" : "#"}
                  className="hover:text-pink-600 transition py-3 inline-block"
                >
                  {link}
                </Link>
                {link !== "Home" && (
                  <div className="absolute left-0 top-full hidden w-32 flex-col bg-white shadow-lg border border-slate-100 rounded-md py-2 group-hover:flex z-50">
                    {["Men", "Women", "Kids", "Girls", "Boys"].map((subLink) => (
                      <span
                        key={subLink}
                        className="px-4 py-2 hover:text-pink-600 hover:bg-slate-50 transition"
                      >
                        {subLink}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Delivery Note */}
          <div className="flex items-center gap-2 whitespace-nowrap text-slate-600 shrink-0">
            <FaRocket className="text-lg shrink-0" />
            <span>Free International Delivery</span>
          </div>
        </div>
      </div>
      </div>

      {/* Category sidebar — slides in from left below the full navbar */}
      {isSidebarOpen && (
        <div className="absolute top-full left-0 z-50 sidebar-slide-in">
          <CategorySidebar />
        </div>
      )}
    </header>

    {/* Backdrop OUTSIDE the header so it's in the root stacking context.
        z-39 = above all page content (z-auto) but below the navbar (z-40),
        ensuring clicks on the banner / any content close the sidebar. */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 z-39"
        onClick={closeSidebar}
        aria-hidden="true"
      />
    )}
  </>
  );
};

export default Navbar;
