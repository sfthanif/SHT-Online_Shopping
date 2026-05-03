"use client";

import { Button } from "@/components/ui/button";

export default function ProductsError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="font-heading text-5xl text-rose">
        Unable to load products
      </h2>
      <Button className="mt-6" onClick={reset}>
        Try Again
      </Button>
    </main>
  );
}
