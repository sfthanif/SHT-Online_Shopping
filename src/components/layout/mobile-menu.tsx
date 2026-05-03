"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { useUiStore } from "@/store/ui-store";

const categories = [
  "Totes",
  "Clutches",
  "Crossbody",
  "Satchels",
  "Limited Edition",
];

export function MobileMenu() {
  const open = useUiStore((state) => state.mobileMenuOpen);
  const close = useUiStore((state) => state.closeMobileMenu);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="fixed inset-y-0 left-0 z-[60] w-72 border-r border-champagne/40 bg-cream/95 p-6 backdrop-blur-2xl lg:hidden"
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-heading text-2xl tracking-[0.2em] text-rose">
              ROSEQUI
            </h3>
            <button
              onClick={close}
              className="font-ui text-xs uppercase tracking-[0.15em] text-rose/75"
            >
              Close
            </button>
          </div>

          <nav className="space-y-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                onClick={close}
                className="block rounded-2xl border border-champagne/30 bg-white/50 px-4 py-3 font-ui text-xs uppercase tracking-[0.17em] text-rose"
              >
                {category}
              </Link>
            ))}
          </nav>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
