"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/contexts/CatalogContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

const WishlistPage = () => {
  const { products } = useCatalog();
  const { wishlistIds } = useWishlist();
  const { isLoggedIn } = useAuth();

  const savedItems = products.filter((product) =>
    wishlistIds.includes(product.id),
  );

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="premium-card w-full rounded-[1.75rem] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Wishlist
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Log in to save handbags to your wishlist
          </h1>
          <p className="mt-3 text-slate-600">
            Wishlist items persist in localStorage for each browser profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="premium-card rounded-[1.75rem] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          Wishlist
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Your saved favorites
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Manage your favorite handbags and move them to cart whenever you are
          ready.
        </p>
      </div>

      {savedItems.length === 0 ? (
        <div className="premium-card rounded-[1.75rem] p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">
            No saved items yet
          </p>
          <p className="mt-2 text-slate-500">
            Tap the heart icon on any handbag to build your wishlist.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            Browse handbags
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {savedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
