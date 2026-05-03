"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/store/ui-store";

const shippingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(5),
});

type ShippingData = z.infer<typeof shippingSchema>;

export function CheckoutSteps() {
  const step = useUiStore((state) => state.checkoutStep);
  const setStep = useUiStore((state) => state.setCheckoutStep);

  const [promoOpen, setPromoOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  return (
    <section className="space-y-8 rounded-3xl border border-white/40 bg-white/55 p-6 shadow-glass backdrop-blur-xl">
      <ol className="grid grid-cols-3 gap-4">
        {["Shipping", "Payment", "Review"].map((item, index) => {
          const current = index + 1;
          return (
            <li key={item} className="flex items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border font-ui text-xs ${
                  step >= current
                    ? "border-champagne bg-champagne/30"
                    : "border-champagne/30"
                }`}
              >
                {current}
              </span>
              <span className="font-ui text-xs uppercase tracking-[0.14em] text-rose/80">
                {item}
              </span>
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <form
          className="grid gap-3 md:grid-cols-2"
          onSubmit={form.handleSubmit(() => setStep(2))}
        >
          <Input placeholder="Full name" {...form.register("fullName")} />
          <Input placeholder="Email" type="email" {...form.register("email")} />
          <Input placeholder="Phone" {...form.register("phone")} />
          <Input
            placeholder="Address autocomplete"
            className="md:col-span-2"
            {...form.register("address")}
          />
          <Button className="md:col-span-2" type="submit">
            Continue to Payment
          </Button>
        </form>
      ) : null}

      {step === 2 ? (
        <div className="space-y-3">
          <Input placeholder="Card number" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="MM/YY" />
            <Input placeholder="CVV" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary">PayPal</Button>
            <Button variant="secondary">Apple Pay</Button>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)}>Continue to Review</Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-pearl/70 p-4">
            <p className="font-ui text-xs uppercase tracking-[0.14em] text-rose/70">
              Order Summary
            </p>
            <p className="mt-2 font-body text-2xl text-rose">Total: $1,120</p>
          </div>

          <button
            className="font-ui text-xs uppercase tracking-[0.15em] text-rose"
            onClick={() => setPromoOpen((prev) => !prev)}
          >
            Apply Promo Code
          </button>
          {promoOpen ? <Input placeholder="Enter promo code" /> : null}

          <Button
            loading={loading}
            onClick={async () => {
              setLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1200));
              setLoading(false);
              alert("Order placed successfully.");
            }}
            className="w-full"
          >
            Place Order
          </Button>
        </div>
      ) : null}
    </section>
  );
}
