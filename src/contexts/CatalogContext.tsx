"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products as initialProducts } from "@/lib/products";
import { Product } from "@/lib/types";

type CatalogContextValue = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
};

const CATALOG_KEY = "sht_luxebags_catalog";
const CatalogContext = createContext<CatalogContextValue | undefined>(
  undefined,
);

const initialIds = new Set(initialProducts.map((p) => p.id));

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  // Only user-added products (not in initialProducts) are persisted to localStorage.
  // This ensures newly added source products always appear after a code update.
  const [userAdded, setUserAdded] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CATALOG_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        setUserAdded(parsed.filter((p) => !initialIds.has(p.id)));
      } catch {
        window.localStorage.removeItem(CATALOG_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CATALOG_KEY, JSON.stringify(userAdded));
  }, [hydrated, userAdded]);

  const products = useMemo(() => [...initialProducts, ...userAdded], [userAdded]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      addProduct: (product) => {
        const id = `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
        setUserAdded((current) => [...current, { ...product, id }]);
      },
    }),
    [products],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return context;
};
