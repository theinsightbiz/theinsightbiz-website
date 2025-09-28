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
    included: ['[Edit] Viability, DSCR, projections, sensitivity analysis, CMA data.'],
    timelines: ['[Edit] Typical turnaround & milestones.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Financials, bank statements, business plan, KYC, etc.'] }],
  },
  'digital-signature-certificates': {
    included: ['[Edit] Class 3 issuance/renewal, token, eKYC, Aadhaar/Video verification, portal setup.'],
    timelines: ['[Edit] Standard processing and validity.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Identity, address proof, photo, consent, etc.'] }],
  },
  'msme-udyam-registration': {
    included: ['[Edit] Udyam certificate, correct NIC codes, turnover thresholds, incentive guidance.'],
    timelines: ['[Edit] Filing and approval time.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Aadhaar, PAN, bank, business details, invoices (if any).'] }],
  },
  'gst-registration': {
    included: ['[Edit] End-to-end registration, HSN mapping, composition vs. regular, portal onboarding.'],
    timelines: ['[Edit] Application to GSTIN allotment SLA.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] KYC, POA/POI, rent agreement/NOC, bank proof, photos, authorization.'] }],
  },
  'bookkeeping-payroll-individuals': {
    included: ['[Edit] Cloud accounting, reconciliations, payroll, PF/ESI/PT filings, MIS.'],
    timelines: ['[Edit] Monthly cycle and cut-offs.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Bank statements, ledgers, payroll inputs, invoices, proofs.'] }],
  },
  'financial-statements-prep-individuals': {
    included: ['[Edit] BS, P&L, Cash flow, schedules/notes (Indian GAAP/Ind-AS).'],
    timelines: ['[Edit] Close calendar and delivery dates.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Trial balance, ledgers, FA register, inventory, confirmations.'] }],
  },
  'income-tax-gst-compliance-individuals': {
    included: ['[Edit] ITR, TDS/Advance tax; GSTR-1/3B/9/9C, ITC 2B reconciliation, notices.'],
    timelines: ['[Edit] Return calendars, escalation SLAs.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Sales/purchase, ledgers, challans, prior returns, portal access.'] }],
  },
  'bank-loan-advisory-modelling': {
    included: ['[Edit] Credit assessment, CMA data, projections, covenant planning, bank liaison.'],
    timelines: ['[Edit] Appraisal to sanction/disbursement timeline.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] KYC, financials, bank statements, collateral, declarations.'] }],
  },

  // COMPANIES (placeholders)
  'company-incorporation-india': {
    included: ['[Edit] Name approval, SPICe+, MOA/AOA, PAN/TAN/GST, share certificates, registers.'],
    timelines: ['[Edit] Name approval → COI → post-incorporation kit.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Promoter KYC, address proofs, NOC, capital structure.'] }],
  },
  'llp-incorporation-india': {
    included: ['[Edit] DPIN, name approval, FiLLiP, LLP Agreement, compliance calendar.'],
    timelines: ['[Edit] Filings and approval order.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Partner KYC, registered office docs, deed details.'] }],
  },
  'company-formation-uae': {
    included: ['[Edit] Mainland/Free-zone/Offshore, MOA, visas, corporate bank, VAT/CT, ESR/UBO.'],
    timelines: ['[Edit] Jurisdiction-wise setup timelines.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Passport, photos, business plan, NOC, POA, lease/Ejari (as applicable).'] }],
  },
  'company-registration-uk': {
    included: ['[Edit] Companies House incorporation, HMRC, VAT, PAYE, accounts.'],
    timelines: ['[Edit] Incorporation and onboarding windows.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Director/PSC details, address, SIC, bank/KYC.'] }],
  },
  'company-registration-usa': {
    included: ['[Edit] LLC/C-Corp/S-Corp formation, EIN, RA, state filings, BOI/FinCEN.'],
    timelines: ['[Edit] State-wise formation + IRS timelines.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Member/Director info, address, operating agreement/bylaws.'] }],
  },
  'gst-registration-company': {
    included: ['[Edit] Multi-state/SEZ registrations, e-invoice/e-way bill setup, SOPs.'],
    timelines: ['[Edit] Registration to activation timeline.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] KYC, lease/utility/NOC, bank proof, authorisations.'] }],
  },
  'roc-filings-annual-returns': {
    included: ['[Edit] Board/AGM packs, AOC-4, MGT-7, MSME-1, DPT-3, registers.'],
    timelines: ['[Edit] Annual calendar and event-based filings.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] FS, minutes, registers, disclosures, DSCs.'] }],
  },
  'fema-odi-ecb-compliances': {
    included: ['[Edit] FDI/ODI consulting, SMF filings, LRN/ECB reporting, pricing guidelines.'],
    timelines: ['[Edit] RBI portal steps & reporting due dates.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Board resolutions, valuation, share docs, UIN/LRN papers.'] }],
  },
  'statutory-internal-tax-audits': {
    included: ['[Edit] Planning, controls testing, sampling, CARO, Form 3CD.'],
    timelines: ['[Edit] Audit plan, fieldwork, reporting windows.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] TB/GL, process notes, confirmations, statutory registers.'] }],
  },
  'vat-returns-uae-uk': {
    included: ['[Edit] VAT registration, MTD (UK), returns, reconciliations, FTA/HMRC correspondence.'],
    timelines: ['[Edit] Quarter/month cycles & submission deadlines.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Sales/Purchase/EC Sales, VAT ledgers, bank, prior returns.'] }],
  },
  'irs-compliance-usa': {
    included: ['[Edit] Federal/state returns, 1099/W-8/W-9, nexus study, treaty positions.'],
    timelines: ['[Edit] IRS/state calendars & extensions.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] EIN, state accounts, payroll, sales tax nexus inputs.'] }],
  },
  'bookkeeping-payroll-company': {
    included: ['[Edit] GL, AR/AP, payroll, close calendar, MIS, FP&A models.'],
    timelines: ['[Edit] Monthly close timelines.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Bank/ledger exports, payroll inputs, invoices, contracts.'] }],
  },
  'income-tax-gst-compliance-company': {
    included: ['[Edit] TDS/TCS, advance tax, TP coordination, GST monthly/annual returns, litigation support.'],
    timelines: ['[Edit] Direct & indirect tax calendars.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Sales/Purchase, challans, returns, notices, TP docs.'] }],
  },
  'virtual-cfo-services': {
    included: ['[Edit] Budgeting/forecasting, governance, board reporting, investor relations.'],
    timelines: ['[Edit] Kickoff → monthly packs cadence.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Historic FS, budgets, debt/equity terms, KPIs.'] }],
  },

  // PARTNERSHIPS (placeholders)
  'income-tax-return-partnership': {
    included: ['[Edit] ITR-5, partner drawings/interest, s.40(b), planning.'],
    timelines: ['[Edit] Filing windows and audit dependencies.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Partnership deed, TB/GL, bank, capital ledger, proofs.'] }],
  },
  'gst-registration-partnership': {
    included: ['[Edit] GSTIN, HSN & PoS mapping, SOPs.'],
    timelines: ['[Edit] Application → approval SLA.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Deed, KYC, address proof, authorisations, bank proof.'] }],
  },
  'bookkeeping-payroll-partnership': {
    included: ['[Edit] Reconciliations, payroll, PF/ESI, monthly MIS.'],
    timelines: ['[Edit] Monthly processing cycle.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Bank/ledger, payroll inputs, vouchers, contracts.'] }],
  },
  'financial-statements-partnership': {
    included: ['[Edit] Statements & schedules, audit-ready close.'],
    timelines: ['[Edit] Close calendar.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] TB/GL, FA register, inventories, confirmations.'] }],
  },
  'income-tax-gst-compliance-partnership': {
    included: ['[Edit] ITR-5, GSTRs, reconciliations, notices.'],
    timelines: ['[Edit] Compliance calendar.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Sales/purchase, challans, returns, partner details.'] }],
  },
  'virtual-cfo-partnership': {
    included: ['[Edit] Controls, MIS, budgeting for partners.'],
    timelines: ['[Edit] Governance cadence.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Historic FS, budgets, debt terms, KPIs.'] }],
  },
  'bank-loan-advisory-partnership': {
    included: ['[Edit] CMA data & financing support.'],
    timelines: ['[Edit] Appraisal to sanction timeline.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] KYC, FS, bank statements, collateral papers.'] }],
  },

  // NON-PROFITS (placeholders)
  'trust-society-sec8-registration': {
    included: ['[Edit] Trust deed/MOA-AOA drafting, registration, PAN/TAN/GST onboarding.'],
    timelines: ['[Edit] Registration pathway and approvals.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Founders’ KYC, by-laws/draft deed, office proofs, board notes.'] }],
  },
  '12a-80g-registration': {
    included: ['[Edit] Eligibility, documentation, portal filings, renewals.'],
    timelines: ['[Edit] Processing & validity periods.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Trust docs, activity details, audited accounts, donor formats.'] }],
  },
  'fcra-registration-compliance': {
    included: ['[Edit] FCRA registration, bank (FCRA), quarterly returns, utilization reporting.'],
    timelines: ['[Edit] Registration and return cycles.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] FCRA bank, project details, utilization plans, board approvals.'] }],
  },
  'usa-501c3-registration': {
    included: ['[Edit] Formation, 1023/1023-EZ, bylaws, board governance.'],
    timelines: ['[Edit] State filing + IRS determination windows.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Organizing docs, EIN, bylaws, board roster, budgets.'] }],
  },
  'ngo-licensing-uae': {
    included: ['[Edit] Approvals, licensing, ongoing reporting to authorities.'],
    timelines: ['[Edit] Authority-wise timelines.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Founders’ KYC, MoUs, premises/lease, activity notes.'] }],
  },
  'ngo-audits': {
    included: ['[Edit] Donor-specific audits, fund tracking, utilization certificates.'],
    timelines: ['[Edit] Audit plan and reporting cadence.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Grant letters, ledgers by fund, UC formats, bank.'] }],
  },
  'bookkeeping-payroll-ngo': {
    included: ['[Edit] Fund accounting, payroll, MIS for boards.'],
    timelines: ['[Edit] Monthly cycles.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] Bank/ledger exports, payroll inputs, donor restrictions.'] }],
  },
  'financial-statements-ngo': {
    included: ['[Edit] Statements, notes and audit support.'],
    timelines: ['[Edit] Close calendar and audit window.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] TB/GL, grant schedules, confirmations, policies.'] }],
  },
  'csr-advisory': {
    included: ['[Edit] CSR policy design, partner due diligence, monitoring, impact reporting.'],
    timelines: ['[Edit] Engagement phases & reporting.'],
    documents: [{ heading: 'Documents required', items: ['[Edit] CSR policy drafts, implementer docs, board approvals, budgets.'] }],
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
