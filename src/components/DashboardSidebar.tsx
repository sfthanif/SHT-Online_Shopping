"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartLine,
  FaHome,
  FaShoppingBag,
  FaUser,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: FaChartLine },
    { href: "/orders", label: "Orders", icon: FaShoppingBag },
    { href: "/wishlist", label: "Wishlist", icon: FaHeart },
    { href: "/profile", label: "Profile", icon: FaUser },
    { href: "/", label: "Store", icon: FaHome },
  ];

  return (
    <aside className="premium-card rounded-[1.75rem] p-5 lg:sticky lg:top-28">
      <div className="rounded-[1.4rem] bg-gradient-to-br from-pink-500 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
        <p className="text-xs uppercase tracking-[0.3em] text-white/80">
          Logged in
        </p>
        <p className="mt-2 text-xl font-semibold">
          {user?.name ?? "Luxe Member"}
        </p>
        <p className="mt-1 text-sm text-white/85">
          {user?.email ?? "Email unavailable"}
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        {links.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-pink-50 text-pink-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-pink-600"
              }`}
            >
              <item.icon className="text-base" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
