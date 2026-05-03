"use client";

import { Button } from "@/components/ui/button";

export default function ProductDetailError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="font-heading text-5xl text-rose">
        Product failed to load
      </h2>
      <Button className="mt-6" onClick={reset}>
        Retry
      </Button>
    </main>
  );
}
