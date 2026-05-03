import { NextResponse } from "next/server";
import { z } from "zod";

const cartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = cartSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid cart payload" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, cart: parsed.data });
}
