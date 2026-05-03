import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Mail, PinIcon } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Sustainability"],
  },
  {
    title: "Customer Service",
    links: ["Contact", "FAQs", "Shipping", "Returns"],
  },
  {
    title: "Your Account",
    links: ["Orders", "Wishlist", "Loyalty Program"],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-champagne/30 bg-pearl/70">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <h3 className="font-heading text-3xl tracking-[0.2em] text-rose">
              ROSEQUI
            </h3>
            <p className="mt-4 max-w-xs font-body text-xl text-rose/85">
              Handcrafted luxury handbags designed to last beyond trends.
            </p>
          </section>

          {columns.map((column) => (
            <section key={column.title}>
              <h4 className="font-ui text-xs uppercase tracking-[0.2em] text-rose">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-body text-xl text-rose/80 hover:text-rose"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h4 className="font-ui text-xs uppercase tracking-[0.2em] text-rose">
              Connect
            </h4>
            <div className="mt-4 flex gap-3">
              <Instagram className="h-5 w-5 text-rose" />
              <PinIcon className="h-5 w-5 text-rose" />
              <Facebook className="h-5 w-5 text-rose" />
              <Mail className="h-5 w-5 text-rose" />
            </div>
            <p className="mt-6 font-ui text-xs uppercase tracking-[0.13em] text-rose/70">
              Payments: Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-champagne/35 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-ui text-xs uppercase tracking-[0.15em] text-rose/70">
            © 2026 ROSEQUI. Privacy Policy · Terms of Service · Accessibility
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.15em] text-rose"
          >
            Back to Top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
