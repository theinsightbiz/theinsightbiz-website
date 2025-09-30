// src/pages/Home.jsx
import React, { useEffect, useState, useCallback } from 'react'
import Hero from '../components/Hero'
import Counters from '../components/Counters'
import QnA from '../components/QnA'

// 🔗 Bring full pages into Home
import About from './About'
import Contact from './Contact'
import Downloads from './downloads'
import { Link } from 'react-router-dom'
import heroBg from '../assets/turninsight.jpg'

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true)

  const enterSite = useCallback(() => {
    setIntroOpen(false)
  }, [])

  const onIntroKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      enterSite()
    }
  }, [enterSite])

  useEffect(() => {
    if (introOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [introOpen])

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
      {/* === INTRO BLACKOUT WITH 3D TORCH === */}
      <div
        className={`intro-blackout ${introOpen ? 'show' : 'hide'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Enter site"
      >
        <div
          className="torch-stage"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={onIntroKeyDown}
          onClick={(e) => {
            // PURE JS: safely check if the click happened on the switch
            const t = e.target
            const isOnSwitch = t && typeof t.closest === 'function' ? t.closest('.torch-switch') : null
            if (!isOnSwitch) enterSite()
          }}
        >
          {/* Torch base */}
          <div className={`torch3d ${introOpen ? '' : 'torch-off'}`} aria-hidden={!introOpen}>
            <div className="torch-head">
              <div className="torch-rim" />
              <div className="torch-cap" />
              <div className="torch-glow" aria-hidden="true" />
              <div className="torch-beam" aria-hidden="true" />
            </div>
            <div className="torch-neck" />
            <div className="torch-handle">
              <div className="knurl" />
              <button
                className={`torch-switch ${introOpen ? '' : 'pressed'}`}
                type="button"
                aria-pressed={!introOpen}
                aria-label="Switch on the torch and enter"
                onClick={(e) => {
                  e.stopPropagation() // don't bubble to stage
                  enterSite()
                }}
              >
                <span className="switch-dot" />
              </button>
            </div>
          </div>

          {/* ↓↓↓ requested color styles applied ↓↓↓ */}
          <h1 className="intro-title" style={{ color: '#1e40af' }}>Get Into Insight</h1>
          <p className="intro-hint" style={{ color: '#ffffff' }}>Press the switch to enter</p>
        </div>
      </div>

      {/* Wrap the real Home content so we can fade it in smoothly */}
      <div className={`home-content ${introOpen ? 'concealed' : 'revealed'}`}>
        {/* === HOME CORE === */}
        <Hero />
        <Counters />

        <section className="page wide">
          <div
            className="miux-hero hero-morph"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            {/* Layer A — OLD */}
            <div className="hm-layer hm-old" aria-live="polite">
              <h1 className="hm-line">
                We build clarity.<br />We design compliance.<br />We scale trust.
              </h1>
              <p className="hm-sub">
                Finance, tax and regulatory outcomes crafted with the polish of a professional services partnership.
              </p>
            </div>

            {/* Layer B — NEW */}
            <div className="hm-layer hm-new" aria-hidden="true">
              <h1 className="hm-line">
                Insight Business Consultancy<br />Trusted Consultancy Partner
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
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
            }
            .hero-morph .hm-layer{
              position: absolute; inset: 0;
              display: grid; place-items: center;
              text-align: center;
              padding: 0 .75rem;
            }
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
            .hero-morph .hm-old{ color: #000; }
            .hero-morph .hm-new{ color: var(--accent-600, #000); }
            .hero-morph .hm-old .hm-sub{ color: #fefefeff; }
            .hero-morph .hm-new .hm-sub{ color: #fefefeff; }

            .hero-morph .hm-old{
              opacity: 1;
              animation: hmOld 8s ease-in-out infinite;
            }
            .hero-morph .hm-new{
              opacity: 0;
              animation: hmNew 8s ease-in-out infinite;
            }
            @keyframes hmOld{
              0% { opacity: 1; transform: translateY(0); filter: blur(0); }
              37.5% { opacity: 1; transform: translateY(0); filter: blur(0); }
              43.75% { opacity: 0; transform: translateY(-10px); filter: blur(4px); }
              100% { opacity: 0; transform: translateY(-10px); filter: blur(6px); }
            }
            @keyframes hmNew{
              0% { opacity: 0; transform: translateY(10px); filter: blur(6px); }
              37.5% { opacity: 0; transform: translateY(10px); filter: blur(6px); }
              43.75% { opacity: 1; transform: translateY(0); filter: blur(0); }
              93.75% { opacity: 1; transform: translateY(0); filter: blur(0); }
              100% { opacity: 0; transform: translateY(-6px); filter: blur(4px); }
            }
            @media (prefers-reduced-motion: reduce){
              .hero-morph .hm-old, .hero-morph .hm-new{ animation: none; }
              .hero-morph .hm-old{ display: none; }
              .hero-morph .hm-new{ opacity: 1; }
            }
          `}</style>
        </section>

        {/* Services */}
        <section className="page wide services" id="home-services-overview">
          <h2>What services we are offering</h2>
          <div className="grid4">
            <div className="svc-card"><h4>Financial Advisory Services</h4><p>Guidance to individuals and businesses on managing finances, investment strategies, retirement planning, and portfolio optimization.</p></div>
            <div className="svc-card"><h4>Tax Compliance & Advisory</h4><p>Ensures businesses adhere to tax regulations while optimizing tax liabilities. We help you navigate complex tax laws and minimize financial risks.</p></div>
            <div className="svc-card"><h4>Accounting & Bookkeeping</h4><p>From managing daily transactions to preparing financial statements, we maintain accurate records and provide insights to help your business grow efficiently.</p></div>
            <div className="svc-card"><h4>Regulatory & Compliance</h4><p>Ensure your business adheres to legal standards and industry regulations across jurisdictions with expert guidance, audits, and streamlined operations.</p></div>
          </div>
        </section>

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

        {/* Explore */}
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
              <Link to="/downloads" className="card glass" style={{padding:'0.9rem 1rem', textDecoration:'none'}}>
              <h4 style={{margin:0}}>Downloads</h4>
              <p className="m0" style={{opacity:.8}}>Client resources</p>
            </Link>
          </div>
        </section>

        {/* QnA */}
        <section className="page wide">
          <QnA />
        </section>
      </div>

      {/* === Styles for the blackout, torch, and smooth reveal === */}
      <style>{`
        /* Fade-in container once intro is dismissed */
        .home-content {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 600ms ease, transform 600ms ease;
          will-change: opacity, transform;
          pointer-events: none;
        }
        .home-content.revealed {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .home-content.concealed { opacity: 0; }

        /* Fullscreen black intro */
        .intro-blackout{
          position: fixed; inset: 0;
          background: #000;
          display: grid; place-items: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 450ms ease, visibility 0s linear 450ms;
        }
        .intro-blackout.show{
          opacity: 1; visibility: visible; transition-delay: 0s;
        }
        .intro-blackout.hide{
          opacity: 0; visibility: hidden; transition-delay: 0.0s, 450ms;
        }

        .torch-stage{
          position: relative;
          width: min(92vw, 1000px);
          height: min(70vh, 640px);
          display: grid;
          place-items: center;
          perspective: 1200px;
          text-align: center;
          color: #f5f7ff;
          outline: none;
          cursor: pointer; /* click anywhere */
        }

        .intro-title{
          position: absolute;
          bottom: 3.5%; /* moved slightly lower so full text is visible */
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: clamp(28px, 6vw, 64px);
          text-shadow: 0 2px 20px rgba(255,255,255,.15);
          pointer-events: none;
        }

        .intro-hint{
          position: absolute;
          bottom: 0%; /* keep hint just below the title */
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          opacity: .75;
          font-size: clamp(12px, 1.5vw, 16px);
          pointer-events: none;
        }

        /* === "3D" Torch (CSS-3D illusion) === */
        .torch3d{
          position: relative;
          width: min(56vw, 520px);
          height: min(56vw, 520px);
          max-width: 520px; max-height: 520px;
          transform-style: preserve-3d;
          transform: rotateX(15deg) rotateY(-18deg);
          filter: drop-shadow(0 50px 80px rgba(255, 214, 120, 0.2));
          transition: transform 600ms ease;
          z-index: 2;
          pointer-events: none; /* let the stage capture clicks by default */
        }
        .torch3d:hover{ transform: rotateX(8deg) rotateY(-10deg) translateY(-4px); }

        .torch-head{
          position: absolute; top: 16%; left: 50%;
          transform: translateX(-50%);
          width: 62%;
          height: 26%;
          background: radial-gradient(120% 100% at 50% 0%, #333 0%, #1b1b1b 40%, #0e0e0e 100%);
          border-radius: 18px 18px 38px 38px;
          box-shadow: inset 0 6px 25px rgba(255,255,255,.06), inset 0 -10px 40px rgba(0,0,0,.7);
        }
        .torch-rim{
          position: absolute; inset: -10px -8px auto -8px; height: 14px;
          background: linear-gradient(180deg, #4b4b4b, #1c1c1c);
          border-radius: 20px 20px 10px 10px;
          box-shadow: 0 8px 14px rgba(0,0,0,.5);
        }
        .torch-cap{
          position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
          width: 88%; height: 24px; border-radius: 12px;
          background: linear-gradient(180deg, #2b2b2b, #0e0e0e);
          box-shadow: inset 0 1px 6px rgba(255,255,255,.05), 0 6px 16px rgba(0,0,0,.6);
        }
        .torch-glow{
          position: absolute; top: 0; left: 50%; transform: translate(-50%, -60%);
          width: 140%; height: 140%;
          background: radial-gradient(ellipse at center, rgba(255,216,128,.22), rgba(255,216,128,0) 60%);
          filter: blur(14px);
          opacity: 1;
          transition: opacity 350ms ease;
          pointer-events: none;
        }
        .torch-beam{
          position: absolute; top: -25%; left: 50%; transform: translateX(-50%) rotateX(40deg);
          width: 120%; height: 120%;
          background: radial-gradient(ellipse at 50% 20%, rgba(255,240,180,.18) 0%, rgba(255,240,180,.06) 30%, rgba(255,240,180,0) 70%);
          filter: blur(10px);
          opacity: .9;
          mix-blend-mode: screen;
          pointer-events: none;
          transition: opacity 350ms ease;
        }

        .torch-neck{
          position: absolute; top: 39%; left: 50%; transform: translateX(-50%);
          width: 28%; height: 6%;
          background: linear-gradient(180deg, #1d1d1d, #090909);
          border-radius: 20px;
          box-shadow: inset 0 2px 6px rgba(255,255,255,.05), 0 6px 18px rgba(0,0,0,.7);
          pointer-events: none;
        }
        .torch-handle{
          position: absolute; top: 45%; left: 50%; transform: translateX(-50%);
          width: 36%; height: 34%;
          background: linear-gradient(180deg, #1a1a1a, #000);
          border-radius: 20px;
          box-shadow: inset 0 1px 6px rgba(255,255,255,.05), inset 0 -20px 60px rgba(0,0,0,.7);
          display: grid; place-items: center;
          pointer-events: none;
        }
        .knurl{
          position: absolute; inset: 16% 12% 36% 12%;
          border-radius: 12px;
          background:
            linear-gradient(45deg, rgba(255,255,255,.05) 25%, transparent 25%) 0 0/10px 10px,
            linear-gradient(-45deg, rgba(255,255,255,.08) 25%, transparent 25%) 0 0/10px 10px,
            linear-gradient(45deg, transparent 75%, rgba(0,0,0,.6) 75%) 0 0/10px 10px,
            linear-gradient(-45deg, transparent 75%, rgba(0,0,0,.7) 75%) 0 0/10px 10px;
          box-shadow: inset 0 4px 14px rgba(0,0,0,.8);
          pointer-events: none;
        }

        /* Switch — must be on top and clickable */
        .torch-switch{
          appearance: none;
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 38px;
          border-radius: 999px;
          background: linear-gradient(180deg, #2a2a2a, #0a0a0a);
          border: 1px solid #161616;
          box-shadow: inset 0 3px 8px rgba(255,255,255,.05), inset 0 -4px 8px rgba(0,0,0,.8), 0 6px 20px rgba(0,0,0,.6);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          padding: 4px;
          transition: transform 120ms ease, background 220ms ease;
          z-index: 10;
          pointer-events: auto;
        }
        .torch-switch:active{ transform: translateX(-50%) scale(.98); }
        .torch-switch .switch-dot{
          display: inline-block;
          width: 28px; height: 28px; border-radius: 50%;
          background: radial-gradient(100% 100% at 30% 30%, #ffd880, #7a5d13 70%);
          box-shadow: 0 0 18px rgba(255,216,128,.45), inset 0 0 8px rgba(0,0,0,.6);
          transform: translateX(0);
          transition: transform 250ms ease, background 250ms ease, box-shadow 250ms ease;
        }
        .torch-switch.pressed .switch-dot{
          transform: translateX(34px);
          background: radial-gradient(100% 100% at 30% 30%, #d0d0d0, #5a5a5a 70%);
          box-shadow: inset 0 0 10px rgba(0,0,0,.7);
        }

        /* When torch is off (after clicking), dim the beam/glow */
        .torch-off .torch-glow, .torch-off .torch-beam{
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce){
          .home-content{ transition: none; }
          .intro-blackout{ transition: none; }
          .torch3d{ transition: none; }
          .torch-switch .switch-dot{ transition: none; }
        }
      `}</style>

      <style>{`
        .page-anchor { position: relative; top: -80px; height: 0; }
        .section-head { margin: 0 0 1rem 0; }
        .section-head h2 { margin: 0; font-weight: 900; letter-spacing: -0.2px; }
        .section-head p { margin: .25rem 0 0 0; opacity: .8; }
      `}</style>
    </>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}
