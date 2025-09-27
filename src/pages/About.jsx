import React, { useEffect, useState } from 'react'
import TeamGrid from '../components/TeamGrid'

// ✅ Import images from src/assets so Vite includes them in the build
import ceo1 from '../assets/ceo-1.jpg'
import founder2 from '../assets/founder-2.jpg'
import trustee3 from '../assets/trustee-3.jpg'
import phoneBg from '../assets/phone-bg.jpg'

export default function About(){
  // --- Testimonial slider state ---
  const slides = [
    {
      photo: ceo1,
      name: 'Jina Huang',
      role: 'CEO • Watt Property Management',
      quote: 'INSIGHT transformed our digital and compliance presence with clear timelines and zero surprises.',
    },
    {
      photo: founder2,
      name: 'Arjun Mehta',
      role: 'Founder • SaaS, India → UAE',
      quote: 'From tax to cross-border set-up—one accountable partner. Documents are board-ready.',
    },
    {
      photo: trustee3,
      name: 'Nisha Rao',
      role: 'Trustee • Non-Profit, India',
      quote: 'FCRA + audit support were airtight. The team is meticulous and communicative.',
    }
  ]

  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 3800)
    return () => clearInterval(t)
  }, [slides.length])

  const s = slides[idx]

  return (
    <section className="page wide" style={{marginTop:'0.5rem', position:'relative', zIndex:0}}>
      {/* Intro */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1 style={{fontWeight:900, letterSpacing:'-0.5px'}}>About INSIGHT</h1>
        <p style={{maxWidth:860}}>
          We are a cross-border advisory studio—blending finance, tax, and regulatory craft into outcomes
          that feel product-grade. Built for India, UAE, UK, and USA.
        </p>
      </div>

      {/* Split: sticky rail + stream */}
      <div className="about-split" style={{display:'grid', gridTemplateColumns:'260px 1fr', gap:'1.2rem', marginTop:'1.2rem', position:'relative', zIndex:1}}>
        {/* Sticky left */}
        <aside className="panel-premium" style={{position:'sticky', top:'84px', alignSelf:'start', height:'fit-content', padding:'1rem'}}>
          <nav style={{display:'grid', gap:'.35rem'}}>
            <a href="#bio" className="nav-link">Bio</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#feedback" className="nav-link">Client Feedback</a>
          </nav>
          <hr style={{opacity:.15, margin:'1rem 0'}}/>
          <div style={{display:'grid', gap:'.4rem'}}>
            <div className="chip" style={{padding:'.35rem .6rem', border:'1px solid var(--border)', borderRadius:'999px'}}>Global • Multi-jurisdiction</div>
            <div className="chip" style={{padding:'.35rem .6rem', border:'1px solid var(--border)', borderRadius:'999px'}}>Product-grade outputs</div>
            <div className="chip" style={{padding:'.35rem .6rem', border:'1px solid var(--border)', borderRadius:'999px'}}>Compliance by design</div>
          </div>
        </aside>

        {/* Stream */}
        <div className="about-stream" style={{display:'grid', gap:'1.2rem', position:'relative', zIndex:1}}>
          {/* BIO */}
          <section id="bio" className="panel-premium">
            <h2 style={{marginTop:0}}>Bio</h2>
            <p>
              INSIGHT is a consulting studio working at the intersection of finance, tax and regulation.
              Our approach blends deep domain knowledge with clear communication and investor-ready outputs.
              From first filings to cross-border scale, we operate as a single accountable partner.
            </p>

            <div className="tile-grid" style={{marginTop:'.8rem'}}>
              <article className="tile">
                <h3>4+ Jurisdictions</h3>
                <p className="m0">India, UAE, UK, USA support with unified playbooks.</p>
              </article>
              <article className="tile">
                <h3>Studio-grade</h3>
                <p className="m0">Documents & dashboards that speak to boards and investors.</p>
              </article>
              <article className="tile">
                <h3>End-to-End</h3>
                <p className="m0">Advisory → Documentation → Filing → Ongoing Compliance.</p>
              </article>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="panel-premium">
            <h2 style={{marginTop:0}}>Services</h2>
            <p>We combine advisory, documentation and filing into proven service lines—each with clear scope, timelines and deliverables.</p>
            <div style={{display:'grid', gap:'.8rem', marginTop:'.6rem'}}>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Financial Advisory</h4>
                <p className="m0">Planning, risk, tax strategy, retirement planning, portfolio optimisation—with measurable, auditable outputs.</p>
              </div>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Tax Compliance & Advisory</h4>
                <p className="m0">Accurate filings and proactive optimisation across direct, indirect and cross-border tax.</p>
              </div>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Accounting & Bookkeeping</h4>
                <p className="m0">Monthly books, reconciliations, payroll, and investor-ready financial statements.</p>
              </div>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Regulatory & Compliance</h4>
                <p className="m0">Incorporations, audits, ROC/Secretarial, FEMA/ODI/ECB, VAT/CT, IRS and governance frameworks.</p>
              </div>
            </div>
          </section>

          {/* TEAM */}
          <section id="team" className="panel-premium">
            <h2 style={{marginTop:0}}>Team</h2>
            <p>Certified professionals—CA / CS—backed by internal review, checklists, and audit-grade documentation.</p>
            <div style={{marginTop:'.6rem'}}>
              <TeamGrid />
            </div>
          </section>

          {/* CLIENT FEEDBACK — scene (scroll-safe) */}
          <section id="feedback" className="feedback-scene" style={{position:'relative', zIndex:0}}>
            {/* background phone image (non-interactive) */}
            <div
              className="feedback-bg"
              style={{ backgroundImage: `url(${phoneBg})` }}
              aria-hidden="true"
            />

            {/* right caption text */}
            <div className="feedback-caption">
              Their expertise transformed<br/>our digital presence.
            </div>

            {/* floating photo card that cycles */}
            <div key={idx} className="feedback-card">
              <div className="photo-wrap">
                <img src={s.photo} alt={s.name} />
              </div>
              <div className="meta">
                <div className="who">{s.name}</div>
                <div className="role">{s.role}</div>
                {s.logo && <img className="brand" src={s.logo} alt="brand" />}
              </div>
              <div className="quote">“{s.quote}”</div>
            </div>

            <style>{`
              .feedback-scene{
                position: relative;
                min-height: clamp(560px, 72vh, 860px);
                border-radius: 20px;
                overflow: hidden;
                border: 1px solid var(--border);
                background: var(--card);
                /* ensure this section never traps page scroll */
                pointer-events: auto;
              }
              .feedback-bg{
                position:absolute; inset:0;
                background-size: cover; background-position: center;
                filter: saturate(1.05) contrast(1.05);
                transform: scale(1.02);
                z-index: 0;
                /* critical: background must not intercept wheel/touch events */
                pointer-events: none;
              }
              .feedback-caption{
                position:absolute; right:2rem; top:2.4rem;
                color:#fff; text-align:right;
                text-shadow: 0 2px 16px rgba(0,0,0,.45);
                font-weight:800; letter-spacing:.2px;
                font-size: clamp(18px, 1.6vw, 22px);
                line-height:1.3;
                z-index:2;
                pointer-events: none; /* text is decorative here */
              }

              .feedback-card{
                position:absolute; left:54%; top:50%;
                transform: translate(-50%, -50%) rotate(-1.2deg);
                width: min(285px, 90vw);
                max-height: 64vh;
                background:#fff; color:#111;
                border-radius: 14px;
                box-shadow: 0 28px 80px rgba(0,0,0,.30), 0 6px 18px rgba(0,0,0,.18);
                border: 1px solid rgba(0,0,0,.06);
                overflow:hidden;
                animation: cardIn .85s cubic-bezier(.22,.61,.36,1);
                z-index:3;           /* above bg, below page chrome */
                pointer-events: auto; /* clickable if you add interactions later */
              }
              .feedback-card::after{
                content:''; position:absolute; inset:0;
                background: linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,.05));
                pointer-events:none;
              }

              .photo-wrap{ height: 34%; overflow:hidden; }
              .photo-wrap img{
                width:100%; height:100%; object-fit:cover; display:block;
                transform: scale(1.02);
                transition: transform 1.2s ease;
              }
              .feedback-card:hover .photo-wrap img{ transform: scale(1.05) }

              .meta{ padding:.55rem .85rem .1rem .85rem; display:grid; gap:.1rem }
              .who{ font-weight:900; font-size:.95rem; line-height:1.2 }
              .role{ opacity:.8; font-size:.83rem }
              .brand{ height:18px; width:auto; margin-top:.22rem; opacity:.9 }
              .quote{
                padding:.45rem .85rem .75rem .85rem;
                border-top: 1px dashed rgba(0,0,0,.08);
                font-style: italic;
                font-size:.9rem; line-height:1.34;
              }

              @keyframes cardIn{
                0%{ opacity:0; transform: translate(-50%, -44%) rotate(-6deg) scale(.94) }
                60%{ opacity:1; transform: translate(-50%, -52%) rotate(1.4deg) scale(1.02) }
                100%{ opacity:1; transform: translate(-50%, -50%) rotate(-1.2deg) scale(1) }
              }

              @media (max-width: 680px){
                .feedback-caption{ right:1rem; top:1rem }
                .feedback-card{
                  left:50%; top:56%;
                  width: 92vw; max-height: 76vh;
                  transform: translate(-50%, -50%) rotate(-1.2deg);
                }
                .photo-wrap{ height: 42% }
              }
            `}</style>
          </section>
        </div>
      </div>
    </section>
  )
}
