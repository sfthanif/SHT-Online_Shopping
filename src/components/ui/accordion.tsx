"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface AccordionItem {
  title: string;
  content: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const open = active === index;

        return (
          <section
            key={item.title}
            className="rounded-2xl border border-champagne/30 bg-white/40"
          >
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              onClick={() => setActive(open ? null : index)}
            >
              <span className="font-ui text-xs uppercase tracking-[0.16em] text-rose">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-rose transition",
                  open && "rotate-180",
                )}
              />
            </button>
            {open ? (
              <p className="px-4 pb-4 font-body text-lg text-rose/90">
                {item.content}
              </p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
