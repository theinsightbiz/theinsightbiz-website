// Catalog used by Services (All Work) and ServiceDetail pages.
// Replace cover paths with your actual assets if needed.

export const SERVICE_CATEGORIES = [
  { key: 'individuals', label: 'Individuals & Sole Prop.' },
  { key: 'companies', label: 'Companies' },
  { key: 'partnerships', label: 'Partnerships' },
  { key: 'nonprofits', label: 'NGOs & Non-Profits' },
];

export const SERVICES = [
  // Individuals
  {
    id: 'itr-individual', slug: 'income-tax-return-filing-individuals',
    title: 'Income Tax Return Filing',
    category: 'individuals',
    summary: 'Accurate ITR preparation & e-filing with deductions planned in advance.',
    cover: '/hero/incometaxfiling.jpg',
    details: 'We prepare and e-file your ITR, guide deductions (80C/80D/80G), capital gains, foreign income disclosures, AIS reconciliation, and respond to notices as required.'
  },
  {
    id: 'project-report-individual', slug: 'project-report',
    title: 'Project Report',
    category: 'individuals',
    summary: 'Bank-ready reports: viability, DSCR, projections, and sensitivity analysis.',
    cover: '/hero/projectreport.jpg',
    details: 'Comprehensive project reports covering market sizing, revenue models, DSCR, CMA data, and risk sensitivity—accepted by major banks and NBFCs.'
  },
  {
    id: 'dsc-individual', slug: 'digital-signature-certificates',
    title: 'Digital Signature Certificates',
    category: 'individuals',
    summary: 'Class 3 DSC issuance with KYC assistance and renewal reminders.',
    cover: '/hero/dsc.jpg',
    details: 'Issue & renew Class 3 DSCs including token, eKYC, Aadhaar/Video verification, and integration support for MCA/GST/Income-tax filings.'
  },
  {
    id: 'msme-individual', slug: 'msme-udyam-registration',
    title: 'MSME / Udyam Registration',
    category: 'individuals',
    summary: 'Get Udyam certificate for incentives and priority lending.',
    cover: '/hero/msme.jpg',
    details: 'Udyam registration with correct NIC codes, turnover thresholds, and guidance on benefits like subsidies, tender preferences, and collateral-free loans.'
  },
  {
    id: 'gst-reg-individual', slug: 'gst-registration',
    title: 'GST Registration',
    category: 'individuals',
    summary: 'New GSTIN with place-of-business & HSN configuration.',
    cover: '/hero/gst.jpg',
    details: 'End-to-end GST registration, documentation, HSN mapping, voluntary/threshold options, composition vs. regular, and portal onboarding.'
  },
  {
    id: 'bkpay-individual', slug: 'bookkeeping-payroll-individuals',
    title: 'Bookkeeping & Payroll Management',
    category: 'individuals',
    summary: 'Monthly books and payroll with ESS/MIS dashboards.',
    cover: '/hero/bookkeeping.jpg',
    details: 'Cloud accounting, reconciliations, payroll processing, PF/ESI/PT filings, and monthly MIS for owners and lenders.'
  },
  {
    id: 'fs-individual', slug: 'financial-statements-prep-individuals',
    title: 'Preparation of Financial Statements',
    category: 'individuals',
    summary: 'Audit-ready financials with schedules and notes.',
    cover: '/hero/financials.jpg',
    details: 'Balance Sheet, P&L, Cashflow, notes and schedules prepared to Indian GAAP/Ind-AS, with ledger scrub and closing entries.'
  },
  {
    id: 'tax-gst-comp-individual', slug: 'income-tax-gst-compliance-individuals',
    title: 'Income Tax & GST Compliance',
    category: 'individuals',
    summary: 'Returns, TDS, GST returns & reconciliations handled end-to-end.',
    cover: '/hero/tax.jpg',
    details: 'ITR, TDS, Advance Tax planning; GSTR-1/3B/9/9C, 2B reconciliation, ITC optimization, notices and rectifications.'
  },
  {
    id: 'bank-advisory-individual', slug: 'bank-loan-advisory-modelling',
    title: 'Bank Loan Advisory & Financial Modelling',
    category: 'individuals',
    summary: 'Working capital & term-loan advisory with lender-grade models.',
    cover: 'src/assets/bankloan.jpg',
    details: 'Credit assessment, ratio analysis, CMA data, projections, covenant planning, and liaison with banks until disbursement.'
  },

  // Companies
  {
    id: 'inc-india', slug: 'company-incorporation-india',
    title: 'Incorporation of Private Companies & OPCs (India)',
    category: 'companies',
    summary: 'SPICe+ incorporation with name approval, MOA/AOA & post-incorporation kit.',
    cover: '/hero/incorporation.jpg',
    details: 'Name approval, SPICe+, drafting MOA/AOA, PAN/TAN/GST registrations, share certificates, statutory registers, and bank account opening support.'
  },
  {
    id: 'llp-india', slug: 'llp-incorporation-india',
    title: 'Incorporation of LLPs (India)',
    category: 'companies',
    summary: 'Run-through LLP deed, DPIN, FiLLiP & MCA compliances.',
    cover: '/hero/incorporationllp.jpg',
    details: 'DPIN, name approval, FiLLiP filing, LLP Agreement, and compliance calendar with ROC filings.'
  },
  {
    id: 'uae-company', slug: 'company-formation-uae',
    title: 'Company Formation in UAE (Mainland/Offshore)',
    category: 'companies',
    summary: 'Entity setup, bank, VAT/CT, and economic-substance guidance.',
    cover: '/hero/uae.jpg',
    details: 'Select jurisdiction (Mainland/Free-zone/Offshore), MOA, visas, corporate bank account, VAT & CT registration, ESR/UBO filings.'
  },
  {
    id: 'uk-inc', slug: 'company-registration-uk',
    title: 'Company Registration in UK (Companies House)',
    category: 'companies',
    summary: 'Fast LTD setup, HMRC onboarding, VAT & PAYE registrations.',
    cover: '/hero/laptop-hero.png',
    details: 'Companies House incorporation, confirmation statement, HMRC, VAT, PAYE, and annual accounts assistance.'
  },
  {
    id: 'usa-inc', slug: 'company-registration-usa',
    title: 'Company Registration in USA (LLC / C-Corp / S-Corp)',
    category: 'companies',
    summary: 'Formation with EIN, state filings, IRS onboarding & bank introductions.',
    cover: '/hero/usa.jpg',
    details: 'LLC/C-Corp/S-Corp formation, EIN, Registered Agent, state filings, BOI/FinCEN, and CPA coordination for federal/state taxes.'
  },
  {
    id: 'gst-reg-company', slug: 'gst-registration-company',
    title: 'GST Registration',
    category: 'companies',
    summary: 'Multi-state GSTINs, branch transfers & e-invoice readiness.',
    cover: '/hero/meeting.jpg',
    details: 'Place-of-supply, multi-state/SEZ registration, API/e-invoicing & e-way bill setup, and SOPs for returns.'
  },
  {
    id: 'roc-annual', slug: 'roc-filings-annual-returns',
    title: 'ROC Filings & Annual Returns',
    category: 'companies',
    summary: 'Board/AGM packs, AOC-4, MGT-7, MSME-1, DPT-3 & registers.',
    cover: '/hero/nonprofit.jpg',
    details: 'Full ROC calendar with drafting, resolutions, e-filings, director KYC, and statutory register maintenance.'
  },
  {
    id: 'fema', slug: 'fema-odi-ecb-compliances',
    title: 'FEMA, ODI & ECB Compliances (India)',
    category: 'companies',
    summary: 'FDI/ODI consulting, SMF filings, LRN/ECB reporting.',
    cover: '/hero/laptop-hero.png',
    details: 'Entry routes, pricing guidelines, downstream investment, ODI returns, ECB LRN, and compliance with RBI Master Directions.'
  },
  {
    id: 'audits', slug: 'statutory-internal-tax-audits',
    title: 'Statutory, Internal & Tax Audits (India)',
    category: 'companies',
    summary: 'Audit planning, controls testing, CARO/Tax-audit reports.',
    cover: '/hero/desk.jpg',
    details: 'End-to-end audit execution with checklists, sampling, CARO reporting, and 3CD tax-audit deliverables.'
  },
  {
    id: 'vat-uae-uk', slug: 'vat-returns-uae-uk',
    title: 'VAT Return Filing (UAE & UK)',
    category: 'companies',
    summary: 'VAT onboarding, quarterly returns, EC sales & MTD compliance.',
    cover: '/hero/meeting.jpg',
    details: 'VAT registration, MTD for UK, return filing, reconciliations, and correspondence with FTA/HMRC.'
  },
  {
    id: 'irs-usa', slug: 'irs-compliance-usa',
    title: 'IRS Compliance & Federal/State Tax Filing (USA)',
    category: 'companies',
    summary: 'US federal/state filings, 1099/Payroll, and transfer pricing coordination.',
    cover: '/hero/nonprofit.jpg',
    details: 'Federal & state returns, 1099/W-8/W-9, nexus study, treaty positions and multi-country coordination.'
  },
  {
    id: 'bkpay-company', slug: 'bookkeeping-payroll-company',
    title: 'Bookkeeping & Payroll Management',
    category: 'companies',
    summary: 'Monthly books, payroll, FP&A, investor-grade MIS.',
    cover: '/hero/laptop-hero.png',
    details: 'GL, AR/AP, payroll, close calendar, MIS, and FP&A models.'
  },
  {
    id: 'tax-gst-company', slug: 'income-tax-gst-compliance-company',
    title: 'Income Tax & GST Compliance',
    category: 'companies',
    summary: 'Direct & indirect tax calendars with notice management.',
    cover: '/hero/desk.jpg',
    details: 'TDS/TCS, advance tax, transfer pricing coordination, GST monthly/annual returns, audits, and litigation support.'
  },
  {
    id: 'vcfo', slug: 'virtual-cfo-services',
    title: 'Virtual CFO Services',
    category: 'companies',
    summary: 'Board packs, budgets, cash-flow, KPI and fundraising support.',
    cover: '/hero/meeting.jpg',
    details: 'Budgeting, forecasting, governance, board reporting, and investor relations.'
  },

  // Partnerships
  {
    id: 'itr-partnership', slug: 'income-tax-return-partnership',
    title: 'Income Tax Return Filing',
    category: 'partnerships',
    summary: 'Partnership ITR with partner capital reconciliation.',
    cover: '/hero/desk.jpg',
    details: 'ITR-5, partner drawings/interest, 40(b) compliance, and tax planning.'
  },
  {
    id: 'gst-reg-partnership', slug: 'gst-registration-partnership',
    title: 'GST Registration',
    category: 'partnerships',
    summary: 'GSTIN with composition/regular evaluation & SOPs.',
    cover: '/hero/meeting.jpg',
    details: 'End-to-end GSTIN, HSN & PoS mapping, and processes.'
  },
  {
    id: 'bkpay-partnership', slug: 'bookkeeping-payroll-partnership',
    title: 'Bookkeeping & Payroll Management',
    category: 'partnerships',
    summary: 'Monthly books & payroll with partner MIS.',
    cover: '/hero/nonprofit.jpg',
    details: 'Reconciliations, payroll, PF/ESI, and monthly MIS.'
  },
  {
    id: 'fs-partnership', slug: 'financial-statements-partnership',
    title: 'Preparation of Financial Statements',
    category: 'partnerships',
    summary: 'Audit-ready statements & schedules.',
    cover: '/hero/laptop-hero.png',
    details: 'Balance sheet, P&L, notes, and close entries.'
  },
  {
    id: 'tax-gst-partnership', slug: 'income-tax-gst-compliance-partnership',
    title: 'Income Tax & GST Compliance',
    category: 'partnerships',
    summary: 'ITR-5, GSTRs & reconciliations.',
    cover: '/hero/desk.jpg',
    details: 'Calendar-based compliance, notices & rectifications.'
  },
  {
    id: 'vcfo-partnership', slug: 'virtual-cfo-partnership',
    title: 'Virtual CFO Services',
    category: 'partnerships',
    summary: 'Controls, MIS, budgeting for partners.',
    cover: '/hero/meeting.jpg',
    details: 'Governance, budgets and reporting.'
  },
  {
    id: 'bank-advisory-partnership', slug: 'bank-loan-advisory-partnership',
    title: 'Bank Loan Advisory & Financial Modelling',
    category: 'partnerships',
    summary: 'CMA data & financing support.',
    cover: '/hero/nonprofit.jpg',
    details: 'CMA, ratios, projections, lender liaison.'
  },

  // Non-profits
  {
    id: 'trust-reg', slug: 'trust-society-sec8-registration',
    title: 'Trust, Society & Section 8 Registration',
    category: 'nonprofits',
    summary: 'Foundational setup with by-laws and governance.',
    cover: '/hero/laptop-hero.png',
    details: 'Drafting trust deed/MOA-AOA, registration and PAN/TAN/GST onboarding.'
  },
  {
    id: '12a-80g', slug: '12a-80g-registration',
    title: '12A & 80G Registration',
    category: 'nonprofits',
    summary: 'Enable tax-exempt receipts and donor confidence.',
    cover: '/hero/desk.jpg',
    details: 'Eligibility, documentation, portal filings and renewals.'
  },
  {
    id: 'fcra', slug: 'fcra-registration-compliance',
    title: 'FCRA Registration & Compliance',
    category: 'nonprofits',
    summary: 'Foreign donations with FCRA bank and reporting.',
    cover: '/hero/meeting.jpg',
    details: 'FCRA registration, designated bank, quarterly returns and utilization reporting.'
  },
  {
    id: '501c3', slug: 'usa-501c3-registration',
    title: 'Non-profit Registration in USA – 501(c)(3)',
    category: 'nonprofits',
    summary: 'US charitable status with IRS recognition.',
    cover: '/hero/nonprofit.jpg',
    details: 'Formation, 1023/1023-EZ, bylaws, and board governance.'
  },
  {
    id: 'uae-ngo', slug: 'ngo-licensing-uae',
    title: 'Non-profit Licensing in UAE',
    category: 'nonprofits',
    summary: 'Local licensing with compliance framework.',
    cover: '/hero/desk.jpg',
    details: 'Approvals, licensing, and ongoing reporting to authorities.'
  },
  {
    id: 'audit-ngo', slug: 'ngo-audits',
    title: 'Audit of NGOs & Donor Compliance Audits',
    category: 'nonprofits',
    summary: 'Grant compliance and audited statements.',
    cover: '/hero/meeting.jpg',
    details: 'Donor-specific audits, fund tracking, and utilization certificates.'
  },
  {
    id: 'bkpay-ngo', slug: 'bookkeeping-payroll-ngo',
    title: 'Bookkeeping & Payroll Management',
    category: 'nonprofits',
    summary: 'Restricted funds accounting & payroll.',
    cover: '/hero/nonprofit.jpg',
    details: 'Fund accounting, payroll and MIS for boards.'
  },
  {
    id: 'fs-ngo', slug: 'financial-statements-ngo',
    title: 'Preparation of Financial Statements',
    category: 'nonprofits',
    summary: 'Audit-ready and donor-compliant statements.',
    cover: '/hero/laptop-hero.png',
    details: 'Statements, notes and audits support.'
  },
  {
    id: 'csr-advisory', slug: 'csr-advisory',
    title: 'CSR Advisory for Companies funding NGOs',
    category: 'nonprofits',
    summary: 'Policy, partner diligence, monitoring & reporting.',
    cover: '/hero/desk.jpg',
    details: 'CSR policy design, due diligence, monitoring and impact reporting.'
  }
];

// Safer slug match (handles encoding/case)
export const findServiceBySlug = (slugRaw) => {
  if (!slugRaw) return undefined
  const slug = decodeURIComponent(String(slugRaw)).trim().toLowerCase()
  return SERVICES.find(s => String(s.slug).toLowerCase() === slug)
}
