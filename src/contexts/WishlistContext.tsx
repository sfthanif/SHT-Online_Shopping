"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WishlistContextValue = {
  wishlistIds: string[];
  wishlistCount: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
};

const WISHLIST_KEY = "sht_luxebags_wishlist";
const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try {
        setWishlistIds(JSON.parse(stored) as string[]);
      } catch {
        window.localStorage.removeItem(WISHLIST_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [hydrated, wishlistIds]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      wishlistIds,
      wishlistCount: wishlistIds.length,
      isWishlisted: (productId: string) => wishlistIds.includes(productId),
      toggleWishlist: (productId: string) => {
        setWishlistIds((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        );
      },
      clearWishlist: () => setWishlistIds([]),
    }),
    [wishlistIds],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
