import { NextResponse } from "next/server";
import { z } from "zod";

import { getStripeClient } from "@/lib/stripe";

const checkoutSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(["usd", "eur", "gbp"]).default("usd"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid checkout payload" },
      { status: 400 },
    );
  }

  const stripe = getStripeClient();

  if (!stripe) {
    return NextResponse.json({ clientSecret: "stripe-disabled" });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(parsed.data.amount * 100),
    currency: parsed.data.currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
