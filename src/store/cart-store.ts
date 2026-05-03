"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CartItem, ProductColor } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, color: ProductColor, size: string) => void;
  updateQuantity: (
    productId: string,
    color: ProductColor,
    size: string,
    quantity: number,
  ) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (item) =>
        set((state) => {
          const found = state.items.find(
            (entry) =>
              entry.productId === item.productId &&
              entry.color === item.color &&
              entry.size === item.size,
          );

          if (found) {
            return {
              items: state.items.map((entry) =>
                entry === found
                  ? {
                      ...entry,
                      quantity: entry.quantity + (item.quantity ?? 1),
                    }
                  : entry,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: item.quantity ?? 1 }],
          };
        }),
      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.color === color &&
                item.size === size
              ),
          ),
        })),
      updateQuantity: (productId, color, size, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId &&
              item.color === color &&
              item.size === size
                ? { ...item, quantity }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "rosequi-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
