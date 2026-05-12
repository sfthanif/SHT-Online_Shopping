"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
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

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-pink-100 bg-white/85 shadow-[0_16px_50px_rgba(190,24,93,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(190,24,93,0.18)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={1000}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-4 top-4">
          <WishlistButton productId={product.id} />
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {product.category}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Limited premium finish with polished details.
              </p>
            </div>
            <span className="rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-pink-600">
              {currency.format(product.price)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={
                  index < roundedStars ? "text-amber-400" : "text-amber-200"
                }
              />
            ))}
            <span className="ml-2 text-sm font-medium text-slate-500">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-pink-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
