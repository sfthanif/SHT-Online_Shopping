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

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CATALOG_KEY);
    if (stored) {
      try {
        setProducts(JSON.parse(stored) as Product[]);
      } catch {
        window.localStorage.removeItem(CATALOG_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
  }, [hydrated, products]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      addProduct: (product) => {
        const id = `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
        setProducts((current) => [...current, { ...product, id }]);
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
