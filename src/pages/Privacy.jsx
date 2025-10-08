import React from 'react'

export default function Privacy(){
  return (
    <section className="page wide privacy-prime">
      {/* Premium hero */}
      <div className="prime-hero">
        <div className="prime-hero__badge">Transparent • Compliant • Secure</div>
        <h1 className="prime-hero__title">Privacy Policy</h1>
        <p className="prime-hero__lead">Your data, safeguarded—clear controls and responsible use.</p>
      </div>

      {/* Content layout */}
      <div className="privacy-grid">
        <article className="panel-premium privacy-card">
          <div className="section">
            <h2>Overview</h2>
            <p>
              We value your privacy. Any information you share via forms or communication channels is used solely to respond to your queries,
              provide services you request, and improve our offerings. We do not sell your data to third parties. Where we use third-party services
              (e.g., analytics, mapping), their respective privacy policies apply.
            </p>
          </div>

          <div className="section">
            <h2>Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your information by contacting us at <strong>contact@theinsightbiz.com</strong>.
              We implement reasonable technical and organizational measures to safeguard your data.
            </p>
          </div>

          <div className="section">
            <h2>Consent & Updates</h2>
            <p>
              By using this website, you consent to this policy. Updates to this policy will be posted on this page.
            </p>
          </div>
        </article>

        <aside className="panel-premium rail">
          <div className="rail-head">Quick links</div>
          <a className="rail-link" href="/downloads">Downloads</a>
          <a className="rail-link" href="/services">Services</a>
          <a className="rail-link" href="/contact">Contact</a>
          <div className="rail-note">Last updated: <strong>October 2025</strong></div>
        </aside>
      </div>

      {/* CTA */}
      <div className="privacy-cta">
        <div className="privacy-cta__title">Questions about your data?</div>
        <div className="privacy-cta__actions">
          <a className="btn-primary" href="mailto:contact@theinsightbiz.com">Email us</a>
          <a className="btn-ghost" href="/contact">Contact form</a>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .privacy-prime :where(h1,h2){ letter-spacing:-.2px }

        .prime-hero{ padding: 1.1rem 0 .5rem }
        .prime-hero__badge{
          display:inline-block; font-size:.8rem; font-weight:700; padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28); margin-bottom:.5rem;
        }
        .prime-hero__title{ font-weight:900; margin:0 0 .25rem }
        .prime-hero__lead{ max-width:860px; opacity:.92 }

        .privacy-grid{
          display:grid; grid-template-columns: minmax(0,1fr) 320px; gap:1rem; margin-top:1rem;
        }
        @media (max-width: 1000px){ .privacy-grid{ grid-template-columns: 1fr } }

        .privacy-card{ padding: 1rem }
        .section + .section{ border-top:1px dashed var(--border); margin-top:.8rem; padding-top:.8rem }
        .rail{ padding: .9rem }
        .rail-head{ font-weight:800; margin:.1rem 0 .5rem }
        .rail-link{
          display:block; padding:.55rem .6rem; border-radius:12px; text-decoration:none; color:inherit; border:1px solid var(--border);
          margin:.45rem 0; background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0)); transition:transform .18s ease, border-color .18s ease;
        }
        .rail-link:hover{ transform:translateY(-2px); border-color:rgba(14,153,213,.3) }
        .rail-note{ margin-top:.8rem; opacity:.8 }

        .privacy-cta{
          margin: 1rem 0 0; display:grid; place-items:center; text-align:center; gap:.5rem;
          border:1px dashed var(--border); border-radius:16px; padding:.9rem; background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0));
        }
        .privacy-cta__title{ font-weight:900 }
        .privacy-cta__actions{ display:flex; gap:.6rem }

        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.72rem .95rem;
          font-weight:700; text-decoration:none; transition: transform .18s ease, box-shadow .18s ease;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }
        .btn-ghost{
          border:1px solid var(--border); border-radius:12px; padding:.7rem .95rem; text-decoration:none; color:inherit;
          transition:all .18s ease;
        }
        .btn-ghost:hover{ border-color:rgba(14,153,213,.3) }
      `}</style>
    </section>
  )
}
