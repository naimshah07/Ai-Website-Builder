import { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../lib/prisma.js";

export const stripeWebhook = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"] as string,
      endpointSecret
    );
  } catch (err: any) {
    console.error("❌ Stripe webhook signature failed:", err.message);
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata) {
      return res.json({ received: true });
    }

    const { transactionId, appId } = session.metadata as {
      transactionId: string;
      appId: string;
    };

    // App-level guard
    if (appId !== "ai-site-builder") {
      return res.json({ received: true });
    }

    // 🔒 Idempotency guard
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction || transaction.isPaid) {
      return res.json({ received: true });
    }

    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: transactionId },
        data: { isPaid: true },
      }),
      prisma.user.update({
        where: { id: transaction.userId },
        data: { credits: { increment: transaction.credits } },
      }),
    ]);
  }

  res.json({ received: true });
};



