import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");

  if (
    !signature ||
    !process.env.STRIPE_WEBHOOK_SECRET ||
    !process.env.STRIPE_SECRET_KEY
  ) {
    return NextResponse.json({ received: true });
  }

  const stripe = getStripeClient();

  if (!stripe) {
    return NextResponse.json({ received: true });
  }

  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "payment_intent.succeeded") {
      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
