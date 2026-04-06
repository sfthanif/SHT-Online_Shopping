import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <a className="text-2xl font-bold text-[var(--primary)]">SHT</a>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/shop">
            <a className="text-gray-700 hover:text-[var(--primary)]">Shop</a>
          </Link>
          <Link href="/categories/men">
            <a className="text-gray-700 hover:text-[var(--primary)]">Men</a>
          </Link>
          <Link href="/categories/women">
            <a className="text-gray-700 hover:text-[var(--primary)]">Women</a>
          </Link>
          <Link href="/cart">
            <a className="text-gray-700 hover:text-[var(--primary)]">Cart</a>
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
