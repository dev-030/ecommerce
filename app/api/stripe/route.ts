import type { NextRequest } from "next/server";
import Stripe from "stripe";
import prisma from "@/libs/prismaClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
	const sig = req.headers.get("stripe-signature");
	const payload = await req.text();

	if (!sig) {
		return Response.json(
			{ error: "Missing stripe-signature header" },
			{ status: 400 },
		);
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			payload,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET as string,
		);
	} catch (error) {
		return Response.json({ error: `Webhook Error: ${error}` }, { status: 400 });
	}

	switch (event.type) {
		case "charge.succeeded":
			if (typeof event.data.object.payment_intent === "string") {
				await prisma?.order.update({
					where: { paymentIntentId: event.data.object.payment_intent },
					data: {
						status: "complete",
						address: event.data.object.shipping?.address as object,
					},
				});
			}
			break;
		default:
			console.log(`Unhandled event type-->${event.type}`);
	}

	return Response.json({ received: true });
}
