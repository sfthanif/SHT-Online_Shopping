"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  const toggleWish = useWishlistStore((state) => state.toggle);
  const wished = useWishlistStore((state) => state.ids.includes(product.id));
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card className="group overflow-hidden p-0 hover:-translate-y-1 hover:shadow-luxury">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          aria-label="Add to wishlist"
          onClick={() => toggleWish(product.id)}
          className="absolute right-3 top-3 rounded-full bg-white/70 p-2 backdrop-blur"
        >
          <Heart
            className={`h-4 w-4 ${wished ? "fill-rose text-rose" : "text-rose/70"}`}
          />
        </button>

        <div className="absolute bottom-3 left-3 right-3 translate-y-6 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            className="w-full"
            onClick={() =>
              addItem({
                productId: product.id,
                name: product.name,
                slug: product.slug,
                image: product.image,
                color: product.colors[0],
                size: product.sizes[0],
                price: product.price,
              })
            }
          >
            Quick Add to Cart
          </Button>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-body text-2xl text-rose hover:underline"
          >
            {product.name}
          </Link>
          {product.isNew ? <Badge>New</Badge> : null}
        </div>

        <div className="flex items-center gap-2 font-ui text-xs uppercase tracking-[0.14em] text-rose/80">
          <span>{formatCurrency(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-rose/45 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-1 text-champagne">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < Math.round(product.rating) ? "fill-champagne" : ""}`}
            />
          ))}
          <span className="ml-2 font-ui text-[10px] uppercase tracking-[0.12em] text-rose/70">
            {product.reviewCount} reviews
          </span>
        </div>
      </div>
    </Card>
  );
}
