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
import Navbar from "@/components/Navbar";

const AppShell = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
                <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
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
            </SearchProvider>
          </CartProvider>
        </WishlistProvider>
      </CatalogProvider>
    </AuthProvider>
  );
};

export default AppShell;
