"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/types";

type Ctx = {
  product: Product | null;
  open: (p: Product) => void;
  close: () => void;
};

const ProductDetailContext = createContext<Ctx>({
  product: null,
  open: () => {},
  close: () => {},
});

export const ProductDetailProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const open  = useCallback((p: Product) => setProduct(p), []);
  const close = useCallback(() => setProduct(null), []);

  return (
    <ProductDetailContext.Provider value={{ product, open, close }}>
      {children}
    </ProductDetailContext.Provider>
  );
};

export const useProductDetail = () => useContext(ProductDetailContext);
