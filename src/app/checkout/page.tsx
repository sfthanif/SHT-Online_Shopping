import { CheckoutSteps } from "@/components/checkout/checkout-steps";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <h1 className="section-title">Checkout</h1>
      <p className="mt-3 font-body text-2xl text-rose/80">
        Shipping → Payment → Review
      </p>
      <div className="mt-8">
        <CheckoutSteps />
      </div>
    </main>
  );
}
