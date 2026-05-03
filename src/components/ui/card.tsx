import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-white/40 bg-white/45 p-5 shadow-glass backdrop-blur-lg transition",
        className,
      )}
    >
      {children}
    </article>
  );
}
