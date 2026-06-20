"use client";

import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { Product } from "@/lib/types";
import { currency } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useProductDetail } from "@/contexts/ProductDetailContext";
import WishlistButton from "@/components/WishlistButton";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { open } = useProductDetail();

  const roundedStars = Math.round(product.rating);
  const amount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article
      onClick={() => open(product)}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-pink-100 bg-white/95 shadow-sm transition hover:shadow-md"
    >
      {/* Image — aspect-square so it scales proportionally with card width */}
      <div className="relative aspect-square shrink-0 overflow-hidden bg-linear-to-br from-pink-50 to-rose-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1920px) 10vw, (min-width: 1536px) 12.5vw, (min-width: 1280px) 16.6vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute right-1 top-1">
          <WishlistButton productId={product.id} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title: always 1 line */}
        <h3 className="truncate text-sm font-semibold text-slate-900">
          {product.name}
        </h3>

        {/* Description: always exactly 2 lines */}
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
          {product.description ?? "Premium finish with polished details."}
        </p>

        {/* Spacer pushes bottom section to card bottom */}
        <div className="mt-auto">
          {/* Rating row */}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={index < roundedStars ? "text-amber-400" : "text-amber-200"}
                  size={11}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">
              {product.rating.toFixed(1)} ({product.reviewCount ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className="mt-1.5 flex items-baseline gap-1 text-sm font-semibold text-pink-600">
            <span className="text-base font-black leading-none" style={{ fontWeight: 900 }}>
              ৳
            </span>
            <span>{amount}</span>
          </div>

          {/* Color swatches + add-to-cart */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full border bg-amber-200" />
              <div className="h-4 w-4 rounded-full border bg-rose-200" />
              <div className="h-4 w-4 rounded-full border bg-slate-800" />
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              disabled={product.stock <= 0}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-pink-500 text-white shadow-sm transition hover:bg-pink-600 disabled:opacity-50"
              aria-label="Add to cart"
            >
              <FaShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
