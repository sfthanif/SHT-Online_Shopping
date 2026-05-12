"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useSearch } from "@/contexts/SearchContext";
import { useWishlist } from "@/contexts/WishlistContext";

type NavbarProps = {
  onCartOpen: () => void;
  onLoginOpen: () => void;
};

const Navbar = ({ onCartOpen, onLoginOpen }: NavbarProps) => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { query, setQuery } = useSearch();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-pink-100/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-lg font-bold text-white shadow-lg shadow-pink-200">
              LB
            </span>
            <div>
              <p className="font-display text-2xl font-bold tracking-tight text-pink-500">
                LuxeBags
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                by SHT
              </p>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600 md:inline-flex"
                >
                  Dashboard
                </Link>
                <Link
                  href="/orders"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600 md:inline-flex"
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600 md:inline-flex"
                >
                  Wishlist
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
                >
                  <FaUserCircle className="text-xl" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
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

            <button
              type="button"
              onClick={onCartOpen}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-600 shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
              aria-label="Open cart"
            >
              <FaShoppingCart />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/wishlist"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-600 shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
              aria-label="View wishlist"
            >
              <FaHeart className="text-pink-500" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-2xl lg:flex-1">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search handbags by name..."
              className="w-full rounded-full border border-pink-100 bg-white px-12 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
            />
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-pink-50 hover:text-pink-600"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-pink-50 hover:text-pink-600"
            >
              Profile
            </Link>
            <Link
              href="#products"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-pink-50 hover:text-pink-600"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
