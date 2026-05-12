"use client";

import Image from "next/image";
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from "react-icons/fa";
import { currency } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart drawer"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-pink-100 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.2)]">
        <div className="flex items-center justify-between border-b border-pink-100 bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              Your selection
            </p>
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
              <FaShoppingBag className="text-4xl text-pink-300" />
              <p className="text-lg font-semibold text-slate-800">
                Your cart is empty
              </p>
              <p className="max-w-xs text-sm leading-6">
                Add your favorite handbags to see them here with quantity
                controls and local storage persistence.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-[1.4rem] border border-slate-100 bg-slate-50 p-3"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="truncate font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {currency.format(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full p-2 text-rose-500 transition hover:bg-rose-50"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded-full p-2 text-slate-600 transition hover:bg-pink-50 hover:text-pink-600"
                      >
                        <FaMinus />
                      </button>
                      <span className="min-w-10 px-3 text-center text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded-full p-2 text-slate-600 transition hover:bg-pink-50 hover:text-pink-600"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {currency.format(item.quantity * item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-pink-100 bg-white px-6 py-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Total</span>
            <span className="text-2xl font-semibold text-slate-900">
              {currency.format(total)}
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="flex-1 rounded-full border border-pink-200 px-4 py-3 text-sm font-semibold text-pink-600 transition hover:border-pink-300 hover:bg-pink-50"
            >
              Clear Cart
            </button>
            <button
              type="button"
              className="flex-1 rounded-full bg-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
