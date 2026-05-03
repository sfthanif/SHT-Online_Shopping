import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-[620px]" />
        <Skeleton className="h-[620px]" />
      </div>
    </main>
  );
}
