import Link from "next/link";

const departments = [
  { name: "Women's Fashion",  offer: "Up to 60% Off",  gradient: "from-rose-400 to-pink-500",     emoji: "👗", span: "col-span-2 sm:col-span-1" },
  { name: "Men's Fashion",    offer: "New Arrivals",    gradient: "from-slate-600 to-blue-700",    emoji: "👔", span: "" },
  { name: "Kids & Baby",      offer: "Up to 50% Off",  gradient: "from-yellow-400 to-orange-400", emoji: "🧸", span: "" },
  { name: "Home & Kitchen",   offer: "Buy 2 Get 1",    gradient: "from-emerald-500 to-teal-600",  emoji: "🏠", span: "" },
  { name: "Beauty & Skincare",offer: "Flat 35% Off",   gradient: "from-purple-400 to-fuchsia-500",emoji: "💄", span: "" },
  { name: "Shoes",            offer: "From ৳999",      gradient: "from-sky-500 to-blue-600",      emoji: "👠", span: "" },
  { name: "Bags & Handbags",  offer: "Up to 70% Off",  gradient: "from-amber-500 to-orange-500",  emoji: "👜", span: "" },
  { name: "Sale",             offer: "Extra 10% Code", gradient: "from-red-500 to-rose-600",      emoji: "🏷️", span: "col-span-2 sm:col-span-1" },
];

const ShopByCategory = () => (
  <section className="space-y-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Explore</p>
        <h2 className="mt-0.5 text-2xl font-bold text-slate-900">Shop by Department</h2>
      </div>
      <Link
        href="#"
        className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
      >
        See All →
      </Link>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {departments.map(({ name, offer, gradient, emoji, span }) => (
        <Link
          key={name}
          href="#"
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${span} p-5 cursor-pointer transition duration-200 hover:-translate-y-1 hover:shadow-xl group min-h-[110px] flex flex-col justify-between`}
        >
          {/* Decorative blobs */}
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-2 bottom-2 h-10 w-10 rounded-full bg-white/8 pointer-events-none" />

          <div>
            <span className="text-3xl leading-none">{emoji}</span>
            <h3 className="mt-2.5 text-sm sm:text-base font-black text-white leading-tight">{name}</h3>
            <p className="mt-1 text-xs font-semibold text-white/80">{offer}</p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-white/90 group-hover:gap-2 transition-all duration-200">
            Shop Now
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default ShopByCategory;
