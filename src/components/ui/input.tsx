import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-champagne/40 bg-white/60 px-4 font-ui text-sm text-rose placeholder:text-rose/50 outline-none transition focus:border-champagne focus:ring-2 focus:ring-champagne/25",
        className,
      )}
      {...props}
    />
  );
}
