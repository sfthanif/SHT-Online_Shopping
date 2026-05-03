"use client";

import Link from "next/link";
import { Facebook, Minus, Plus, Share2, Twitter } from "lucide-react";
import { useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";

import { ProductGallery } from "@/components/product/product-gallery";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = useMemo(
    () => products.find((item) => item.slug === params.slug),
    [params.slug],
  );

  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors[0] ?? "Blush");
  const [size, setSize] = useState(product?.sizes[0] ?? "One Size");

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.open);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav className="ui-label">Home / Products / {product.name}</nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <ProductGallery product={product} />

        <section className="space-y-5 rounded-3xl border border-white/45 bg-white/55 p-6 shadow-glass">
          <h1 className="font-heading text-5xl text-rose">{product.name}</h1>
          <div className="flex items-center gap-3">
            <p className="font-ui text-sm uppercase tracking-[0.16em] text-rose">
              {formatCurrency(product.price)}
            </p>
            <Badge>or 4 interest-free payments</Badge>
          </div>

          <div>
            <p className="ui-label">Color</p>
            <div className="mt-2 flex gap-2">
              {product.colors.map((item) => (
                <button
                  key={item}
                  onClick={() => setColor(item)}
                  className={`rounded-full border px-3 py-1 font-ui text-xs uppercase ${
                    color === item
                      ? "border-champagne bg-champagne/25"
                      : "border-champagne/35"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="ui-label">Size</p>
            <select
              className="mt-2 h-12 w-full rounded-2xl border border-champagne/40 bg-white/65 px-4 font-ui text-xs uppercase"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              {product.sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <p className="font-body text-2xl text-rose/85">
            {product.description}
          </p>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-champagne/40 bg-white/70">
              <button
                className="p-3"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4 text-rose" />
              </button>
              <span className="px-3 font-ui text-xs uppercase">{qty}</span>
              <button
                className="p-3"
                onClick={() => setQty((value) => value + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4 text-rose" />
              </button>
            </div>

            <Button
              className="flex-1"
              onClick={() => {
                addItem({
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  image: product.image,
                  color,
                  size,
                  price: product.price,
                  quantity: qty,
                });
                openCart();
              }}
            >
              Add to Cart
            </Button>
            <Button variant="secondary">Buy Now</Button>
          </div>

          <Button variant="secondary">360° View</Button>

          <Accordion
            items={[
              { title: "Description", content: product.longDescription },
              {
                title: "Shipping & Returns",
                content:
                  "Free shipping over $200 and 30-day returns on all orders.",
              },
              {
                title: "Care Guide",
                content: `${product.care} Dimensions: ${product.dimensions}.`,
              },
            ]}
          />

          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-rose" />
            <button
              aria-label="Share on Pinterest"
              className="rounded-full border border-champagne/40 px-3 py-1 font-ui text-xs uppercase"
            >
              Pinterest
            </button>
            <button
              aria-label="Share on Facebook"
              className="rounded-full border border-champagne/40 p-2"
            >
              <Facebook className="h-4 w-4 text-rose" />
            </button>
            <button
              aria-label="Share on Twitter"
              className="rounded-full border border-champagne/40 p-2"
            >
              <Twitter className="h-4 w-4 text-rose" />
            </button>
          </div>
        </section>
      </div>

      <section className="mt-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-4xl text-rose">Recently Viewed</h2>
          <Link href="/products" className="ui-label">
            See all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {products.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="rounded-2xl border border-white/45 bg-white/55 p-3"
            >
              <p className="font-body text-2xl text-rose">{item.name}</p>
              <p className="ui-label">{formatCurrency(item.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
