"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h2 className="font-heading text-5xl text-rose">Something went wrong</h2>
      <p className="mt-3 font-body text-2xl text-rose/80">
        We could not load this section. Please try again.
      </p>
      <Button className="mt-6" onClick={() => reset()}>
        Retry
      </Button>
    </main>
  );
}
