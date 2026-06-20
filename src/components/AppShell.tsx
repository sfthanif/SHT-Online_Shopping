"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CatalogProvider } from "@/contexts/CatalogContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileProfileMenu from "@/components/MobileProfileMenu";
import Navbar from "@/components/Navbar";
import ProductDetailModal from "@/components/ProductDetailModal";
import { ProductDetailProvider } from "@/contexts/ProductDetailContext";

const AppShell = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [showMobileBars, setShowMobileBars] = useState(false);

  useEffect(() => {
    const updateViewportState = () => {
      setShowMobileBars(window.innerWidth < 640);
    };
    updateViewportState();
    window.addEventListener("resize", updateViewportState);
    return () => window.removeEventListener("resize", updateViewportState);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const wave = document.createElement("span");
      wave.className = "click-wave";
      wave.style.left = event.clientX + "px";
      wave.style.top = event.clientY + "px";
      document.body.appendChild(wave);
      wave.addEventListener("animationend", () => {
        wave.remove();
      }, { once: true });

      const heartColors = ["#ec4899", "#db2777", "#f472b6", "#f9a8d4", "#be185d"];
      for (let i = 0; i < 4; i++) {
        const heart = document.createElement("span");
        heart.className = "click-heart";
        heart.textContent = "\u2665";
        heart.style.left = (event.clientX + (Math.random() - 0.5) * 24) + "px";
        heart.style.top  = (event.clientY + (Math.random() - 0.5) * 24) + "px";
        const dx = (Math.random() - 0.5) * 40;
        const dy = -(18 + Math.random() * 28);
        heart.style.setProperty("--hx", dx + "px");
        heart.style.setProperty("--hy", dy + "px");
        heart.style.setProperty("--hr", (Math.random() - 0.5) * 60 + "deg");
        heart.style.color = heartColors[i % heartColors.length];
        heart.style.fontSize = (10 + Math.random() * 8) + "px";
        document.body.appendChild(heart);
        setTimeout(() => { if (heart.parentNode) heart.remove(); }, 1000);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <AuthProvider>
      <CatalogProvider>
        <WishlistProvider>
          <CartProvider>
            <SearchProvider>
              <SidebarProvider>
              <ProductDetailProvider>
                <div className="min-h-screen text-slate-900">
                  <Navbar
                    onCartOpen={() => setIsCartOpen(true)}
                    onLoginOpen={() => setIsLoginOpen(true)}
                  />
                  {/*
                    Navbar heights (standard Tailwind breakpoints):
                      < sm  (< 640px) : mobile nav only  → pt-20  (mobile top search bar)
                      sm–md (640–768px): middle bar only  ≈  77px → sm:pt-20
                      md–lg (768–1024px): top + middle   ≈ 110px → md:pt-28
                      lg+  (1024px+)  : all 3 bars       ≈ 187px → lg:pt-48
                  */}
                  <main className="w-full px-4 sm:px-6 lg:px-8 pb-24 sm:pb-6 lg:pb-16 nav-aware-pt">
                    {children}
                  </main>
                  <Footer />
                  <ProductDetailModal />
                  <CartDrawer
                    open={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                  />
                  <LoginModal
                    open={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                  />
                </div>
                {showMobileBars && (
                  <div>
                    <MobileBottomNav
                      onLoginOpen={() => setIsLoginOpen(true)}
                      onProfileOpen={() => setIsMobileProfileOpen(true)}
                    />
                    <MobileProfileMenu
                      open={isMobileProfileOpen}
                      onClose={() => setIsMobileProfileOpen(false)}
                      onCartOpen={() => {
                        setIsMobileProfileOpen(false);
                        setIsCartOpen(true);
                      }}
                    />
                  </div>
                )}
              </ProductDetailProvider>
              </SidebarProvider>
            </SearchProvider>
          </CartProvider>
        </WishlistProvider>
      </CatalogProvider>
    </AuthProvider>
  );
};

export default AppShell;
