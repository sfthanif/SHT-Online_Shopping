export function Skeleton({
  className = "h-20 w-full",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-pearl via-blush to-pearl bg-[length:200%_100%] ${className}`}
    />
  );
}
