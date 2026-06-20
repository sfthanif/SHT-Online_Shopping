import { FaApple, FaGooglePlay } from "react-icons/fa";
import { MdPhoneIphone, MdQrCode2 } from "react-icons/md";

const perks = [
  "Exclusive app-only deals every day",
  "Real-time order tracking",
  "One-tap checkout",
  "Early access to sales",
];

const AppDownloadBanner = () => (
  <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1625] via-[#231b38] to-[#2d1b4e] relative">
    {/* Decorative glows */}
    <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-pink-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
    <div className="pointer-events-none absolute top-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-2xl" />

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10 sm:px-10 lg:px-14">

      {/* Phone icon block */}
      <div className="hidden lg:flex shrink-0 h-36 w-36 items-center justify-center rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm">
        <MdPhoneIphone className="text-8xl text-white/90" />
      </div>

      {/* Text block */}
      <div className="flex-1 text-center md:text-left">
        <span className="inline-block rounded-full bg-pink-500/20 border border-pink-400/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-pink-300">
          Mobile App
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white leading-tight">
          Shop Smarter,<br className="hidden sm:block" /> Shop on the Go
        </h2>
        <p className="mt-2 max-w-sm text-sm text-slate-300 leading-relaxed">
          Get exclusive app-only deals, track orders in real-time, and enjoy a seamless shopping experience — anywhere, anytime.
        </p>

        {/* Perks */}
        <ul className="mt-4 space-y-1.5">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-slate-300 justify-center md:justify-start">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-pink-400 text-[10px] font-black">✓</span>
              {perk}
            </li>
          ))}
        </ul>

        {/* Store badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start">
          <button
            type="button"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-100 shadow-lg shadow-black/20"
          >
            <FaApple size={22} />
            <div className="text-left">
              <div className="text-[10px] font-medium leading-none text-slate-500">Download on the</div>
              <div className="text-sm font-black leading-tight">App Store</div>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-100 shadow-lg shadow-black/20"
          >
            <FaGooglePlay size={20} className="text-green-500" />
            <div className="text-left">
              <div className="text-[10px] font-medium leading-none text-slate-500">Get it on</div>
              <div className="text-sm font-black leading-tight">Google Play</div>
            </div>
          </button>
        </div>
      </div>

      {/* QR code block */}
      <div className="shrink-0 flex flex-col items-center gap-2">
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl">
          <MdQrCode2 className="h-full w-full text-slate-800" />
        </div>
        <p className="text-xs text-slate-400 text-center">Scan to download</p>
        <p className="text-[10px] text-slate-500 text-center">iOS &amp; Android</p>
      </div>
    </div>
  </section>
);

export default AppDownloadBanner;
