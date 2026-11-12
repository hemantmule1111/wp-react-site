// WorkPilot HR Management: product + membership plans. Pure data, edit here to change the pricing page.
// NOTE: prices and feature lists are a proposal. Confirm them against what the HR app actually supports.
export const HR_APP = {
  name: 'WorkPilot',
  tagline: 'HR management software for growing teams',
  loginUrl: 'https://hr.wpart.co.in/login',
  freeLogins: 5,
};

// Prices are per month in each currency. All paid plans are billed yearly (12 x the monthly price).
export const plans = [
  {
    id: 'free',
    name: 'Free',
    blurb: 'Try WorkPilot with a small team. No card needed.',
    logins: 5,
    price: { INR: 0, USD: 0 },
    cta: 'Start free',
    features: ['Up to 5 email logins', 'Employee records & documents', 'Attendance & leave', 'Org chart & announcements', 'Basic reports', 'Email support'],
  },
  {
    id: 'starter',
    name: 'Starter',
    blurb: 'For small teams getting organised.',
    logins: 10,
    price: { INR: 999, USD: 12 },
    cta: 'Choose Starter',
    features: ['Up to 10 email logins', 'Everything in Free', 'Payroll & payslips', 'Company letters', 'Help desk & policies'],
  },
  {
    id: 'growth',
    name: 'Growth',
    blurb: 'For growing businesses with more people.',
    logins: 25,
    price: { INR: 1999, USD: 24 },
    cta: 'Choose Growth',
    popular: true,
    features: ['Up to 25 email logins', 'Everything in Starter', 'Overtime & compliance files', 'Assets & HR tests', 'Team chat', 'Priority support'],
  },
  {
    id: 'business',
    name: 'Business',
    blurb: 'For larger teams that need the full toolkit.',
    logins: 100,
    price: { INR: 4999, USD: 59 },
    cta: 'Choose Business',
    features: ['Up to 100 email logins', 'Everything in Growth', 'Selfie, QR, geo-fence & biometric attendance', 'Two-step sign-in & audit log', 'Company data download', 'Dedicated onboarding'],
  },
];

export const extraLogin = { INR: 49, USD: 0.6 }; // per extra login per month above the plan limit

export const planFaqs = [
  { q: 'What counts as a login?', a: 'Each person who signs in with their own email address. The Free plan includes up to 5 email logins.' },
  { q: 'What happens after 5 logins on the Free plan?', a: 'Upgrade to Starter (up to 10 logins) or a bigger plan (25 or 100 logins). Existing data stays as it is.' },
  { q: 'Can I add more logins than my plan allows?', a: 'Yes, extra logins can be added per month, or you can move to the next plan.' },
  { q: 'Can I switch or cancel any time?', a: 'Yes. Upgrade, downgrade or cancel whenever you like. Paid plans are billed yearly.' },
];
