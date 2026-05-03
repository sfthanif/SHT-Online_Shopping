"use client";

import { useMemo, useState } from "react";

import { Currency } from "@/types";

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.78,
};

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("USD");

  const convert = useMemo(
    () => (value: number) => Math.round(value * rates[currency]),
    [currency],
  );

  return {
    currency,
    setCurrency,
    convert,
  };
}
