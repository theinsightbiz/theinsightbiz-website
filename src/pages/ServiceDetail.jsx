import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { findServiceBySlug, SERVICE_CATEGORIES } from '../data/servicesCatalog'
import { getCoverForService } from '../data/serviceImages'

// ============================
// PER-SERVICE SECTIONS
// Keyed by slug (exactly as in servicesCatalog.js)
// Each entry has: included[], timelines[], documents[] (array of {heading, items[]})
// ============================
const SECTIONS = {
  // ─────────────────────────────────────────────────────────────
  // INDIVIDUALS
  // ─────────────────────────────────────────────────────────────

  // ✅ Income Tax Return Filing — INDIVIDUALS (FULL CONTENT)
  'income-tax-return-filing-individuals': {
    included: [
      'Form selection & computation: Pick the correct ITR (ITR-1/2/3/4), apply the right tax regime (old/new), compute income under all heads, deductions, set-offs, and depreciation.',
      'Business/profession (sole prop.): Presumptive (s.44AD/44ADA) or regular books; turnover and expense review; tax-audit coordination where s.44AB applies.',
      'Data reconciliation: Match AIS/TIS/26AS, TDS/TCS credits, capital gains working.',
      'Special claims: Relief u/s 89 (Form 10E), Foreign Tax Credit (Form 67).',
      'E-filing & verification: File return, complete e-verification, share acknowledgement; basic post-filing support (refund tracking/rectification). (Scrutiny/appeals billed separately.)',
    ],
    timelines: [
      'Non-audit cases: CBDT due date for AY 2025-26 extended to 16 Sep 2025.',
      'Audit cases (s.44AB): Tax Audit Report and ITR due 31 Oct 2025 (AY 2025-26).',
      'Verification: Complete e-verification/ITR-V within 30 days of filing.',
      'Typical workflow: 7–10 days from complete documents (add 10–20 days if audit).',
    ],
    documents: [
      { heading: 'Identity & access', items: ['PAN, Aadhaar, portal login, linked mobile/email, bank details (refund).'] },
      { heading: 'Income proofs — Salary', items: ['Form 16, pay slips, arrears details (u/s 89).'] },
      { heading: 'Income proofs — House property', items: ['Rent agreement, interest certificate, municipal taxes.'] },
      { heading: 'Income proofs — Capital gains', items: ['Broker statements/contract notes, purchase–sale proofs, property papers.'] },
      { heading: 'Income proofs — Business/profession', items: ['Trial balance/ledgers, bank statements, fixed-asset register, GST (GSTR-1/3B), TDS returns; audit workings (Forms 3CA/3CB-3CD) if applicable.'] },
      { heading: 'Deductions', items: ['80C/80D/80E proofs, 80G receipts (note: no cash donation deduction > ₹2,000), home-loan interest u/s 24(b), HRA rent receipts.'] },
      { heading: 'Taxes/TDS', items: ['Form 26AS/AIS/TIS, advance-tax & self-assessment challans.'] },
      { heading: 'Special forms (if relevant)', items: ['Form 10E, Form 67, Form 10-IEA (for regime option where required).'] },
      {
        heading: 'Threshold guide (sole proprietors)',
        items: [
          'Tax-audit (s.44AB): turnover > ₹1 crore (or ₹10 crore if cash receipts and payments each ≤5%).',
          'Presumptive: s.44AD up to ₹3 crore (business) and s.44ADA up to ₹75 lakh (profession) when cash ≤5%.',
        ],
      },
    ],
  },

  // Placeholders for other services — edit freely
  'project-report': {
  included: [
    'Requirement scoping & lender fit: purpose, facility (TL/WC/OD/CC), tenure, collateral, eligibility.',
    'CMA data & 3–5 year projections: P&L, Balance Sheet, Cash Flow, fund-flow, working-capital assessment.',
    'Ratios & viability: DSCR, Interest-Coverage, Current Ratio, Break-even, working-capital cycle.',
    'Assumptions & sensitivity: clear assumption book; best/base/worst cases; EMI/repayment schedule.',
    'Business profile: promoter profile, business model, industry snapshot, SWOT, risk mitigants, compliance status.',
    'Documentation pack: quotations/invoices, bank-statement analysis, debtor/creditor ageing, stock summary, collateral details.',
    'Deliverables: lender-ready PDF + Excel, cover letter, submission guidance; basic responses to banker queries.'
  ],
  timelines: [
    'Draft report: 3–5 business days from complete documents.',
    'Finalisation: 1–2 business days post feedback.',
    'Add 5–7 business days for complex cases (large capex/multiple facilities/restatements).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'KYC & registrations: PAN, Aadhaar, Udyam, GST certificate, business address proof, licences (if any).',
        'Financials: ITRs (last 2–3 AYs) with computations, audited/unaudited financials, trial balance & ledgers, 12 months bank statements, existing loan sanctions/statements.',
        'Operations data: sales/purchase reports, debtors/creditors ageing, stock summary, major contracts/POs/LOIs, pricing & margin details.',
        'Funding specifics: amount, purpose, facility type & tenure, proposed collateral papers (property/FD/guarantee), vendor quotations/pro-forma invoices for capex.',
        'Credit & compliance: latest CIBIL (or consent to pull), repayment track, status of GST/TDS/EPF/ESI dues.',
        'Assumptions inputs: growth plans, capacity/utilisation, staffing, key risks, contingency buffers.'
      ],
    },
  ],
},

  'digital-signature-certificates': {
  included: [
    'DSC issuance for Individuals & Sole Proprietors: Class 3 (Signing / Encryption / Combo) with 1–3 year validity.',
    'eKYC & verification: Aadhaar OTP / PAN-based + live video verification, photo capture, and consent logging.',
    'Token & installation: FIPS-compliant USB crypto token (ePass/Watchdata), driver setup, and portal configuration.',
    'Use-cases enabled: MCA (ROC filings), Income Tax/GST, TRACES, EPFO/ESIC, IEC/DGFT, e-tenders & e-auctions, bank/PSU portals.',
    'Post-issuance support: download/activation, revocation/reissue on loss/compromise, renewal reminders, basic troubleshooting.'
  ],
  timelines: [
    'Standard issuance: 2–24 hours from successful eKYC & video verification.',
    'Urgent issuance: same-day possible if eKYC completes before cut-off.',
    'USB token dispatch (if required): 2–4 working days by courier; instant if client collects.',
    'Renewal window: start ~30 days before expiry to avoid downtime.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Individual (Signing/Encryption): PAN, Aadhaar (linked mobile for OTP), recent photo, personal email & mobile; one address proof if asked (Passport/Driving Licence/Voter ID/Utility Bill).',
        'Sole Proprietor (DSC in proprietor’s name with firm details): PAN & Aadhaar of proprietor, GST certificate or Udyam or Shop & Establishment (any one), proof of business address, active firm email & mobile.',
        'Authorisation: self-declaration/LOA to issue DSC in proprietor’s name (with firm name to print on DSC, if desired).',
        'For encryption/renewal: existing token details (if any) and consent for key-escrow/revoke as applicable.',
        'Real-time checks: live video verification readiness, device with camera/mic, stable internet, and original IDs at hand.'
      ],
    },
  ],
},

  'msme-udyam-registration': {
  included: [
    'Eligibility & classification: determine Micro/Small/Medium based on investment & turnover; select correct NIC codes.',
    'Application filing on Udyam portal using proprietor’s Aadhaar (OTP), PAN, and GSTIN (if liable under GST).',
    'Data mapping: firm name, activity (mfg/services), address, bank details, employment, investment & turnover (as per ITR/GSTR).',
    'Certificate delivery: downloadable Udyam Registration Certificate with QR code; guidance on updates/changes and reprints.',
    'Post-registration guidance: benefits overview (PSL, tender relaxations/EMD exemptions where applicable, govt schemes) and linkage with MCA/IT/GST records.'
  ],
  timelines: [
    'Standard filing: same day upon receiving complete details & OTP access.',
    'Certificate issue: typically within 1–2 business days (subject to portal availability).',
    'Updates/amendments: usually same day after client confirmation.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Proprietor KYC: Aadhaar (linked mobile for OTP) and PAN.',
        'Tax registrations: GSTIN (mandatory if business is liable under GST).',
        'Business details: Trade name, nature of activity (manufacturing/services), main & additional NIC codes.',
        'Location & bank: Principal place of business address and bank account details of the Applicant (for record/reference).',
        'Financial info: Prior ITR acknowledgement number and recent GSTR-3B (if applicable) to validate turnover/investment.',
        'Firm specifics: Date of commencement and Email ID of the Applicant.',
        'Authorized Person KYC: Aadhaar & PAN, Email ID and Phone number of the authorized person.',
        'Legacy info (if any): Udyog Aadhaar (UAM) for migration to Udyam.'
      ],
    },
  ],
},

  'gst-registration': {
  included: [
    'Eligibility & scheme selection: Regular or Composition (as applicable) for Individuals & Sole Proprietors.',
    'Application on GST portal (REG-01) with Aadhaar e-KYC, mobile/email verification, and geo-tagged PoB details where required.',
    'HSN/SAC mapping, nature of business, additional place(s) of business, bank linking, and authorised signatory setup.',
    'Submission & follow-up: ARN generation, response to clarification notices (REG-03), and assistance till approval (REG-06).',
    'Post-registration support: first-time login, e-Way Bill enrolment, invoice series & profile setup, LUT for exports (if applicable).'
  ],
  timelines: [
    'Filing & ARN: same day from complete documents & OTP access.',
    'Processing: typically 3–7 business days, subject to officer verification/clarifications.',
    'Clarification window: respond to REG-03 within 7 days to avoid rejection.',
    'Certificate (REG-06): issued upon approval; immediate start on post-registration setup.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'KYC: PAN & Aadhaar of proprietor (with OTP on linked mobile), recent passport-size photo, active email & mobile.',
        'Business details: trade name, nature of business (goods/services), main & additional HSN/SAC, turnover estimate.',
        'Principal Place of Business (PoB): ownership proof (electricity/municipal bill/property tax) AND rent/lease deed or consent/NOC if rented/shared; photographs of premises if asked.',
        'Bank proof: cancelled cheque or first page of passbook/bank statement with IFSC and address.',
        'Authorised signatory: if different from proprietor, KYC + letter of authorisation.',
        'Additional places (if any): address proofs and usage documents similar to PoB.',
        'Optional/where applicable: Udyam registration, IEC, shop & establishment licence.'
      ],
    },
  ],
},

  'bookkeeping-payroll-individuals': {
  included: [
    'Onboarding & setup: chart of accounts, opening balances, master data (customers/suppliers/items), accounting software configuration (Tally/Zoho Books/QuickBooks or as preferred).',
    'Bookkeeping: capture & classify sales/purchase invoices, expenses, credit notes, receipts/payments, bank & cash entries; monthly bank/credit-card/wallet reconciliations.',
    'Compliance-ready records: GST outward/inward registers, TDS tracking, fixed-asset register & depreciation, petty-cash controls, and document indexing.',
    'Monthly MIS & controls: P&L, Balance Sheet, Cash Flow, AR/AP ageing, variance analysis, and customised dashboards.',
    'Payroll processing: CTC structuring, attendance/leave import, earnings/deductions, reimbursements, full & final settlements, payslips.',
    'Statutory payroll compliance: PF/ESI/PT (state-specific), LWF (where applicable), TDS on salaries (Form 24Q), challans & return filings, Form 16 generation, investment declaration (Form 12BB) review.',
    'Year-end support: trial balance finalisation, schedules, audit support (if applicable), and handover to ITR/Tax-audit teams.',
    'Data security & access: maker–checker workflow, shared drive/DMS, and periodic backup of ledgers & payroll registers.'
  ],
  timelines: [
    'Onboarding & opening balances: 2–5 business days from receipt of prior data & software access.',
    'Monthly bookkeeping: weekly/fortnightly posting; books brought current by T+5 business days after month-end.',
    'Monthly payroll: cut-off on client-approved date; payslips & payroll register within 2 business days of cut-off.',
    'Statutory filings: PF/ESI/TDS/GST prepared and filed within statutory due dates upon timely data/approvals.',
    'MIS pack: issued within 5–7 business days after month-end (sooner on request).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Access & masters: accounting software login (or backups), prior-year trial balance, chart of accounts, customer/supplier/item masters.',
        'Banking & transactions: bank/CC/wallet statements (CSV/PDF), UPI reports, payment gateway exports, sales/purchase invoices, expense bills, contracts, and delivery challans.',
        'Tax portals & IDs: GST, Income Tax (TRACES), PF (EPFO), ESI, and PT credentials/authorisations (as applicable).',
        'Fixed assets & loans: asset register with invoices/warranties, depreciation method, loan sanction letters & amortisation schedules.',
        'Payroll inputs: employee KYC (PAN, Aadhaar), offer/CTC sheets, UAN/ESIC numbers, bank details, attendance/leave, reimbursements, declarations (Form 12BB), HRA/rent proofs, investment proofs at year-end.',
        'Policies & approvals: expense/leave/travel policies, credit limits, approval matrix, and any maker–checker requirements.'
      ],
    },
  ],
},

  'financial-statements-prep-individuals': {
  included: [
    'Scope: year-end/periodic Financial Statements for Individuals & Sole Proprietors—Profit & Loss, Balance Sheet, Cash Flow (indirect), Notes & Schedules.',
    'Books-to-FS conversion: ledger scrutiny, accruals/deferrals, provisions (expenses, gratuity/leave if applicable), prepaid/advance adjustments, and balance confirmations.',
    'Inventory & revenue: stock valuation (cost or NRV, item/ageing), job/work-in-progress roll-forward, revenue cut-off, and credit notes post-period checks.',
    'Fixed assets & loans: FAR update, additions/disposals, depreciation as per book policy; reconciliation of loan balances, interest accrual, and sanction covenant checks.',
    'Tax & statutory tie-outs: GST (GSTR-1/3B/2B) vs books, TDS ledgers (26AS/TRACES), payroll registers, and other statutory dues mapping.',
    'Policies & compliance: accounting policies for non-corporates (AS/ICAI Guidance where applicable), related-party identification, and proprietor drawings/capital reconciliation.',
    'Deliverables: signed PDF set + editable Excel schedules; management representation letter; comparatives and key ratios/MIS summary.'
  ],
  timelines: [
    'Onboarding & data review: 2–3 business days from receipt of trial balance and prior-year FS.',
    'Draft FS: 5–7 business days after complete ledgers/supports & bank/stock reconciliations.',
    'Management review & revisions: 1–2 business days per iteration.',
    'Quarterly/interim packs (if opted): 5–7 business days from period close.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Trial balance & ledgers for the period; prior-year FS and closing schedules.',
        'Bank/CC/wallet statements with reconciliations; cash book & physical cash count (if any).',
        'Inventory details: item-wise quantity/rate, valuation method, WIP/FG rolls; stock take or third-party confirmations if available.',
        'Fixed Asset Register with invoices, disposal papers, and depreciation policy.',
        'Loans & advances: sanction letters, amortisation schedules, balance confirmations, interest workings.',
        'Revenue & purchases: sales/purchase registers, major contracts/POs, returns/credit notes log.',
        'Statutory tie-outs: GST (GSTR-1/3B/2B), TDS/TCS challans & returns, payroll registers (PF/ESI/PT), Form 26AS.',
        'Other: expense agreements (rent, services), insurance, contingencies/claims list, related-party details, and management representation.'
      ],
    },
  ],
},

  'income-tax-gst-compliance-individuals': {
  included: [
    // Income Tax
    'Income Tax: return preparation & filing (ITR-1/2/3/4 as applicable), old/new regime evaluation, Chapter VI-A deductions, loss set-off/carry-forward.',
    'Advance Tax & Self-Assessment Tax: computation, challan preparation, and quarterly instalment tracking.',
    'TDS/TCS (if applicable): deduction/collection, challans (ITNS 281), quarterly returns—Form 24Q (salary), 26Q (non-salary), issuing Form 16/16A, and TRACES reconciliations.',
    'Notices & rectifications: basic responses for 143(1)/139(9) and online rectification u/s 154 (complex assessments billed separately).',

    // GST
    'GST returns: scheme selection (Regular/QRMP/Composition), periodic filings—GSTR-1, GSTR-3B, PMT-06 (QRMP), and GSTR-4 (Composition).',
    'Reconciliations: 2B-to-books ITC match, RCM workings, HSN/SAC summary, and vendor follow-ups for compliance gaps.',
    'Annual filings & certifications: GSTR-9 (and GSTR-9C where applicable), e-Invoice/e-Way Bill enablement & monitoring.',
    'Refunds & LUT: export/LUT processing, excess cash/ITC refund advisory (representation billed separately).'
  ],
  timelines: [
    'Income Tax: advance-tax monitoring as per quarterly statutory due dates; ITR filing within the AY timeline; TDS/TCS—monthly challans and quarterly returns as prescribed.',
    'GST Regular: GSTR-1/GSTR-3B monthly as per statutory due dates; QRMP—Invoice upload, PMT-06 monthly and GSTR-1/3B quarterly.',
    'Composition: CMP-08 quarterly and GSTR-4 annually as per due dates.',
    'Annual compliances: GSTR-9/9C and year-end reconciliations post FY close; IT notices/rectifications handled on receipt.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Common
        'KYC & access: PAN, Aadhaar, active email/mobile; e-filing & GST portal credentials, DSC/EVC; bank details for challans/refunds.',
        // Income Tax
        'Income Tax: prior ITRs & computation, Form 26AS/AIS/TIS, advance-tax/SAT challans, salary Form 16, interest/dividend/capital-gain statements, books/trial balance (sole prop).',
        'TDS/TCS (if applicable): employee/contractor/vendor details, challan proofs, deduction workings, salary registers/payroll files.',
        // GST
        'GST: registration certificate, list of places of business, HSN/SAC mapping, sales & purchase registers, debit/credit notes, RCM invoices, e-Invoice/e-Way Bill reports.',
        'Reconciliation inputs: GSTR-1/3B/2B downloads, vendor-wise ITC summary, blocked ITC flags, stock/expense ledgers and fixed-asset invoices (for ITC eligibility).',
        // Optional
        'Exports/SEZ: LUT/Bond, shipping bills, FIRC/BRC; refund working papers (if any).'
      ],
    },
  ],
},

  'bank-loan-advisory-modelling': {
    included: [
    'Eligibility & product fit: assess need and map to Term Loan / Working Capital (CC/OD) / Machinery Loan / LAP / Government-backed schemes (e.g., CGTMSE, MUDRA/PMEGP where applicable).',
    'CMA & financial model: banker-ready CMA data with 3–5 year projections (P&L, Balance Sheet, Cash Flow, Fund-Flow, WC assessment) and covenant mapping.',
    'Ratio analytics & viability: DSCR, CFADS, Interest-Coverage, Current Ratio, Asset-Turnover, BEP; seasonality and operating cycle analysis.',
    'Scenarios & stress tests: best/base/worst cases, sensitivity to sales, margins, collection period, interest rate; moratorium/repayment shaping.',
    'Repayment & structure: EMI/structured amortisation, drawing power, collateral coverage, margin money, and sanction term sheet review.',
    'Application & follow-up: documentation checklist, portal/branch filing, responses to lender queries, and negotiation support till sanction (post-sanction compliances billed separately).',
    'Deliverables: lender-ready Model (Excel) + CMA pack + executive note; optional pitch deck/cover letter.'
  ],
  timelines: [
    'Diagnostic & requirement freeze: 1–2 business days from preliminary data.',
    'Model & CMA pack (draft): 3–5 business days from complete documents.',
    'Finalisation & application filing: 1–2 business days post feedback.',
    'Lender processing: typically 7–21 business days subject to credit appraisal/valuation/legal; clarifications handled on priority.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'KYC & registrations: PAN, Aadhaar (OTP), photo, address proof; Udyam/GST (if applicable).',
        'Financials: ITRs with computations (last 2–3 AYs), audited/unaudited FS, trial balance & ledgers.',
        'Banking: last 12 months bank statements for all operative/loan accounts; gateway/QR/UPI settlement reports (if relevant).',
        'Business profile: nature of activity, customers/suppliers, order book/POs/LOIs, pricing/margins, capacity/utilisation.',
        'Working capital data: inventory/stock summaries, debtors/creditors ageing, credit terms; major expense contracts.',
        'Existing borrowings: sanction letters, repayment schedules, EMI bounces (if any), security/collateral details.',
        'Collateral/capex (if applicable): property papers (title/encumbrance/tax receipts), machinery quotes/invoices, pro-forma for new assets, valuation (if available).',
        'Compliance & credit: GST returns (GSTR-1/3B/2B), TDS status, PF/ESI/PT (if applicable), latest CIBIL or consent to pull.',
        'Assumptions inputs: growth plan, pricing strategy, hiring/capex roadmap, risks & mitigants; any covenants or lender preferences shared.'
      ],
    },
  ],
},

  // COMPANIES (placeholders)
  'company-incorporation-india': {
    included: [
    'Entity advisory: choose between Private Company or One Person Company (OPC); share capital, ownership, and name strategy (RUN/Part A).',
    'End-to-end SPICe+ filing: Part A (name reservation) & Part B (incorporation) with e-MoA (INC-33), e-AoA (INC-34), AGILE-PRO-S (INC-35), and auto-generated INC-9.',
    'DIN & DSC: obtain DINs for proposed directors through SPICe+ (as applicable) and facilitate Digital Signatures for subscribers/directors.',
    'Attachments & drafting: main objects, subscriber/first-director details, declarations/consents (DIR-2), board/partner authorisations (if corporate subscriber), NOC for registered office.',
    'OPC specifics: nominee consent & details (INC-3), name format, and guidance on thresholds for mandatory conversion (informational).',
    'Post-approval deliverables: Certificate of Incorporation with CIN, PAN & TAN allotment, DIN allotments, MoA/AoA, and master data verification.',
    'Linked registrations via AGILE-PRO-S (on request): GSTIN, EPFO, ESIC, Profession Tax (state-wise), and bank account initiation; e-invoicing/e-way bill enablement advisory.',
    'After-incorporation starter kit: first board minutes & statutory registers templates, share certificate formats, opening bank, and compliance calendar orientation.'
  ],
  timelines: [
    'Name reservation (Part A): typically 1–2 business days from submission.',
    'Incorporation approval (Part B): 3–7 business days post complete documentation & CRC processing.',
    'PAN/TAN/DIN: issued with Certificate of Incorporation upon approval.',
    'Linked registrations (GST/EPFO/ESIC/PT/bank): usually 3–10 business days post COI, subject to department/bank TAT.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Promoters/Directors: PAN, Aadhaar, address proof (Passport/Driving Licence/Voter ID), recent utility/bank statement (≤2–3 months), email & mobile; passport for foreign nationals.',
        'Registered Office: latest utility bill (electricity/water/property tax) + ownership proof; if rented/leased—rent/lease deed and owner’s NOC.',
        'Company details: two proposed names with significance, main objects (business description), authorised & subscribed capital, shareholding pattern.',
        'Consents & declarations: DIR-2 (consent to act as director), interest disclosures (if any); INC-3 (OPC nominee consent with KYC).',
        'For corporate/LLP subscribers (if any): certificate of incorporation, board/partner resolution authorising subscription/nominee, PAN & address proof.',
        'Bank & tax options (AGILE-PRO-S): preferred bank selection, GST details (principal place, HSN/SAC, authorised signatory), EPFO/ESIC/PT applicability.',
        'Digital Signature: passport-size photo and eKYC readiness for DSC issuance (if DSC not already available).'
      ],
    },
  ],
},

  'llp-incorporation-india': {
    included: [
    'Entity advisory: suitability of LLP vs. Company, partner roles (Designated/Partner), contribution structure, and name strategy (RUN-LLP).',
    'End-to-end filing: name reservation via RUN-LLP and incorporation via FiLLiP (with DPIN allotment for Designated Partners as applicable).',
    'DSC facilitation: Digital Signatures for proposed partners/designated partners and eKYC/video verification support.',
    'Drafting & attachments: subscribers’/partners’ details, consent to act, registered office proofs/NOC, object description, and partner contribution terms.',
    'LLP Agreement: drafting commercial clauses (capital, profit share, duties, indemnities, admission/retirement, dispute resolution), stamping as per State law, and filing Form 3 within statutory timeline.',
    'Post-approval deliverables: Certificate of Incorporation with LLPIN, Master Data check, and starter compliance kit (initial resolutions/registers templates).',
    'Post-incorporation facilitation (on request): PAN/TAN application, bank account opening support, GST registration, and professional tax/shops & establishments (state-specific).'
  ],
  timelines: [
    'Name reservation (RUN-LLP): typically 1–2 business days from submission.',
    'Incorporation approval (FiLLiP): 3–7 business days post complete documentation & MCA processing.',
    'LLP Agreement filing (Form 3): prepared immediately after COI; filed within the statutory window post execution.',
    'PAN/TAN/bank/GST (optional): usually 3–10 business days post COI, subject to department/bank TAT.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Partners/Designated Partners: PAN, Aadhaar/Passport, address proof (Passport/Driving Licence/Voter ID), recent utility/bank statement (≤2–3 months), email & mobile; passport & visa/OCI for foreign nationals.',
        'Registered Office: latest utility bill (electricity/water/property tax) + ownership proof; if rented/leased—rent/lease deed and owner’s NOC; premise photos if asked.',
        'LLP particulars: two proposed names with significance, main business objects (NIC description), partner count, proposed Designated Partners.',
        'Capital & economics: total contribution, partner-wise contribution and profit-sharing ratio, valuation/backing for non-cash contribution (if any).',
        'Declarations & consents: consent to act as Designated Partner/Partner, non-disqualification statements; board/partner resolutions if any body corporate is a partner.',
        'For body corporate partners (if any): certificate of incorporation, PAN, registered address proof, and authorisation nominating a representative/designated partner.',
        'Post-incorporation (optional services): bank KYC set, PAN/TAN application details, GST inputs (PoB, HSN/SAC, authorised signatory).'
      ],
    },
  ],
},

  'company-formation-uae': {
    included: [
    'Advisory: choose jurisdiction & structure—Mainland (DED/Emirate authority) or Offshore (e.g., RAK ICC/JAFZA Offshore); activity mapping and name strategy.',
    'Licensing & approvals: trade name reservation, initial approval, drafting MOA/AOA (or equivalent), UBO/ESR/AML declarations, and license issuance.',
    'Shareholding & management: shareholder/manager appointments, authorised signatories, POAs/resolutions for foreign/corporate owners.',
    'Premises & establishment: guidance on office lease/flexi-desk (Mainland) or registered agent address (Offshore); establishment card (where applicable).',
    'Banking & tax/VAT (on request): corporate bank A/C application support, KYC pack, VAT/TRN registration (if required), corporate tax onboarding guidance.',
    'Post-incorporation kit: digital license/COI, MoA/AoA, UBO file, specimen resolutions, compliance calendar, and optional PRO services for visas/immigration.'
  ],
  timelines: [
    'Diagnostic & plan: 1–2 business days from preliminary details.',
    'Name reservation & initial approval: typically 2–5 business days, subject to authority.',
    'Company incorporation & license: generally 5–15 business days post complete documents and lease/registered address readiness.',
    'Bank account & optional registrations (VAT/CT): timelines vary by bank/authority; applications filed immediately after license issuance.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Shareholders/Managers (individuals): passport (valid 6+ months), recent photo, current address proof, UAE entry stamp/visa page (if any), UAE mobile/email.',
        'Residents (if applicable): Emirates ID & visa copy; NOC from current sponsor for onshore roles where required.',
        'Corporate shareholders: certificate of incorporation, MoA/AoA, board resolution approving UAE company formation, certificate of incumbency/good standing, authorised signatory ID proofs (legalised/apostilled as per authority).',
        'Activity & name details: 2–3 proposed names with meaning, business activity list, expected turnover, and special approvals (if regulated activity).',
        'Premises: draft lease/EJARI or flexi-desk agreement for Mainland; registered agent address for Offshore.',
        'Compliance pack: UBO/KYC forms, source-of-funds/source-of-wealth summary for banking, sanctions/PEP declarations (if applicable).'
      ],
    },
  ],
},

  'company-registration-uk': {
    included: [
    'Advisory: choose structure (Private Ltd by Shares/Guarantee), name strategy, SIC codes, share capital & ownership.',
    'End-to-end filing: online incorporation with Memorandum & Articles (model or customised), IN01 details, and PSC (Persons with Significant Control) statements.',
    'Company officers & addresses: appointment of directors/secretary (if any), service addresses, registered office setup (optional RO service available).',
    'Post-incorporation pack: Certificate of Incorporation, Company Registers (statutory books), share certificates, initial board minutes, and HMRC UTR guidance.',
    'Tax & payroll onboarding (on request): HMRC Corporation Tax registration, PAYE registration, VAT (if required), and business bank account application support.',
    'Ongoing compliance orientation: Confirmation Statement (CS01), accounts filing cycle, PSC updates, and basic company secretarial guidance.'
  ],
  timelines: [
    'Name check & drafting: same day from complete details.',
    'Standard incorporation: typically 1–3 business days after submission to Companies House.',
    'Same-day service: possible for eligible filings submitted before cut-off (subject to Companies House processing).',
    'Post-incorporation tax registrations: UTR issued by HMRC after incorporation; CT/PAYE/VAT registrations filed immediately on receipt of UTR (bank KYC timelines vary by bank).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Promoters/Directors: passport or UK photo ID, proof of residential address (≤3 months), date of birth, nationality, occupation, email & mobile (for AML/KYC).',
        'Shareholders/Members: full details incl. shareholding/guarantee amount; for minors/nominees—guardian/authorised details.',
        'PSC information: individuals/corporates with >25% shares/votes or significant influence—names, DOB (month/year), service address, nature of control.',
        'Company particulars: proposed name(s) with meaning, registered office address (UK), principal business activity (SIC code), share capital structure (classes, number, nominal value), and any pre-emption/transfer preferences.',
        'Articles: choose model articles or provide custom clauses (if custom, share required restrictions/rights).',
        'For corporate shareholders/directors (if any): certificate of incorporation, constitutional documents, register of directors, authorised signatory resolution, and incumbency/good standing (apostille/legalisation if requested by bank).',
        'Banking & tax (optional): initial business plan/anticipated turnover, source-of-funds summary, and proof of trading address for bank KYC; accounting reference date preference (if any).'
      ],
    },
  ],
},

  'company-registration-usa': {
    included: [
    'Jurisdiction & entity advisory: pick state (e.g., Delaware/Wyoming/home state) and structure—LLC, C-Corp, or S-Corp (via IRS election).',
    'Name clearance & formation: state filing (Articles/Certificate of Formation or Incorporation), registered agent setup, and good-standing checks.',
    'Governing documents: Operating Agreement (LLC) or Bylaws + Initial Board Consents (Corp), IP/assignments, and cap table basics.',
    'Tax IDs & elections: EIN application; S-Corp election (Form 2553) where eligible; 83(b) election guidance for founders (time-sensitive).',
    'Post-formation essentials: stock/member certificates, meeting minutes, ownership ledger, and initial compliance calendar.',
    'Add-ons (on request): BOI reporting (FinCEN) where applicable, foreign qualification in other states, sales/payroll tax registrations, bank/fintech account support.'
  ],
  timelines: [
    'State filing: same day to 3 business days (expedite available in most states).',
    'EIN: 1–3 business days (SSN), 5–10 business days (foreign owners via fax).',
    'Governing docs & post-formation kit: 1–2 business days after state approval.',
    'Optional registrations (tax/bank/foreign qualification): typically 3–10 business days depending on agency/bank TAT.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Promoters/Officers/Members: passport/ID, residential address, email & phone; SSN/ITIN (if any).',
        'Company particulars: 2–3 proposed names, principal business purpose, principal office address, and preferred state.',
        'Ownership & management: member/shareholder list with percentages, manager-managed vs member-managed (LLC) or directors/officers (Corp).',
        'Registered agent: consent/details (we can provide if required).',
        'Tax & banking: mailing address, initial capital, source-of-funds summary for bank KYC; choice of tax elections (S-Corp eligibility: U.S. persons, ≤100 shareholders, one class of stock).',
        'Optional/where applicable: BOI reporting inputs (beneficial owners, control persons), foreign qualification addresses, and any industry licenses.'
      ],
    },
  ],
},

  'gst-registration-company': {
    included: [
    'Eligibility & scheme selection: Regular or Composition (if eligible) for Companies (Pvt/Public/LLP via separate service).',
    'Application on GST portal (REG-01) with Aadhaar authentication of Authorised Signatory, email/mobile OTPs, and PoB details.',
    'Business profiling: HSN/SAC mapping, nature of business, principal & additional places of business, bank linking, and authorised signatory setup.',
    'Submission & liaison: ARN generation, reply to clarification notices (REG-03), and assistance till approval (REG-06).',
    'Post-registration support: first-time login, e-Invoice/e-Way Bill enablement (if applicable), invoice series/profile setup, LUT for exports.'
  ],
  timelines: [
    'Filing & ARN: same day from complete documents & OTP/DSC access.',
    'Processing: typically 3–7 business days, subject to officer verification/clarifications.',
    'Clarification window: respond to REG-03 within 7 days to avoid rejection.',
    'Certificate (REG-06): issued upon approval; immediate start on post-registration setup.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Company KYC: PAN, Certificate of Incorporation, MoA/AoA; latest master data print from MCA.',
        'Authorisation: Board Resolution/Letter authorising Authorised Signatory to act and sign on GST portal.',
        'Authorised Signatory (mandatory DSC for companies): PAN, Aadhaar (linked mobile for OTP), recent photo, email & mobile; Class 3 DSC token details.',
        'Directors’ details: PAN, DIN, address proofs (as required for verification).',
        'Principal Place of Business (PoB): latest utility/municipal bill or property tax + ownership proof; if rented/leased—rent/lease deed and owner NOC; premise photos/geo-tagging if asked.',
        'Additional Places (if any): address proofs and usage documents similar to PoB (warehouses/branches).',
        'Bank proof: cancelled cheque or first page of company bank statement/passbook with IFSC.',
        'Business particulars: nature of supplies (goods/services), HSN/SAC list, expected turnover; IEC/Udyam/Shop & Establishment (if available).',
        'Special cases: SEZ Letter of Approval (for SEZ units), LUT/Bond details for exports if applying post-registration.'
      ],
    },
  ],
},

  'roc-filings-annual-returns': {
    included: [
    'Compliance calendar & health check: identify applicable MCA filings for the Company (Pvt/Public/OPC) and prepare a due-date tracker.',
    'AGM & financials: AGM planning, notice & minutes templates; FS final pack—AOC-4/AOC-4 CFS/XBRL (as applicable) with Board’s Report & Auditor’s Report.',
    'Annual return: MGT-7/MGT-7A preparation (shareholding, KMP, meetings, certifications) and filing.',
    'Auditor filings: ADT-1 (appointment/re-appointment), auditor eligibility/consent checks.',
    'Director KYC & disclosures: DIR-3 KYC (for each director), MBP-1, DIR-8, and register updates.',
    'Event-based forms (on request): DPT-3 (deposits/loan return), MSME-1 (dues to MSMEs), BEN-2 (significant beneficial owners), PAS-6 (half-yearly for unlisted public cos), SH-7/PAS-3/INC-22 and others as triggered.',
    'Liaison & submissions: e-form validation, DSC execution, MCA portal filing, challan generation, and status tracking till approval.'
  ],
  timelines: [
    'AGM: within 6 months of FY end (generally by 30 Sep); first AGM within 9 months of first FY end.',
    'AOC-4: within 30 days of AGM (CFS/XBRL where applicable).',
    'MGT-7 / MGT-7A: within 60 days of AGM.',
    'ADT-1: within 15 days of AGM.',
    'DIR-3 KYC: by 30 Sep each year.',
    'DPT-3: by 30 Jun (for return as on 31 Mar).',
    'MSME-1: half-yearly—by 30 Apr (Oct–Mar) and 31 Oct (Apr–Sep).',
    'BEN-2: within 30 days of SBO declaration; PAS-6: within 60 days of each half-year end (for unlisted public companies).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Company master: COI, PAN, MoA/AoA, current shareholding & authorised capital details.',
        'Financials: signed Balance Sheet, P&L, Cash Flow (if applicable), Notes, Auditor’s Report, Board’s Report with annexures (MGT-9/CSR/secretarial remarks if applicable).',
        'AGM/meetings: AGM notice, attendance & minutes; Board meeting minutes/resolutions for adoption of FS and auditor matters.',
        'Auditor: consent letter & eligibility certificate for ADT-1; previous appointment details.',
        'Registers & returns: Register of Members, share transfer/ allotment details (if any), list of directors/KMP with DINs.',
        'Director KYC & disclosures: DIR-3 KYC inputs (mobile/email OTP), MBP-1 (disclosure of interest), DIR-8 (non-disqualification).',
        'Event-based: loan/deposit ledgers for DPT-3; MSME vendor list with ageing; SBO declarations (BEN-1) for BEN-2; demat/ISIN details for PAS-6 (if applicable).',
        'Execution & access: Class-3 DSCs of authorised signatory/director/professional, MCA portal credentials, and authorised email/phone.'
      ],
    },
  ],
},

  'fema-odi-ecb-compliances': {
    included: [
    // FEMA – General
    'FEMA diagnostic: identify applicable FEMA, ODI and ECB obligations; prepare a compliance calendar and liaison with AD Cat-I Bank.',
    // ODI (Overseas Direct Investment)
    'ODI filings on FIRMS: reporting of financial commitment (equity/CCPS/loan/guarantee), UIN tagging, post-investment changes, disinvestments.',
    'APR (Annual Performance Report): compile & file APR for each JV/WOS; follow-ups on data gaps and auditor confirmations.',
    'Valuation & eligibility checks: pricing/valuation (where required), financial commitment limits, and pledge/charge permissions.',
    // ECB (External Commercial Borrowings)
    'ECB onboarding: lender eligibility checks, end-use and all-in-cost compliance, tenor/hedging evaluation.',
    'LRN allotment: prepare and file ECB Form (with AD Bank) for Loan Registration Number.',
    'ECB-2 monthly return: prepare and file by due date (each month) till final repayment; track drawdowns, interest, fees, and principal schedules.',
    // Ancillary
    'FLA Return (if applicable): prepare and file RBI’s annual Foreign Liabilities & Assets return; revisions within permitted window.',
    'Change reporting & closures: report amendments (ODI/ECB), obtain NOCs/closure confirmations, and maintain a digital compliance dossier.'
  ],
  timelines: [
    'ODI transaction reporting: within 30 days of each financial commitment/post-investment change/disinvestment (as applicable).',
    'APR (ODI): annually—file for each JV/WOS by the RBI-prescribed due date.',
    'ECB LRN: filed promptly on execution of loan agreement; LRN typically issued post AD Bank verification.',
    'ECB-2 return: by the 7th working day of the following month, for every month the ECB remains outstanding.',
    'FLA Return (if applicable): by 15 July following the financial year-end; revision window generally up to 30 September.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Entity & banking
        'Company KYC: COI, PAN, MoA/AoA, shareholding, authorised signatory list; AD Bank details and contact.',
        // ODI
        'Board resolution approving ODI; JV/WOS details (name, country, activity, % holding).',
        'Remittance proofs (SWIFT/FIRC), share certificates/loan agreements issued by overseas entity, UIN (if already allotted).',
        'Valuation report/pricing support (where required), latest audited financials/management accounts of JV/WOS for APR.',
        'Any charge/pledge/security documents and approvals sought/granted.',
        // ECB
        'Executed ECB loan agreement/offer letter, lender KYC and eligibility confirmation (overseas lender/ODI group).',
        'Drawdown and repayment schedule, interest/all-in-cost details, end-use declaration, hedging policy/evidence (if mandated).',
        'Security/guarantee documents, inter-creditor/NOC (if refinancing).',
        // FLA (if applicable)
        'Foreign investment/loan outstanding summary, equity/CCI/valuation files, and trial balance tie-outs for FLA preparation.',
        // Access & execution
        'FIRMS portal access, DSC/EVC of authorised signatory, and timely OTP/banking coordination support.'
      ],
    },
  ],
},

  'statutory-internal-tax-audits': {
    included: [
    // Statutory Audit (Companies Act)
    'Engagement & independence: engagement letter, scope, materiality, and independence confirmations.',
    'Planning & risk assessment: understanding business, ICFR walkthroughs, risk mapping, and audit plan.',
    'Fieldwork: test of controls, substantive procedures, analytical reviews, external confirmations (banks/AR/AP/loans), inventory observation (where applicable).',
    'Reporting (Companies Act): Independent Auditor’s Report on FS, CARO 2020 reporting (where applicable), and Management Letter on observations & recommendations.',
    // Internal Audit
    'Internal audit: process reviews (P2P, O2C, H2R, inventory, treasury), compliance checks, data analytics, SOP/policy gap assessment, and actionable remediation plan.',
    // Tax Audit & Indirects
    'Tax audit u/s 44AB: preparation and filing of Form 3CA/3CB-3CD with clause-wise reporting (ledgers, TDS, GST tie-outs, depreciation, loans, payments, etc.).',
    'GST review/certification (as applicable): GSTR-1/3B/2B-to-books reconciliation, ITC eligibility checks, RCM review, and GSTR-9/9C support.',
    // Close-out
    'Exit meeting & governance: audit committee/board presentation (if required), final deliverables pack, and post-audit support for regulator/banker queries.'
  ],
  timelines: [
    'Kick-off & PBC list: within 2 business days of engagement confirmation.',
    'Planning & walkthroughs: 3–7 business days after receipt of preliminary data.',
    'Fieldwork: 5–15 business days depending on size/locations/complexity.',
    'Draft reports & management responses: 3–5 business days post fieldwork.',
    'Final reports & e-filings: on receipt of signed financials/representations, within statutory due dates (MCA/CBDT/GST as applicable).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Corporate & legal: COI, MoA/AoA/LLP Agreement, shareholding/capital changes, key contracts, board/committee minutes, related-party list.',
        'Financials & ledgers: trial balance, general ledger, sub-ledgers (AR/AP/FA/Payroll/Inventory), prior-year FS & audit reports, management representations.',
        'Banking & borrowings: bank statements/reconciliations, loan sanction letters, DP statements, security documents, BG/LC details, external confirmations.',
        'Revenue & purchases: sales/purchase registers, major contracts/POs/SOWs, credit/debit notes, pricing policies, revenue recognition memos.',
        'Inventory & fixed assets: item-wise stock, valuation method, stock counts/third-party confirmations, FAR, capex invoices, depreciation policy.',
        'Taxes: GST (GSTR-1/3B/2B, e-invoice/e-way bill data), TDS/TCS returns & challans, Form 26AS/AIS, tax computations, prior assessments/orders.',
        'Payroll & compliance: payroll registers, Form 24Q, PF/ESI/PT returns, gratuity/leave provisions, employee master & HR policies.',
        'IT & controls: access logs/roles, key SOPs, risk-control matrices (if available), and any prior internal audit/forensic reports.',
        'Other: litigation/contingencies list, insurance policies/claims, government grants/subsidies, and any covenants with lenders.'
      ],
    },
  ],
},

  'vat-returns-uae-uk': {
    included: [
    // Scope
    'Periodic VAT returns for UAE (FTA) and UK (HMRC)—review, compute, prepare, and e-file.',
    // Core work
    'Data prep & checks: map tax codes, reconcile sales/purchase/expense ledgers, bank, and gateway reports; identify zero-rated/exempt/RCM items.',
    'Adjustments & schemes: credit notes, bad-debt relief, partial exemption, capital goods adjustments (where applicable), and fuel/mileage rules (UK).',
    'Cross-border & special cases: reverse charge (imports/services), exports/zero-rating, distance sales/B2C rules (UK), designated zones (UAE), e-commerce marketplace treatment.',
    'Compliance pack: return working papers, exception logs, and management sign-off; filing on FTA/HMRC portals and payment guidance.',
    'Post-filing: acknowledgement, payment references, amendment/voluntary disclosure advice (where required), and next-period tracker.'
  ],
  timelines: [
    'UAE: monthly or quarterly per FTA assignment; return & payment typically due by the 28th day following the tax period.',
    'UK: monthly/quarterly as registered; MTD-compliant digital filing typically due 1 month + 7 days after period end; payment timelines per HMRC schedule.',
    'Internal SLA: workings shared 5–7 business days before statutory due date (subject to timely data); final filing on client approval.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Access & registration
        'Portal access: UAE FTA (TRN, login, OTP) and/or UK HMRC (VRN, MTD-authorised software access).',
        // Sales & receipts
        'Sales data: invoice register with VAT rates, credit notes, export/zero-rated evidence (shipping/AWB/BOL), Emirate-wise split (UAE) and supply place.',
        // Purchases & expenses
        'Purchase/expense register: supplier VAT numbers, tax codes, import VAT (customs/DI import statements—UAE; C79 certificates—UK), reverse charge entries.',
        // Reconciliations
        'Bank/gateway/wallet reports: POS/e-commerce settlements, fees/chargebacks; stock/inventory movement (if relevant).',
        // Special computations
        'Partial exemption/capital goods: method/policy, prior calculations, apportionment keys; bad-debt relief schedules.',
        // Organisation details
        'Business changes: new branches/warehouses, designated zone details (UAE), e-commerce marketplace arrangements, and any special schemes or HMRC directions.'
      ],
    },
  ],
},

  'irs-compliance-usa': {
    included: [
    'Entity & nexus review: C-Corp/S-Corp/LLC taxed as partnership/corporation; federal/state/locals, sales & use tax, payroll, and franchise tax applicability.',
    'Corporate/partnership returns: Form 1120 (C-Corp), 1120-S (S-Corp), 1065 (partnership/LLC), with state composite/affiliates as needed; e-filing & acknowledgements.',
    'Extensions & estimates: Form 7004 extensions; quarterly estimates (Forms 1120-WS/1040-ES equivalents for owners where relevant) and safe-harbor planning.',
    'State & local: income/franchise (e.g., CA, NY, TX), city/county business taxes, apportionment (sales/payroll/property) and P.L. 86-272 checks.',
    'Sales & use tax: registration, periodical returns, marketplace facilitation, exemption certificate management, and use-tax accruals.',
    'Payroll tax compliance: Forms 941/940, state unemployment/withholding, W-2/W-3, new-hire and EFTPS scheduling (processing via client payroll system or our partner platform).',
    'Information reporting: 1099-NEC/1099-MISC/1099-INT/1099-DIV (e-file & recipient delivery); Section 6041 reviews.',
    'Elections & notices: S-Corp election (Form 2553), 83(b) guidance for founders, IRS/state notice handling (simple) and penalty abatement requests (reasonable-cause).',
    'Deliverables: signed e-file forms, payment vouchers, workpapers, apportionment schedules, and a compliance calendar for the year.'
  ],
  timelines: [
    'Federal due dates (calendar year): 1120-S/1065 due Mar 15; 1120 due Apr 15 (extensions generally +6 months via Form 7004).',
    'Quarterly estimates (C-Corp): Apr 15, Jun 15, Sep 15, Dec 15; owners of pass-throughs: Apr 15, Jun 15, Sep 15, Jan 15.',
    'Payroll: Form 941 due last day of month after quarter end (Apr 30, Jul 31, Oct 31, Jan 31); Form 940 due Jan 31; W-2/W-3 due Jan 31.',
    '1099s: 1099-NEC due Jan 31 to recipients & IRS; 1099-MISC e-file by Mar 31 (paper Feb 28).',
    'Sales/use & state income/franchise: monthly/quarterly/annual per registration—returns prepared 5–7 business days before statutory due date on timely data.',
    'Internal SLA: draft federal/state returns within 7–10 business days of complete PBC set; final filing on client approval & payment.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Entity & access: EIN letter (SS-4/CP 575), prior-year federal/state returns, e-file authorisations, EFTPS access, state tax account logins.',
        'Financials: trial balance, GL, fixed-asset register & depreciation, bank/CC statements, loan schedules, inventory/COGS details, equity/cap table.',
        'Sales & payroll: sales by state (nexus mapping), marketplace reports, sales tax exemption certificates, payroll registers, quarterly payroll filings and year-end W-2 files.',
        'Apportionment inputs: property/payroll/sales by state, locations, and remote employee list.',
        'Information returns: vendor list with TIN/W-9 status, interest/dividend schedules, owner distributions/guaranteed payments.',
        'Elections & ownership: S-Corp eligibility (shareholders, classes of stock), 2553 status, 83(b) copies (if any).',
        'State & local specifics: registrations (withholding/SUTA/sales tax), franchise tax bases (e.g., TX margin), city/county accounts.',
        'Notices & payments: any IRS/state notices, prior penalties, proof of tax payments/estimates.'
      ],
    },
  ],
},

  'bookkeeping-payroll-company': {
    included: [
    'Onboarding & configuration: COA design, opening balances, master data (customers/suppliers/items), and system setup in Tally/Zoho/SAP/ERP (as applicable).',
    'Bookkeeping: day-to-day posting of sales/purchases/expenses/credit notes/receipts/payments; monthly bank/CC/wallet reconciliations; inter-company/branch reconciliations.',
    'Compliance-ready records: GST outward/inward registers, e-invoice/e-way bill tie-outs, TDS ledgers, fixed-asset register & depreciation, petty-cash controls, document indexing.',
    'AR/AP management: debtor/creditor ageing, dunning/collection support, vendor reconciliations, and GRN/3-way match advisory.',
    'Monthly MIS & controls: P&L, Balance Sheet, Cash Flow, variance analysis, KPIs, segment/branch reports, and management dashboards.',
    'Payroll processing: CTC structuring, attendance/leave import, earnings/deductions, reimbursements, full & final settlements, payslips, Form 12BA (perquisites) where applicable.',
    'Statutory payroll compliance: PF/ESI/PT/LWF (state-wise), TDS on salaries (24Q), challans & returns, Form 16 generation, investment declarations (Form 12BB) review.',
    'Year-end & audit support: schedules, ledger scrutiny, GL clean-up, audit PBCs, and support for statutory/tax/internal audits.',
    'Governance & security: maker-checker workflows, access control, shared DMS, periodic data backups, and SoPs for approvals.'
  ],
  timelines: [
    'Onboarding & opening balances: 3–7 business days from receipt of prior data and software/ERP access.',
    'Routine bookkeeping: weekly/fortnightly posting; books brought current by T+5 business days after month-end.',
    'Payroll cycle: inputs cutoff on client-approved date; payslips & payroll register within 2 business days of cutoff.',
    'Statutory filings: PF/ESI/PT/TDS/GST prepared and filed within statutory due dates on timely inputs/approvals.',
    'MIS pack: issued within 5–7 business days after month-end; quarter/year-end packs as scheduled with management.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Access & masters: accounting/ERP login (or backups), prior-year FS & trial balance, COA, customer/supplier/item masters, opening balances.',
        'Banking & transactions: bank/CC/wallet statements (CSV/PDF), payment gateway/POS reports, sales & purchase invoices, expense bills, contracts/SOWs, delivery challans.',
        'Tax portals & IDs: GST, Income-tax (TRACES), PF (EPFO), ESI, PT credentials; e-invoice/e-way bill access (if applicable).',
        'Fixed assets & loans: FAR with invoices/warranties, depreciation policy, loan sanctions & amortisation schedules, lease agreements.',
        'Payroll inputs: employee master & KYC, UAN/ESIC, bank details, CTC/grades, attendance/leave, reimbursements, F&F details, Form 12BB/investment proofs, HRA/rent proofs.',
        'Policies & approvals: expense/travel/leave policies, approval matrix, credit limits, related-party list, branch/segment mapping.',
        'Optional: inventory records (SKU/quantity/valuation), stock counts, inter-company/branch agreements for reconciliations.'
      ],
    },
  ],
},

  'income-tax-gst-compliance-company': {
    included: [
    // Income Tax (Companies)
    'Corporate return (ITR-6): computation (P&L/BS tie-out), depreciation, MAT/credit workings (as applicable), and e-filing with acknowledgements.',
    'Advance tax & self-assessment tax: quarterly computations, challans, and variance tracking versus budgets.',
    'TDS/TCS compliance: monthly challans (ITNS 281), quarterly returns—Form 24Q (salary), 26Q (non-salary), 27EQ (TCS); Form 16/16A/27D generation and TRACES reconciliations.',
    'Notices & rectifications: basic responses for processing/defect notices (e.g., 143(1)/139(9)) and online rectification u/s 154; complex representation billed separately.',

    // GST (Companies)
    'GST return cycle: scheme selection (Regular/QRMP), preparation & filing of GSTR-1, GSTR-3B, PMT-06 (QRMP), and GSTR-4 for Composition (if any subsidiary/branch).',
    'Reconciliations & controls: GSTR-2B-to-books ITC match, RCM computation, e-invoice/e-way bill tie-outs, HSN/SAC summary and vendor compliance follow-ups.',
    'Annual compliances: GSTR-9 and, where applicable, GSTR-9C assistance; ledgers (cash/credit) review and clean-up.',
    'Refunds & LUT: LUT for exports/SEZ, refund advisory for export/accumulated ITC/excess cash (representation handled separately if required).'
  ],
  timelines: [
    'Income Tax: advance tax per quarterly schedule; ITR-6 filed within statutory due date for the relevant AY.',
    'TDS/TCS: challans monthly as prescribed; quarterly returns filed within statutory due dates; Form 16/16A/27D issued post filing.',
    'GST Regular: GSTR-1/GSTR-3B monthly; QRMP—invoice uploads and PMT-06 monthly, returns quarterly; annual GSTR-9/9C after FY close.',
    'Internal SLA: draft computations/returns shared 5–7 business days before due dates on timely receipt of complete data; filings done on client approval.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Access & KYC
        'Entity & access: COI, PAN, MoA/AoA, authorised signatory list; Income-tax & GST portal credentials; Class-3 DSC for company signatory.',
        // Income Tax
        'Financials & ledgers: trial balance/GL, fixed-asset register & depreciation policy, bank/loan schedules, prior-year returns & assessments (if any).',
        'TDS/TCS: deductee/collectee master (PANs, addresses), salary files/payroll registers, vendor bills/contracts, challan proofs, and prior TRACES statements.',
        // GST
        'GST: registration certificate, principal & additional PoB details, HSN/SAC mapping; sales & purchase registers, debit/credit notes, import bills/BOE, RCM invoices.',
        'Reconciliations: GSTR-1/3B/2B downloads, e-invoice/e-way bill reports, vendor-wise ITC summary and blocked ITC flags.',
        // Optional/Special
        'Exports/SEZ: LUT/Bond, shipping bills, FIRC/BRC; refund working papers if any; branch/warehouse/SEZ unit details where relevant.'
      ],
    },
  ],
},

  'virtual-cfo-services': {
    included: [
    'Finance leadership: strategic planning, budgeting/forecasting, unit economics, pricing and cost-optimisation roadmap.',
    'Cash & working capital: 13-week cashflow, treasury/banking, credit terms, inventory/AR/AP cycle management.',
    'Monthly MIS & analytics: P&L, Balance Sheet, Cash Flow, variance analysis, KPIs/scorecards, segment/branch/product profitability.',
    'Board & investor reporting: quarterly packs, narrative insights, covenant monitoring, fund-raise/readiness support and data room curation.',
    'Policy, SOPs & controls: approval matrix, procurement/expense policies, internal controls and risk management framework.',
    'Compliance orchestration: calendar for GST/Income-tax/ROC/payroll; liaison with auditors, bankers and regulators.',
    'Systems & automation: ERP/accounting tool selection, implementation oversight, workflow automation and dashboarding.',
    'Advisory on transactions: capex/business cases, make-or-buy, pricing changes, term-sheet reviews (commercial), and post-deal integration support.'
  ],
  timelines: [
    'Onboarding & diagnostic: 3–5 business days to review books, processes and KPIs; CFO plan agreed with management.',
    'Monthly cadence: MIS/variance pack by T+5–7 business days; cashflow updated weekly (or as agreed).',
    'Quarterly: board/investor pack, rolling forecast and covenant review within 10 business days of quarter close.',
    'Annual: budget cycle and operating plan prepared in the last quarter of the prior FY; revisions mid-year as required.',
    'Ad-hoc: decision memos/analyses typically within 1–3 business days subject to data availability.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Access & history: ERP/accounting logins or backups, prior 2 years’ FS/MIS, trial balance/GL, chart of accounts.',
        'Banking & liquidity: bank/CC statements, loan sanctions & amortisation, covenants, treasury policies.',
        'Operating data: sales pipeline/CRM exports, pricing sheets, AR/AP ageing, inventory/WIP reports, major contracts/POs/SOWs.',
        'Budgets & KPIs: current year budget/OKRs, historical KPIs, branch/segment mappings and management reporting structure.',
        'Policies & governance: approval matrix, procurement/expense/credit policies, delegation of authority, risk register (if any).',
        'People & payroll: headcount/CTC files, organisation chart, payroll registers and incentive/ESOP schemes (if any).',
        'Compliance & portals: GST/Income-tax/ROC credentials, e-invoice/e-way bill access, lender/banker portals, auditor contacts.',
        'Optional: fundraising materials (pitch, cap table), data-room index, system architecture for automation projects.'
      ],
    },
  ],
},

  // PARTNERSHIPS (placeholders)
  'income-tax-return-partnership': {
    included: [
    'Form selection & computation: ITR-5 for Partnership Firms; income under all heads incl. business/profession, capital gains, house property, and other sources; old/new regime evaluation (where applicable).',
    'Business income: normal books-based computation or presumptive u/s 44AD (for eligible resident partnership firms—LLPs excluded); depreciation/allowable expenses; 40(b) partner interest & remuneration checks (limits & deed conditions).',
    'Partner mapping: allocation of profits, interest, and remuneration as per deed; partner-level reporting notes (exempt share u/s 10(2A) and taxable interest/remuneration u/s 28).',
    'Reconciliations: AIS/TIS/26AS tie-out; GST (GSTR-1/3B/2B) vs. books; TDS/TCS credits and advance-tax/self-assessment-tax.',
    'Capital gains & other items: securities/property workings, loss set-off/carry-forward, and Chapter VI-A deductions where eligible.',
    'Filing & verification: e-filing on the portal, e-verification (Aadhaar OTP/EVC/DSC) or ITR-V; acknowledgement & refund tracking; basic responses to processing/defect notices (detailed representation billed separately).'
  ],
  timelines: [
    'Preparation: 5–10 business days from receipt of complete data (longer if audit required).',
    'Statutory due dates: returns filed as per CBDT timelines for the AY; tax-audit cases aligned to s.44AB dates.',
    'Verification: complete e-verification/ITR-V submission within the prescribed window (currently 30 days).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Firm & partners KYC: PAN of firm and partners, Aadhaar of partners (for e-verification), partnership deed (latest amended copy), firm’s bank details for refund.',
        'Financials & ledgers: trial balance/GL, sales/purchase/expense registers, fixed-asset register & depreciation policy, loan schedules, cash book.',
        'Banking & tax: bank/CC statements (12 months), Form 26AS/AIS/TIS, advance-tax/SAT challans, TDS/TCS challans & prior returns (24Q/26Q/27EQ, if applicable).',
        'GST (if registered): GSTR-1/3B/2B downloads, e-invoice/e-way bill reports, RCM invoices, reconciliations.',
        'Partners’ workings: interest & remuneration computations as per deed (limits u/s 40(b)), capital contribution/change statements, drawings.',
        'Capital gains/other income (if any): broker statements/contract notes, property documents, dividend/interest statements.',
        'Supporting proofs: Chapter VI-A deduction proofs, loan/interest certificates, major contracts/POs, inventory/stock summaries (if relevant).'
      ],
    },
  ],
},

  'project-report-partnership': {
    included: [
    'Scope & lender fit: purpose of funding, facility type (Term Loan/WC/OD/CC), tenure, collateral, eligibility and partner guarantees.',
    'CMA data & projections: 3–5 year P&L, Balance Sheet, Cash Flow, Fund-Flow, Working Capital assessment with banker-ready CMA pack.',
    'Viability & ratios: DSCR/CFADS, Interest-Coverage, Current Ratio, BEP, operating cycle (inventory/receivables/payables) and covenant mapping.',
    'Assumptions & sensitivity: documented assumptions (growth, margins, credit period, capex), best/base/worst cases, EMI/repayment schedule.',
    'Business & partners profile: firm overview, partners’ backgrounds, industry snapshot, SWOT, risk mitigants, and compliance status (PAN/GST/Udyam).',
    'Documentation & annexures: quotations/invoices for capex, bank statement analysis, debtor/creditor ageing, stock summary, collateral details.',
    'Deliverables: lender-ready PDF + Excel model, executive note/cover letter, and support on portal/branch submission; responses to banker queries (representation beyond queries billed separately).'
  ],
  timelines: [
    'Diagnostic & data freeze: 1–2 business days from preliminary inputs.',
    'Draft report & model: 3–5 business days from complete documents.',
    'Finalisation & submission pack: 1–2 business days post feedback.',
    'Complex cases (multi-facility/large capex): add ~5–7 business days.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Firm & partners KYC: Firm PAN, partnership deed (latest), partners’ PAN/Aadhaar, contact details; Udyam & GST (if applicable).',
        'Financials: ITRs with computations (last 2–3 AYs), audited/unaudited FS, trial balance & ledgers.',
        'Banking: last 12 months bank statements for all operative/loan accounts; POS/gateway/UPI settlement reports (if relevant).',
        'Operations data: sales/purchase registers, debtor/creditor ageing, stock summary, major contracts/POs/LOIs, pricing & margin sheets.',
        'Funding specifics: amount, purpose, facility type & tenure, proposed collateral papers (property/FD/guarantee), vendor quotations/pro-forma invoices.',
        'Existing borrowings: sanction letters, repayment schedules, security/collateral details, EMI bounce track (if any).',
        'Compliance & credit: GST returns (GSTR-1/3B/2B), TDS status, any statutory dues; latest CIBIL for partners (or consent to pull).',
        'Assumptions inputs: growth plan, capacity/utilisation, hiring, key risks & mitigants; any lender covenants/preferences communicated.'
      ],
    },
  ],
},

  'digital-signature-certificates-partnership': {
  included: [
    'DSC issuance for Partnership Firms: Class 3 (Signing / Encryption / Combo), validity 1–3 years; token-based certificates with firm name tagging.',
    'eKYC & verification: Aadhaar OTP/PAN-based eKYC of partner, live video verification, photo capture, and consent logging per CA guidelines.',
    'Token & setup: FIPS-compliant USB crypto token (ePass/Watchdata), driver installation, certificate download/activation, and portal configuration.',
    'Use-cases enabled: MCA filings (for LLP/LLP partner if applicable), Income Tax/GST/TRACES, EPFO/ESIC, e-tenders/e-auctions/Gem, bank/PSU portals.',
    'Post-issuance support: renewal reminders, revocation/reissue (loss/compromise), DSC mapping on government portals, and basic troubleshooting.'
  ],
  timelines: [
    'Standard issuance: 2–24 hours from successful eKYC & video verification.',
    'Urgent issuance: same-day possible if eKYC completes before cut-off.',
    'USB token dispatch (if courier): 2–4 working days; immediate if client collects.',
    'Renewal: initiate ~30 days before expiry to avoid downtime.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Partner KYC: PAN, Aadhaar (with OTP on linked mobile), recent photo, email & mobile; one address proof if requested (Passport/Driving Licence/Voter ID/Utility Bill).',
        'Firm documents: PAN of partnership firm, partnership deed (latest amended copy), GST certificate or Udyam (if available).',
        'Authorisation: letter on firm letterhead authorising the partner as DSC applicant/authorised signatory; specimen signature.',
        'Registered office proof (if asked): utility bill/property tax/lease deed/NOC matching firm details.',
        'Existing token (for renewal/mapping): token make/serial and prior certificate details.',
        'Real-time checks: device with camera/mic, stable internet, original IDs handy for live video verification.'
      ],
    },
  ],
},

  'msme-udyam-registration-partnership': {
  included: [
    'Eligibility & classification: determine Micro/Small/Medium based on investment & turnover; select correct NIC codes.',
    'Application filing on Udyam portal using partner’s Aadhaar (OTP), Firm PAN, and GSTIN (if liable under GST).',
    'Data mapping: firm name, activity (manufacturing/services), address, bank, employment, and investment/turnover (auto-fetch from ITR/GSTR where available).',
    'Partnership specifics: capture deed details, partners’ particulars, and authorised signatory.',
    'Certificate delivery: downloadable Udyam Registration Certificate with QR code; guidance on updates/amendments and reprints.',
    'Post-registration guidance: benefits overview (PSL, tender relaxations/EMD exemptions where applicable, Govt. schemes) and linkage with Income-tax/GST/MCA records.'
  ],
  timelines: [
    'Standard filing: same day upon receiving complete details & OTP access.',
    'Certificate issue: typically within 1–2 business days (subject to portal availability).',
    'Migration from UAM (if any): usually same day after verification.',
    'Updates/amendments: generally same day post client confirmation.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Firm & partners: Firm PAN, partnership deed (latest), partner’s Aadhaar (linked mobile for OTP) and PAN, contact email & mobile.',
        'GST (if applicable): GSTIN and portal details (mandatory where the firm is liable under GST).',
        'Business details: trade name, nature of activity (manufacturing/services), main & additional NIC codes.',
        'Location & bank: principal place of business address (utility bill/ownership/rent deed/NOC, if asked) and bank account details.',
        'Financial info: recent ITR acknowledgement number and GSTR-3B (if applicable) to validate turnover; investment in plant & machinery/equipment.',
        'Employment data: number of employees (male/female/others) for record.',
        'Legacy info (if any): Udyog Aadhaar (UAM) for migration to Udyam.'
      ],
    },
  ],
},

  'gst-registration-partnership': {
    included: [
    'Eligibility & scheme selection: assess threshold/applicability; choose Regular or Composition (if eligible) for Partnership Firms.',
    'Application filing (REG-01): create GST portal profile, Aadhaar authentication of authorised signatory/partners, email/mobile OTP verification.',
    'Business profiling: nature of business, HSN/SAC mapping, principal & additional places of business, bank linking, and authorised signatory setup.',
    'Liaison & follow-up: ARN generation, reply to clarification notices (REG-03) with document uploads, coordination until approval (REG-06).',
    'Post-registration setup: first-time login, e-Invoice/e-Way Bill enablement (if applicable), invoice series/profile configuration, LUT for exports (on request).'
  ],
  timelines: [
    'Filing & ARN: same day from complete documents and OTP access.',
    'Department processing: typically 3–7 business days, subject to officer verification/clarifications.',
    'Clarification window: respond to REG-03 within 7 days to avoid rejection.',
    'Certificate (REG-06): issued upon approval; immediate commencement of post-registration setup.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Firm KYC: Partnership Firm PAN; partnership deed (latest amended copy).',
        'Authorised signatory: partner authorised by firm—PAN, Aadhaar (linked mobile for OTP), recent photo, email & mobile; authorisation/letter on firm letterhead.',
        'Partners’ details: PAN and address proofs of all partners (as asked during verification).',
        'Principal Place of Business (PoB): latest utility/municipal bill/property tax + ownership proof; if rented/leased—rent/lease deed and owner NOC; premise photos/geo-tag (if asked).',
        'Additional Places (if any): address proofs and usage documents similar to PoB (warehouses/branches).',
        'Bank proof: cancelled cheque or first page of passbook/bank statement showing firm name, account number, and IFSC.',
        'Business particulars: nature of supplies (goods/services), HSN/SAC list, expected turnover; optional Udyam/IEC/Shop & Establishment details.',
        'Digital Signature (optional but recommended): Class 3 DSC token for authorised signatory (if opting to sign via DSC).'
      ],
    },
  ],
},

  'bookkeeping-payroll-partnership': {
    included: [
    'Onboarding & configuration: chart of accounts aligned to partnership deed, opening balances, customer/supplier/item masters, setup in Tally/Zoho/ERP (as applicable).',
    'Bookkeeping: day-to-day posting of sales/purchases/expenses/credit notes/receipts/payments; monthly bank/CC/wallet reconciliations; partner current/capital account tracking.',
    'Compliance-ready records: GST outward/inward registers, e-invoice/e-way bill tie-outs, TDS ledgers, fixed-asset register & depreciation, petty-cash controls, and document indexing.',
    'AR/AP management: debtors/creditors ageing, dunning/collections support, vendor reconciliations, and GRN/3-way match advisory.',
    'Monthly MIS & analytics: P&L, Balance Sheet, Cash Flow, variance analysis, KPIs; partner capital movement and drawings summary.',
    'Payroll processing: structure CTC, attendance/leave import, earnings/deductions, reimbursements, F&F settlements, payslips.',
    'Statutory payroll compliance: PF/ESI/PT/LWF (state-wise), TDS on salaries (Form 24Q), challans & quarterly returns, Form 16 generation, Form 12BB review.',
    'Year-end & audit support: schedules, GL clean-up, audit PBCs, and support for tax/statutory/internal audits.',
    'Governance & security: maker–checker workflows, access control, shared DMS, periodic data backups, SOPs for approvals.'
  ],
  timelines: [
    'Onboarding & opening balances: 2–5 business days from receipt of prior data and software access.',
    'Routine bookkeeping: weekly/fortnightly posting; books current by T+5 business days after month-end.',
    'Payroll cycle: inputs cutoff on agreed date; payslips & payroll register within 2 business days of cutoff.',
    'Statutory filings: PF/ESI/PT/TDS/GST prepared and filed within statutory due dates on timely inputs/approvals.',
    'MIS pack: issued within 5–7 business days after month-end; quarter/year-end packs as scheduled.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Access & masters: accounting software/ERP login (or backups), prior-year FS & trial balance, chart of accounts, customer/supplier/item masters, opening balances.',
        'Firm & partners: Firm PAN, partnership deed (latest), partners list with roles; authorised signatory details for portals/banks.',
        'Banking & transactions: bank/CC/wallet statements (CSV/PDF), payment gateway/POS reports, sales & purchase invoices, expense bills, contracts/SOWs, delivery challans.',
        'Tax portals & IDs: GST, Income-tax (TRACES), PF (EPFO), ESI, PT credentials; e-invoice/e-way bill access (if applicable).',
        'Fixed assets & loans: FAR with invoices/warranties, depreciation policy, loan sanctions & amortisation schedules, lease agreements.',
        'Payroll inputs: employee master & KYC, UAN/ESIC, bank details, CTC/grades, attendance/leave, reimbursements, F&F details, investment proofs (Form 12BB), HRA/rent proofs.',
        'Policies & approvals: expense/travel/leave policies, approval matrix, credit limits, related-party list, branch/segment mapping.',
        'Optional: inventory records (SKU/quantity/valuation), stock counts, inter-branch reconciliations, and compliance calendars.'
      ],
    },
  ],
},

  'financial-statements-partnership': {
    included: [
    'Scope: year-end/periodic Financial Statements for Partnership Firms—Profit & Loss, Balance Sheet, Cash Flow (indirect), Notes & Schedules.',
    'Books-to-FS conversion: ledger scrutiny, accruals/deferrals, provisions (expenses/gratuity/leave where applicable), prepaid/advance adjustments, balance confirmations.',
    'Partner-specific reporting: partner capital/current accounts, drawings, interest & remuneration presentation per deed and tax limits (disclosure only).',
    'Inventory & revenue: stock valuation (cost/NRV), WIP/job roll-forward, cut-off checks, credit/debit notes review post period.',
    'Fixed assets & borrowings: FAR update, additions/disposals, depreciation as per accounting policy; loan balance/interest accrual and covenant checks.',
    'Tax & statutory tie-outs: GST (GSTR-1/3B/2B) vs books, TDS ledgers (TRACES/26AS), payroll registers and other statutory dues mapping.',
    'Policies & compliance: accounting policies (ICAI AS/Guidance for non-corporates), related-party identification, contingent liabilities/commitments.',
    'Deliverables: signed PDF set + editable Excel schedules, comparative figures, key ratios/MIS summary, and management representation letter template.'
  ],
  timelines: [
    'Onboarding & data review: 2–3 business days from receipt of trial balance and prior-year FS.',
    'Draft FS: 5–7 business days after complete ledgers/supports & reconciliations (bank/stock/GST).',
    'Management review & revisions: 1–2 business days per iteration.',
    'Quarterly/interim packs (if opted): 5–7 business days from period close.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Trial balance & ledgers for the period; prior-year FS and closing schedules.',
        'Bank/CC/wallet statements with reconciliations; cash book & physical cash count (if any).',
        'Inventory details: item-wise quantity/rate, valuation method, WIP/FG rolls; stock counts/third-party confirmations (if available).',
        'Fixed Asset Register with invoices, disposal papers, and depreciation policy.',
        'Loans & advances: sanction letters, amortisation schedules, balance confirmations, interest workings.',
        'Revenue & purchases: sales/purchase registers, major contracts/POs, returns/credit notes log, pricing/policy notes.',
        'Statutory tie-outs: GST (GSTR-1/3B/2B), TDS/TCS challans & returns, payroll registers (PF/ESI/PT), Form 26AS.',
        'Partnership specifics: latest partnership deed (and amendments), partners list with capital movements/drawings, interest & remuneration workings.',
        'Other: expense agreements (rent/services), insurance, contingencies/claims list, related-party details, and management representation.'
      ],
    },
  ],
},

  'income-tax-gst-compliance-partnership': {
    included: [
    // Income Tax (Partnership Firms)
    'Return preparation & filing: ITR-5 for Partnership Firms with computation of income (business/profession, capital gains, house property, other sources).',
    'Partner items: interest & remuneration working as per deed and s.40(b) limits; profit allocation and disclosure of partner-wise share.',
    'Advance/self-assessment tax: quarterly estimates, challans, and variance tracking.',
    'TDS/TCS compliance (if applicable): monthly challans (ITNS 281), quarterly returns—Form 24Q (salary), 26Q (non-salary), 27EQ (TCS); Form 16/16A/27D and TRACES reconciliations.',
    'Notices & rectifications: basic responses to processing/defect notices (e.g., 143(1)/139(9)) and online rectification u/s 154 (detailed representation billed separately).',

    // GST (Partnership Firms)
    'GST return cycle: scheme selection (Regular/QRMP/Composition), preparation & filing of GSTR-1, GSTR-3B, PMT-06 (QRMP) and GSTR-4 (Composition, if opted).',
    'Reconciliations & controls: GSTR-2B-to-books ITC match, RCM computation, e-invoice/e-way bill tie-outs, HSN/SAC summary, vendor compliance follow-ups.',
    'Annual compliances: GSTR-9 and, where applicable, GSTR-9C assistance; ledger (cash/credit) review and clean-up.',
    'Refunds & LUT: LUT for exports/SEZ; advisory for export/accumulated ITC/excess cash refunds (representation handled separately if required).'
  ],
  timelines: [
    'Income Tax: advance tax as per quarterly schedule; ITR-5 filed within statutory due date for the relevant AY.',
    'Verification: complete e-verification/ITR-V submission within the prescribed window after filing.',
    'TDS/TCS: challans monthly; quarterly returns and certificates within statutory due dates.',
    'GST Regular: GSTR-1/GSTR-3B monthly; QRMP—invoice uploads and PMT-06 monthly, GSTR-1/3B quarterly; Composition—CMP-08 quarterly and GSTR-4 annually.',
    'Annual GST: GSTR-9/9C post FY close; reconciliations prepared 5–7 business days before due dates subject to timely data.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Access & KYC
        'Firm & partners: Firm PAN, latest partnership deed/amendments, partners’ PAN/Aadhaar (for e-verification), authorised signatory details; bank account for refunds.',
        'Portal access: Income-tax & GST credentials; DSC/EVC for authorised signatory; TRACES access for TDS.',
        // Income Tax
        'Financials & ledgers: trial balance/GL, sales/purchase/expense registers, fixed-asset register & depreciation policy, bank/loan schedules, prior-year return & assessments (if any).',
        'TDS/TCS: deductee/collectee master (PANs), salary files/payroll registers, vendor contracts/bills, challan proofs, prior TDS/TCS statements.',
        // GST
        'GST data: registration certificate, principal & additional PoB details, HSN/SAC mapping; sales & purchase registers, debit/credit notes, import bills/BOE, RCM invoices.',
        'Reconciliations: GSTR-1/3B/2B downloads, e-invoice/e-way bill reports, vendor-wise ITC summary and blocked ITC flags.',
        // Optional/Special
        'Exports/SEZ (if any): LUT/Bond, shipping bills, FIRC/BRC; refund workings; warehouse/branch/SEZ unit details where relevant.'
      ],
    },
  ],
},

  'virtual-cfo-partnership': {
    included: [
    'Finance leadership: strategic planning, budgeting/forecasting, unit economics, pricing and cost-optimisation for partnership firms.',
    'Cash & working capital: 13-week cashflow, treasury/banking, partner drawings planning, inventory/AR/AP cycle management.',
    'Monthly MIS & analytics: P&L, Balance Sheet, Cash Flow, variance analysis, KPIs; partner capital/current account movement and profitability by product/branch.',
    'Board/partner reporting: quarterly packs, narrative insights, covenant monitoring for bank facilities, fund-raise/readiness support and data room curation.',
    'Policy, SOPs & controls: approval matrix, procurement/expense policies, revenue recognition/credit controls, internal control framework.',
    'Compliance orchestration: calendar for GST/Income-tax/TDS/payroll; coordination with auditors, bankers and regulators.',
    'Systems & automation: accounting/ERP selection, implementation oversight, process automation and dashboards.',
    'Advisory & transactions: business cases for capex, pricing changes, make-or-buy, partner admission/retirement economics, and post-deal integration support.'
  ],
  timelines: [
    'Onboarding & diagnostic: 3–5 business days to review books, processes and KPIs; CFO plan agreed with partners.',
    'Monthly cadence: MIS/variance pack by T+5–7 business days; cashflow updated weekly (or as agreed).',
    'Quarterly: partner review deck, rolling forecast and bank covenant review within 10 business days of quarter close.',
    'Annual: budget/operating plan prepared in the last quarter of prior FY; mid-year revisions as needed.',
    'Ad-hoc: decision memos/analyses typically within 1–3 business days subject to data availability.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Access & history: accounting/ERP logins or backups, prior 2 years’ FS/MIS, trial balance/GL, chart of accounts.',
        'Partnership specifics: latest partnership deed & amendments, partners list/roles, capital contribution and drawings history.',
        'Banking & liquidity: bank/CC statements, loan sanctions & amortisation, covenants, treasury policies.',
        'Operating data: sales pipeline/CRM, pricing sheets, AR/AP ageing, inventory/WIP, major contracts/POs/SOWs.',
        'Budgets & KPIs: current-year budget/OKRs, historical KPIs, branch/segment mappings and reporting hierarchy.',
        'Policies & governance: approval matrix, procurement/expense/credit policies, delegation of authority, risk register (if any).',
        'People & payroll: employee master & CTC, organisation chart, payroll registers and incentive/ESOP-equivalent schemes (if any).',
        'Compliance & portals: GST/Income-tax/TRACES credentials, e-invoice/e-way bill access, lender/banker portals, auditor contacts.',
        'Optional: fundraising materials (pitch, ratios), data-room index, system architecture for automation.'
      ],
    },
  ],
},

  'bank-loan-advisory-partnership': {
    included: [
    'Eligibility & product fit: assess need and map to Term Loan / Working Capital (CC/OD) / Machinery Loan / LAP / Govt-backed schemes (e.g., CGTMSE, MUDRA/PMEGP where applicable); partner guarantees/collateral strategy.',
    'CMA pack & financial model: banker-ready CMA data with 3–5 year projections (P&L, Balance Sheet, Cash Flow, Fund-Flow, Working Capital assessment) and covenant mapping.',
    'Ratio analytics & viability: DSCR/CFADS, Interest-Coverage, Current Ratio, BEP, operating cycle (inventory/receivables/payables), sensitivity to seasonality.',
    'Scenarios & stress tests: best/base/worst cases; sensitivities on sales, margins, debtor days, interest/FX (if relevant); moratorium/repayment shaping.',
    'Repayment & structure: EMI/structured amortisation, drawing power, collateral coverage, margin money, partner capital alignment; term sheet review & negotiation support.',
    'Application & follow-up: documentation checklist, portal/branch filing, lender clarifications and coordination till sanction (post-sanction compliances billed separately).',
    'Deliverables: lender-ready Excel model + CMA pack + executive note/cover letter; optional pitch deck for banker presentation.'
  ],
  timelines: [
    'Diagnostic & requirement freeze: 1–2 business days from preliminary data.',
    'Model & CMA pack (draft): 3–5 business days from complete documents.',
    'Finalisation & application filing: 1–2 business days post feedback.',
    'Lender processing: typically 7–21 business days subject to credit/valuation/legal; clarifications handled on priority.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Firm & partners KYC: Partnership Firm PAN; latest partnership deed & amendments; partners’ PAN/Aadhaar, photos, contact details.',
        'Financials: ITRs with computations (last 2–3 AYs), audited/unaudited financial statements, trial balance & ledgers.',
        'Banking: last 12 months bank statements for all operative/loan accounts; gateway/POS/UPI settlement reports (if relevant).',
        'Business profile: nature of activity, key customers/suppliers, order book/POs/LOIs, pricing & margin sheets, capacity/utilisation.',
        'Working capital data: inventory/stock summaries, debtors/creditors ageing, credit terms, major expense/lease contracts.',
        'Existing borrowings: sanction letters, repayment schedules, security/collateral details, DP statements, EMI bounce history (if any).',
        'Collateral/capex (if applicable): property papers (title/encumbrance/tax receipts), machinery quotations/invoices, pro-forma for new assets, valuations (if available).',
        'Compliance & credit: GST returns (GSTR-1/3B/2B), TDS status, statutory dues position; latest CIBIL for partners (or consent to pull).',
        'Assumptions inputs: growth plan, pricing strategy, hiring/capex roadmap, risks & mitigants; any lender covenants/preferences shared.'
      ],
    },
  ],
},

  // NON-PROFITS (placeholders)
  'trust-society-sec8-registration': {
    included: [
    'Entity advisory: choose form—Public Charitable Trust, Society (Societies Registration Act, 1860/state law), or Section 8 Company (Companies Act, 2013); object & activity scoping.',
    'Name clearance & drafting: name strategy; draft Trust Deed / Memorandum of Association & Rules-Byelaws (Society) / e-MoA–e-AoA (Section 8) with governance, dissolution, and compliance clauses.',
    'Registrations & filings: Trust Deed stamping & registration before Sub-Registrar; Society registration with Registrar of Societies; Section 8 incorporation via SPICe+ (name, Part B, eMoA/eAoA, DIN, PAN/TAN).',
    'DSC & DIN facilitation: Class 3 DSCs for authorised signatories; DIN allotment for Section 8 directors through SPICe+.',
    'Office & compliances: registered office proof/NOC, executive committee/board constitution, bank A/c opening support.',
    'Post-formation onboarding (on request): Income-tax 12A & 80G application (Form 10A/10AB), CSR-1 enrolment (implementing agency), DARPAN/NGO portal, FCRA advisory (eligibility & timing).',
    'Deliverables: registration certificate/COI & license (Section 8), stamped Trust Deed/MoA–Rules, master data print, specimen resolutions and first meeting minutes templates.'
  ],
  timelines: [
    'Name reservation: typically 1–3 business days (Registrar/MCA).',
    'Public Charitable Trust: deed execution & Sub-Registrar registration scheduled within 2–5 business days; certificate entry typically 5–15 business days thereafter (state-dependent).',
    'Society: 10–20 business days from complete set & submission to Registrar (state-dependent).',
    'Section 8 Company: 7–15 business days post complete documents & SPICe+ submission (MCA processing).',
    'Post-formation add-ons (12A/80G/CSR-1/DARPAN): filings initiated immediately after registration; approval timelines as per department.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Common (all three forms)
        'Promoters/office-bearers: PAN, Aadhaar/Passport, recent address proof (≤3 months), photos, email & mobile.',
        'Registered office: latest utility bill/property tax and ownership proof; if rented—rent/lease deed + owner NOC; premise photos if asked.',
        'Objects & governance: note on charitable objects, proposed activities/beneficiaries, proposed governing body/board with designations.',
        // Trust-specific
        'Trust: draft Trust Deed (settlor, trustees, objects, powers), settlor ID/address, initial corpus/cheque copy, two witnesses’ IDs (state practice), stamp duty as per state.',
        // Society-specific
        'Society: list of at least seven members (state norms may vary) with KYC; draft MoA & Rules/Byelaws signed by members; list of governing body/executive committee; affidavit/consent forms as prescribed by Registrar.',
        // Section 8 Company-specific
        'Section 8: subscriber/director KYC, DIN (if already allotted) or details for DIN through SPICe+, declarations of non-profit objects; e-MoA (INC-33) & e-AoA (INC-34) inputs; brief activity plan & projected receipts/expenditure; board/consent resolutions if any body corporate is a subscriber.',
        // Digital execution & banking
        'Digital signatures: Class 3 DSC for authorised signatories (mandatory for Section 8, recommended for others).',
        'Banking & PAN: bank KYC for account opening; PAN application for Trust/Society post registration (Section 8 receives PAN/TAN with COI).'
      ],
    },
  ],
},

  '12a-80g-registration': {
    included: [
    'Advisory & eligibility: map your NGO (Trust/Society/Section 8 Company) to the correct regime—Income-tax registration u/s 12AB and approval u/s 80G.',
    'Form preparation & filing: Form 10A for fresh/provisional/initial registration; Form 10AB for renewal/regularisation/changes (as applicable).',
    'Compilation of annexures: founding documents, objects, activity note, financials, bank details, trustee/board KYC, and declarations as per rules.',
    'Query handling: respond to Income-tax portal clarifications/notices and liaison till order is issued.',
    'Deliverables: 12AB registration order, 80G approval order (if opted), and compliance pack—donation receipt format, 80G disclosure lines, and annual filing calendar.',
    'Post-approval guidance: donor reporting—Form 10BD upload and issuance of Form 10BE certificates; renewals/amendments tracking.'
  ],
  timelines: [
    'Drafting & portal filing: 3–5 business days from complete documents.',
    'Department processing: subject to Income-tax review timelines; we monitor and address queries promptly.',
    'Post-approval onboarding: donation receipt formats and 10BD/10BE calendar issued immediately after orders.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Constitutional documents: Trust Deed / Society MoA & Rules / Section 8 MoA–AoA, along with registration certificate (Registrar/Sub-Registrar/MCA).',
        'PAN of NGO and address proof of registered office (utility bill/property tax/lease + owner NOC if rented).',
        'Trustees/office-bearers/directors: PAN, Aadhaar/ID, address proof, photos, email & mobile.',
        'Activity & governance: note on charitable objects and proposed/ongoing activities; details of governing body/board; minutes/resolutions authorising application.',
        'Financials: audited/unaudited financial statements (up to last 3 years, if available); bank statements/cancelled cheque for account validation.',
        'Compliance status (if any): prior 12A/80G orders or provisional registration, amendments to deed/objects, FCRA/DARPAN/CSR-1 details (optional, if available).',
        'Digital execution: Income-tax portal credentials, DSC/EVC of authorised signatory, and specimen signature/seal for annexures.'
      ],
    },
  ],
},

  'fcra-registration-compliance': {
    included: [
    'Advisory & eligibility: determine whether to seek FCRA Registration or Prior Permission; activity/object fit and governance readiness.',
    'Portal filings: prepare and file FC-3A (Registration) or FC-3B (Prior Permission); FC-3C for renewals as due.',
    'Banking setup: open the mandatory FCRA “receiving” account at SBI, New Delhi Main Branch (Sansad Marg) and map permissible utilisation account(s).',
    'KYC & declarations: key functionaries’ KYC, organisation disclosures, beneficiary/activity note, donor details (for Prior Permission), and requisite affidavits/undertakings.',
    'Compliance framework: separate books for foreign contribution, utilisation controls, donor-wise purpose tracking, website disclosures, and record-keeping per FCRA Rules.',
    'Change intimations: prepare and file FC-6 forms (variants) for changes in name/addr/bank/key functionaries/objects within prescribed timelines.',
    'Annual & periodic filings: FC-4 annual return (with statements/certifications) and quarterly disclosures on receipts/utilisation on the organisation’s website.',
    'Deliverables: acknowledgement copies, filed forms, bank coordination pack, compliance calendar, and SOPs for receipts/utilisation.'
  ],
  timelines: [
    'Diagnostic & document freeze: 2–4 business days from preliminary review.',
    'Application filing (FC-3A/FC-3B): 3–7 business days from complete documents and portal access.',
    'Bank account setup: FCRA receiving account at SBI NDMB opened as per bank TAT; utilisation account mapping immediately after.',
    'Post-filing liaison: responses to queries/deficiencies handled on priority until order is issued; renewals/compliance as per statutory due dates.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Constitutional docs: Trust Deed / Society MoA–Rules / Section 8 MoA–AoA; registration certificate (Registrar/Sub-Registrar/MCA).',
        'Organisation KYC: PAN, registered office proof (utility bill/property tax/lease + owner NOC if rented), active email & mobile.',
        'Key functionaries: PAN/Aadhaar or Passport, address proof, photos, designations; Board/GB resolution authorising application.',
        'Activity & plan: note on objects/beneficiaries, last 3 years’ activities and impact (if any), proposed programmes for foreign contribution.',
        'Financials & bank: audited/unaudited financials (up to 3 years, if available), existing bank details, cancelled cheque; SBI NDMB account opening forms (for FCRA receiving account).',
        'Donor specifics (Prior Permission): commitment letter(s) with donor identity, country, amount, purpose, and project document/budget.',
        'Disclosures & undertakings: non-contravention declarations, related-party/office-bearer disclosures, and any required affidavits as per FCRA Rules.',
        'Digital execution: FCRA portal credentials, Class 3 DSC/EVC of authorised signatory, and specimen signatures/seal.'
      ],
    },
  ],
},

  'usa-501c3-registration': {
    included: [
    'Entity advisory: choose state of formation; public charity vs. private foundation positioning; eligibility for Form 1023-EZ vs. Standard 1023.',
    'State formation: draft & file non-profit Articles with 501(c)(3) purpose and dissolution clauses; registered agent setup; initial board resolutions.',
    'Governing documents: Bylaws, Conflict-of-Interest policy, Whistleblower/Document-Retention (best practice), and officer/director appointments.',
    'EIN & IRS exemption: obtain EIN; prepare narrative of activities, budgets, schedules; file IRS Form 1023 or 1023-EZ; respond to IRS follow-ups until determination letter.',
    'State registrations: charitable solicitation registration (where required), state income/sales-tax exemptions (as applicable).',
    'Post-approval toolkit: IRS determination letter, donor-receipt templates (substantiation/quid-pro-quo), compliance calendar, and basic accounting/tier-990 guidance.',
    'Ongoing compliance orientation: Form 990/990-EZ/990-N, state annual reports/charitable renewals; UBIT awareness; BOI/CTA assessment (exemption review).'
  ],
  timelines: [
    'State formation: same day to 3 business days (expedite available in many states).',
    'EIN: immediate (online) to 1–3 business days (fax/foreign responsible party).',
    'IRS recognition: Form 1023-EZ typically 2–6 weeks; Standard Form 1023 commonly 2–6 months (case-specific).',
    'State charitable/tax exemptions: generally 2–8 weeks post filing, depending on state.',
    'Internal SLA: drafts within 3–5 business days from complete inputs; filings made upon client approval.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Founders/board: IDs (passport/driver’s license), addresses, emails/phones; brief bios and roles.',
        'Organisation details: proposed name(s), principal address, charitable purpose, initial programs/beneficiaries, service area.',
        'Articles & policies inputs: purpose/dissolution language (we provide), director/officer slate, Bylaws preferences, Conflict-of-Interest acknowledgements.',
        'Financials & plan: 3-year projected budget (revenue by source and expenses), funding plan, prior activity summary (if already operating).',
        'EIN/IRS: responsible party details, prior EIN (if any), answers for Form 1023/1023-EZ eligibility, schedules for grants/activities/affiliations.',
        'State registrations: list of states soliciting donations, fundraising methods (events/online/grants), contracts with fundraisers (if any).',
        'Banking & records: bank KYC info (post-formation), accounting method, fiscal year selection, document-retention and whistleblower acknowledgements.',
        'Optional/exemptions: sales/use-tax exemption applications, property tax (if applicable), BOI/CTA status review materials.'
      ],
    },
  ],
},

  'ngo-licensing-uae': {
    included: [
    'Advisory: choose appropriate UAE jurisdiction and legal route for non-profit/social entity; scope of activities and geographic coverage.',
    'Name clearance & drafting: constitution/charter, bylaws/governance, board/office-bearer roles, conflict-of-interest and dissolution clauses.',
    'Licensing application: prepare and file with the competent authority (federal/emirate-level), including forms, undertakings, and supporting annexures.',
    'Office setup: registered office/lease or approved address; authorised signatories and specimen signatures.',
    'Fundraising permissions (where applicable): apply for activity/event/online fundraising permits with the relevant authority; donation receipt and compliance protocols.',
    'Banking & compliance: corporate bank account application support with KYC/UBO pack; compliance calendar for periodic filings/renewals and disclosure obligations.',
    'Add-ons (on request): VAT registration (if applicable to activities), basic accounting setup, and policy/SOP pack for receipts, utilisation, and reporting.'
  ],
  timelines: [
    'Diagnostic & document freeze: 2–4 business days from preliminary review.',
    'Name/document drafting & application: 5–10 business days from complete inputs.',
    'Authority processing: typically 2–8 weeks subject to jurisdiction, background checks, and clarifications.',
    'Fundraising permits (if required): generally 5–15 business days post licence/approval.',
    'Bank account: usually 1–3 weeks post licence and KYC completion (bank timelines may vary).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Founders/office-bearers: passports, recent photos, current address proof, UAE entry stamp/visa (if any), email & mobile; CV/brief bios (if asked).',
        'Organisation particulars: proposed name(s), charitable/purpose statement, activity plan, beneficiaries and target geography.',
        'Governance & resolutions: draft bylaws/constitution, list of board/committee members with roles; resolutions authorising application and signatories.',
        'Registered address: lease/EJARI or proof of premises; landlord NOC (if required).',
        'Compliance pack: source-of-funds/wealth summary for founders (bank KYC), UBO declarations, sanctions/PEP checks (as required by bank/authority).',
        'Financials (if existing): past activity/financial statements (if any), projected budget and funding sources.',
        'Local liaison: authorised representative details/POA, and any additional forms/undertakings prescribed by the authority.',
        'Digital execution: scans of signed forms, specimen signatures/seal, and readiness for video/tele verification if scheduled.'
      ],
    },
  ],
},

  'ngo-audits': {
    included: [
    // Scope & planning
    'Engagement & scope: statutory financial audit (as applicable), tax audit/reporting for charitable entities (Form 10B/10BB, where required), FCRA compliance review, and donor/grant-specific compliance audits.',
    'Risk assessment & plan: understanding programmes, internal controls, fund-flow, procurement, and sub-granting; audit plan with sampling and site visits (if needed).',
    // Fieldwork
    'Books & controls testing: ledger/sub-ledger reviews, bank reconciliations, fund accounting (project-wise), budget vs. actuals, fixed assets, advances/settlements, inventory, and payroll.',
    'Compliance checks: 12AB/80G conditions, utilisation restrictions, FCRA (receipts/utilisation, bank accounts, FC-6 changes), statutory dues (TDS/GST/EPF/ESI), and grant agreement covenants.',
    'Donor-specific procedures: eligibility of costs, procurement & vendor due diligence, time-sheet/payroll allocability, travel/event costs, asset tagging, counterpart funding, visibility/branding requirements.',
    // Reporting
    'Deliverables: Independent Auditor’s Report/financial statements (as applicable), management letter with observations & recommendations, grant-wise utilisation certificates (UCs)/SoE, donor compliance checklist, and corrective action plan.',
    'Follow-up & support: exit meeting with board/management, response matrix for findings, and limited assistance on regulator/donor queries post-issue.'
  ],
  timelines: [
    'Kick-off & PBC list: within 2 business days of engagement confirmation.',
    'Planning & walkthroughs: 3–5 business days after receipt of preliminary data.',
    'Fieldwork: 5–12 business days (size/site locations dependent).',
    'Draft reports & management responses: 3–5 business days post fieldwork.',
    'Final reports & filings: on receipt of signed financials/representations; donor and statutory reports issued within agreed deadlines (e.g., Form 10B/10BB, FC-4 support where engaged).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        // Organisation & governance
        'Constitutional docs: Trust Deed / Society MoA–Rules / Section 8 MoA–AoA; registration certificates; 12AB/80G approval orders; FCRA registration/prior-permission (if any).',
        'Governance records: board/GB minutes & resolutions, organisational chart, policies (finance, procurement, travel, HR, safekeeping, conflict of interest).',
        // Financials & ledgers
        'Trial balance/GL, project-wise ledgers, cash/bank books, prior-year financials & audit reports, management representations.',
        'Banking: bank statements & reconciliations for all accounts (including FCRA receiving/utilisation), fixed deposits, investment statements, and confirmations.',
        // Grants & programmes
        'Grant agreements/MOUs, approved budgets & amendments, donor guidelines, SoE formats, programme reports (M&E), sub-granting/partner MOUs and reports.',
        'Procurement & assets: procurement files (RFQ/bids/evaluations), purchase orders, GRNs, asset register with tagging, disposal/transfer approvals.',
        // Payroll & HR
        'Payroll registers, time-sheets/allocation bases, contracts/CTC, HR policies, benefits, and reimbursements.',
        // Statutory & tax
        'FCRA filings/support (FC-4, FC-6 change intimations), 12AB/80G filings, TDS returns/challans, GST returns (if registered), EPF/ESI returns and challans.',
        // Other
        'Advance registers (staff/partners), utilisation certificates/CA certificates issued earlier, insurance policies/claims, litigations/contingencies list.'
      ],
    },
  ],
},

  'bookkeeping-payroll-ngo': {
    included: [
    'Onboarding & configuration: fund/project accounting setup, chart of accounts aligned to programmes/donors, opening balances, master data (beneficiaries/vendors/employees), system setup in Tally/Zoho/ERP.',
    'Bookkeeping: day-to-day posting of receipts/payments/JVs; donor/project-wise ledgers; advances & settlements; monthly bank/FD reconciliations; foreign contribution ledgers (if FCRA-registered).',
    'Grant controls & reporting: budget vs actual (BvA) by grant, SoE/UC preparation, restricted vs unrestricted fund tracking, cost allocations (overheads/shared costs) as per donor policies.',
    'Compliance-ready records: TDS ledgers & challans, GST (if registered) outward/inward registers, FCRA receiving/utilisation segregation, fixed-asset register & depreciation, document indexing/DMS.',
    'Monthly MIS & governance: Receipts & Payments, Income & Expenditure, Balance Sheet, cash flow, programme dashboards/KPIs, and exception logs.',
    'Payroll processing: structure CTC, timesheets/cost allocability to projects, earnings/deductions, reimbursements, F&F settlements, payslips.',
    'Statutory payroll compliance: PF/ESI/PT/LWF (state-wise), TDS on salaries (Form 24Q), challans & returns, Form 16; Form 12BB/investment proof review.',
    'Year-end & audit support: schedules, GL clean-up, grant-wise confirmations, support for statutory/FCRA/tax/donor audits, and response matrices.'
  ],
  timelines: [
    'Onboarding & opening balances: 3–7 business days from receipt of prior data and software access.',
    'Routine bookkeeping: weekly/fortnightly posting; books current by T+5 business days after month-end.',
    'Payroll cycle: inputs cutoff on agreed date; payslips & payroll register within 2 business days of cutoff; timesheet consolidation by T+3.',
    'Statutory filings: PF/ESI/TDS/GST/FCRA-related schedules prepared and filed within due dates on timely inputs/approvals.',
    'MIS & grant reports: monthly MIS and BvA/SoE shared within 5–7 business days after month-end (earlier on request).'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Access & masters: accounting/ERP login (or backups), prior-year audited FS & trial balance, chart of accounts, project/donor codes, beneficiary/vendor/employee masters.',
        'Registrations & approvals: Trust/Society/Section 8 registration, PAN, 12AB/80G orders, FCRA registration/prior-permission (if any), GST registration (if applicable).',
        'Banking & transactions: bank/FD statements (CSV/PDF) incl. FCRA accounts, payment gateway reports, receipts & payment vouchers, contracts/MOUs, grant/PO files.',
        'Grant documentation: donor agreements, approved budgets & amendments, cost allocation rules, reporting templates (SoE/UC), milestone schedules.',
        'Tax portals & IDs: Income-tax/TRACES, EPFO, ESIC, PT, GST (if registered) credentials; DSC/EVC for authorised signatory.',
        'Fixed assets & leases: FAR with invoices/tagging, depreciation policy, lease agreements, insurance policies.',
        'Payroll inputs: employee KYC, CTC/grades, attendance/timesheets, reimbursements, bank details, investment proofs (Form 12BB), HRA/rent proofs.',
        'Policies & governance: procurement/finance/HR/travel policies, approval matrix, related-party list, risk register (if any).',
        'Optional: inventory/stock registers for programmes, sub-grant partner reports & utilisation statements, and compliance calendars.'
      ],
    },
  ],
},

  'financial-statements-ngo': {
    included: [
    'Scope: year-end/periodic FS for NGOs/Trusts/Societies/Section 8—Receipts & Payments, Income & Expenditure, Balance Sheet, Notes & Schedules; project/donor-wise annexures.',
    'Fund accounting: segregation of restricted vs. unrestricted funds, endowments, designated funds; grant-wise opening/receipts/expenses/closing tracking.',
    'Books-to-FS conversion: ledger scrutiny, accruals/deferrals, provisions (expenses/gratuity/leave where applicable), prepaid/advances, donor settlements, balance confirmations.',
    'Revenue & recognition: grant income recognition as per conditions/milestones, BvA tie-out, cut-off checks, post-period credit/debit notes.',
    'FCRA & local funds: separate ledgers and schedules for FC receipts/utilisation; bank reconciliations and movement statements.',
    'Assets & liabilities: FAR update (additions/disposals/tagging), depreciation per policy; loan/advance/FD schedules, interest accruals, payables & statutory dues.',
    'Policies & compliance: accounting policies for NPOs, related-party disclosures, contingencies/commitments; alignment with donor terms where applicable.',
    'Deliverables: signed PDF set + editable Excel schedules; grant-wise SoE/UC-ready extracts, key ratios/KPIs, and management representation letter template.'
  ],
  timelines: [
    'Onboarding & data review: 2–4 business days from receipt of trial balance, grant list, and prior-year FS.',
    'Draft FS: 5–8 business days after complete ledgers/supports & reconciliations (bank/FCRA/grants).',
    'Management review & revisions: 1–2 business days per iteration.',
    'Interim/quarterly packs (if opted): 5–7 business days from period close.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Trial balance & ledgers for the period; prior-year audited FS and closing schedules.',
        'Bank/FD statements & reconciliations for domestic and FCRA accounts; cash book and physical cash count (if any).',
        'Grant documentation: donor agreements, approved budgets/amendments, reporting templates (SoE/UC), carry-forward statements.',
        'Income & expenses: receipts/payment vouchers, programme expense registers, procurement files (RFQ/PO/GRN), travel/HR allocations, credit/debit note logs.',
        'FCRA: FC receipt/utilisation ledgers, SBI NDMB statements, FC utilisation account statements, FC transfer/administrative expense workings.',
        'Fixed assets & leases: FAR with invoices/tagging, disposal approvals, depreciation policy, lease agreements, insurance details.',
        'Payroll & HR: payroll registers, timesheets/cost allocation bases, CTC sheets, reimbursements, statutory filings (PF/ESI/PT/TDS).',
        'Statutory tie-outs: TDS returns & challans, Form 26AS, GST returns (if registered), 12AB/80G orders and compliance status.',
        'Other: related-party list/transactions, litigations/contingencies, board/GB minutes for approvals, management representation letter signatories.'
      ],
    },
  ],
},

  'csr-advisory': {
    included: [
    'CSR readiness & policy: Section 135 assessment, CSR Policy drafting aligned to Schedule VII, CSR Committee constitution, and Annual Action Plan framework.',
    'Implementing partner due diligence: CSR-1 verification, legal/financial checks (12AB/80G/FCRA where applicable), capacity assessment, and onboarding.',
    'Project structuring: project-mode/ongoing projects classification, outcomes/outputs, budgets, milestones, MoUs/SOWs, and fund-release mechanisms.',
    'Governance & controls: administrative overhead cap monitoring, surplus treatment, set-off of excess spend, escrow/unspent CSR account advisory.',
    'Monitoring & reporting: quarterly reviews, utilisation certificates (UCs), statement of expenditure (SoE), variance analysis, site visits (as agreed).',
    'Impact assessment support: scoping and coordination where applicable; vendor empanelment and TORs.',
    'Board & MCA disclosures: CSR disclosures and annexures for Board’s Report, and CSR-2 preparation & filing (within MCA timeline).',
    'Playbooks & templates: policy, partner checklist, MoU, due-diligence formats, UC/SoE templates, monitoring dashboard, and compliance calendar.'
  ],
  timelines: [
    'Diagnostic & policy/committee setup: 5–10 business days from complete inputs.',
    'Partner onboarding & project design: 3–7 business days post due diligence.',
    'Quarterly monitoring: reviews and UC/SoE packs within 10 business days of quarter close.',
    'Year-end: Board’s Report CSR disclosures and CSR-2 prepared within annual filing timeline; impact assessment coordination as scheduled.'
  ],
  documents: [
    {
      heading: 'Documents required',
      items: [
        'Company & governance: COI, PAN, Board/CSR Committee resolutions, CSR Policy (if existing), prior-year CSR spend details and ongoing projects list.',
        'Budget & plan: proposed CSR spend for the year, thematic priorities, geography/beneficiary focus, internal approval matrix.',
        'Implementing partners: CSR-1 acknowledgment, registration certificate (Trust/Society/Section 8), PAN, 12AB/80G orders, FCRA (if applicable), audited financials, key personnel profiles.',
        'Project dossiers: concept notes/proposals, logframes/impact indicators, timelines, budgets, and risk/mitigation plans.',
        'Financial operations: bank details for grants, tranche plan, utilisation certificate and SoE formats (if any preferred), prior UCs/impact reports (if continuing projects).',
        'Compliance & reporting: prior Board’s Report CSR disclosures, any assurance/IA reports, and access to MCA filing credentials for CSR-2 preparation.'
      ],
    },
  ],
},
}

