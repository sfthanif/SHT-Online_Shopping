export type Currency = "USD" | "EUR" | "GBP";

export type ProductCategory =
  | "Totes"
  | "Clutches"
  | "Crossbody"
  | "Satchels"
  | "Limited Edition";

export type ProductColor = "Blush" | "Noir" | "Ivory" | "Sage" | "Burgundy";

export type ProductMaterial = "Leather" | "Suede" | "Canvas";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  material: ProductMaterial;
  sizes: string[];
  strapType: "Chain" | "Adjustable" | "Top Handle" | "Convertible";
  isNew?: boolean;
  isBestSeller?: boolean;
  image: string;
  gallery: string[];
  dimensions: string;
  care: string;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  color: ProductColor;
  size: string;
  quantity: number;
  price: number;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  avatar: string;
  verified: boolean;
}

export interface DashboardOrder {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
}
