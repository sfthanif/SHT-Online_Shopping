"use client";

import { SessionProvider } from "next-auth/react";

import { AppQueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AppQueryProvider>{children}</AppQueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
