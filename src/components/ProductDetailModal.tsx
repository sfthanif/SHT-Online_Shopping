"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaShoppingCart, FaTimes, FaTag, FaBoxOpen } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useProductDetail } from "@/contexts/ProductDetailContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { currency } from "@/lib/products";

const ProductDetailModal = () => {
  const { product, close } = useProductDetail();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // reset qty when product changes
  useEffect(() => { setQty(1); setAdded(false); }, [product]);

  // close on Escape
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, close]);

  if (!product) return null;

  const wishlisted   = isWishlisted(product.id);
  const roundedStars = Math.round(product.rating);
  const inStock      = product.stock > 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow transition hover:bg-pink-50 hover:text-pink-600"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Image */}
        <div className="relative shrink-0 bg-linear-to-br from-pink-50 to-rose-100 md:w-[280px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={560}
            height={560}
            className="h-56 w-full object-cover md:h-full"
          />
        </div>

        {/* Details — scrollable on small screens */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          {/* Category badge */}
          {product.category && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
              <FaTag className="text-[10px]" />
              {product.category}
            </span>
          )}

          {/* Name */}
          <h2 className="text-xl font-bold text-slate-900 leading-snug">
            {product.name}
          </h2>

          {/* Stars + review count */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < roundedStars ? "text-amber-400" : "text-amber-200"}
                  size={14}
                />
              ))}
            </div>
            <span className="text-sm text-slate-500">
              {product.rating.toFixed(1)} &nbsp;·&nbsp; {product.reviewCount ?? 0} reviews
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-600">
            {product.description ?? "Premium finish with polished details."}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1 text-2xl font-bold text-pink-600">
            <span className="font-black" style={{ fontWeight: 900 }}>৳</span>
            <span>
              {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
                product.price
              )}
            </span>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-1.5 text-sm">
            <FaBoxOpen className={inStock ? "text-emerald-500" : "text-red-400"} />
            <span className={inStock ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
              {inStock ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {/* Quantity selector */}
          {inStock && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">Qty</span>
              <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-pink-50 hover:text-pink-600 text-lg font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-800">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-pink-50 hover:text-pink-600 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600 disabled:opacity-40"
            >
              <FaShoppingCart />
              {added ? "Added to cart!" : "Add to Cart"}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold transition ${
                wishlisted
                  ? "border-pink-300 bg-pink-50 text-pink-600 hover:bg-pink-100"
                  : "border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-600"
              }`}
            >
              <FiHeart />
              {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
