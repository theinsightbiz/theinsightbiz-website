import React from 'react'

/**
 * Put your PDFs in: /public/downloads/
 * Example path on production: https://your-site.com/downloads/filename.pdf
 * Then list them in the `files` array below.
 */
const files = [
  {
    name: 'Company Profile (PDF)',
    file: '/downloads/company-profile.pdf',
    size: '2.1 MB',
    desc: 'Snapshot of our practice, jurisdictions, and service lines.'
  },
  {
    name: 'Service Catalogue (PDF)',
    file: '/downloads/service-catalogue.pdf',
    size: '1.4 MB',
    desc: 'Scope, deliverables, and timelines across major offerings.'
  },
  {
    name: 'Engagement Checklist (PDF)',
    file: '/downloads/engagement-checklist.pdf',
    size: '640 KB',
    desc: 'Documents and information required to get started quickly.'
  }
]

export default function Downloads(){
  return (
    <section className="page wide">
      {/* Hero — matches Privacy page tone */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>Downloads</h1>
        <p>One place for brochures, service catalogues, and onboarding checklists.</p>
      </div>

      {/* Download grid */}
      <div className="panel-premium" style={{ marginTop: '1.2rem' }}>
        <div className="dl-grid">
          {files.map((f) => (
            <article key={f.file} className="dl-card">
              <div className="dl-meta">
                <h3 className="dl-title">{f.name}</h3>
                <p className="dl-desc">{f.desc}</p>
                <div className="dl-sub">{f.size}</div>
              </div>
              <div className="dl-actions">
                <a className="btn-primary" href={f.file} download>
                  Download
                </a>
                <a className="btn-ghost" href={f.file} target="_blank" rel="noreferrer">
                  Preview
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Scoped styles to match your theme */}
      <style>{`
        .dl-grid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dl-card{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:.8rem;
          border:1px solid var(--border);
          background:var(--card);
          border-radius:16px;
          padding:1rem;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .dl-card:hover{
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(0,0,0,.08);
          border-color: rgba(14,153,213,.35);
        }
        .dl-title{ margin:0 0 .25rem 0; letter-spacing:-.2px }
        .dl-desc{ margin:.1rem 0 .35rem 0; opacity:.9 }
        .dl-sub{ font-size:.875rem; opacity:.7 }

        .dl-actions{ display:flex; gap:.5rem; flex-shrink:0 }
        .btn-primary{
          background:var(--accent-600, #0e99d5);
          color:#fff;
          border:none;
          border-radius:12px;
          padding:.6rem .85rem;
          font-weight:700;
          text-decoration:none;
        }
        .btn-ghost{
          border:1px solid var(--border);
          border-radius:12px;
          padding:.58rem .85rem;
          text-decoration:none;
          color:inherit;
        }

        @media (max-width: 900px){
          .dl-grid{ grid-template-columns: 1fr }
        }
      `}</style>
    </section>
  )
}
