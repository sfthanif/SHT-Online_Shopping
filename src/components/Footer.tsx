import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-pink-100 bg-white/80">
      <div className="grid w-full gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="font-display text-3xl font-bold text-pink-500">
              LuxeBags
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.35em] text-slate-400">
              SHT Premium Handbags
            </p>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600">
            Curated ladies&apos; handbags with a polished pink identity, modern
            utility, and premium finishes for day, work, and evening style.
          </p>
          <div className="flex items-center gap-3 text-pink-500">
            {[FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50"
                >
                  <Icon />
                </a>
              ),
            )}
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Contact</p>
          <div className="space-y-2">
            <p>Email: support@shtluxebags.com</p>
            <p>Phone: +91 90000 12345</p>
            <p>Address: 122 Pink Avenue, Mumbai, India</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Quick Links</p>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard" className="transition hover:text-pink-600">
              Dashboard
            </Link>
            <Link href="/orders" className="transition hover:text-pink-600">
              Orders
            </Link>
            <Link href="/wishlist" className="transition hover:text-pink-600">
              Wishlist
            </Link>
            <Link href="/profile" className="transition hover:text-pink-600">
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-pink-100 px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} SHT LuxeBags. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
