import React from 'react'

/**
 * Put your PDFs in: /public/downloads/
 * Then list them in the `files` array below.
 */
const files = [
  { name: 'Company Profile (PDF)', file: '/downloads/company-profile.pdf', size: '2.1 MB', desc: 'Snapshot of our practice, jurisdictions, and service lines.' },
  { name: 'Service Catalogue (PDF)', file: '/downloads/service-catalogue.pdf', size: '1.4 MB', desc: 'Scope, deliverables, and timelines across major offerings.' },
  { name: 'Engagement Checklist (PDF)', file: '/downloads/engagement-checklist.pdf', size: '640 KB', desc: 'Documents and information required to get started quickly.' }
]

export default function Downloads(){
  return (
    <section className="page wide downloads-prime">
      {/* Premium hero */}
      <div className="prime-hero">
        <div className="prime-hero__badge" style={{ color: "#fff" }}>Curated PDFs • Always up to date</div>
        <h1 className="prime-hero__title" style={{ color: "#07cbfcff" }}>Downloads</h1>
        <p className="prime-hero__lead" style={{ color: "#fff" }}>One place for brochures, service catalogues, and onboarding checklists.</p>
      </div>

      <div className="panel-premium dl-wrap">
        <div className="dl-grid">
          {files.map((f) => (
            <article key={f.file} className="dl-card">
              <div className="dl-meta">
                <h3 className="dl-title">{f.name}</h3>
                <p className="dl-desc">{f.desc}</p>
                <div className="dl-sub">{f.size}</div>
              </div>
              <div className="dl-actions">
                <a className="btn-primary" href={f.file} download>Download</a>
                <a className="btn-ghost" href={f.file} target="_blank" rel="noreferrer">Preview</a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="dl-cta">
        <div className="dl-cta__title" style={{ color: "#fff" }}>Need a custom checklist or scope?</div>
        <div className="dl-cta__actions">
          <a className="btn-primary" href="/contact">Contact us</a>
          <a className="btn-ghost" href="/services">Explore services</a>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .downloads-prime :where(h1,h2,h3){ letter-spacing:-.2px }

        .prime-hero{ padding: 1.1rem 0 .5rem }
        .prime-hero__badge{
          display:inline-block; font-size:.8rem; font-weight:700; padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28); margin-bottom:.5rem;
        }
        .prime-hero__title{ font-weight:900; margin:0 0 .25rem; letter-spacing:-.3px }
        .prime-hero__lead{ max-width:860px; opacity:.92 }

        .dl-wrap{ padding: 1rem; margin-top: 1rem }
        .dl-grid{
          display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        @media (max-width: 900px){ .dl-grid{ grid-template-columns: 1fr } }

        .dl-card{
          display:flex; justify-content:space-between; align-items:flex-start; gap:.8rem;
          border:1px solid var(--border); background:var(--card); border-radius:16px; padding:1rem;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .dl-card:hover{ transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,.08); border-color: rgba(14,153,213,.35); }
        .dl-title{ margin:0 0 .25rem; letter-spacing:-.2px }
        .dl-desc{ margin:.1rem 0 .35rem; opacity:.9 }
        .dl-sub{ font-size:.875rem; opacity:.7 }

        .dl-actions{ display:flex; gap:.5rem; flex-shrink:0 }
        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.6rem .85rem;
          font-weight:700; text-decoration:none; transition: transform .18s ease, box-shadow .18s ease;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }
        .btn-ghost{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.6rem .85rem;
          font-weight:700; text-decoration:none; transition: transform .18s ease, box-shadow .18s ease;
        }
        .btn-ghost:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }

        .dl-cta{
          margin: 1rem 0 0; display:grid; place-items:center; text-align:center; gap:.5rem;
          border:1px dashed var(--border); border-radius:16px; padding:.9rem; background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0));
        }
        .dl-cta__title{ font-weight:900; letter-spacing:.2px }
        .dl-cta__actions{ display:flex; gap:.6rem }
      `}</style>
    </section>
  )
}
