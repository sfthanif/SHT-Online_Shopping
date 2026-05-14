"use client";

import { ReactNode, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CatalogProvider } from "@/contexts/CatalogContext";
import { SearchProvider } from "@/contexts/SearchContext";
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

  return (
    <AuthProvider>
      <CatalogProvider>
        <WishlistProvider>
          <CartProvider>
            <SearchProvider>
              <div className="min-h-screen text-slate-900">
                <Navbar
                  onCartOpen={() => setIsCartOpen(true)}
                  onLoginOpen={() => setIsLoginOpen(true)}
                />
                <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-6 lg:pb-16">
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
              {/* Fixed Mobile Navigation & Profile - only on small screens */}
              <div className="md:hidden">
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
            </SearchProvider>
          </CartProvider>
        </WishlistProvider>
      </CatalogProvider>
    </AuthProvider>
  );
};

export default AppShell;
