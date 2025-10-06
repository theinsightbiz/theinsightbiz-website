import React, { useEffect, useState } from 'react'
import TeamGrid from '../components/TeamGrid'

// ✅ Existing imports
import ceo1 from '../assets/ceo-1.jpg'
import founder2 from '../assets/founder-2.jpg'
import trustee3 from '../assets/trustee-3.jpg'
import phoneBg from '../assets/feedback-bg.jpg'

// ✅ NEW: team member photos imported from src/assets (no /team subfolder)
import Priyam from '../assets/priyam-adarsh.jpg'
import Pratik from '../assets/pratik-raj.jpg'
import Aniket from '../assets/aniket-kishore.jpg'
import Hrithik from '../assets/hrithik-raj.jpg' // included for the 4th card present in this file

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

  // 3D tilt + glare (Snippet B)
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

  // ▼▼▼ NEW: interaction for the “member-card” (team replacement) ▼▼▼
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('#team .member-card'));
    const offs = [];

    cards.forEach(card => {
      const info = card.querySelector('.member-card__info');

      const activate = () => {
        card.classList.add('active');
        card.classList.remove('revert');
        if (info) info.setAttribute('aria-hidden', 'false');
      };
      const deactivate = () => {
        card.classList.remove('active');
        card.classList.add('revert');
        if (info) info.setAttribute('aria-hidden', 'true');
      };

      const onEnter = () => activate();
      const onLeaveCard = () => deactivate();
      const onLeaveInfo = () => deactivate();

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeaveCard);
      if (info) info.addEventListener('mouseleave', onLeaveInfo);

      // touch toggle
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const onClick = (e) => {
        if (isTouch) {
          const withinInfo = info && info.contains(e.target);
          if (card.classList.contains('active') && !withinInfo) deactivate();
          else if (!card.classList.contains('active')) activate();
        }
      };
      card.addEventListener('click', onClick);

      // cleanup
      offs.push(() => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeaveCard);
        if (info) info.removeEventListener('mouseleave', onLeaveInfo);
        card.removeEventListener('click', onClick);
      });
    });

    return () => offs.forEach(fn => fn());
  }, []);
  // ▲▲▲ END: member-card interaction ▲▲▲

  const s = slides[idx]

  return (
    <section className="page wide" style={{marginTop:'0.5rem', position:'relative', zIndex:0}}>
      {/* Intro */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1 style={{fontWeight:900, letterSpacing:'-0.5px'}}>About INSIGHT</h1>
        <p style={{maxWidth:860}}>
          We are a seasoned business consultant specializing in financial advisory, tax compliance and business setup solutions across India, UAE, UK and USA. With deep expertise in regulatory frameworks and financial strategies, we help businesses optimise operations, save costs and achieve sustainable growth.
        </p>
      </div>

        {/* Stream */}
        <div className="about-stream" style={{display:'grid', gap:'1.2rem', position:'relative', zIndex:1}}>
          {/* BIO */}
          <section
            id="bio"
            className="panel-premium"
            style={{ padding: '12px 16px 14px', minHeight: 'auto' }}
          >
            <h2 style={{marginTop:0}}>Why Work With Us ?</h2>
            <p>
              We bring a personalized, results-driven approach to every client engagement. Whether you're expanding internationally, optimizing taxes, or seeking financial clarity, we ensure tailored solutions to meet your business goals.
            </p>
            <p>
              Let's Connect!<br />
              Reach out to us today and discuss how we can help streamline your business operations and ensure compliance in dynamic markets.
            </p>

            <div className="tile-grid" style={{marginTop:'.4rem'}}>
              <article className="tile">
                <h3>4+ Jurisdictions</h3>
                <p className="m0">India, UAE, UK, USA - Global Coverage. Consistent Delivery.</p>
              </article>
              <article className="tile">
                <h3>Precision You Can Present</h3>
                <p className="m0">Investor-ready documents and clean papers your board can act on.</p>
              </article>
              <article className="tile">
                <h3>From First Call to Final Filing</h3>
                <p className="m0">We plan, paper, file, and maintain so you always stay current.</p>
              </article>
            </div>
          </section>

          {/* local spacing fixes for this box only */}
          <style>{`
            #bio.panel-premium{ padding-bottom: 12px !important; }
            #bio > *:last-child{ margin-bottom: 0; }
            #bio p{ margin: 8px 0; line-height: 1.4; }
          `}</style>

          {/* SERVICES */}
          <section id="services" className="panel-premium">
            <h2 style={{marginTop:0}}>Services</h2>
            <p>We combine advisory, documentation and filing into proven service lines—each with clear scope, timelines and deliverables.</p>
            <div style={{display:'grid', gap:'.8rem', marginTop:'.6rem'}}>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Financial Advisory</h4>
                <p className="m0">Guidance to individuals and businesses on managing finances, investment strategies, retirement planning, and portfolio optimization.</p>
              </div>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Tax Compliance & Advisory</h4>
                <p className="m0">Ensures businesses adhere to tax regulations while optimizing tax liabilities. We help you navigate complex tax laws and minimize financial risks.</p>
              </div>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Accounting & Bookkeeping</h4>
                <p className="m0">From managing daily transactions to preparing financial statements, we maintain accurate records and provide insights to help your business grow efficiently.</p>
              </div>
              <div className="card glass" style={{padding:'1rem'}}>
                <h4 style={{margin:'0 0 .25rem'}}>Regulatory & Compliance</h4>
                <p className="m0">Ensure your business adheres to legal standards and industry regulations across jurisdictions with expert guidance, audits, and streamlined operations.</p>
              </div>
            </div>
          </section>

          {/* TEAM — REPLACED with “member-card” */}
          <section id="team" className="panel-premium">
            <h2 style={{ marginTop: 0 }}>Our Professionals</h2>
            <p>Certified professionals backed by internal review, checklists, and audit-grade documentation.</p>

            <div className="tm-grid">
              {/* Card 1 */}
              <article className="member-card">
                <img className="member-card__photo" src={Hrithik} alt="Portrait of Hrithik Raj" />
                <div className="member-card__glass"></div>
                <div className="member-card__info" aria-hidden="true">
                  <h3 className="member-card__name">Hrithik Raj</h3>
                  <p className="member-card__role">Consultant • Chartered Accountant</p>
                  <p className="member-card__bio">
                    Cross border consultant assisting founders operate seamlessly and Specializes in India, UAE, UK, USA tax and compliances. He designs tax-efficient structures, manages filings, and turns complex tax rules into simple checklists.
                  </p>
                  <div className="member-card__socials">
                    <a className="icon-btn" href="#" aria-label="Facebook profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.01 1.2-3.12 3.03-3.12.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.31.62-1.31 1.25v1.5h2.23l-.36 2.9h-1.87V22c4.78-.78 8.44-4.93 8.44-9.94z"/>
                      </svg>
                    </a>
                    <a className="icon-btn" href="#" aria-label="Instagram profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
              </article>

              {/* Card 2 */}
              <article className="member-card">
                <img className="member-card__photo" src={Pratik} alt="Portrait of Pratik Raj" />
                <div className="member-card__glass"></div>
                <div className="member-card__info" aria-hidden="true">
                  <h3 className="member-card__name">Pratik Raj</h3>
                  <p className="member-card__role">Partner • Compliance Officer</p>
                  <p className="member-card__bio">
                    Expertise with guiding the founders upon incorporations across India, UAE, UK & USA, backed by India SEBI regulations, FEMA regulations for foreign investments/remittances, and Companies Act, 2013 secretarial compliances.
                  </p>
                  <div className="member-card__socials">
                    <a className="icon-btn" href="#" aria-label="Facebook profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.01 1.2-3.12 3.03-3.12.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.31.62-1.31 1.25v1.5h2.23l-.36 2.9h-1.87V22c4.78-.78 8.44-4.93 8.44-9.94z"/>
                      </svg>
                    </a>
                    <a className="icon-btn" href="#" aria-label="Instagram profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
              </article>

              {/* Card 3 */}
              <article className="member-card">
                <img className="member-card__photo" src={Aniket} alt="Portrait of Aniket Kishore" />
                <div className="member-card__glass"></div>
                <div className="member-card__info" aria-hidden="true">
                  <h3 className="member-card__name">Aniket Kishore</h3>
                  <p className="member-card__role">Manager • Business Advisor</p>
                  <p className="member-card__bio">
                    Specialist in Income-tax compliance and assessments. Builds bank-ready project finance models and term-sheet documentation. Handles Startup Registrations/ NGO setup and its periodic accounting and filings.
                  </p>
                  <div className="member-card__socials">
                    <a className="icon-btn" href="#" aria-label="Facebook profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.01 1.2-3.12 3.03-3.12.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.31.62-1.31 1.25v1.5h2.23l-.36 2.9h-1.87V22c4.78-.78 8.44-4.93 8.44-9.94z"/>
                      </svg>
                    </a>
                    <a className="icon-btn" href="#" aria-label="Instagram profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
              </article>

              {/* Card 4 */}
              <article className="member-card">
                <img className="member-card__photo" src={Priyam} alt="Portrait of Priyam Adarsh" />
                <div className="member-card__glass"></div>
                <div className="member-card__info" aria-hidden="true">
                  <h3 className="member-card__name">Priyam Adarsh</h3>
                  <p className="member-card__role">Partner • Tax Advisor</p>
                  <p className="member-card__bio">
                    Partners with founders to run a clean monthly MIS, owning books close, variance analysis, and decision-ready reports. Managing India GST compliance, audit support, and UAE VAT filings, with robust ledger-to-return reconciliations.
                  </p>
                  <div className="member-card__socials">
                    <a className="icon-btn" href="#" aria-label="Facebook profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.01 1.2-3.12 3.03-3.12.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.31.62-1.31 1.25v1.5h2.23l-.36 2.9h-1.87V22c4.78-.78 8.44-4.93 8.44-9.94z"/>
                      </svg>
                    </a>
                    <a className="icon-btn" href="#" aria-label="Instagram profile">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
              </article>
            </div>

            {/* Scoped CSS for the member card */}
            <style>{`
              .tm-grid{
                display:grid;
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: clamp(16px, 2.5vw, 28px);
                margin-top:.9rem;
              }
              .member-card{
                position: relative;
                aspect-ratio: 3 / 4;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(2, 6, 23, 0.2);
                background: #000;
                isolation: isolate;
              }
              .member-card__photo{
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform-origin: 50% 30%;
                /* ensure filter animates in lockstep with transform */
                transition: transform 420ms cubic-bezier(.2,.7,.2,1),
                            filter 420ms cubic-bezier(.2,.7,.2,1);
                will-change: transform, filter;
              }

              .member-card__glass{
                position: absolute; inset: auto 0 0 0; height: 56%;
                background: linear-gradient(to top, rgba(2,6,23,.75), rgba(2,6,23,0.2) 60%, transparent);
                opacity: 0; transform: translateY(10%);
                transition: opacity 320ms ease, transform 320ms ease;
                pointer-events: none; z-index: 1;
              }
              .member-card__info{
                position: absolute; left: 0; right: 0; bottom: 0;
                padding: 18px 18px 20px; color: #fff; z-index: 2;
                opacity: 0; transform: translateY(20px);
                transition: opacity 280ms ease, transform 280ms ease;
              }
              .member-card__name{ font-size: 1.1rem; margin: 0 0 2px; line-height:1.1; font-weight: 700; }
              .member-card__role{ margin: 0 0 8px; font-size: .88rem; color: #cbd5e1; }
              .member-card__bio{ margin: 0 0 12px; font-size: .86rem; line-height: 1.45; color: #e2e8f0; }
              .member-card__socials{ display: flex; gap: 10px; }
              .icon-btn{
                --size: 36px; width: var(--size); height: var(--size); display: inline-grid; place-items: center;
                border-radius: 50%; background: rgba(255,255,255,0.12);
                backdrop-filter: blur(4px); text-decoration: none;
                transition: transform 180ms ease, background 180ms ease;
                outline: none; border: 1px solid rgba(255,255,255,.15);
              }
              .icon-btn:hover, .icon-btn:focus-visible{ transform: translateY(-2px); background: rgba(255,255,255,0.2); }
              .icon-btn svg{ width: 18px; height: 18px; fill: #fff; }
              .member-card__sr-toggle{
                position: absolute; inset: 0; width: 100%; height: 100%;
                background: none; border: 0; padding: 0; margin: 0; cursor: default; z-index: 3; opacity: 0;
              }
              .member-card.active .member-card__photo{ transform: translateY(-6%) scale(0.54); filter: blur(2px) saturate(1.05) contrast(1.05) brightness(0.9); }
              .member-card.active .member-card__glass{ opacity: 1; transform: translateY(0); }
              .member-card.active .member-card__info{ opacity: 1; transform: translateY(0); }
              .member-card.revert .member-card__photo{ transform: translateY(0) scale(1); }
              @media (prefers-reduced-motion: reduce){
                .member-card__photo, .member-card__glass, .member-card__info{ transition: none; }
              }
              @media (max-width: 420px){
                .icon-btn{ --size: 40px; }
                .member-card__bio{ font-size: .93rem; }
              }
            `}</style>
          </section>
          {/* ===== end Team ===== */}

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
              Their expertise transformed<br/>our business presence.
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
                pointer-events: auto;
              }
              .feedback-bg{
                position:absolute; inset:0;
                background-size: cover; background-position: center;
                filter: saturate(1.05) contrast(1.05);
                transform: scale(1.02);
                z-index: 0;
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
                pointer-events: none;
              }
              .feedback-card{
                position:absolute; left:20%; top:50%;
                transform: translate(-50%, -50%) rotate(-1.2deg);
                width: min(285px, 90vw);
                max-height: 64vh;
                background:#fff; color:#111;
                border-radius: 16px;
                border: 8px solid #ffffff;
                box-shadow: 0 28px 80px rgba(0,0,0,.30), 0 6px 18px rgba(0,0,0,.18);
                border: 1px solid rgba(0,0,0,.06);
                overflow:hidden;
                animation: cardIn .85s cubic-bezier(.22,.61,.36,1);
                z-index:3;
                pointer-events: auto;
              }
              .feedback-card::after{
                content:''; position:absolute; inset:0;
                background: linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,.05));
                pointer-events:none;
              }
              .photo-wrap{
                height: 34%;
                overflow:hidden;
                background: #fff;
                border: 10px solid #fff;
                border-radius: 10px;
                box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
              }
              .photo-wrap img{
                width:100%; height:100%; object-fit:cover; display:block;
                border-radius: 6px;
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
      
    </section>
  )
}
