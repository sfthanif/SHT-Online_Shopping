import type { Metadata } from "next";
import type { Viewport } from "next";
import {
  Cormorant_Garamond,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { AuthModal } from "@/components/auth/auth-modal";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Navbar } from "@/components/layout/navbar";
import { AppProviders } from "@/components/providers/app-providers";
import { PwaRegister } from "@/components/providers/pwa-register";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rosequi.com"),
  title: "ROSEQUI | Luxury Ladies Handbags",
  description:
    "ROSEQUI offers premium handcrafted ladies handbags with timeless Italian elegance.",
  openGraph: {
    title: "ROSEQUI Luxury Handbags",
    description: "Timeless Elegance, Crafted for You.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="top"
        className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} bg-cream font-body text-rose`}
      >
        <AppProviders>
          <PwaRegister />
          <Navbar />
          <MobileMenu />
          <CartDrawer />
          <AuthModal />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </AppProviders>
      </body>
    </html>
  );
}
