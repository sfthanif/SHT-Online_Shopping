import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ className, label, children, ...props }: SelectProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-xs font-ui uppercase tracking-[0.2em] text-rose/80">
      {label}
      <span className="relative">
        <select
          className={cn(
            "h-12 w-full appearance-none rounded-2xl border border-champagne/40 bg-white/60 px-4 pr-10 font-ui text-sm uppercase tracking-[0.12em] text-rose outline-none transition focus:border-champagne",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-rose/70" />
      </span>
    </label>
  );
}
