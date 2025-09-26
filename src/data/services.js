// Canonical service data used by all pages
export const CATEGORIES = {
  individuals: {
    title: 'Services for Individuals and Sole Prop.',
    items: [
      'Income Tax Return Filing',
      'Project Report',
      'Digital Signature Certificates',
      'MSME / Udyam Registration',
      'GST Registration',
      'Bookkeeping and Payroll Management',
      'Preparation of Financial Statements',
      'Income Tax and GST Compliance',
      'Bank Loan Advisory and Financial Modelling',
    ],
  },
  companies: {
    title: 'Services for Companies',
    items: [
      'Incorporation of Private Companies, OPCs (India)',
      'Incorporation of LLPs (India)',
      'Company formation in UAE (Mainland, Offshore)',
      'Company registration in UK (Companies House)',
      'Company registration in USA (LLC, C-Corp, S-Corp)',
      'GST Registration',
      'ROC filings, annual returns',
      'FEMA, ODI, ECB compliances (India)',
      'Statutory, internal, and tax audits (India)',
      'VAT return filing (UAE, UK)',
      'IRS compliance & federal/state tax filing (USA)',
      'Bookkeeping and Payroll Management',
      'Income Tax and GST Compliance',
      'Virtual CFO Services',
    ],
  },
  partnerships: {
    title: 'Services for Partnerships',
    items: [
      'Income Tax Return Filing',
      'Project Report',
      'Digital Signature Certificates',
      'MSME / Udyam Registration',
      'GST Registration',
      'Bookkeeping and Payroll Management',
      'Preparation of Financial Statements',
      'Income Tax and GST Compliance',
      'Virtual CFO Services',
      'Bank Loan Advisory and Financial Modelling',
    ],
  },
  nonprofits: {
    title: 'Services for NGOs, Trusts and Non-Profits',
    items: [
      'Trust, Society & Section 8 Company registration',
      '12A & 80G registration for tax exemptions',
      'FCRA registration & compliance for donations',
      'Non-profit registration in USA - 501(c)(3)',
      'Non-profit licensing in UAE',
      'Audit of NGOs and donor compliance audits',
      'Bookkeeping and Payroll Management',
      'Preparation of Financial Statements',
      'CSR advisory for companies funding NGOs',
    ],
  },
};

// Short but elaborative copy for each service (add/adjust anytime)
export const SERVICE_DETAILS = {
  'income-tax-return-filing':
    'We prepare and file accurate Income Tax Returns, optimise deductions, and ensure timely compliance to avoid notices and penalties. Suitable for individuals, proprietors, firms and companies.',
  'project-report':
    'Bank-ready project reports with financial projections, DSCR analysis, and viability commentary to support funding, subsidies, and statutory submissions.',
  'digital-signature-certificates':
    'Issue Class-3 DSCs for individuals, directors, and organisations with eKYC. Includes token provisioning and renewal reminders.',
  'msme-udyam-registration':
    'End-to-end Udyam registration enabling priority sector benefits, cheaper credit, and government procurement advantages.',
  'gst-registration':
    'We assess eligibility and complete new GST registrations, amendments, and voluntary registrations with correct HSN/SAC mapping.',
  'bookkeeping-and-payroll-management':
    'Monthly bookkeeping on leading tools, reconciliations, payroll processing, payslips, and statutory filings to keep your books investor-ready.',
  'preparation-of-financial-statements':
    'Ind-AS/IGAAP compliant financial statements with schedules, notes, and management decks for lenders, investors, and audits.',
  'income-tax-and-gst-compliance':
    'Complete calendar management—TDS, advance tax, GSTR-1/3B/9, AIS/26AS tracking—with alerts and representation support.',
  'bank-loan-advisory-and-financial-modelling':
    'Credit profiling, CMA data, ratio analysis, and financial models (base/optimistic/pessimistic) tailored for term loan/CC proposals.',
  'incorporation-of-private-companies-opcs-india':
    'Name approval, MoA/AoA drafting, PAN/TAN, bank account set-up, and first-year ROC/GST onboarding for Pvt Ltd and OPCs in India.',
  'incorporation-of-llps-india':
    'LLP deed drafting, partner onboarding, DPIN, and post-incorporation compliances including LLP Agreement stamping and filings.',
  'company-formation-in-uae-mainland-offshore':
    'UAE mainland & free-zone incorporation, sponsor/lease advisory, and VAT/Corporate Tax onboarding with compliant substance.',
  'company-registration-in-uk-companies-house':
    'Rapid UK Ltd incorporation with Companies House, PSC register, address services, and VAT/PAYE registrations.',
  'company-registration-in-usa-llc-c-corp-s-corp':
    'US entity set-up in popular states, EIN, registered agent, and sales tax/Federal filings with ongoing compliance calendar.',
  'roc-filings-annual-returns':
    'Annual returns, XBRL, event-based ROC filings (DIR-12, PAS-3, SH-7) with secretarial records and registers maintained.',
  'fema-odi-ecb-compliances-india':
    'Advisory and filings for ODI/FDI, ECB, and LRS transactions—reporting on FIRMS/SMF and compliance documentation.',
  'statutory-internal-and-tax-audits-india':
    'Risk-focused statutory, internal and tax audits with systems testing, control matrices and pragmatic corrective recommendations.',
  'vat-return-filing-uae-uk':
    'UAE/UK VAT registrations, periodic returns, reconciliations, and penalty mitigation with evidence trails.',
  'irs-compliance-federal-state-tax-filing-usa':
    'US Federal & State returns, 1120/1065/1040, sales/use tax, 1099s, and reasonable compensation advisory.',
  'virtual-cfo-services':
    'Board-level finance partner: MIS, budgets vs actuals, KPIs, fundraising readiness, and investor dialogues.',
  'trust-society-section-8-company-registration':
    'Formation and registration of Trusts/Societies/Section 8 Companies with bylaws, governance framework, and bank/KYC onboarding.',
  '12a-80g-registration-for-tax-exemptions':
    'Eligibility assessment and documentation for 12A & 80G approvals to unlock donor tax benefits and NPO credibility.',
  'fcra-registration-compliance-for-donations':
    'FCRA registration/renewals, utilisation accounts, returns, and governance to receive/track foreign contributions safely.',
  'non-profit-registration-in-usa-501c3':
    'US 501(c)(3) formation, IRS recognition, state registrations, and donor acknowledgment compliance.',
  'non-profit-licensing-in-uae':
    'NPO licensing in UAE with compliance on fundraising approvals, reporting, and banking.',
  'audit-of-ngos-and-donor-compliance-audits':
    'Financial/donor audits with utilisation tracking, program vs admin ratios, and grant reporting.',
  'csr-advisory-for-companies-funding-ngos':
    'Policy drafting, partner due diligence, impact frameworks, and Schedule VII alignment for corporate CSR programs.',
};

// slug helper
export const slugify = (s) =>
  s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
