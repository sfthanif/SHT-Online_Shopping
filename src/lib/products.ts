import { Order, Product } from "@/lib/types";

const u = (id: string, w = 400, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

export const products: Product[] = [
  // ── Bags (top-level picks) ──
  {
    id: "rose-luxe-tote",
    name: "Rose Luxe Tote",
    price: 129,
    rating: 4.9,
    imageUrl: u("1598532163257-ae3c6b2524b6"),
    stock: 12,
    category: "Bags",
    description: "A roomy everyday tote with a polished silhouette and signature gold-tone details.",
    reviewCount: 62,
  },
  {
    id: "belle-clutch",
    name: "Belle Clutch",
    price: 89,
    rating: 4.7,
    imageUrl: u("1566150905458-1bf1fc113f0d"),
    stock: 4,
    category: "Bags",
    description: "An evening-ready clutch with a refined finish and statement clasp.",
    reviewCount: 34,
  },
  {
    id: "serene-shoulder",
    name: "Serene Shoulder Bag",
    price: 149,
    rating: 4.8,
    imageUrl: u("1584917865442-de89df76afd3"),
    stock: 9,
    category: "Bags",
    description: "Soft structure, elegant drape, and a luxe strap that sits beautifully on the shoulder.",
    reviewCount: 48,
  },
  {
    id: "petal-sling",
    name: "Petal Sling",
    price: 99,
    rating: 4.6,
    imageUrl: u("1548036328-c9fa89d128fa"),
    stock: 7,
    category: "Bags",
    description: "A light, hands-free sling bag designed for stylish city movement.",
    reviewCount: 19,
  },
  {
    id: "aura-bucket",
    name: "Aura Bucket Bag",
    price: 139,
    rating: 4.9,
    imageUrl: u("1553062407-98eeb64c6a62"),
    stock: 3,
    category: "Bags",
    description: "A sculpted bucket bag with soft edges and premium drawstring closure.",
    reviewCount: 27,
  },
  {
    id: "velvet-hobo",
    name: "Velvet Hobo",
    price: 159,
    rating: 4.8,
    imageUrl: u("1490481651871-ab68de25d43d"),
    stock: 6,
    category: "Bags",
    description: "A relaxed hobo silhouette with elevated hardware and all-day comfort.",
    reviewCount: 41,
  },

  // ── Fashion ──
  { id: "fashion-001", name: "Silk Floral Saree",        price: 2499, rating: 4.8, reviewCount: 118, stock: 20,  category: "Fashion",     description: "Lightweight silk saree with hand-printed floral motifs and a contrast blouse piece.",           imageUrl: u("1610030469983-98e550d6193c") },
  { id: "fashion-002", name: "Cotton Anarkali Kurti",    price: 999,  rating: 4.6, reviewCount: 87,  stock: 35,  category: "Fashion",     description: "Breathable cotton anarkali with delicate embroidery at the neckline.",                         imageUrl: u("1595777457583-95e059d581b8") },
  { id: "fashion-003", name: "Slim Fit Denim Jeans",     price: 1599, rating: 4.5, reviewCount: 74,  stock: 50,  category: "Fashion",     description: "Stretch-denim slim fit jeans with a classic five-pocket construction.",                        imageUrl: u("1542272604-787c3835535d") },
  { id: "fashion-004", name: "Flared Midi Dress",        price: 1299, rating: 4.7, reviewCount: 96,  stock: 18,  category: "Fashion",     description: "Flowy midi dress with a flared hem and smocked waistband.",                                   imageUrl: u("1515372039744-b8f02a3ae446") },
  { id: "fashion-005", name: "Linen Casual Shirt",       price: 849,  rating: 4.4, reviewCount: 52,  stock: 40,  category: "Fashion",     description: "Breathable linen shirt with a relaxed fit perfect for warm days.",                            imageUrl: u("1596755094514-f87e34085b2c") },
  { id: "fashion-006", name: "Embroidered Jacket",       price: 3499, rating: 4.9, reviewCount: 143, stock: 8,   category: "Fashion",     description: "Hand-embroidered statement jacket with satin lining and gold detailing.",                     imageUrl: u("1551488831-00ddcb6c6bd3") },
  { id: "fashion-007", name: "Printed Palazzo Set",      price: 1199, rating: 4.6, reviewCount: 109, stock: 25,  discount: 15, category: "Fashion",     description: "Vibrant printed palazzo pants with a matching crop top and dupatta.",                          imageUrl: u("1583744946564-b52ac1c389c8") },
  { id: "fashion-008", name: "Velvet Party Gown",        price: 4299, rating: 4.8, reviewCount: 131, stock: 10,  discount: 10, category: "Fashion",     description: "Floor-length velvet gown with a sweetheart neckline and back zipper.",                       imageUrl: u("1566174053879-31528523f8ae") },
  { id: "fashion-009", name: "Crop Top Co-ord Set",      price: 1099, rating: 4.5, reviewCount: 83,  stock: 30,  discount: 20, category: "Fashion",     description: "Trendy matching crop top and high-waist skirt set in premium jersey fabric.",                imageUrl: u("1529111290557-82f6d5c6cf85") },
  { id: "fashion-010", name: "Wide Leg Trousers",        price: 1399, rating: 4.4, reviewCount: 61,  stock: 45,  discount: 12, category: "Fashion",     description: "Relaxed wide-leg trousers in breathable crepe fabric with an elasticated waist.",            imageUrl: u("1512436991641-6745cae08e78") },
  { id: "fashion-011", name: "Off-Shoulder Blouse",      price: 799,  rating: 4.6, reviewCount: 77,  stock: 38,  discount: 18, category: "Fashion",     description: "Elegant off-shoulder blouse with ruffle detailing and a concealed back zip.",                imageUrl: u("1604762512526-b7f71cb38bd0") },
  { id: "fashion-012", name: "Kimono Wrap Jacket",       price: 2199, rating: 4.7, reviewCount: 104, stock: 15,  discount: 8,  category: "Fashion",     description: "Lightweight kimono-style wrap jacket with floral embroidery and wide sleeves.",              imageUrl: u("1564557287817-3785e38ec1f5") },

  // ── Electronics ──
  { id: "elec-001", name: "Wireless Earbuds Pro",        price: 3999, rating: 4.7, reviewCount: 201, stock: 60,  category: "Electronics", description: "True wireless earbuds with active noise cancellation and 30-hour battery life.",               imageUrl: u("1590658268037-6bf12165a8df") },
  { id: "elec-002", name: "Smart Watch Series X",        price: 8999, rating: 4.8, reviewCount: 176, stock: 25,  category: "Electronics", description: "Fitness tracking smartwatch with AMOLED display and 5-day battery.",                          imageUrl: u("1523275335684-37898b6baf30") },
  { id: "elec-003", name: "Portable Bluetooth Speaker",  price: 2499, rating: 4.6, reviewCount: 134, stock: 45,  category: "Electronics", description: "360° surround sound speaker with IPX7 waterproofing and 12-hour playtime.",                   imageUrl: u("1608043152269-423dbba4e7e1") },
  { id: "elec-004", name: "Fast Charge Power Bank",      price: 1799, rating: 4.5, reviewCount: 89,  stock: 70,  category: "Electronics", description: "20000 mAh slim power bank with 65W fast charging for laptops and phones.",                   imageUrl: u("1585771724684-38269d6639fd") },
  { id: "elec-005", name: "USB-C Hub 7-in-1",           price: 1299, rating: 4.4, reviewCount: 63,  stock: 30,  category: "Electronics", description: "Multiport USB-C hub with 4K HDMI, SD card reader, and 100W passthrough.",                    imageUrl: u("1625296276703-3fbc924f07ee") },
  { id: "elec-006", name: "Mechanical Keyboard RGB",     price: 4599, rating: 4.9, reviewCount: 228, stock: 15,  category: "Electronics", description: "Compact TKL mechanical keyboard with per-key RGB and hot-swappable switches.",               imageUrl: u("1587829741301-dc798b83add3") },
  { id: "elec-007", name: "Gaming Mouse RGB",            price: 2199, rating: 4.7, reviewCount: 159, stock: 40,  discount: 10, category: "Electronics", description: "Lightweight optical gaming mouse with 16000 DPI sensor and 7 programmable buttons.",         imageUrl: u("1527814050087-3793815479db") },
  { id: "elec-008", name: "Wireless Charging Pad 15W",  price: 999,  rating: 4.5, reviewCount: 112, stock: 55,  discount: 15, category: "Electronics", description: "Ultra-thin 15W Qi wireless charging pad compatible with all Qi-enabled devices.",          imageUrl: u("1570891836654-d4e4cecc588e") },
  { id: "elec-009", name: "Over-Ear Headphones",         price: 5499, rating: 4.8, reviewCount: 194, stock: 20,  discount: 12, category: "Electronics", description: "Premium over-ear headphones with 40mm drivers and 35-hour battery life.",                  imageUrl: u("1505740420928-5e560c06d30e") },
  { id: "elec-010", name: "4K Webcam",                   price: 3299, rating: 4.6, reviewCount: 88,  stock: 18,  discount: 8,  category: "Electronics", description: "4K ultra HD webcam with autofocus, built-in noise-cancelling mic, and privacy cover.",    imageUrl: u("1587202372616-b43abea06c2a") },
  { id: "elec-011", name: "Portable SSD 1TB",            price: 4999, rating: 4.9, reviewCount: 237, stock: 22,  discount: 20, category: "Electronics", description: "USB-C portable SSD with 1050 MB/s read speed and drop-resistant aluminium shell.",        imageUrl: u("1600348712270-5af9e5d4f7e9") },
  { id: "elec-012", name: "Smart LED Strip 5m",          price: 1499, rating: 4.5, reviewCount: 176, stock: 60,  discount: 25, category: "Electronics", description: "App-controlled RGB LED strip with music sync, 16M colours, and voice assistant support.",  imageUrl: u("1558618666-fcd25c85cd64") },

  // ── Bags ──
  { id: "bags-001", name: "Canvas Backpack",             price: 1499, rating: 4.6, reviewCount: 109, stock: 40,  category: "Bags",        description: "Durable canvas backpack with laptop compartment and organizer pockets.",                      imageUrl: u("1553062407-98eeb64c6a62") },
  { id: "bags-002", name: "Leather Laptop Bag",          price: 3299, rating: 4.8, reviewCount: 77,  stock: 12,  category: "Bags",        description: "Full-grain leather laptop bag with padded 15\" sleeve and brass hardware.",                   imageUrl: u("1548036328-c9fa89d128fa") },
  { id: "bags-003", name: "Travel Duffel Bag",           price: 2199, rating: 4.7, reviewCount: 92,  stock: 22,  category: "Bags",        description: "Spacious duffel bag with shoe compartment and a removable shoulder strap.",                   imageUrl: u("1586816001966-79b736744398") },
  { id: "bags-004", name: "Mini Crossbody Bag",          price: 899,  rating: 4.5, reviewCount: 58,  stock: 30,  category: "Bags",        description: "Compact crossbody bag with adjustable strap and zip-around closure.",                        imageUrl: u("1584917865442-de89df76afd3") },
  { id: "bags-005", name: "Gym Sack Bag",                price: 699,  rating: 4.3, reviewCount: 44,  stock: 55,  category: "Bags",        description: "Lightweight drawstring gym sack with water bottle side pocket.",                             imageUrl: u("1553062407-98eeb64c6a62") },
  { id: "bags-006", name: "Belt Bag / Fanny Pack",       price: 849,  rating: 4.5, reviewCount: 96,  stock: 48,  discount: 10, category: "Bags",        description: "Hands-free belt bag with dual zip compartments and an adjustable waist strap.",             imageUrl: u("1566150905458-1bf1fc113f0d") },
  { id: "bags-007", name: "Oversized Tote Shopper",      price: 1299, rating: 4.6, reviewCount: 115, stock: 35,  discount: 15, category: "Bags",        description: "Large canvas tote with interior zip pocket and reinforced handles for everyday use.",       imageUrl: u("1598532163257-ae3c6b2524b6") },
  { id: "bags-008", name: "Anti-Theft Backpack",         price: 2499, rating: 4.8, reviewCount: 143, stock: 20,  discount: 18, category: "Bags",        description: "Hidden-zip anti-theft backpack with USB charging port and RFID-blocking pocket.",          imageUrl: u("1553062407-98eeb64c6a62") },
  { id: "bags-009", name: "Clutch Evening Bag",          price: 1099, rating: 4.7, reviewCount: 67,  stock: 25,  discount: 12, category: "Bags",        description: "Embellished satin clutch with detachable chain strap and magnetic closure.",              imageUrl: u("1566150905458-1bf1fc113f0d") },
  { id: "bags-010", name: "Rolling Trolley Bag",         price: 3999, rating: 4.9, reviewCount: 188, stock: 14,  discount: 8,  category: "Bags",        description: "Hardshell spinner trolley bag with TSA lock and expandable 65L capacity.",               imageUrl: u("1565026057447-bc90a3dceb87") },

  // ── Footwear ──
  { id: "foot-001", name: "Running Sneakers Ultra",      price: 3299, rating: 4.8, reviewCount: 195, stock: 28,  category: "Footwear",    description: "Lightweight running sneakers with responsive foam sole and breathable mesh upper.",          imageUrl: u("1542291026-7eec264c27ff") },
  { id: "foot-002", name: "Block Heel Sandals",          price: 1799, rating: 4.6, reviewCount: 82,  stock: 20,  category: "Footwear",    description: "Elegant block-heel sandals with adjustable ankle strap and cushioned footbed.",              imageUrl: u("1543163521-1bf539c55dd2") },
  { id: "foot-003", name: "Chelsea Boots",               price: 4499, rating: 4.9, reviewCount: 137, stock: 10,  category: "Footwear",    description: "Classic leather Chelsea boots with elastic gusset and stacked heel.",                       imageUrl: u("1608256246200-53e635b5b65f") },
  { id: "foot-004", name: "Slip-On Loafers",             price: 2199, rating: 4.7, reviewCount: 68,  stock: 32,  category: "Footwear",    description: "Premium suede loafers with memory foam insole for all-day comfort.",                        imageUrl: u("1614252369475-531eba835eb1") },
  { id: "foot-005", name: "Flat Ballet Shoes",           price: 1299, rating: 4.5, reviewCount: 53,  stock: 40,  category: "Footwear",    description: "Soft genuine leather ballet flats with a non-slip rubber sole.",                           imageUrl: u("1535043934128-cf0b28d52f95") },
  { id: "foot-006", name: "Sports Flip Flops",           price: 599,  rating: 4.3, reviewCount: 39,  stock: 80,  category: "Footwear",    description: "Lightweight EVA flip flops with arch support for beach and casual wear.",                  imageUrl: u("1562183241-840b8f4d4acf") },
  { id: "foot-007", name: "High Ankle Sneakers",         price: 2799, rating: 4.7, reviewCount: 121, stock: 22,  discount: 10, category: "Footwear",    description: "High-top canvas sneakers with padded ankle collar and rubber lug sole.",                   imageUrl: u("1542291026-7eec264c27ff") },
  { id: "foot-008", name: "Platform Heels",              price: 2399, rating: 4.6, reviewCount: 94,  stock: 18,  discount: 15, category: "Footwear",    description: "Chunky platform heels with a faux-leather upper and buckle ankle strap.",               imageUrl: u("1543163521-1bf539c55dd2") },
  { id: "foot-009", name: "Espadrille Wedges",           price: 1699, rating: 4.5, reviewCount: 76,  stock: 30,  discount: 20, category: "Footwear",    description: "Rope-soled espadrille wedges with canvas upper and ankle tie fastening.",               imageUrl: u("1535043934128-cf0b28d52f95") },
  { id: "foot-010", name: "Formal Oxford Shoes",         price: 3499, rating: 4.8, reviewCount: 108, stock: 16,  discount: 12, category: "Footwear",    description: "Polished full-grain leather Oxford shoes with Goodyear-welted construction.",           imageUrl: u("1614252369475-531eba835eb1") },
  { id: "foot-011", name: "Waterproof Rain Boots",       price: 2099, rating: 4.6, reviewCount: 85,  stock: 35,  discount: 8,  category: "Footwear",    description: "Fully waterproof rubber rain boots with fleece lining and anti-slip sole.",             imageUrl: u("1608256246200-53e635b5b65f") },
  { id: "foot-012", name: "Mule Sliders",                price: 999,  rating: 4.4, reviewCount: 62,  stock: 50,  discount: 25, category: "Footwear",    description: "Open-toe mule sliders with a padded footbed and wide-fit design.",                      imageUrl: u("1562183241-840b8f4d4acf") },

  // ── Groceries ──
  { id: "groc-001", name: "Premium Basmati Rice 5kg",   price: 699,  rating: 4.7, reviewCount: 312, stock: 100, category: "Groceries",   description: "Aged extra-long grain basmati rice with a signature floral aroma.",                          imageUrl: u("1536304447766-da0ed4ce1b73") },
  { id: "groc-002", name: "Cold Pressed Mustard Oil",   price: 349,  rating: 4.6, reviewCount: 174, stock: 80,  category: "Groceries",   description: "100% pure cold-pressed mustard oil with no additives or preservatives.",                      imageUrl: u("1474979266404-7eaacbcd87c5") },
  { id: "groc-003", name: "Darjeeling First Flush Tea", price: 599,  rating: 4.9, reviewCount: 218, stock: 60,  category: "Groceries",   description: "Premium single-origin Darjeeling tea with a delicate muscatel flavour.",                      imageUrl: u("1544787219-7f47ccb76574") },
  { id: "groc-004", name: "Mixed Spice Gift Box",       price: 899,  rating: 4.8, reviewCount: 96,  stock: 45,  category: "Groceries",   description: "Curated set of 8 hand-ground whole spices from certified organic farms.",                     imageUrl: u("1506368249639-73a05d6f6488") },
  { id: "groc-005", name: "Organic Whole Wheat Flour",  price: 249,  rating: 4.5, reviewCount: 143, stock: 120, category: "Groceries",   description: "Stone-ground whole wheat flour from organic farms, rich in fibre.",                          imageUrl: u("1571748982800-fa51082c2224") },
  { id: "groc-006", name: "Forest Honey 500g",          price: 449,  rating: 4.9, reviewCount: 267, stock: 70,  category: "Groceries",   description: "Raw unfiltered forest honey with natural enzymes and antioxidants intact.",                   imageUrl: u("1558642452-9d2a7deb7f62") },
  { id: "groc-007", name: "Organic Rolled Oats 1kg",   price: 299,  rating: 4.6, reviewCount: 189, stock: 150, discount: 10, category: "Groceries",   description: "Gluten-free certified organic rolled oats — perfect for porridge or baking.",                imageUrl: u("1614961233913-a5113a4a34ed") },
  { id: "groc-008", name: "Premium Mixed Nuts 400g",   price: 699,  rating: 4.8, reviewCount: 231, stock: 85,  discount: 15, category: "Groceries",   description: "Dry-roasted mix of cashews, almonds, pistachios, and walnuts with no added salt.",           imageUrl: u("1576673442511-7e39b6545c87") },
  { id: "groc-009", name: "Dark Chocolate 70% 200g",   price: 349,  rating: 4.7, reviewCount: 162, stock: 90,  discount: 5,  category: "Groceries",   description: "Single-origin 70% dark chocolate bar with a rich cocoa flavour and smooth finish.",          imageUrl: u("1511381939415-e44015466834") },
  { id: "groc-010", name: "Quinoa 500g",                price: 399,  rating: 4.5, reviewCount: 117, stock: 75,  discount: 12, category: "Groceries",   description: "Organic white quinoa — a complete protein grain, ready in 15 minutes.",                      imageUrl: u("1514997173992-fd6da49f4a78") },
  { id: "groc-011", name: "Apple Cider Vinegar 500ml", price: 279,  rating: 4.6, reviewCount: 208, stock: 110, discount: 8,  category: "Groceries",   description: "Raw, unfiltered ACV with the mother — supports digestion and immunity.",                     imageUrl: u("1474979266404-7eaacbcd87c5") },
  { id: "groc-012", name: "Chia Seeds 300g",            price: 349,  rating: 4.8, reviewCount: 154, stock: 95,  discount: 18, category: "Groceries",   description: "Omega-3 rich chia seeds — ideal for puddings, smoothies, and baking.",                      imageUrl: u("1514997173992-fd6da49f4a78") },

  // ── Beauty ──
  { id: "beau-001", name: "Velvet Matte Lipstick",      price: 699,  rating: 4.7, reviewCount: 185, stock: 90,  category: "Beauty",      description: "Long-wearing velvet matte lipstick with vitamin E conditioning formula.",                    imageUrl: u("1586495777744-4e6232bf0001") },
  { id: "beau-002", name: "HD Foundation SPF 30",        price: 1499, rating: 4.6, reviewCount: 123, stock: 50,  category: "Beauty",      description: "Full-coverage liquid foundation with built-in SPF30 and 24-hour wear.",                      imageUrl: u("1512496015851-a90fb38ba796") },
  { id: "beau-003", name: "Vitamin C Glow Serum",        price: 1299, rating: 4.9, reviewCount: 241, stock: 40,  category: "Beauty",      description: "15% stabilised Vitamin C serum that visibly brightens skin in 2 weeks.",                     imageUrl: u("1620916566398-39f1143ab7be") },
  { id: "beau-004", name: "Rose Water Toner 200ml",      price: 449,  rating: 4.5, reviewCount: 98,  stock: 75,  category: "Beauty",      description: "Alcohol-free pure rose water toner that hydrates and tightens pores.",                      imageUrl: u("1571781926291-c477ebfd024b") },
  { id: "beau-005", name: "Volumising Mascara",          price: 799,  rating: 4.7, reviewCount: 156, stock: 60,  category: "Beauty",      description: "Buildable volumising mascara with a curved brush for defined lashes.",                      imageUrl: u("1512496015851-a90fb38ba796") },
  { id: "beau-006", name: "Niacinamide Moisturiser",     price: 999,  rating: 4.8, reviewCount: 204, stock: 35,  category: "Beauty",      description: "Lightweight gel moisturiser with 10% niacinamide for even skin tone.",                      imageUrl: u("1620916566398-39f1143ab7be") },
  { id: "beau-007", name: "Eyebrow Pomade",              price: 549,  rating: 4.6, reviewCount: 137, stock: 70,  discount: 10, category: "Beauty",      description: "Waterproof eyebrow pomade for defined, sculpted brows lasting 24 hours.",                    imageUrl: u("1512496015851-a90fb38ba796") },
  { id: "beau-008", name: "Highlighter Palette",         price: 1199, rating: 4.8, reviewCount: 172, stock: 45,  discount: 20, category: "Beauty",      description: "Six-shade pressed highlighter palette with champagne, gold, and rose tones.",              imageUrl: u("1512496015851-a90fb38ba796") },
  { id: "beau-009", name: "Micellar Water 400ml",        price: 399,  rating: 4.5, reviewCount: 109, stock: 80,  discount: 5,  category: "Beauty",      description: "Gentle micellar cleansing water that removes makeup and impurities in one step.",           imageUrl: u("1571781926291-c477ebfd024b") },
  { id: "beau-010", name: "Lip Gloss Set of 6",          price: 849,  rating: 4.7, reviewCount: 193, stock: 55,  discount: 15, category: "Beauty",      description: "High-shine lip gloss collection in 6 wearable shades with hydrating vitamin E.",           imageUrl: u("1586495777744-4e6232bf0001") },
  { id: "beau-011", name: "Translucent Setting Powder",  price: 699,  rating: 4.6, reviewCount: 148, stock: 65,  discount: 12, category: "Beauty",      description: "Finely milled translucent powder that sets makeup and controls shine all day.",             imageUrl: u("1512496015851-a90fb38ba796") },
  { id: "beau-012", name: "Kohl Kajal Eyeliner",         price: 299,  rating: 4.9, reviewCount: 316, stock: 100, discount: 8,  category: "Beauty",      description: "Intense black kohl kajal with a smudge stick for effortless smoky eye looks.",             imageUrl: u("1512496015851-a90fb38ba796") },

  // ── Wellness ──
  { id: "well-001", name: "Multivitamin Daily Pack",     price: 899,  rating: 4.7, reviewCount: 329, stock: 100, category: "Wellness",    description: "Complete daily multivitamin with 23 essential vitamins and minerals.",                         imageUrl: u("1584308666744-24d5c474f2ae") },
  { id: "well-002", name: "Whey Protein Chocolate 1kg", price: 2499, rating: 4.8, reviewCount: 412, stock: 55,  category: "Wellness",    description: "Premium whey isolate with 25g protein per serving and zero sugar.",                           imageUrl: u("1593095948071-474c5cc2989d") },
  { id: "well-003", name: "Non-Slip Yoga Mat 6mm",      price: 1499, rating: 4.6, reviewCount: 187, stock: 30,  category: "Wellness",    description: "Eco-friendly TPE yoga mat with alignment lines and carrying strap.",                          imageUrl: u("1592432678016-e910b452f9a2") },
  { id: "well-004", name: "Lavender Essential Oil",      price: 699,  rating: 4.9, reviewCount: 271, stock: 65,  category: "Wellness",    description: "100% pure therapeutic-grade lavender oil for aromatherapy and sleep.",                        imageUrl: u("1608571423902-eed4a5ad8108") },
  { id: "well-005", name: "Hydration Water Bottle 1L",  price: 849,  rating: 4.5, reviewCount: 143, stock: 85,  category: "Wellness",    description: "BPA-free insulated bottle that keeps drinks cold 24h, hot 12h.",                             imageUrl: u("1523362628745-0c100150b504") },
  { id: "well-006", name: "Collagen Face Mask Pack",     price: 499,  rating: 4.7, reviewCount: 198, stock: 120, category: "Wellness",    description: "Hydrating collagen sheet masks with hyaluronic acid for plump skin.",                         imageUrl: u("1556228578-8c89e6adf883") },
  { id: "well-007", name: "Melatonin Sleep Gummies",     price: 649,  rating: 4.8, reviewCount: 284, stock: 90,  discount: 10, category: "Wellness",    description: "Natural 5mg melatonin gummies with chamomile and L-theanine for deep sleep.",               imageUrl: u("1584308666744-24d5c474f2ae") },
  { id: "well-008", name: "Resistance Bands Set",        price: 899,  rating: 4.6, reviewCount: 211, stock: 75,  discount: 15, category: "Wellness",    description: "Set of 5 latex resistance bands from extra-light to extra-heavy for home workouts.",         imageUrl: u("1598971639058-fab3c3109a17") },
  { id: "well-009", name: "Foam Roller Deep Tissue",     price: 1199, rating: 4.7, reviewCount: 163, stock: 40,  discount: 20, category: "Wellness",    description: "High-density EVA foam roller for myofascial release and post-workout recovery.",             imageUrl: u("1592432678016-e910b452f9a2") },
  { id: "well-010", name: "Herbal Immunity Tea",         price: 449,  rating: 4.8, reviewCount: 239, stock: 110, discount: 12, category: "Wellness",    description: "Ayurvedic blend of tulsi, ginger, and ashwagandha to boost daily immunity.",                imageUrl: u("1544787219-7f47ccb76574") },
  { id: "well-011", name: "Digestive Enzyme Capsules",   price: 749,  rating: 4.5, reviewCount: 178, stock: 60,  discount: 8,  category: "Wellness",    description: "Broad-spectrum digestive enzyme supplement for improved gut health and bloating relief.",     imageUrl: u("1584308666744-24d5c474f2ae") },
  { id: "well-012", name: "Bamboo Toothbrush Pack",      price: 349,  rating: 4.6, reviewCount: 152, stock: 140, discount: 25, category: "Wellness",    description: "Pack of 4 biodegradable bamboo toothbrushes with BPA-free medium-soft bristles.",            imageUrl: u("1607613009820-a29f7bb81c04") },
];

export const mockOrders: Order[] = [
  { id: "ORD-1042", email: "guest@example.com", date: "2026-05-11", status: "Delivered",  total: 218, items: [{ id: "rose-luxe-tote", name: "Rose Luxe Tote",    price: 129, quantity: 1 }, { id: "petal-sling",    name: "Petal Sling",        price: 99,  quantity: 1 }] },
  { id: "ORD-1043", email: "guest@example.com", date: "2026-05-08", status: "Shipped",    total: 288, items: [{ id: "velvet-hobo",   name: "Velvet Hobo",       price: 159, quantity: 1 }, { id: "belle-clutch",   name: "Belle Clutch",       price: 89,  quantity: 1 }] },
  { id: "ORD-1044", email: "guest@example.com", date: "2026-05-04", status: "Processing", total: 278, items: [{ id: "aura-bucket",   name: "Aura Bucket Bag",   price: 139, quantity: 1 }, { id: "serene-shoulder",name: "Serene Shoulder Bag", price: 149, quantity: 1 }] },
  { id: "ORD-1045", email: "guest@example.com", date: "2026-04-29", status: "Delivered",  total: 328, items: [{ id: "rose-luxe-tote", name: "Rose Luxe Tote",   price: 129, quantity: 1 }, { id: "velvet-hobo",    name: "Velvet Hobo",        price: 159, quantity: 1 }] },
];

export const currency = new Intl.NumberFormat("bn-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export const buildPlaceholderImage = (label: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(label)}/400/500`;
