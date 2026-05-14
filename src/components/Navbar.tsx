"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCamera,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useSearch } from "@/contexts/SearchContext";

type NavbarProps = {
  onCartOpen: () => void;
  onLoginOpen: () => void;
};

const Navbar = ({ onCartOpen, onLoginOpen }: NavbarProps) => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const { query, setQuery } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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
    <header className="sticky top-0 z-40 border-b border-pink-100/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-3 py-2.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-6">
          {/* Logo - desktop/tablet only */}
          <div className="hidden items-center sm:flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/SHT_logo.png"
                alt="SHT Shop"
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl object-contain"
              />
            </Link>
          </div>

          {/* Search bar: top / center */}
          <div className="relative order-1 hidden mx-1 sm:order-2 sm:mx-4 lg:block lg:mx-8">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search handbags by name..."
              className="w-full rounded-full border border-pink-100 bg-white py-2.5 pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)] sm:py-3"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 transition hover:text-pink-600"
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
          <div className="hidden items-center justify-end gap-2 sm:order-3 sm:flex sm:gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onCartOpen}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-600 shadow-sm transition hover:border-pink-300 hover:bg-pink-50 sm:h-11 sm:w-11"
                  aria-label="Open cart"
                >
                  <FaShoppingCart className="text-[1.05rem] sm:text-base" />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-semibold text-white">
                      {itemCount}
                    </span>
                  )}
                </button>

                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((current) => !current)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-600 shadow-sm transition hover:border-pink-300 hover:bg-pink-50 sm:h-11 sm:w-11"
                    aria-label="Open profile menu"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                  >
                    <FaUserCircle className="text-[1.35rem] sm:text-2xl" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-xl shadow-pink-100 sm:w-60">
                      <div className="border-b border-pink-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-400">
                          Account
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {isLoggedIn ? "Signed in" : "Guest"}
                        </p>
                      </div>
                      <div className="px-2 py-2">
                        <Link
                          href="/profile"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                          role="menuitem"
                        >
                          <FaUserCircle className="text-pink-500" />
                          Profile
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setMenuOpen(false)}
                          className="mt-1 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                          role="menuitem"
                        >
                          <FaHeart className="text-pink-500" />
                          Wishlist
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            onCartOpen();
                          }}
                          className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                          role="menuitem"
                        >
                          <FaShoppingCart className="text-pink-500" />
                          Cart
                        </button>
                        <Link
                          href="/profile"
                          onClick={() => setMenuOpen(false)}
                          className="sr-only"
                          role="menuitem"
                        ></Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                          role="menuitem"
                        >
                          <FaSignOutAlt className="text-pink-500" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onLoginOpen}
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
              >
                <FaUserCircle className="text-lg" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
