"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  message: string;
  open: boolean;
  type?: "success" | "error";
}

export function Toast({ message, open, type = "success" }: ToastProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`fixed bottom-6 right-6 z-[80] rounded-2xl px-4 py-3 font-ui text-xs uppercase tracking-[0.14em] shadow-luxury ${
            type === "success"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-200 text-rose-900"
          }`}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
