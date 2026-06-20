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

  // ── Fashion ──
  { id: "fashion-001", name: "Silk Floral Saree", price: 2499, rating: 4.8, reviewCount: 118, stock: 20, category: "Fashion", description: "Lightweight silk saree with hand-printed floral motifs and a contrast blouse piece.", imageUrl: buildPlaceholderImage("Saree", "#db2777", "#f9a8d4") },
  { id: "fashion-002", name: "Cotton Anarkali Kurti", price: 999, rating: 4.6, reviewCount: 87, stock: 35, category: "Fashion", description: "Breathable cotton anarkali with delicate embroidery at the neckline.", imageUrl: buildPlaceholderImage("Kurti", "#ec4899", "#fbcfe8") },
  { id: "fashion-003", name: "Slim Fit Denim Jeans", price: 1599, rating: 4.5, reviewCount: 74, stock: 50, category: "Fashion", description: "Stretch-denim slim fit jeans with a classic five-pocket construction.", imageUrl: buildPlaceholderImage("Jeans", "#6366f1", "#c7d2fe") },
  { id: "fashion-004", name: "Flared Midi Dress", price: 1299, rating: 4.7, reviewCount: 96, stock: 18, category: "Fashion", description: "Flowy midi dress with a flared hem and smocked waistband.", imageUrl: buildPlaceholderImage("Dress", "#f472b6", "#fce7f3") },
  { id: "fashion-005", name: "Linen Casual Shirt", price: 849, rating: 4.4, reviewCount: 52, stock: 40, category: "Fashion", description: "Breathable linen shirt with a relaxed fit perfect for warm days.", imageUrl: buildPlaceholderImage("Shirt", "#0ea5e9", "#bae6fd") },
  { id: "fashion-006", name: "Embroidered Jacket", price: 3499, rating: 4.9, reviewCount: 143, stock: 8, category: "Fashion", description: "Hand-embroidered statement jacket with satin lining and gold detailing.", imageUrl: buildPlaceholderImage("Jacket", "#7c3aed", "#ddd6fe") },
  { id: "fashion-007", name: "Printed Palazzo Set", price: 1199, rating: 4.6, reviewCount: 109, stock: 25, discount: 15, category: "Fashion", description: "Vibrant printed palazzo pants with a matching crop top and dupatta.", imageUrl: buildPlaceholderImage("Palazzo", "#e879f9", "#fae8ff") },
  { id: "fashion-008", name: "Velvet Party Gown", price: 4299, rating: 4.8, reviewCount: 131, stock: 10, discount: 10, category: "Fashion", description: "Floor-length velvet gown with a sweetheart neckline and back zipper.", imageUrl: buildPlaceholderImage("Gown", "#9333ea", "#ede9fe") },
  { id: "fashion-009", name: "Crop Top Co-ord Set", price: 1099, rating: 4.5, reviewCount: 83, stock: 30, discount: 20, category: "Fashion", description: "Trendy matching crop top and high-waist skirt set in premium jersey fabric.", imageUrl: buildPlaceholderImage("Co-ord", "#f43f5e", "#ffe4e6") },
  { id: "fashion-010", name: "Wide Leg Trousers", price: 1399, rating: 4.4, reviewCount: 61, stock: 45, discount: 12, category: "Fashion", description: "Relaxed wide-leg trousers in breathable crepe fabric with an elasticated waist.", imageUrl: buildPlaceholderImage("Trousers", "#0891b2", "#cffafe") },
  { id: "fashion-011", name: "Off-Shoulder Blouse", price: 799, rating: 4.6, reviewCount: 77, stock: 38, discount: 18, category: "Fashion", description: "Elegant off-shoulder blouse with ruffle detailing and a concealed back zip.", imageUrl: buildPlaceholderImage("Blouse", "#e11d48", "#ffe4e6") },
  { id: "fashion-012", name: "Kimono Wrap Jacket", price: 2199, rating: 4.7, reviewCount: 104, stock: 15, discount: 8, category: "Fashion", description: "Lightweight kimono-style wrap jacket with floral embroidery and wide sleeves.", imageUrl: buildPlaceholderImage("Kimono", "#b45309", "#fef3c7") },

  // ── Electronics ──
  { id: "elec-001", name: "Wireless Earbuds Pro", price: 3999, rating: 4.7, reviewCount: 201, stock: 60, category: "Electronics", description: "True wireless earbuds with active noise cancellation and 30-hour battery life.", imageUrl: buildPlaceholderImage("Earbuds", "#0f172a", "#475569") },
  { id: "elec-002", name: "Smart Watch Series X", price: 8999, rating: 4.8, reviewCount: 176, stock: 25, category: "Electronics", description: "Fitness tracking smartwatch with AMOLED display and 5-day battery.", imageUrl: buildPlaceholderImage("Watch", "#1e40af", "#93c5fd") },
  { id: "elec-003", name: "Portable Bluetooth Speaker", price: 2499, rating: 4.6, reviewCount: 134, stock: 45, category: "Electronics", description: "360° surround sound speaker with IPX7 waterproofing and 12-hour playtime.", imageUrl: buildPlaceholderImage("Speaker", "#0369a1", "#7dd3fc") },
  { id: "elec-004", name: "Fast Charge Power Bank", price: 1799, rating: 4.5, reviewCount: 89, stock: 70, category: "Electronics", description: "20000 mAh slim power bank with 65W fast charging for laptops and phones.", imageUrl: buildPlaceholderImage("Power Bank", "#334155", "#94a3b8") },
  { id: "elec-005", name: "USB-C Hub 7-in-1", price: 1299, rating: 4.4, reviewCount: 63, stock: 30, category: "Electronics", description: "Multiport USB-C hub with 4K HDMI, SD card reader, and 100W passthrough.", imageUrl: buildPlaceholderImage("Hub", "#0c4a6e", "#38bdf8") },
  { id: "elec-006", name: "Mechanical Keyboard RGB", price: 4599, rating: 4.9, reviewCount: 228, stock: 15, category: "Electronics", description: "Compact TKL mechanical keyboard with per-key RGB and hot-swappable switches.", imageUrl: buildPlaceholderImage("Keyboard", "#1e293b", "#64748b") },
  { id: "elec-007", name: "Gaming Mouse RGB", price: 2199, rating: 4.7, reviewCount: 159, stock: 40, discount: 10, category: "Electronics", description: "Lightweight optical gaming mouse with 16000 DPI sensor and 7 programmable buttons.", imageUrl: buildPlaceholderImage("Mouse", "#1d4ed8", "#bfdbfe") },
  { id: "elec-008", name: "Wireless Charging Pad 15W", price: 999, rating: 4.5, reviewCount: 112, stock: 55, discount: 15, category: "Electronics", description: "Ultra-thin 15W Qi wireless charging pad compatible with all Qi-enabled devices.", imageUrl: buildPlaceholderImage("Charger", "#0f766e", "#99f6e4") },
  { id: "elec-009", name: "Over-Ear Headphones", price: 5499, rating: 4.8, reviewCount: 194, stock: 20, discount: 12, category: "Electronics", description: "Premium over-ear headphones with 40mm drivers and 35-hour battery life.", imageUrl: buildPlaceholderImage("Headphones", "#3730a3", "#c7d2fe") },
  { id: "elec-010", name: "4K Webcam", price: 3299, rating: 4.6, reviewCount: 88, stock: 18, discount: 8, category: "Electronics", description: "4K ultra HD webcam with autofocus, built-in noise-cancelling mic, and privacy cover.", imageUrl: buildPlaceholderImage("Webcam", "#065f46", "#a7f3d0") },
  { id: "elec-011", name: "Portable SSD 1TB", price: 4999, rating: 4.9, reviewCount: 237, stock: 22, discount: 20, category: "Electronics", description: "USB-C portable SSD with 1050 MB/s read speed and drop-resistant aluminium shell.", imageUrl: buildPlaceholderImage("SSD", "#1e293b", "#94a3b8") },
  { id: "elec-012", name: "Smart LED Strip 5m", price: 1499, rating: 4.5, reviewCount: 176, stock: 60, discount: 25, category: "Electronics", description: "App-controlled RGB LED strip with music sync, 16M colours, and voice assistant support.", imageUrl: buildPlaceholderImage("LED Strip", "#7c3aed", "#c4b5fd") },

  // ── Bags ──
  { id: "bags-001", name: "Canvas Backpack", price: 1499, rating: 4.6, reviewCount: 109, stock: 40, category: "Bags", description: "Durable canvas backpack with laptop compartment and organizer pockets.", imageUrl: buildPlaceholderImage("Backpack", "#854d0e", "#fde68a") },
  { id: "bags-002", name: "Leather Laptop Bag", price: 3299, rating: 4.8, reviewCount: 77, stock: 12, category: "Bags", description: "Full-grain leather laptop bag with padded 15\" sleeve and brass hardware.", imageUrl: buildPlaceholderImage("Laptop Bag", "#78350f", "#fcd34d") },
  { id: "bags-003", name: "Travel Duffel Bag", price: 2199, rating: 4.7, reviewCount: 92, stock: 22, category: "Bags", description: "Spacious duffel bag with shoe compartment and a removable shoulder strap.", imageUrl: buildPlaceholderImage("Duffel", "#713f12", "#fef08a") },
  { id: "bags-004", name: "Mini Crossbody Bag", price: 899, rating: 4.5, reviewCount: 58, stock: 30, category: "Bags", description: "Compact crossbody bag with adjustable strap and zip-around closure.", imageUrl: buildPlaceholderImage("Crossbody", "#92400e", "#fde047") },
  { id: "bags-005", name: "Gym Sack Bag", price: 699, rating: 4.3, reviewCount: 44, stock: 55, category: "Bags", description: "Lightweight drawstring gym sack with water bottle side pocket.", imageUrl: buildPlaceholderImage("Gym Sack", "#a16207", "#fef9c3") },
  { id: "bags-006", name: "Belt Bag / Fanny Pack", price: 849, rating: 4.5, reviewCount: 96, stock: 48, discount: 10, category: "Bags", description: "Hands-free belt bag with dual zip compartments and an adjustable waist strap.", imageUrl: buildPlaceholderImage("Belt Bag", "#b45309", "#fef3c7") },
  { id: "bags-007", name: "Oversized Tote Shopper", price: 1299, rating: 4.6, reviewCount: 115, stock: 35, discount: 15, category: "Bags", description: "Large canvas tote with interior zip pocket and reinforced handles for everyday use.", imageUrl: buildPlaceholderImage("Tote", "#78350f", "#fde68a") },
  { id: "bags-008", name: "Anti-Theft Backpack", price: 2499, rating: 4.8, reviewCount: 143, stock: 20, discount: 18, category: "Bags", description: "Hidden-zip anti-theft backpack with USB charging port and RFID-blocking pocket.", imageUrl: buildPlaceholderImage("Anti-Theft", "#7c2d12", "#fed7aa") },
  { id: "bags-009", name: "Clutch Evening Bag", price: 1099, rating: 4.7, reviewCount: 67, stock: 25, discount: 12, category: "Bags", description: "Embellished satin clutch with detachable chain strap and magnetic closure.", imageUrl: buildPlaceholderImage("Clutch", "#9f1239", "#fecdd3") },
  { id: "bags-010", name: "Rolling Trolley Bag", price: 3999, rating: 4.9, reviewCount: 188, stock: 14, discount: 8, category: "Bags", description: "Hardshell spinner trolley bag with TSA lock and expandable 65L capacity.", imageUrl: buildPlaceholderImage("Trolley", "#44403c", "#e7e5e4") },

  // ── Footwear ──
  { id: "foot-001", name: "Running Sneakers Ultra", price: 3299, rating: 4.8, reviewCount: 195, stock: 28, category: "Footwear", description: "Lightweight running sneakers with responsive foam sole and breathable mesh upper.", imageUrl: buildPlaceholderImage("Sneakers", "#059669", "#6ee7b7") },
  { id: "foot-002", name: "Block Heel Sandals", price: 1799, rating: 4.6, reviewCount: 82, stock: 20, category: "Footwear", description: "Elegant block-heel sandals with adjustable ankle strap and cushioned footbed.", imageUrl: buildPlaceholderImage("Sandals", "#dc2626", "#fca5a5") },
  { id: "foot-003", name: "Chelsea Boots", price: 4499, rating: 4.9, reviewCount: 137, stock: 10, category: "Footwear", description: "Classic leather Chelsea boots with elastic gusset and stacked heel.", imageUrl: buildPlaceholderImage("Boots", "#1c1917", "#a8a29e") },
  { id: "foot-004", name: "Slip-On Loafers", price: 2199, rating: 4.7, reviewCount: 68, stock: 32, category: "Footwear", description: "Premium suede loafers with memory foam insole for all-day comfort.", imageUrl: buildPlaceholderImage("Loafers", "#44403c", "#d6d3d1") },
  { id: "foot-005", name: "Flat Ballet Shoes", price: 1299, rating: 4.5, reviewCount: 53, stock: 40, category: "Footwear", description: "Soft genuine leather ballet flats with a non-slip rubber sole.", imageUrl: buildPlaceholderImage("Flats", "#be185d", "#fbcfe8") },
  { id: "foot-006", name: "Sports Flip Flops", price: 599, rating: 4.3, reviewCount: 39, stock: 80, category: "Footwear", description: "Lightweight EVA flip flops with arch support for beach and casual wear.", imageUrl: buildPlaceholderImage("Slippers", "#0284c7", "#bae6fd") },
  { id: "foot-007", name: "High Ankle Sneakers", price: 2799, rating: 4.7, reviewCount: 121, stock: 22, discount: 10, category: "Footwear", description: "High-top canvas sneakers with padded ankle collar and rubber lug sole.", imageUrl: buildPlaceholderImage("Hi-Top", "#1d4ed8", "#bfdbfe") },
  { id: "foot-008", name: "Platform Heels", price: 2399, rating: 4.6, reviewCount: 94, stock: 18, discount: 15, category: "Footwear", description: "Chunky platform heels with a faux-leather upper and buckle ankle strap.", imageUrl: buildPlaceholderImage("Heels", "#9d174d", "#fce7f3") },
  { id: "foot-009", name: "Espadrille Wedges", price: 1699, rating: 4.5, reviewCount: 76, stock: 30, discount: 20, category: "Footwear", description: "Rope-soled espadrille wedges with canvas upper and ankle tie fastening.", imageUrl: buildPlaceholderImage("Espadrille", "#b45309", "#fef3c7") },
  { id: "foot-010", name: "Formal Oxford Shoes", price: 3499, rating: 4.8, reviewCount: 108, stock: 16, discount: 12, category: "Footwear", description: "Polished full-grain leather Oxford shoes with Goodyear-welted construction.", imageUrl: buildPlaceholderImage("Oxfords", "#292524", "#d6d3d1") },
  { id: "foot-011", name: "Waterproof Rain Boots", price: 2099, rating: 4.6, reviewCount: 85, stock: 35, discount: 8, category: "Footwear", description: "Fully waterproof rubber rain boots with fleece lining and anti-slip sole.", imageUrl: buildPlaceholderImage("Rain Boots", "#166534", "#bbf7d0") },
  { id: "foot-012", name: "Mule Sliders", price: 999, rating: 4.4, reviewCount: 62, stock: 50, discount: 25, category: "Footwear", description: "Open-toe mule sliders with a padded footbed and wide-fit design.", imageUrl: buildPlaceholderImage("Mules", "#c2410c", "#fed7aa") },

  // ── Groceries ──
  { id: "groc-001", name: "Premium Basmati Rice 5kg", price: 699, rating: 4.7, reviewCount: 312, stock: 100, category: "Groceries", description: "Aged extra-long grain basmati rice with a signature floral aroma.", imageUrl: buildPlaceholderImage("Rice", "#ca8a04", "#fef08a") },
  { id: "groc-002", name: "Cold Pressed Mustard Oil", price: 349, rating: 4.6, reviewCount: 174, stock: 80, category: "Groceries", description: "100% pure cold-pressed mustard oil with no additives or preservatives.", imageUrl: buildPlaceholderImage("Oil", "#eab308", "#fef9c3") },
  { id: "groc-003", name: "Darjeeling First Flush Tea", price: 599, rating: 4.9, reviewCount: 218, stock: 60, category: "Groceries", description: "Premium single-origin Darjeeling tea with a delicate muscatel flavour.", imageUrl: buildPlaceholderImage("Tea", "#65a30d", "#d9f99d") },
  { id: "groc-004", name: "Mixed Spice Gift Box", price: 899, rating: 4.8, reviewCount: 96, stock: 45, category: "Groceries", description: "Curated set of 8 hand-ground whole spices from certified organic farms.", imageUrl: buildPlaceholderImage("Spices", "#b45309", "#fde68a") },
  { id: "groc-005", name: "Organic Whole Wheat Flour", price: 249, rating: 4.5, reviewCount: 143, stock: 120, category: "Groceries", description: "Stone-ground whole wheat flour from organic farms, rich in fibre.", imageUrl: buildPlaceholderImage("Flour", "#a78bfa", "#ede9fe") },
  { id: "groc-006", name: "Forest Honey 500g", price: 449, rating: 4.9, reviewCount: 267, stock: 70, category: "Groceries", description: "Raw unfiltered forest honey with natural enzymes and antioxidants intact.", imageUrl: buildPlaceholderImage("Honey", "#f59e0b", "#fef3c7") },
  { id: "groc-007", name: "Organic Rolled Oats 1kg", price: 299, rating: 4.6, reviewCount: 189, stock: 150, discount: 10, category: "Groceries", description: "Gluten-free certified organic rolled oats — perfect for porridge or baking.", imageUrl: buildPlaceholderImage("Oats", "#d97706", "#fde68a") },
  { id: "groc-008", name: "Premium Mixed Nuts 400g", price: 699, rating: 4.8, reviewCount: 231, stock: 85, discount: 15, category: "Groceries", description: "Dry-roasted mix of cashews, almonds, pistachios, and walnuts with no added salt.", imageUrl: buildPlaceholderImage("Nuts", "#92400e", "#fcd34d") },
  { id: "groc-009", name: "Dark Chocolate 70% 200g", price: 349, rating: 4.7, reviewCount: 162, stock: 90, discount: 5, category: "Groceries", description: "Single-origin 70% dark chocolate bar with a rich cocoa flavour and smooth finish.", imageUrl: buildPlaceholderImage("Chocolate", "#3b1f0a", "#fde68a") },
  { id: "groc-010", name: "Quinoa 500g", price: 399, rating: 4.5, reviewCount: 117, stock: 75, discount: 12, category: "Groceries", description: "Organic white quinoa — a complete protein grain, ready in 15 minutes.", imageUrl: buildPlaceholderImage("Quinoa", "#4d7c0f", "#d9f99d") },
  { id: "groc-011", name: "Apple Cider Vinegar 500ml", price: 279, rating: 4.6, reviewCount: 208, stock: 110, discount: 8, category: "Groceries", description: "Raw, unfiltered ACV with the mother — supports digestion and immunity.", imageUrl: buildPlaceholderImage("Vinegar", "#78350f", "#fef3c7") },
  { id: "groc-012", name: "Chia Seeds 300g", price: 349, rating: 4.8, reviewCount: 154, stock: 95, discount: 18, category: "Groceries", description: "Omega-3 rich chia seeds — ideal for puddings, smoothies, and baking.", imageUrl: buildPlaceholderImage("Chia Seeds", "#365314", "#bbf7d0") },

  // ── Beauty ──
  { id: "beau-001", name: "Velvet Matte Lipstick", price: 699, rating: 4.7, reviewCount: 185, stock: 90, category: "Beauty", description: "Long-wearing velvet matte lipstick with vitamin E conditioning formula.", imageUrl: buildPlaceholderImage("Lipstick", "#be123c", "#fecdd3") },
  { id: "beau-002", name: "HD Foundation SPF 30", price: 1499, rating: 4.6, reviewCount: 123, stock: 50, category: "Beauty", description: "Full-coverage liquid foundation with built-in SPF30 and 24-hour wear.", imageUrl: buildPlaceholderImage("Foundation", "#f9a8d4", "#fdf2f8") },
  { id: "beau-003", name: "Vitamin C Glow Serum", price: 1299, rating: 4.9, reviewCount: 241, stock: 40, category: "Beauty", description: "15% stabilised Vitamin C serum that visibly brightens skin in 2 weeks.", imageUrl: buildPlaceholderImage("Serum", "#f59e0b", "#fef3c7") },
  { id: "beau-004", name: "Rose Water Toner 200ml", price: 449, rating: 4.5, reviewCount: 98, stock: 75, category: "Beauty", description: "Alcohol-free pure rose water toner that hydrates and tightens pores.", imageUrl: buildPlaceholderImage("Toner", "#fb7185", "#fff1f2") },
  { id: "beau-005", name: "Volumising Mascara", price: 799, rating: 4.7, reviewCount: 156, stock: 60, category: "Beauty", description: "Buildable volumising mascara with a curved brush for defined lashes.", imageUrl: buildPlaceholderImage("Mascara", "#1e293b", "#94a3b8") },
  { id: "beau-006", name: "Niacinamide Moisturiser", price: 999, rating: 4.8, reviewCount: 204, stock: 35, category: "Beauty", description: "Lightweight gel moisturiser with 10% niacinamide for even skin tone.", imageUrl: buildPlaceholderImage("Moisturiser", "#d946ef", "#f5d0fe") },
  { id: "beau-007", name: "Eyebrow Pomade", price: 549, rating: 4.6, reviewCount: 137, stock: 70, discount: 10, category: "Beauty", description: "Waterproof eyebrow pomade for defined, sculpted brows lasting 24 hours.", imageUrl: buildPlaceholderImage("Eyebrow", "#78350f", "#fef3c7") },
  { id: "beau-008", name: "Highlighter Palette", price: 1199, rating: 4.8, reviewCount: 172, stock: 45, discount: 20, category: "Beauty", description: "Six-shade pressed highlighter palette with champagne, gold, and rose tones.", imageUrl: buildPlaceholderImage("Highlighter", "#f59e0b", "#fef9c3") },
  { id: "beau-009", name: "Micellar Water 400ml", price: 399, rating: 4.5, reviewCount: 109, stock: 80, discount: 5, category: "Beauty", description: "Gentle micellar cleansing water that removes makeup and impurities in one step.", imageUrl: buildPlaceholderImage("Micellar", "#f472b6", "#fce7f3") },
  { id: "beau-010", name: "Lip Gloss Set of 6", price: 849, rating: 4.7, reviewCount: 193, stock: 55, discount: 15, category: "Beauty", description: "High-shine lip gloss collection in 6 wearable shades with hydrating vitamin E.", imageUrl: buildPlaceholderImage("Lip Gloss", "#e11d48", "#ffe4e6") },
  { id: "beau-011", name: "Translucent Setting Powder", price: 699, rating: 4.6, reviewCount: 148, stock: 65, discount: 12, category: "Beauty", description: "Finely milled translucent powder that sets makeup and controls shine all day.", imageUrl: buildPlaceholderImage("Powder", "#fde68a", "#fffbeb") },
  { id: "beau-012", name: "Kohl Kajal Eyeliner", price: 299, rating: 4.9, reviewCount: 316, stock: 100, discount: 8, category: "Beauty", description: "Intense black kohl kajal with a smudge stick for effortless smoky eye looks.", imageUrl: buildPlaceholderImage("Kajal", "#0f172a", "#e2e8f0") },

  // ── Wellness ──
  { id: "well-001", name: "Multivitamin Daily Pack", price: 899, rating: 4.7, reviewCount: 329, stock: 100, category: "Wellness", description: "Complete daily multivitamin with 23 essential vitamins and minerals.", imageUrl: buildPlaceholderImage("Vitamins", "#16a34a", "#bbf7d0") },
  { id: "well-002", name: "Whey Protein Chocolate 1kg", price: 2499, rating: 4.8, reviewCount: 412, stock: 55, category: "Wellness", description: "Premium whey isolate with 25g protein per serving and zero sugar.", imageUrl: buildPlaceholderImage("Protein", "#92400e", "#fde68a") },
  { id: "well-003", name: "Non-Slip Yoga Mat 6mm", price: 1499, rating: 4.6, reviewCount: 187, stock: 30, category: "Wellness", description: "Eco-friendly TPE yoga mat with alignment lines and carrying strap.", imageUrl: buildPlaceholderImage("Yoga Mat", "#0d9488", "#99f6e4") },
  { id: "well-004", name: "Lavender Essential Oil", price: 699, rating: 4.9, reviewCount: 271, stock: 65, category: "Wellness", description: "100% pure therapeutic-grade lavender oil for aromatherapy and sleep.", imageUrl: buildPlaceholderImage("Lavender", "#7c3aed", "#ddd6fe") },
  { id: "well-005", name: "Hydration Water Bottle 1L", price: 849, rating: 4.5, reviewCount: 143, stock: 85, category: "Wellness", description: "BPA-free insulated bottle that keeps drinks cold 24h, hot 12h.", imageUrl: buildPlaceholderImage("Bottle", "#0369a1", "#bae6fd") },
  { id: "well-006", name: "Collagen Face Mask Pack", price: 499, rating: 4.7, reviewCount: 198, stock: 120, category: "Wellness", description: "Hydrating collagen sheet masks with hyaluronic acid for plump skin.", imageUrl: buildPlaceholderImage("Face Mask", "#db2777", "#fbcfe8") },
  { id: "well-007", name: "Melatonin Sleep Gummies", price: 649, rating: 4.8, reviewCount: 284, stock: 90, discount: 10, category: "Wellness", description: "Natural 5mg melatonin gummies with chamomile and L-theanine for deep sleep.", imageUrl: buildPlaceholderImage("Gummies", "#6d28d9", "#ede9fe") },
  { id: "well-008", name: "Resistance Bands Set", price: 899, rating: 4.6, reviewCount: 211, stock: 75, discount: 15, category: "Wellness", description: "Set of 5 latex resistance bands from extra-light to extra-heavy for home workouts.", imageUrl: buildPlaceholderImage("Bands", "#0f766e", "#99f6e4") },
  { id: "well-009", name: "Foam Roller Deep Tissue", price: 1199, rating: 4.7, reviewCount: 163, stock: 40, discount: 20, category: "Wellness", description: "High-density EVA foam roller for myofascial release and post-workout recovery.", imageUrl: buildPlaceholderImage("Foam Roller", "#0369a1", "#bae6fd") },
  { id: "well-010", name: "Herbal Immunity Tea", price: 449, rating: 4.8, reviewCount: 239, stock: 110, discount: 12, category: "Wellness", description: "Ayurvedic blend of tulsi, ginger, and ashwagandha to boost daily immunity.", imageUrl: buildPlaceholderImage("Herbal Tea", "#15803d", "#bbf7d0") },
  { id: "well-011", name: "Digestive Enzyme Capsules", price: 749, rating: 4.5, reviewCount: 178, stock: 60, discount: 8, category: "Wellness", description: "Broad-spectrum digestive enzyme supplement for improved gut health and bloating relief.", imageUrl: buildPlaceholderImage("Enzymes", "#166534", "#dcfce7") },
  { id: "well-012", name: "Bamboo Toothbrush Pack", price: 349, rating: 4.6, reviewCount: 152, stock: 140, discount: 25, category: "Wellness", description: "Pack of 4 biodegradable bamboo toothbrushes with BPA-free medium-soft bristles.", imageUrl: buildPlaceholderImage("Toothbrush", "#365314", "#d9f99d") },
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
