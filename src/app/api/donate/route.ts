import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { charities } from '../../../lib/db';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function POST(req: NextRequest) {
  try {
    const { amountCents, causeName, donorEmail } = await req.json();

    // Find a charity mapped to this cause
    const charity = [...charities.values()].find(c => c.causes.includes(causeName));
    if (!charity?.stripeAccountId || charity.status !== 'active') {
      return NextResponse.json({ error: 'Charity not ready yet' }, { status: 400 });
    }
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://microimpact-backend.vercel.app';
console.log('baseUrl =', baseUrl);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'nzd',
      line_items: [{
        price_data: {
          currency: 'nzd',
          unit_amount: amountCents,
          product_data: { name: `${causeName} Donation` },
        },
        quantity: 1,
      }],
      customer_email: donorEmail,
      success_url: `${baseUrl}/impact?ok=1`,
cancel_url: `${baseUrl}/donate?canceled=1`,

      payment_intent_data: {
        // 💸 Route funds directly to the charity's (test) account
        transfer_data: { destination: charity.stripeAccountId },
        metadata: { causeName, charityId: charity.id }
      },
      metadata: { causeName, charityId: charity.id }
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
