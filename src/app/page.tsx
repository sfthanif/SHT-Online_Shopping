import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Truck, Undo2 } from "lucide-react";

import { brand } from "@/lib/constants";
import { products, testimonials } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

import { Carousel } from "@/components/ui/carousel";

export default function Home() {
  const arrivals = products.slice(0, 8);
  const bestsellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 6);

  return (
    <main className="pb-12">
      <section className="relative min-h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-woman-walking-in-style-1176/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 to-rose/35" />

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 lg:px-8">
          <div className="max-w-3xl text-cream">
            <p className="ui-label !text-cream/80">
              Luxury Handcrafted Collection
            </p>
            <h1 className="mt-4 font-heading text-5xl leading-tight md:text-7xl">
              {brand.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-2xl text-cream/90">
              ROSEQUI luxury handbags blend heritage craftsmanship with modern
              feminine silhouettes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-gold-gradient bg-[length:220%_100%] px-7 py-3 font-ui text-xs uppercase tracking-[0.2em] text-charcoal hover:animate-shimmer"
              >
                Shop Collection
              </Link>
              <Link
                href="/products?category=Limited%20Edition"
                className="rounded-full border border-cream/70 px-7 py-3 font-ui text-xs uppercase tracking-[0.2em] text-cream"
              >
                Limited Edition
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 lg:px-8">
        <h2 className="section-title">New Arrivals</h2>
        <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
          {arrivals.map((item) => (
            <article
              key={item.id}
              className="group glass min-w-[290px] snap-start rounded-3xl p-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <button
                  className="absolute right-3 top-3 rounded-full bg-white/70 p-2"
                  aria-label="Add to wishlist"
                >
                  ♡
                </button>
                <button className="absolute bottom-3 left-3 rounded-full bg-white/80 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.14em] text-rose">
                  Quick View
                </button>
              </div>
              <p className="mt-3 font-body text-2xl text-rose">{item.name}</p>
              <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose/75">
                {formatCurrency(item.price)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 lg:px-8">
        <h2 className="section-title">Bestsellers</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bestsellers.map((item) => (
            <article
              key={item.id}
              className="group rounded-3xl border border-white/45 bg-white/55 p-4 shadow-glass"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mt-3 font-body text-2xl text-rose">{item.name}</p>
              <div className="flex items-center gap-2 font-ui text-xs uppercase tracking-[0.14em] text-rose/80">
                <span>{formatCurrency(item.price)}</span>
                {item.originalPrice ? (
                  <span className="line-through opacity-50">
                    {formatCurrency(item.originalPrice)}
                  </span>
                ) : null}
                <span>★★★★★</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          { title: "Totes", query: "Totes" },
          { title: "Clutches", query: "Clutches" },
          { title: "Crossbody", query: "Crossbody" },
          { title: "Satchels", query: "Satchels" },
        ].map((category, index) => (
          <Link
            key={category.title}
            href={`/products?category=${category.query}`}
            className="group relative h-72 overflow-hidden rounded-3xl"
          >
            <Image
              src={products[index]?.image ?? products[0].image}
              alt={category.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            <span className="absolute bottom-4 left-4 font-heading text-3xl text-cream">
              {category.title}
            </span>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-2 lg:px-8">
        <div className="relative h-[420px] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1500&q=80"
            alt="Craftsmanship"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="ui-label">Craftsmanship Story</p>
          <h2 className="section-title mt-3">
            Italian leather, hand-stitched precision.
          </h2>
          <p className="mt-4 font-body text-2xl text-rose/85">{brand.story}</p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-4 lg:px-8">
        <h2 className="section-title">Testimonials</h2>
        <div className="mt-6 rounded-3xl border border-white/45 bg-white/55 p-6 shadow-glass">
          <Carousel>
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 md:grid-cols-[80px_1fr] md:items-center"
              >
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-body text-3xl text-rose">“{item.quote}”</p>
                  <p className="mt-2 font-ui text-xs uppercase tracking-[0.15em] text-rose/75">
                    {item.name} · ★★★★★ ·{" "}
                    {item.verified ? "Verified Purchase" : "Customer"}
                  </p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 lg:px-8">
        <h2 className="section-title">Instagram Shop</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {products.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 grid place-items-end bg-charcoal/45 p-3 opacity-0 transition group-hover:opacity-100">
                <p className="w-full rounded-xl bg-white/80 p-2 text-center font-ui text-[10px] uppercase tracking-[0.13em] text-rose">
                  {item.name} · {formatCurrency(item.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl rounded-3xl bg-blush/85 px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Join the Circle</h2>
          <p className="mt-3 font-body text-2xl text-rose/80">
            Exclusive previews, private drops, and atelier stories in your
            inbox.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              className="h-12 flex-1 rounded-full border border-champagne bg-white/70 px-5 font-ui text-xs uppercase tracking-[0.14em] text-rose outline-none"
              placeholder="Your email"
            />
            <button className="h-12 rounded-full bg-gold-gradient px-6 font-ui text-xs uppercase tracking-[0.14em] text-charcoal">
              Join the Circle
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          { icon: Truck, label: "Free Shipping" },
          { icon: Undo2, label: "30-Day Returns" },
          { icon: ShieldCheck, label: "Secure Checkout" },
          { icon: Sparkles, label: "5-Year Warranty" },
        ].map((badge) => (
          <article
            key={badge.label}
            className="rounded-2xl border border-white/45 bg-white/60 p-4 text-center shadow-glass"
          >
            <badge.icon className="mx-auto h-6 w-6 text-champagne" />
            <p className="mt-2 font-ui text-xs uppercase tracking-[0.15em] text-rose">
              {badge.label}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
