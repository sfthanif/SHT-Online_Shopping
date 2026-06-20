import { FaTruck, FaGift, FaHeadset } from "react-icons/fa";
import { MdReplay, MdLock } from "react-icons/md";

const features = [
  {
    Icon: FaTruck,
    title: "Free Shipping",
    subtitle: "For all Orders Over ৳2000",
  },
  {
    Icon: MdReplay,
    title: "30 Days Returns",
    subtitle: "For an Exchange Product",
  },
  {
    Icon: MdLock,
    title: "Secured Payment",
    subtitle: "Payment Cards Accepted",
  },
  {
    Icon: FaGift,
    title: "Special Gifts",
    subtitle: "On Your First Order",
  },
  {
    Icon: FaHeadset,
    title: "Support 24/7",
    subtitle: "Contact Us Anytime",
  },
];

const FeatureStrip = () => (
  <section className="bg-pink-50/60 py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {features.map(({ Icon, title, subtitle }) => (
        <div key={title} className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-pink-200 bg-pink-50 text-pink-500 transition hover:bg-pink-500 hover:text-white hover:border-pink-500 group cursor-default">
            <Icon size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{title}</p>
            <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureStrip;
