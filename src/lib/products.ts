import { Order, Product } from "@/lib/types";

export const buildPlaceholderImage = (
  label: string,
  accentA = "#ec4899",
  accentB = "#f9a8d4",
) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentA}" />
          <stop offset="100%" stop-color="${accentB}" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" rx="64" fill="url(#bg)" />
      <circle cx="660" cy="150" r="110" fill="rgba(255,255,255,0.14)" />
      <circle cx="130" cy="150" r="70" fill="rgba(255,255,255,0.12)" />
      <rect x="150" y="260" width="500" height="480" rx="52" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" stroke-width="8" />
      <path d="M260 266c0-90 50-150 140-150s140 60 140 150" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="28" stroke-linecap="round" />
      <text x="400" y="805" text-anchor="middle" font-size="64" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const products: Product[] = [
  {
    id: "rose-luxe-tote",
    name: "Rose Luxe Tote",
    price: 129,
    rating: 4.9,
    imageUrl: buildPlaceholderImage("Tote", "#db2777", "#f472b6"),
    stock: 12,
    category: "Tote",
    description:
      "A roomy everyday tote with a polished silhouette and signature gold-tone details.",
    reviewCount: 62,
  },
  {
    id: "belle-clutch",
    name: "Belle Clutch",
    price: 89,
    rating: 4.7,
    imageUrl: buildPlaceholderImage("Clutch", "#ec4899", "#fb7185"),
    stock: 4,
    category: "Clutch",
    description:
      "An evening-ready clutch with a refined finish and statement clasp.",
    reviewCount: 34,
  },
  {
    id: "serene-shoulder",
    name: "Serene Shoulder Bag",
    price: 149,
    rating: 4.8,
    imageUrl: buildPlaceholderImage("Shoulder", "#f472b6", "#f9a8d4"),
    stock: 9,
    category: "Shoulder",
    description:
      "Soft structure, elegant drape, and a luxe strap that sits beautifully on the shoulder.",
    reviewCount: 48,
  },
  {
    id: "petal-sling",
    name: "Petal Sling",
    price: 99,
    rating: 4.6,
    imageUrl: buildPlaceholderImage("Sling", "#fb7185", "#fbcfe8"),
    stock: 7,
    category: "Sling",
    description:
      "A light, hands-free sling bag designed for stylish city movement.",
    reviewCount: 19,
  },
  {
    id: "aura-bucket",
    name: "Aura Bucket Bag",
    price: 139,
    rating: 4.9,
    imageUrl: buildPlaceholderImage("Bucket", "#d946ef", "#f9a8d4"),
    stock: 3,
    category: "Bucket",
    description:
      "A sculpted bucket bag with soft edges and premium drawstring closure.",
    reviewCount: 27,
  },
  {
    id: "velvet-hobo",
    name: "Velvet Hobo",
    price: 159,
    rating: 4.8,
    imageUrl: buildPlaceholderImage("Hobo", "#f43f5e", "#fda4af"),
    stock: 6,
    category: "Hobo",
    description:
      "A relaxed hobo silhouette with elevated hardware and all-day comfort.",
    reviewCount: 41,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-1042",
    email: "guest@example.com",
    date: "2026-05-11",
    status: "Delivered",
    total: 218,
    items: [
      { id: "rose-luxe-tote", name: "Rose Luxe Tote", price: 129, quantity: 1 },
      { id: "petal-sling", name: "Petal Sling", price: 99, quantity: 1 },
    ],
  },
  {
    id: "ORD-1043",
    email: "guest@example.com",
    date: "2026-05-08",
    status: "Shipped",
    total: 288,
    items: [
      { id: "velvet-hobo", name: "Velvet Hobo", price: 159, quantity: 1 },
      { id: "belle-clutch", name: "Belle Clutch", price: 89, quantity: 1 },
    ],
  },
  {
    id: "ORD-1044",
    email: "guest@example.com",
    date: "2026-05-04",
    status: "Processing",
    total: 278,
    items: [
      { id: "aura-bucket", name: "Aura Bucket Bag", price: 139, quantity: 1 },
      {
        id: "serene-shoulder",
        name: "Serene Shoulder Bag",
        price: 149,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-1045",
    email: "guest@example.com",
    date: "2026-04-29",
    status: "Delivered",
    total: 328,
    items: [
      { id: "rose-luxe-tote", name: "Rose Luxe Tote", price: 129, quantity: 1 },
      { id: "velvet-hobo", name: "Velvet Hobo", price: 159, quantity: 1 },
    ],
  },
];

export const currency = new Intl.NumberFormat("bn-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});
