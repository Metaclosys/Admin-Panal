import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const stripeClient = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })
  : null;

const sanitizeMetadata = (metadata = {}) =>
  Object.entries(metadata).reduce((acc, [key, value]) => {
    if (value === undefined || value === null) return acc;
    acc[key] = String(value).slice(0, 500);
    return acc;
  }, {});

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!stripeClient) {
    return NextResponse.json(
      { error: "Stripe secret key is not configured." },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();
    const { lineItems, customer, successUrl, cancelUrl } = payload || {};

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        { error: "At least one line item is required for checkout." },
        { status: 400 }
      );
    }

    const normalizedItems = lineItems.map((item, index) => {
      const amount = Number(item?.amount);
      if (!item?.name || !Number.isFinite(amount) || amount <= 0) {
        throw new Error(
          `Line item ${index + 1} is missing a valid name or amount.`
        );
      }

      return {
        price_data: {
          currency: (item.currency || "usd").toLowerCase(),
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: item.name,
            description: item.description?.slice(0, 499) || undefined,
          },
        },
        quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
      };
    });

    const originHeader = request.headers.get("origin");
    const fallbackOrigin =
      originHeader || appBaseUrl || "http://localhost:3000";

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      customer_email: customer?.email || undefined,
      payment_method_types: ["card"],
      line_items: normalizedItems,
      success_url:
        successUrl ||
        `${fallbackOrigin}/internalDashboard/Booking/staff?checkout=success`,
      cancel_url:
        cancelUrl ||
        `${fallbackOrigin}/internalDashboard/Booking/staff?checkout=cancel`,
      metadata: sanitizeMetadata({
        bookingId: payload.bookingId,
        customerId: customer?.id,
        employeeId: payload.employeeId,
        locationId: payload.locationId,
        membershipChoice: payload.membershipChoice,
        ...payload.metadata,
      }),
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to create Stripe checkout session. Please try again.",
      },
      { status: 500 }
    );
  }
}
