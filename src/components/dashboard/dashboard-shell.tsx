"use client";

import { useMemo, useState } from "react";

import { dashboardOrders } from "@/lib/constants";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";

import { Button } from "@/components/ui/button";

const sections = [
  "Overview",
  "Orders",
  "Wishlist",
  "Addresses",
  "Account Details",
  "Logout",
] as const;

type Section = (typeof sections)[number];

export function DashboardShell() {
  const [section, setSection] = useState<Section>("Overview");
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);

  const wishlistItems = useMemo(
    () => products.filter((item) => wishlistIds.includes(item.id)),
    [wishlistIds],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-3xl border border-white/45 bg-white/55 p-4 shadow-glass backdrop-blur-xl">
        <h2 className="mb-4 font-heading text-3xl text-rose">Dashboard</h2>
        <nav className="space-y-2">
          {sections.map((item) => (
            <button
              key={item}
              className={`block w-full rounded-2xl px-3 py-2 text-left font-ui text-xs uppercase tracking-[0.15em] ${
                section === item ? "bg-champagne/30 text-rose" : "text-rose/70"
              }`}
              onClick={() => setSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="rounded-3xl border border-white/45 bg-white/55 p-6 shadow-glass backdrop-blur-xl">
        {section === "Overview" ? (
          <div className="space-y-4">
            <h3 className="font-heading text-4xl text-rose">Welcome, Amelia</h3>
            <p className="font-body text-xl text-rose/85">
              Account created on March 2024. Wishlist items:{" "}
              {wishlistItems.length}
            </p>
            <table className="w-full text-left">
              <thead>
                <tr className="font-ui text-xs uppercase tracking-[0.15em] text-rose/70">
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {dashboardOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-champagne/30 font-body text-xl text-rose"
                  >
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>{formatCurrency(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {section === "Orders" ? (
          <div className="space-y-4">
            <h3 className="font-heading text-4xl text-rose">Orders</h3>
            {dashboardOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-champagne/30 bg-pearl/70 p-4"
              >
                <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose/70">
                  {order.id}
                </p>
                <p className="font-body text-xl text-rose">
                  {order.status} · {formatCurrency(order.total)}
                </p>
                <p className="font-body text-lg text-rose/80">
                  Tracking timeline and invoice download are available in full
                  checkout integration.
                </p>
              </article>
            ))}
          </div>
        ) : null}

        {section === "Wishlist" ? (
          <div className="space-y-4">
            <h3 className="font-heading text-4xl text-rose">Wishlist</h3>
            {wishlistItems.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-champagne/40 p-6 font-body text-2xl text-rose/80">
                Your wishlist is empty. Explore our latest arrivals.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {wishlistItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-champagne/30 bg-pearl/70 p-4"
                  >
                    <p className="font-body text-2xl text-rose">{item.name}</p>
                    <p className="font-ui text-xs uppercase tracking-[0.13em] text-rose/70">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button>Move to Cart</Button>
                      <Button
                        variant="secondary"
                        onClick={() => toggleWishlist(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {section === "Addresses" ? (
          <div className="space-y-4">
            <h3 className="font-heading text-4xl text-rose">Addresses</h3>
            <article className="rounded-2xl border border-champagne/30 bg-pearl/70 p-4">
              <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose/70">
                Default Address
              </p>
              <p className="font-body text-xl text-rose">
                321 Fifth Avenue, New York, NY 10016
              </p>
              <div className="mt-2 flex gap-2">
                <Button variant="secondary">Edit</Button>
                <Button variant="secondary">Delete</Button>
              </div>
            </article>
            <Button>Add New Address</Button>
          </div>
        ) : null}

        {section === "Account Details" ? (
          <div className="space-y-4">
            <h3 className="font-heading text-4xl text-rose">Account Details</h3>
            <p className="font-body text-xl text-rose/85">
              Update profile, change password, and manage newsletter
              preferences.
            </p>
            <Button variant="secondary">Delete Account</Button>
          </div>
        ) : null}

        {section === "Logout" ? (
          <div className="space-y-4">
            <h3 className="font-heading text-4xl text-rose">Sign Out</h3>
            <Button>Logout</Button>
          </div>
        ) : null}
      </main>
    </div>
  );
}
