"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingGap = Math.max(0, 200 - subtotal);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-charcoal/40"
            onClick={close}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 z-[66] w-full max-w-md border-l border-champagne/30 bg-white/65 p-5 backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-3xl text-rose">Your Cart</h3>
              <button
                onClick={close}
                className="font-ui text-xs uppercase tracking-[0.16em] text-rose/70"
              >
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-dashed border-champagne/40 bg-pearl/70 p-8 text-center">
                <p className="font-body text-2xl text-rose">
                  Your cart is empty.
                </p>
                <Button className="mt-5" onClick={close}>
                  Start Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 h-2 overflow-hidden rounded-full bg-champagne/20">
                  <div
                    className="h-full bg-gold-gradient"
                    style={{
                      width: `${Math.min(100, (subtotal / 200) * 100)}%`,
                    }}
                  />
                </div>
                <p className="mb-6 font-ui text-xs uppercase tracking-[0.12em] text-rose/80">
                  {shippingGap > 0
                    ? `Add ${formatCurrency(shippingGap)} more for free shipping`
                    : "You unlocked free shipping"}
                </p>

                <ul
                  className="space-y-4 overflow-y-auto pr-1"
                  style={{ maxHeight: "58vh" }}
                >
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.color}-${item.size}`}
                      className="rounded-2xl bg-white/55 p-3"
                    >
                      <div className="flex gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={70}
                          height={90}
                          className="rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-body text-xl text-rose">
                            {item.name}
                          </p>
                          <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-rose/70">
                            {item.color} / {item.size}
                          </p>
                          <p className="mt-2 font-ui text-xs tracking-[0.14em] text-rose">
                            {formatCurrency(item.price)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              aria-label="Decrease quantity"
                              className="rounded-full border border-champagne/40 p-1"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.color,
                                  item.size,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Minus className="h-3 w-3 text-rose" />
                            </button>
                            <span className="font-ui text-xs text-rose">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              className="rounded-full border border-champagne/40 p-1"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.color,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus className="h-3 w-3 text-rose" />
                            </button>
                            <button
                              aria-label="Remove item"
                              className="ml-auto rounded-full border border-champagne/40 p-1"
                              onClick={() =>
                                removeItem(
                                  item.productId,
                                  item.color,
                                  item.size,
                                )
                              }
                            >
                              <Trash2 className="h-3 w-3 text-rose" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-2xl bg-pearl/75 p-4">
                  <div className="flex items-center justify-between font-ui text-xs uppercase tracking-[0.13em] text-rose/80">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between font-ui text-xs uppercase tracking-[0.13em] text-rose/80">
                    <span>Shipping</span>
                    <span>{shippingGap > 0 ? formatCurrency(20) : "Free"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between font-ui text-xs uppercase tracking-[0.13em] text-rose/80">
                    <span>Tax</span>
                    <span>{formatCurrency(Math.round(subtotal * 0.08))}</span>
                  </div>
                  <div className="mt-3 border-t border-champagne/30 pt-3 font-ui text-sm uppercase tracking-[0.14em] text-rose">
                    Total{" "}
                    {formatCurrency(
                      subtotal +
                        (shippingGap > 0 ? 20 : 0) +
                        Math.round(subtotal * 0.08),
                    )}
                  </div>
                </div>

                <Button className="mt-4 w-full">Checkout</Button>
                <Link
                  href="/products"
                  className="mt-3 block text-center font-ui text-xs uppercase tracking-[0.16em] text-rose/80"
                >
                  Continue Shopping
                </Link>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
