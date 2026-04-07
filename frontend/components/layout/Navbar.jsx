import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
          SHT
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/shop"
            className="text-gray-700 hover:text-[var(--primary)]"
          >
            Shop
          </Link>
          <Link
            href="/categories/men"
            className="text-gray-700 hover:text-[var(--primary)]"
          >
            Men
          </Link>
          <Link
            href="/categories/women"
            className="text-gray-700 hover:text-[var(--primary)]"
          >
            Women
          </Link>
          <Link
            href="/cart"
            className="text-gray-700 hover:text-[var(--primary)]"
          >
            Cart
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <input
            className="hidden md:block border rounded-lg px-3 py-2"
            placeholder="Search products..."
          />
          <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
