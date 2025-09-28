// src/pages/Home.jsx
import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Counters from '../components/Counters'
import QnA from '../components/QnA'

// 🔗 Bring full pages into Home
import About from './About'
import Contact from './Contact'
import { Link } from 'react-router-dom' // <-- needed for <Link>
import heroBg from '../assets/turninsight.jpg'

export default function Home() {
  // Keep your existing reveal-on-view behavior for Home tiles/cards
  useEffect(() => {
    const svc = Array.from(document.querySelectorAll('.services .svc-card'))
    const reel = Array.from(document.querySelectorAll('.h-reel .h-card'))
    const targets = [...svc, ...reel]
    if (!targets.length) return
    targets.forEach(el => el.classList.add('reveal-up'))
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('show'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* === HOME CORE === */}
      <Hero />
      <Counters />

      <section className="page wide">
  <div 
    className="miux-hero hero-morph"
    style={{ backgroundImage: `url(${heroBg})` }}
    >

    {/* Layer A — OLD (visible first 3s) */}
    <div className="hm-layer hm-old" aria-live="polite">
      <h1 className="hm-line">
        We build clarity.<br/>We design compliance.<br/>We scale trust.
      </h1>
      <p className="hm-sub">
        Finance, tax and regulatory outcomes crafted with the polish of a professional services partnership.
      </p>
    </div>

    {/* Layer B — NEW (visible next 5s) */}
    <div className="hm-layer hm-new" aria-hidden="true">
      <h1 className="hm-line">
        Insight Business Consultancy<br/>Trusted Consultancy Partner
      </h1>
      <p className="hm-sub">
        Your one step solution for turning sight into insight.
      </p>
    </div>
  </div>

  <style>{`
    .hero-morph{
      position: relative;
      min-height: clamp(280px, 42vh, 560px);
      /* background image settings */
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    /* Two layers stacked exactly on top of each other */
    .hero-morph .hm-layer{
      position: absolute; inset: 0;
      display: grid; place-items: center;
      text-align: center;
      padding: 0 .75rem;
    }

    /* Base heading + subtext */
    .hero-morph .hm-line{
      margin: 0 0 .5rem 0;
      line-height: 1.02;
      letter-spacing: -0.02em;
      font-weight: 900;
      font-size: clamp(28px, 6vw, 64px);
    }
    .hero-morph .hm-sub{
      margin: 0;
      opacity: .9;
      max-width: 980px;
      font-size: clamp(14px, 1.4vw, 18px);
      line-height: 1.45;
    }

    /* Colors */
    .hero-morph .hm-old{ color: #000; }
    .hero-morph .hm-new{ color: var(--accent-600, #000); }
    .hero-morph .hm-old .hm-sub{ color: #fefefeff; }
    .hero-morph .hm-new .hm-sub{ color: #fefefeff; }
    

    /* ===== Looping timeline: 8s total =====
       - hm-old visible 0s–3s, then fades out (3.0–3.5s)
       - hm-new fades in at 3.0–3.5s, visible 3.5–8.0s, then fades out to loop
    */
    .hero-morph .hm-old{
      opacity: 1;
      animation: hmOld 8s ease-in-out infinite;
    }
    .hero-morph .hm-new{
      opacity: 0;
      animation: hmNew 8s ease-in-out infinite;
    }

    @keyframes hmOld{
      0%       { opacity: 1; transform: translateY(0); filter: blur(0); }
      37.5%    { opacity: 1; transform: translateY(0); filter: blur(0); }      /* 3.0s */
      43.75%   { opacity: 0; transform: translateY(-10px); filter: blur(4px); } /* 3.5s */
      100%     { opacity: 0; transform: translateY(-10px); filter: blur(6px); }
    }
    @keyframes hmNew{
      0%       { opacity: 0; transform: translateY(10px); filter: blur(6px); }
      37.5%    { opacity: 0; transform: translateY(10px); filter: blur(6px); }  /* 3.0s */
      43.75%   { opacity: 1; transform: translateY(0);    filter: blur(0); }    /* 3.5s */
      93.75%   { opacity: 1; transform: translateY(0);    filter: blur(0); }    /* 7.5s */
      100%     { opacity: 0; transform: translateY(-6px); filter: blur(4px); }  /* fade out to loop */
    }

    /* Optional: reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce){
      .hero-morph .hm-old, .hero-morph .hm-new{
        animation: none;
      }
      /* Show the NEW message by default for users who prefer no motion */
      .hero-morph .hm-old{ display: none; }
      .hero-morph .hm-new{ opacity: 1; }
    }
  `}</style>
</section>

      {/* If you had a compact “services overview” on Home, keep it */}
      {/* You can remove this block if your Services page already has a full hero/overview */}
      <section className="page wide services" id="home-services-overview">
        <h2>What services we are offering</h2>
        <div className="grid4">
          <div className="svc-card"><h4>Financial Advisory Services</h4><p>Guidance to individuals and businesses on managing finances, investment strategies, retirement planning, and portfolio optimization.</p></div>
          <div className="svc-card"><h4>Tax Compliance & Advisory</h4><p>Ensures businesses adhere to tax regulations while optimizing tax liabilities. We help you navigate complex tax laws and minimize financial risks.</p></div>
          <div className="svc-card"><h4>Accounting & Bookkeeping</h4><p>From managing daily transactions to preparing financial statements, we maintain accurate records and provide insights to help your business grow efficiently.</p></div>
          <div className="svc-card"><h4>Regulatory & Compliance</h4><p>Ensure your business adheres to legal standards and industry regulations across jurisdictions with expert guidance, audits, and streamlined operations.</p></div>
        </div>
      </section>

      {/* === FULL PAGES INLINED BELOW === */}

      {/* About */}
      <div id="about" className="page-anchor" />
      <section className="page wide">
        <SectionHeader title="About" subtitle="Full page content inlined below" />
        <About />
      </section>

      {/* Contact */}
      <div id="contact" className="page-anchor" />
      <section className="page wide">
        <SectionHeader title="Contact" subtitle="Full page content inlined below" />
        <Contact />
      </section>

      {/* ✅ Explore links to other pages (added) */}
      <section className="page wide" aria-label="Explore other pages" style={{marginTop: '1rem'}}>
        <h2>Explore</h2>
        <div className="grid5" style={{display:'grid', gridTemplateColumns:'repeat(5, minmax(120px,1fr))', gap:'.8rem'}}>
          <Link to="/services" className="card glass" style={{padding:'0.9rem 1rem', textDecoration:'none'}}>
            <h4 style={{margin:0}}>Services</h4>
            <p className="m0" style={{opacity:.8}}>What we do</p>
          </Link>
          <Link to="/blog" className="card glass" style={{padding:'0.9rem 1rem', textDecoration:'none'}}>
            <h4 style={{margin:0}}>Blog</h4>
            <p className="m0" style={{opacity:.8}}>Insights & updates</p>
          </Link>
          <Link to="/privacy" className="card glass" style={{padding:'0.9rem 1rem', textDecoration:'none'}}>
            <h4 style={{margin:0}}>Privacy Policy</h4>
            <p className="m0" style={{opacity:.8}}>Data & security</p>
          </Link>
        </div>
      </section>

      {/* Keep your existing Q&A if you want it after all sections */}
      <section className="page wide">
        <QnA />
      </section>

      {/* Inline styles that won’t conflict with your existing CSS */}
      <style>{`
        .page-anchor { position: relative; top: -80px; height: 0; }
        .section-head { margin: 0 0 1rem 0; }
        .section-head h2 { margin: 0; font-weight: 900; letter-spacing: -0.2px; }
        .section-head p { margin: .25rem 0 0 0; opacity: .8; }
      `}</style>
    </>
  ); // <-- closes return
} // <-- closes Home component

/** Simple local header to visually separate each inlined page */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}
