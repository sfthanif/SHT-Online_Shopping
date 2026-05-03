"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useMemo, useState } from "react";

export function Carousel({ children }: { children: React.ReactNode }) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [index, setIndex] = useState(0);

  const current = slides[index];

  return (
    <div className="space-y-4">
      <div>{current}</div>
      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-full border border-champagne/40 p-2"
          onClick={() =>
            setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
          }
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4 text-rose" />
        </button>
        <button
          className="rounded-full border border-champagne/40 p-2"
          onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4 text-rose" />
        </button>
      </div>
    </div>
  );
}
