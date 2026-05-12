"use client";

import { MouseEvent } from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/contexts/WishlistContext";

type WishlistButtonProps = {
  productId: string;
};

const WishlistButton = ({ productId }: WishlistButtonProps) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(productId);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition hover:-translate-y-0.5 ${
        active
          ? "border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-200"
          : "border-white/60 bg-white/80 text-pink-500 shadow-md"
      }`}
    >
      <FaHeart className={active ? "text-white" : "text-pink-500"} />
    </button>
  );
};

export default WishlistButton;
