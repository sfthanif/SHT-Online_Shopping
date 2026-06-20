"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCreditCard,
} from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";

const products = [
  "Prices Drop",
  "New Products",
  "Best Sales",
  "Contact Us",
  "Sitemap",
  "Stores",
];

const ourCompany = [
  "Delivery",
  "Legal Notice",
  "Terms & Conditions of Use",
  "About Us",
  "Secure Payment",
  "Login",
];

const socials = [
  { Icon: FaFacebookF, label: "Facebook"  },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaYoutube,   label: "YouTube"   },
  { Icon: FaTiktok,    label: "TikTok"    },
];

const Footer = () => {
  const [email, setEmail]           = useState("");
  const [agreed, setAgreed]         = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && agreed) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="border-t border-pink-100 bg-white/80 text-slate-600">

      {/* ── Main grid: 5 columns ── */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 py-14 grid gap-8 items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_1fr_1.4fr]">

        {/* 1 — Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5">
            <Image src="/SHT_logo.png" alt="SHT Dream logo" width={44} height={44} className="rounded-full" />
            <span
              className="text-xl font-black tracking-tight"
              style={{ background: "linear-gradient(135deg, #ec4899, #000000)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              SHT_DREAM
            </span>
          </div>

          <p className="text-xs leading-6 text-slate-500">
            Your trusted online shopping destination. We offer quality products, secure payments,
            and fast delivery across the country.
          </p>

          <div className="flex flex-wrap gap-2">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pink-100 text-pink-500 transition hover:border-pink-400 hover:bg-pink-500 hover:text-white"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* 2 — Contact Us */}
        <div className="space-y-4">
          <p className="text-base font-bold text-slate-800">Contact Us</p>
          <div className="space-y-1 text-sm text-slate-500 leading-7">
            <p>SHT_Dream — Mega Super Store</p>
            <p>507-Union Trade Centre</p>
            <p>Dhaka, Bangladesh</p>
          </div>
          <p className="text-sm text-slate-500">support@shtdream.com</p>
          <p className="text-base font-bold text-pink-500">+880 1900 123456</p>
          <a href="#" className="flex items-center gap-3 group mt-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-pink-200 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition">
              <FiMessageSquare size={18} />
            </div>
            <div className="text-sm leading-tight">
              <p className="font-bold text-slate-800 group-hover:text-pink-500 transition">Online Chat</p>
              <p className="text-slate-500">Get Expert Help</p>
            </div>
          </a>
        </div>

        {/* 3 — Products */}
        <div className="space-y-4">
          <p className="text-base font-bold text-slate-800">Products</p>
          <ul className="space-y-3 text-sm">
            {products.map((item) => (
              <li key={item}>
                <a href="#" className="transition hover:text-pink-500">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* 4 — Our Company */}
        <div className="space-y-4">
          <p className="text-base font-bold text-slate-800">Our Company</p>
          <ul className="space-y-3 text-sm">
            {ourCompany.map((item) => (
              <li key={item}>
                <a href="#" className="transition hover:text-pink-500">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* 5 — Newsletter */}
        <div className="space-y-4">
          <p className="text-base font-bold text-slate-800">Subscribe To Newsletter</p>
          <p className="text-sm text-slate-500 leading-6">
            Subscribe to our latest newsletter to get news about special discounts.
          </p>

          {subscribed ? (
            <p className="rounded-lg border border-pink-300 bg-pink-50 px-4 py-3 text-sm text-pink-600">
              You&apos;re subscribed! Thanks for joining.
            </p>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500 transition"
              />
              <button
                type="submit"
                disabled={!agreed}
                className="w-full rounded-lg bg-pink-500 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign Me Up
              </button>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-pink-500"
                />
                <span className="text-xs text-slate-500 leading-5">
                  I agree to the terms and conditions and the privacy policy
                </span>
              </label>
            </form>
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-pink-100 px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SHT_Dream. All rights reserved.</p>

        {/* Payment icons */}
        <div className="flex items-center gap-2.5">
          <FaCreditCard   size={34} title="Card" className="text-slate-400" />
          <FaCcVisa       size={34} title="Visa" style={{ color: "#1a1f71" }} />
          <FaCcMastercard size={34} title="Mastercard" style={{ color: "#eb001b" }} />
          <FaCcPaypal     size={34} title="PayPal" style={{ color: "#003087" }} />
        </div>

        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-pink-500 transition">Privacy Policy</a>
          <a href="#" className="hover:text-pink-500 transition">Terms of Use</a>
          <a href="#" className="hover:text-pink-500 transition">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
