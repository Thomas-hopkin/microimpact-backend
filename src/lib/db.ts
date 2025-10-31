export type Charity = {
  id: string;               // slug e.g. "trees-for-good"
  name: string;
  stripeAccountId?: string; // "acct_1SOEPfPNFETiLpxp" (test) goes here
  causes: string[];         // e.g. ["Environment"]
  status: 'active' | 'onboarding' | 'active';
};

// In-memory store for MVP
export const charities = new Map<string, Charity>();

// 👇 Edit these 2 lines after you copy your acct_... id from Stripe
charities.set('trees-for-good', {
  id: 'trees-for-good',
  name: 'Trees for Good (TEST)',
  stripeAccountId: "acct_1SOEPfPNFETiLpxp", // <-- put acct_... here in step 3
  causes: ['Environment'],
  status: 'active'               // <-- change to 'active' in step 3
});
