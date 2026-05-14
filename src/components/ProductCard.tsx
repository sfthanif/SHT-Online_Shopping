"use client";

import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { Product } from "@/lib/types";
import { currency } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import WishlistButton from "@/components/WishlistButton";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const roundedStars = Math.round(product.rating);
  const amount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="group relative w-full overflow-hidden rounded-lg border border-pink-100 bg-white/95 shadow-sm transition hover:shadow-md">
      <div className="relative overflow-hidden bg-linear-to-br from-pink-50 to-rose-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute right-1 top-1">
          <WishlistButton productId={product.id} />
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-md font-semibold text-slate-900 leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
          {product.description || "Premium finish with polished details."}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < roundedStars ? "text-amber-400" : "text-amber-200"
                    }
                    size={12}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">
                {product.rating.toFixed(1)} ({product.reviewCount ?? 0})
              </span>
            </div>

            <div className="mt-2 text-sm font-semibold text-pink-600 flex items-baseline gap-1">
              <span
                className="text-base font-black leading-none"
                style={{ fontWeight: 900 }}
              >
                ৳
              </span>
              <span>{amount}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-200 border" />
            <div className="h-3 w-3 rounded-full bg-rose-200 border" />
            <div className="h-3 w-3 rounded-full bg-slate-800 border" />
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-pink-500 text-white shadow-sm hover:bg-pink-600 disabled:opacity-50"
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
