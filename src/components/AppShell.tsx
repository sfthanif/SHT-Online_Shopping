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

const AppShell = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [showMobileBars, setShowMobileBars] = useState(false);

  useEffect(() => {
    const updateViewportState = () => {
      setShowMobileBars(window.innerWidth < 600);
    };
    updateViewportState();
    window.addEventListener("resize", updateViewportState);
    return () => window.removeEventListener("resize", updateViewportState);
  }, []);

  return (
    <AuthProvider>
      <CatalogProvider>
        <WishlistProvider>
          <CartProvider>
            <SearchProvider>
              <SidebarProvider>
                <div className="min-h-screen text-slate-900">
                  <Navbar
                    onCartOpen={() => setIsCartOpen(true)}
                    onLoginOpen={() => setIsLoginOpen(true)}
                  />
                  {/*
                    Navbar heights:
                      600-768px  : middle bar only     ≈  77px → pt-20
                      768-1024px : top + middle        ≈ 110px → md:pt-30
                      1024px+    : top+middle+bottom   ≈ 187px → lg:pt-48
                  */}
                  <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-30 lg:pt-48 pb-24 lg:pb-16">
                    {children}
                  </main>
                  <Footer />
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
              </SidebarProvider>
            </SearchProvider>
          </CartProvider>
        </WishlistProvider>
      </CatalogProvider>
    </AuthProvider>
  );
};

export default AppShell;
