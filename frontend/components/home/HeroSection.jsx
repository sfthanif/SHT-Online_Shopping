export default function HeroSection() {
  return (
    <section className="site-hero">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Premium Fashion. Local Prices.
            </h1>
            <p className="text-gray-700 mb-6">
              Discover curated collections for men, women and children. Fast
              shipping across Bangladesh.
            </p>
            <div className="flex gap-3">
              <a
                href="/shop"
                className="bg-[var(--primary)] text-white px-5 py-3 rounded-lg"
              >
                Shop Now
              </a>
              <a href="#" className="border px-5 py-3 rounded-lg">
                Explore
              </a>
            </div>
          </div>
          <div>
            <div className="bg-white h-64 rounded-lg shadow-md flex items-center justify-center">
              Hero Image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
