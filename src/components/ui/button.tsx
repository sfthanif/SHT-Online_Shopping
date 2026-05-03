"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  loading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 font-ui text-sm tracking-[0.15em] uppercase transition",
        variant === "primary" &&
          "bg-gold-gradient bg-[length:220%_100%] text-rose shadow-luxury hover:animate-shimmer",
        variant === "secondary" &&
          "border border-champagne/60 bg-white/40 text-rose backdrop-blur-md hover:bg-white/60",
        variant === "ghost" && "text-rose hover:bg-blush/30",
        className,
      )}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
