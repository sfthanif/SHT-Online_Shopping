export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  stock: number;
  category?: string;
  description?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type UserProfile = {
  name: string;
  email: string;
  address: string;
};

export type AuthUser = UserProfile & {
  avatarSeed?: string;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  email: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
};
