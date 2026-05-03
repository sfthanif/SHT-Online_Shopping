import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <Skeleton className="h-12 w-56" />
      <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
        <Skeleton className="h-[520px]" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-96" />
          ))}
        </div>
      </div>
    </main>
  );
}
