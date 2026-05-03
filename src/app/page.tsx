"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Truck,
  Undo2,
  ChevronRight,
} from "lucide-react";

import { brand } from "@/lib/constants";
import { products, testimonials } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const bestsellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);
  const arrivals = products.slice(0, 4);

  return (
    <main className="pb-20">
      {/* Top Promotional Banner */}
      <div className="w-full border-b border-black/10 bg-black px-4 py-2 text-center lg:px-8">
        <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-white">
          🎁 Friends & Family Sale · Extra 30% OFF with Code FRIENDS30 · Free
          Shipping Over $200
        </p>
      </div>

      {/* Hero Section with Split Layout */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
          {/* Main Hero */}
          <div className="relative h-96 overflow-hidden rounded-2xl lg:h-auto lg:min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
              alt="Featured Collection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
              <p className="font-ui text-[11px] uppercase tracking-[0.2em]">
                Limited Availability
              </p>
              <h2 className="mt-2 font-heading text-4xl">
                Signature Collection
              </h2>
              <Link
                href="/products"
                className="mt-4 inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.14em] hover:gap-3 transition"
              >
                Shop Now <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Secondary Hero Grid */}
          <div className="grid gap-4">
            <div className="relative h-36 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?auto=format&fit=crop&w=600&q=80"
                alt="New Arrivals"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/70 flex items-end p-4">
                <div className="text-cream">
                  <p className="font-ui text-[10px] uppercase tracking-[0.18em] opacity-80">
                    This Week
                  </p>
                  <p className="font-heading text-2xl">New Arrivals</p>
                </div>
              </div>
            </div>
            <div className="relative h-36 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80"
                alt="Sale"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/70 flex items-end p-4">
                <div className="text-cream">
                  <p className="font-ui text-[10px] uppercase tracking-[0.18em] text-gold">
                    Up to 40% OFF
                  </p>
                  <p className="font-heading text-2xl">Spring Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-8">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Totes", query: "Totes" },
            { title: "Clutches", query: "Clutches" },
            { title: "Crossbody", query: "Crossbody" },
            { title: "Satchels", query: "Satchels" },
          ].map((category, index) => (
            <Link
              key={category.title}
              href={`/products?category=${category.query}`}
              className="group relative h-56 overflow-hidden rounded-2xl"
            >
              <Image
                src={products[index]?.image ?? products[0].image}
                alt={category.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-4">
                <div>
                  <p className="font-heading text-3xl text-cream">
                    {category.title}
                  </p>
                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-gold mt-1">
                    Shop Now
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Best Sellers This Season</h2>
          <Link
            href="/products"
            className="flex items-center gap-2 font-ui text-xs uppercase tracking-[0.15em] text-gold hover:gap-3 transition"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((item) => (
            <Link key={item.id} href={`/products/${item.slug}`}>
              <article className="group rounded-2xl overflow-hidden border border-black/10 hover:shadow-lg transition">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <button
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 hover:bg-white transition"
                    aria-label="Add to wishlist"
                  >
                    ♡
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-body text-lg text-charcoal font-semibold">
                    {item.name}
                  </p>
                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="font-ui text-[10px] text-rose/60 mt-2">
                    ★★★★★ (124 Reviews)
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto mt-12 max-w-7xl px-4 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Newest Collection</h2>
          <Link
            href="/products?sort=newest"
            className="flex items-center gap-2 font-ui text-xs uppercase tracking-[0.15em] text-gold hover:gap-3 transition"
          >
            Shop New <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {arrivals.map((item) => (
            <Link key={item.id} href={`/products/${item.slug}`}>
              <article className="group rounded-2xl overflow-hidden border border-black/10 hover:shadow-lg transition">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-gold/90 rounded-full px-3 py-1">
                    <p className="font-ui text-[10px] uppercase tracking-[0.14em] text-charcoal font-semibold">
                      New
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-body text-lg text-charcoal font-semibold">
                    {item.name}
                  </p>
                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose mt-1">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="mx-auto mt-16 max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 gap-8 items-center bg-white/60 border border-black/10">
          <div className="relative h-96 lg:h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
              alt="Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 lg:p-10">
            <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-gold">
              Our Story
            </p>
            <h2 className="mt-4 font-heading text-4xl text-charcoal">
              Handcrafted with Heritage
            </h2>
            <p className="mt-4 font-body text-xl text-rose/85 leading-relaxed">
              Each ROSEQUI handbag is meticulously crafted by artisans who bring
              decades of expertise to every stitch. We blend Italian
              craftsmanship traditions with contemporary design aesthetics.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-rose px-6 py-3 font-ui text-xs uppercase tracking-[0.15em] text-white hover:bg-rose/90 transition"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto mt-16 max-w-7xl px-4 lg:px-8">
        <h2 className="section-title">Loved by Customers</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm"
            >
              <p className="font-ui text-sm text-gold">★★★★★</p>
              <p className="mt-3 font-body text-lg text-charcoal">
                "{item.quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-charcoal font-semibold">
                    {item.name}
                  </p>
                  {item.verified && (
                    <p className="font-ui text-[10px] text-rose">
                      ✓ Verified Purchase
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mx-auto mt-16 max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-rose/20 to-blush/20 border border-rose/30 p-10 lg:p-16 text-center">
          <h2 className="font-heading text-4xl text-charcoal">
            Get Exclusive Access
          </h2>
          <p className="mt-3 font-body text-xl text-rose/80 max-w-2xl mx-auto">
            Be first to know about new collections, special sales, and exclusive
            VIP events.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 rounded-full border border-rose/40 bg-white/90 px-6 font-ui text-xs uppercase tracking-[0.14em] placeholder:text-rose/50 outline-none focus:border-rose focus:ring-2 focus:ring-rose/20"
              required
            />
            <button
              type="submit"
              className="h-12 px-8 rounded-full bg-rose text-white font-ui text-xs uppercase tracking-[0.15em] hover:bg-rose/90 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 font-ui text-[10px] text-rose/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto mt-16 max-w-7xl px-4 lg:px-8 mb-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "On orders over $200 worldwide",
            },
            {
              icon: Undo2,
              title: "Easy Returns",
              desc: "30-day money-back guarantee",
            },
            {
              icon: ShieldCheck,
              title: "Secure Checkout",
              desc: "100% protected transactions",
            },
            {
              icon: Sparkles,
              title: "Lifetime Support",
              desc: "Expert customer service",
            },
          ].map((badge) => (
            <article
              key={badge.title}
              className="rounded-2xl border border-black/10 bg-white/60 p-6 text-center hover:shadow-lg transition"
            >
              <badge.icon className="mx-auto h-8 w-8 text-gold" />
              <p className="mt-3 font-ui text-xs uppercase tracking-[0.15em] text-charcoal font-semibold">
                {badge.title}
              </p>
              <p className="mt-2 font-body text-sm text-rose/70">
                {badge.desc}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
