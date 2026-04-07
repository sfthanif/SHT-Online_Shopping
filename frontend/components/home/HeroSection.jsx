export default function HeroSection() {
  return (
    <section className="site-hero">
      <div className="container">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold">
              Premium Fashion. Local Prices.
            </h1>
            <p className="mb-6 text-gray-700">
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
              <a href="#" className="px-5 py-3 border rounded-lg">
                Explore
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
              Hero Image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
