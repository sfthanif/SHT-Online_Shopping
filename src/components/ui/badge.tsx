import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-champagne/40 bg-pearl/70 px-3 py-1 font-ui text-xs uppercase tracking-[0.14em] text-rose",
        className,
      )}
    >
      {children}
    </span>
  );
}