// Fallback template if a service has no predefined SECTIONS entry
const makeTemplate = (svc) => ({
  included: [`[Edit] What’s included for “${svc?.title || 'This service'}”.`],
  timelines: ['[Edit] Add your timelines here.'],
  documents: [{ heading: 'Documents required (as applicable)', items: ['[Edit] List documents here.'] }],
})

export default function ServiceDetail(){
  const { slug } = useParams()
  const svc = findServiceBySlug(slug)
  const navigate = useNavigate()

  if(!svc){
    return (
      <section className="page wide">
        <div className="panel-premium">
          <h2>Service not found</h2>
          <p>The item you’re looking for isn’t available.</p>
          <button className="btn-primary" onClick={()=>navigate('/services')}>Back to Services</button>
        </div>
      </section>
    )
  }

  const catLabel = SERVICE_CATEGORIES.find(c => c.key === svc.category)?.label
  const cover = getCoverForService(svc)

  // Pull sections; if missing, give a clean template
  const spec = SECTIONS[svc.slug] || makeTemplate(svc)
  const { included = [], timelines = [], documents = [] } = spec

  return (
    <section className="page wide">
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>{svc.title}</h1>
        <p>{catLabel}</p>
      </div>

      <article className="detail">
        {/* TOP-CENTER IMAGE */}
        <div className="lead">
          <img src={cover} alt={svc.title} />
        </div>

        {/* FULL-WIDTH CONTENT BELOW */}
        <div className="panel-premium prose">
          {/* 1) What’s included */}
          {included.length > 0 && (
            <>
              <h3>What’s included</h3>
              <ul>{included.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </>
          )}

          {/* 2) Timelines */}
          {timelines.length > 0 && (
            <>
              <h3>Timelines</h3>
              <ul>{timelines.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </>
          )}

          {/* 3) Documents required (with sub-groups) */}
          {documents.length > 0 && (
            <>
              <h3>Documents required (as applicable)</h3>
              {documents.map((grp, i) => (
                <div key={i} style={{marginBottom:'.65rem'}}>
                  {grp.heading ? <h4 style={{margin:'0 0 .25rem 0'}}>{grp.heading}</h4> : null}
                  <ul style={{marginTop:0}}>
                    {(grp.items || []).map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                </div>
              ))}
            </>
          )}

          <div className="cta">
            <Link className="btn-primary" to="/contact">Contact for more</Link>
            <Link className="btn-ghost" to="/services">Back to All Work</Link>
          </div>
        </div>
      </article>

      <style>{`
        /* One-column flow */
        .detail{
          display:block;
        }

        /* Centered top image */
        .lead{
          display:flex;
          justify-content:center;
          align-items:center;
          border:1px solid var(--border);
          border-radius:16px;
          overflow:hidden;
          background:var(--card);
          margin-bottom:1rem;
        }
        .lead img{
          width:100%;
          max-width:1200px; /* feel free to tweak */
          height:auto;
          display:block;
          object-fit:cover;
        }

        /* Make the content span the full available width */
        .panel-premium.prose{
          width:100%;
          max-width:none;   /* no artificial narrow column */
        }

        .prose p{ opacity:.9 }
        .prose h3{ margin-top:.5rem }
        .prose h4{ font-size:1rem; opacity:.9 }

        .cta{ display:flex; gap:.6rem; margin-top:.6rem }
        .btn-primary{
          background:var(--accent-600, #0e99d5);
          color:#fff; border:none; border-radius:12px; padding:.7rem .95rem;
          font-weight:700; cursor:pointer; text-decoration:none; display:inline-block;
        }
        .btn-ghost{
          border:1px solid var(--border); border-radius:12px;
          padding:.68rem .95rem; text-decoration:none; color:inherit;
        }

        /* Mobile keeps the same stacking naturally */
        @media (max-width: 720px){
          .lead img{ max-width:100%; }
        }
      `}</style>
    </section>
  )
}
