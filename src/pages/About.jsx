import React, { useEffect, useState } from 'react'
import TeamGrid from '../components/TeamGrid'

// âœ… Import images from src/assets so Vite includes them in the build
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
      role: 'CEO â€¢ Watt Property Management',
      quote: 'INSIGHT transformed our digital and compliance presence with clear timelines and zero surprises.',
    },
    {
      photo: founder2,
      name: 'Arjun Mehta',
      role: 'Founder â€¢ SaaS, India â†’ UAE',
      quote: 'From tax to cross-border set-upâ€”one accountable partner. Documents are board-ready.',
    },
    {
      photo: trustee3,
      name: 'Nisha Rao',
      role: 'Trustee â€¢ Non-Profit, India',
      quote: 'FCRA + audit support were airtight. The team is meticulous and communicative.',
    }
  ]

  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 3800)
    return () => clearInterval(t)
  }, [slides.length])

  // ======================
  // Snippet B: tilt + glare
  // ======================
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('#team .tcard[data-tilt]'));
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const listeners = [];

    cards.forEach((card, idx) => {
      card.style.setProperty('--i', idx);
      const glare = card.querySelector('.tcard__glare');
      let rect, cx, cy, hover = false;

      const onEnter = () => { rect = card.getBoundingClientRect(); cx = rect.left + rect.width/2; cy = rect.top + rect.height/2; hover = true; };
      const onMove  = (e) => {
        if(!hover) return;
        const mx = (e.clientX - rect.left) / rect.width;
        const my = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', `${clamp(mx*100,0,100)}%`);
        card.style.setProperty('--my', `${clamp(my*100,0,100)}%`);
        const tiltX = clamp((cy - e.clientY) / (rect.height/2) * 8, -10, 10);
        const tiltY = clamp((e.clientX - cx) / (rect.width/2) * 8, -10, 10);
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
      };
      const onLeave = () => { hover = false; card.style.transform = ''; card.style.removeProperty('--mx'); card.style.removeProperty('--my'); };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      const onTouchStart = (e) => {
        const t = e.touches[0]; const r = card.getBoundingClientRect();
        const mx = (t.clientX - r.left)/r.width; const my = (t.clientY - r.top)/r.height;
        card.style.setProperty('--mx', `${clamp(mx*100,0,100)}%`);
        card.style.setProperty('--my', `${clamp(my*100,0,100)}%`);
        card.style.transform = 'scale3d(1.01,1.01,1.01)';
        if (glare) glare.style.opacity = 1;
      };
      const onTouchEnd = () => { card.style.transform = ''; if (glare) glare.style.opacity = 0; };

      card.addEventListener('touchstart', onTouchStart, { passive: true });
      card.addEventListener('touchend', onTouchEnd);

      listeners.push(() => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        card.removeEventListener('touchstart', onTouchStart);
        card.removeEventListener('touchend', onTouchEnd);
      });
    });

    return () => listeners.forEach((off) => off());
  }, []);
  // ===== end Snippet B =====

  const s = slides[idx]

  return (
    <section className="page wide" style={{marginTop:'0.5rem', position:'relative', zIndex:0}}>
      {/* Intro */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1 style={{fontWeight:900, letterSpacing:'-0.5px'}}>About INSIGHT</h1>
        <p style={{maxWidth:860}}>
          We are a cross-border advisory studioâ€”blending finance, tax, and regulatory craft into outcomes
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
                <p className="m0">Advisory â†’ Documentation â†’ Filing â†’ Ongoing Compliance.</p>
              </article>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="panel-premium">
            <h2 style={{marginTop:0}}>Services</h2>
            <p>We combine advisory, documentation and filing into proven service linesâ€”each with clear scope, timelines and deliverables.</p>
            <div style={{display:'grid', gap:'.8rem', marginTop:'.6rem'}}>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Financial Advisory</h4>
                <p className="m0">Planning, risk, tax strategy, retirement planning, portfolio optimisationâ€”with measurable, auditable outputs.</p>
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

          {/* =========================
              TEAM — Snippet A applied
              ========================= */}
          <section id="team" className="panel-premium">
            <h2 style={{ marginTop: 0 }}>Our Professionals</h2>
            <p>Certified professionals CA / CS backed by internal review, checklists, and audit-grade documentation.</p>

            <div className="teamx">
              <div className="teamx__grid">
                {/* Card 1 */}
                <article className="tcard" data-tilt>
                  <span aria-hidden="true" className="tcard__ring"></span>
                  <div className="tcard__glare" />
                  <div className="tcard__media">
                    {/* TODO: replace with your asset path */}
                    <img src="/src/assets/team/priyam-adarsh.jpg" alt="Portrait of Priyam Adarsh" />
                  </div>
                  <div className="tcard__body">
                    <header className="tcard__header">
                      <h3 className="tcard__name">Priyam Adarsh</h3>
                      <p className="tcard__role">Chartered Accountant • Partner</p>
                    </header>
                    <p className="tcard__bio">
                      Expert in Tax and Finance across India, UAE, UK, and USA. Board-ready documentation and compliance by design.
                    </p>
                    <ul className="tcard__socials">
                      <li><a href="#" aria-label="LinkedIn" className="tico" title="LinkedIn">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.03-1.85-3.03s-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.38-1.86c3.62 0 4.29 2.38 4.29 5.47v6.28zM6.34 7.43A2.06 2.06 0 1 1 6.33 3.3a2.06 2.06 0 0 1 .01 4.12zM4.56 20.45h3.56V9H4.56v11.45z"/></svg>
                      </a></li>
                      <li><a href="#" aria-label="X" className="tico" title="X">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M18.9 2H22l-7.2 8.3L22.7 22h-6.4l-5-6.6-5.7 6.6H2.5l7.7-8.9L1.3 2h6.6l4.6 6.1L18.9 2zM17 20h1.8L7.1 4H5.2L17 20z"/></svg>
                      </a></li>
                    </ul>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="tcard" data-tilt>
                  <span aria-hidden="true" className="tcard__ring"></span>
                  <div className="tcard__glare" />
                  <div className="tcard__media">
                    <img src="/src/assets/team/pratik-raj.jpg" alt="Portrait of Pratik Raj" />
                  </div>
                  <div className="tcard__body">
                    <header className="tcard__header">
                      <h3 className="tcard__name">Pratik Raj</h3>
                      <p className="tcard__role">Company Secretary • Partner</p>
                    </header>
                    <p className="tcard__bio">
                      Audit & regulatory compliance across India, UAE, UK and USA. Precision filings and governance frameworks.
                    </p>
                    <ul className="tcard__socials">
                      <li><a href="#" aria-label="LinkedIn" className="tico" title="LinkedIn">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.03-1.85-3.03s-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.38-1.86c3.62 0 4.29 2.38 4.29 5.47v6.28zM6.34 7.43A2.06 2.06 0 1 1 6.33 3.3a2.06 2.06 0 0 1 .01 4.12zM4.56 20.45h3.56V9H4.56v11.45z"/></svg>
                      </a></li>
                      <li><a href="#" aria-label="GitHub" className="tico" title="GitHub">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.8 0 3.9-2.4 4.7-4.7 5 .4.3.8 1 .8 2v3c0 .3.2.7.8.5A10 10 0 0 0 12 2z"/></svg>
                      </a></li>
                    </ul>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="tcard" data-tilt>
                  <span aria-hidden="true" className="tcard__ring"></span>
                  <div className="tcard__glare" />
                  <div className="tcard__media">
                    <img src="/src/assets/team/aniket-kishore.jpg" alt="Portrait of Aniket Kishore" />
                  </div>
                  <div className="tcard__body">
                    <header className="tcard__header">
                      <h3 className="tcard__name">Aniket Kishore</h3>
                      <p className="tcard__role">Accounting & Bookkeeping • Expert</p>
                    </header>
                    <p className="tcard__bio">
                      Monthly books, reconciliations, payroll, and investor-ready financials. Detail-driven, audit-grade outputs.
                    </p>
                    <ul className="tcard__socials">
                      <li><a href="#" aria-label="Instagram" className="tico" title="Instagram">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm6.3-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"/></svg>
                      </a></li>
                      <li><a href="#" aria-label="YouTube" className="tico" title="YouTube">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M23.5 7.1a3.1 3.1 0 0 0-2.1-2.2C19.3 4.3 12 4.3 12 4.3s-7.3 0-9.4.6a3.1 3.1 0 0 0-2.1 2.2C0 9.2 0 12 0 12s0 2.8.5 4.9a3.1 3.1 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3.1 3.1 0 0 0 2.1-2.1c.5-2.1.5-4.9.5-4.9s0-2.8-.5-4.9zM9.6 15.5V8.5L15.8 12l-6.2 3.5z"/></svg>
                      </a></li>
                    </ul>
                  </div>
                </article>

                {/* Card 4 */}
                <article className="tcard" data-tilt>
                  <span aria-hidden="true" className="tcard__ring"></span>
                  <div className="tcard__glare" />
                  <div className="tcard__media">
                    <img src="/src/assets/team/aniket-kishore.jpg" alt="Portrait of Aniket Kishore" />
                  </div>
                  <div className="tcard__body">
                    <header className="tcard__header">
                      <h3 className="tcard__name">Aniket Kishore</h3>
                      <p className="tcard__role">Accounting & Bookkeeping • Expert</p>
                    </header>
                    <p className="tcard__bio">
                      Monthly books, reconciliations, payroll, and investor-ready financials. Detail-driven, audit-grade outputs.
                    </p>
                    <ul className="tcard__socials">
                      <li><a href="#" aria-label="Instagram" className="tico" title="Instagram">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm6.3-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"/></svg>
                      </a></li>
                      <li><a href="#" aria-label="YouTube" className="tico" title="YouTube">
                        <svg viewBox="0 0 24 24" className="tico__svg" aria-hidden="true"><path d="M23.5 7.1a3.1 3.1 0 0 0-2.1-2.2C19.3 4.3 12 4.3 12 4.3s-7.3 0-9.4.6a3.1 3.1 0 0 0-2.1 2.2C0 9.2 0 12 0 12s0 2.8.5 4.9a3.1 3.1 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3.1 3.1 0 0 0 2.1-2.1c.5-2.1.5-4.9.5-4.9s0-2.8-.5-4.9zM9.6 15.5V8.5L15.8 12l-6.2 3.5z"/></svg>
                      </a></li>
                    </ul>
                  </div>
                </article>
              </div>
            </div>

            {/* Scoped CSS for team cards */}
            <style>{`
              .teamx{ width:100%; margin-top:.9rem; }
              .teamx__grid{
                display:grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: clamp(1rem, 2vw, 1.4rem);
                align-items:stretch;
              }
              .tcard{
                position:relative; overflow:hidden; border-radius:20px;
                background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
                box-shadow: 0 15px 35px rgba(0,0,0,.45), 0 5px 15px rgba(0,0,0,.25);
                transform-style: preserve-3d; isolation:isolate; will-change: transform;
                transition: transform .18s ease, box-shadow .2s ease, background .3s ease;
              }
              .tcard__ring{
                position:absolute; inset:0; border-radius:inherit; padding:2px;
                background: linear-gradient(130deg, rgba(255,99,132,.9) 0%, rgba(56,189,248,.9) 35%, rgba(167,139,250,.9) 100%);
                -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                -webkit-mask-composite: xor; mask-composite: exclude;
                animation: tcard-ring 6s linear infinite; opacity:.9;
              }
              @keyframes tcard-ring{
                0%{ filter:hue-rotate(0deg) blur(.6px) }
                50%{ filter:hue-rotate(90deg) blur(.6px) }
                100%{ filter:hue-rotate(180deg) blur(.6px) }
              }
              .tcard__glare{
                position:absolute; inset:-40%;
                background: radial-gradient(300px 300px at var(--mx,50%) var(--my,50%), rgba(255,255,255,.16), transparent 55%);
                transform: translateZ(60px); pointer-events:none; transition:opacity .25s ease; opacity:0;
              }
              .tcard__media{
                position:relative; overflow:hidden; border-radius:18px; margin:2px; height:280px; transform: translateZ(40px);
              }
              .tcard__media img{ width:100%; height:100%; object-fit:cover; transform:scale(1.02); transition: transform .8s cubic-bezier(.2,.7,.2,1); }
              .tcard__body{ position:relative; padding:1.1rem 1.15rem 1.2rem; transform: translateZ(30px); }
              .tcard__header{ display:grid; gap:.15rem; margin-bottom:.55rem; }
              .tcard__name{ font-size:1.2rem; letter-spacing:-.01em; margin:0; }
              .tcard__role{ opacity:.75; font-size:.95rem; margin:0; }
              .tcard__bio{ margin:.6rem 0 1rem; line-height:1.5; opacity:.9; }
              .tcard__socials{ --delay-step:45ms; display:flex; gap:.6rem; padding:0; margin:0; list-style:none; }
              .tico{
                display:inline-grid; place-items:center; width:40px; height:40px; border-radius:12px;
                background: rgba(0,0,0,.06); backdrop-filter: blur(6px); border:1px solid rgba(0,0,0,.08);
                transform: translateY(14px); opacity:0;
                transition: transform .45s cubic-bezier(.2,.7,.2,1), opacity .45s ease, background .2s ease;
                outline:none;
              }
              .tico:hover, .tico:focus-visible{ background: rgba(0,0,0,.14); }
              .tico__svg{ width:22px; height:22px; fill:#0f172a; }
              .tcard:hover .tcard__media img, .tcard:focus-within .tcard__media img{ transform: scale(1.1); }
              .tcard:hover .tcard__glare, .tcard:focus-within .tcard__glare{ opacity:1; }
              .tcard:hover .tico, .tcard:focus-within .tico{ opacity:1; transform: translateY(0); }
              .tcard:hover .tico:nth-child(1), .tcard:focus-within .tico:nth-child(1){ transition-delay: calc(var(--delay-step)*1); }
              .tcard:hover .tico:nth-child(2), .tcard:focus-within .tico:nth-child(2){ transition-delay: calc(var(--delay-step)*2); }
              .tcard:hover{
                background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015));
                box-shadow: 0 25px 60px rgba(0,0,0,.45), 0 10px 24px rgba(0,0,0,.30);
              }
              @media (min-width: 1024px){
                .tcard{ animation: tcard-float 10s ease-in-out infinite; }
                @keyframes tcard-float{ 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } }
              }
              @media (max-width: 900px){ .teamx__grid{ grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); } }
              @media (max-width: 640px){ .teamx__grid{ grid-template-columns: 1fr; } }
            `}</style>
          </section>
          {/* ===== end Team ===== */}

          {/* CLIENT FEEDBACK â€” scene (scroll-safe) */}
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
              <div className="quote">â€œ{s.quote}â€</div>
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

              /* ================================
                 CHANGED: feedback-card (white border)
                 ================================ */

              .feedback-card{
                position:absolute; left:54%; top:50%;
                transform: translate(-50%, -50%) rotate(-1.2deg);
                width: min(285px, 90vw);
                max-height: 64vh;
                background:#fff; color:#111;
                border-radius: 16px;      /* radius increased */
                /* solid white border for a framed look */
                border: 8px solid #ffffff;
                /* keep depth */
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

              /* =========================================
                 CHANGED: photo-wrap (photograph cut look)
                 ========================================= */

              .photo-wrap{
                height: 34%;
                overflow:hidden;
                /* white photo frame inside the card */
                background: #fff;
                border: 10px solid #fff;
                border-radius: 10px;
                /* subtle inner line for â€œcutâ€ detail */
                box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
              }
              .photo-wrap img{
                width:100%; height:100%; object-fit:cover; display:block;
                border-radius: 6px;        /* soften the photo edge within the frame */
                transform: scale(1.02);
                transition: transform 1.2s ease;
              }
              .feedback-card:hover .photo-wrap img{ transform: scale(1.10) }

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
