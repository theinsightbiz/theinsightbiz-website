// src/pages/Home.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react'
import Hero from '../components/Hero'
import Counters from '../components/Counters'
import QnA from '../components/QnA'

// 🔗 Bring full pages into Home
import About from './About'
import Contact from './Contact'
import Downloads from './downloads'
import { Link } from 'react-router-dom'
import heroBg from '../assets/turninsight.jpg'

// Background illustration (keep your file here; WebP recommended)
// This will be used in an image-set() for better performance on hi-DPI.
import introBg from '../assets/ae-garden-illustration.jpg'

const INTRO_SEEN_KEY = 'introSeen.v1'

export default function Home() {
  // If user has already entered once, skip intro right away.
  const hasSeen = typeof window !== 'undefined' && localStorage.getItem(INTRO_SEEN_KEY) === '1'
  const [introOpen, setIntroOpen] = useState(!hasSeen)
  const [doorOpen, setDoorOpen] = useState(false)
  const homeRef = useRef(null) // to move focus to main content after intro
  const hintId = 'intro-hint'

  const finishIntro = useCallback(() => {
    setIntroOpen(false)
    try { localStorage.setItem(INTRO_SEEN_KEY, '1') } catch { /* noop */ }
    // move focus into the main content for accessibility
    setTimeout(() => {
      if (homeRef.current) {
        homeRef.current.setAttribute('tabindex', '-1')
        homeRef.current.focus({ preventScroll: false })
      }
    }, 0)
  }, [])

  const handleDoorClick = useCallback(() => {
    if (doorOpen) return
    setDoorOpen(true)
    // Short delay; reveal content almost immediately so the inside isn't seen
    window.setTimeout(() => {
      finishIntro()
    }, 300)
  }, [doorOpen, finishIntro])

  const onIntroKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleDoorClick()
    }
  }, [handleDoorClick])

  // Lock scrolling only while the intro overlay is visible
  useEffect(() => {
    if (introOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [introOpen])

  // Reveal-on-scroll helper you already had
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
      {/* === INTRO ILLUSTRATION OVERLAY (skipped for return visitors) === */}
      <div
        className={`intro-blackout ${introOpen ? 'show' : 'hide'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Enter site"
      >
        <div
          className="intro-illustration"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={onIntroKeyDown}
        >
          <div className="scene">
            <div className="paint-back" aria-hidden="true" />
            <div className="paint-mid" aria-hidden="true" />
            <div className="paint-top" aria-hidden="true" />

            {/* BLUE door with opening animation */}
            <button
              type="button"
              className={`door3d ${doorOpen ? 'open' : ''}`}
              aria-label="Open the door to enter"
              aria-describedby={hintId}
              onClick={handleDoorClick}
            >
              <svg
                className="door-svg"
                viewBox="0 0 420 720"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <filter id="noise" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
                    <feColorMatrix type="saturate" values="0.2" in="n" result="n2"/>
                    <feBlend in="SourceGraphic" in2="n2" mode="overlay"/>
                  </filter>
                  {/* Deep blue frame and panel gradients */}
                  <linearGradient id="frameGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0d274a"/>
                    <stop offset="0.5" stopColor="#091a31"/>
                    <stop offset="1" stopColor="#051320"/>
                  </linearGradient>
                  <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#1e90ff"/>
                    <stop offset="0.45" stopColor="#126ad6"/>
                    <stop offset="1" stopColor="#0a3e8a"/>
                  </linearGradient>
                  <radialGradient id="knobGrad" cx="34%" cy="30%" r="66%">
                    <stop offset="0" stopColor="#ffe498"/>
                    <stop offset="0.55" stopColor="#d7a62f"/>
                    <stop offset="1" stopColor="#8a6a12"/>
                  </radialGradient>
                  <radialGradient id="light" cx="0%" cy="50%" r="120%">
                    <stop offset="0" stopColor="rgba(230,245,255,0.95)"/>
                    <stop offset="0.5" stopColor="rgba(210,235,255,0.55)"/>
                    <stop offset="1" stopColor="rgba(210,235,255,0)"/>
                  </radialGradient>
                </defs>

                {/* frame */}
                <g className="frame" filter="url(#noise)">
                  <rect x="8" y="8" width="404" height="704" rx="22" fill="url(#frameGrad)"/>
                  <rect x="20" y="20" width="380" height="680" rx="16" fill="#03101f" opacity="0.25"/>
                </g>

                {/* soft light behind door edge */}
                <g className="light-cone">
                  <rect x="18" y="18" width="180" height="684" fill="url(#light)"/>
                </g>

                {/* leaf */}
                <g className="leaf" filter="url(#noise)">
                  <rect x="22" y="24" width="372" height="672" rx="14" fill="url(#panelGrad)"/>
                  <rect x="58" y="70"  width="300" height="180" rx="10" fill="#0b3a7a" opacity="0.35"/>
                  <rect x="58" y="290" width="300" height="180" rx="10" fill="#0b3a7a" opacity="0.35"/>
                  <rect x="58" y="510" width="300" height="150" rx="10" fill="#0b3a7a" opacity="0.35"/>
                  <circle cx="352" cy="360" r="14" fill="url(#knobGrad)"/>
                  <rect x="340" y="354" width="22" height="12" rx="6" fill="#2b1b06" opacity="0.45"/>
                </g>
              </svg>
            </button>

            <h1 className="intro-title">Get Into Insight</h1>
            <p id={hintId} className="intro-hint">Open the door to enter</p>
          </div>
        </div>
      </div>

      {/* === HOME CONTENT === */}
      <div ref={homeRef} className={`home-content ${introOpen ? 'concealed' : 'revealed'}`}>
        <Hero />
        <Counters />

        <section className="page wide">
          <div
            className="miux-hero hero-morph"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="hm-layer hm-old" aria-live="polite">
              <h1 className="hm-line">
                We build clarity.<br />We design compliance.<br />We scale trust.
              </h1>
              <p className="hm-sub">
                Finance, tax and regulatory outcomes crafted with the polish of a professional services partnership.
              </p>
            </div>

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

      {/* === Styles (accessibility, performance, safe areas, reduced motion) === */}
      <style>{`
        /* Faster, snappier reveal; reduced motion users get nearly instant display */
        .home-content {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 250ms ease, transform 250ms ease;
          will-change: opacity, transform;
          pointer-events: none;
        }
        .home-content.revealed {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .home-content.concealed { opacity: 0; }

        /* Full-viewport intro */
        .intro-blackout{
          position: fixed; inset: 0;
          background: #06090c;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 220ms ease, visibility 0s linear 220ms;
        }
        .intro-blackout.show{ opacity: 1; visibility: visible; transition-delay: 0s; }
        .intro-blackout.hide{ opacity: 0; visibility: hidden; transition-delay: 0s, 220ms; }

        /* Fill the screen and respect safe areas on notched devices */
        .intro-illustration{
          position: fixed; inset: 0;
          outline: none;
          display: block;
          padding: 0;
        }
        @supports (padding: max(env(safe-area-inset-top))) {
          .intro-illustration{
            padding-top:  max(env(safe-area-inset-top), 0px);
            padding-right:max(env(safe-area-inset-right), 0px);
            padding-bottom:max(env(safe-area-inset-bottom), 0px);
            padding-left: max(env(safe-area-inset-left), 0px);
          }
        }

        .scene{
          position: absolute; inset: 0;
          isolation: isolate;
          /* Use image-set for hi-DPI (both entries point to the same file if you don't have a 2x) */
          background-image: image-set(
            url(${introBg}) 1x,
            url(${introBg}) 2x
          );
          background-size: cover;
          background-position: center;
        }

        /* subtle compositing to mimic AE/AI grading */
        .paint-back, .paint-mid, .paint-top{
          position: absolute; inset: 0; pointer-events: none;
          mix-blend-mode: multiply;
        }
        .paint-back{ background: radial-gradient(140% 90% at 50% 10%, rgba(0,0,0,.0) 0%, rgba(0,0,0,.25) 70%, rgba(0,0,0,.45) 100%); }
        .paint-mid{  background: radial-gradient(70% 50% at 70% 40%, rgba(70,130,180,.25), rgba(70,130,180,0) 60%); }
        .paint-top{  background: radial-gradient(60% 40% at 30% 60%, rgba(10,20,40,.3), rgba(10,20,40,0) 70%); }

        /* BLUE door with quicker swing */
        .door3d{
          position: absolute;
          left: 50%; bottom: 8%;
          transform: translateX(-50%);
          width: min(260px, 36vw);
          height: min(460px, 60vh);
          border: 0; padding: 0; background: transparent;
          cursor: pointer;
          perspective: 1600px;
          filter: drop-shadow(0 24px 28px rgba(0,0,0,.35));
        }
        .door-svg{ width: 100%; height: 100%; display: block; }
        .door3d .leaf{
          transform-origin: 22px 360px;
          transform: rotateY(0deg);
          transition: transform 220ms cubic-bezier(.2,.8,.2,1), filter 220ms ease;
        }
        .door3d.open .leaf{
          transform: rotateY(-85deg);
          filter: brightness(1.06);
        }
        .door3d .light-cone{
          opacity: 0;
          transition: opacity 220ms ease;
          mix-blend-mode: screen;
        }
        .door3d.open .light-cone{ opacity: .8; }

        /* White titles for contrast */
        .intro-title{
          position: absolute; left: 50%; bottom: 18%; transform: translateX(-50%);
          margin: 0;
          font-weight: 900; letter-spacing: -0.02em;
          font-size: clamp(28px, 6vw, 64px);
          color: #ffffff;
          text-shadow: 0 2px 14px rgba(0,0,0,.6);
          pointer-events: none; text-align: center;
        }
        .intro-hint{
          position: absolute; left: 50%; bottom: 12%; transform: translateX(-50%);
          margin: 0; opacity: .95;
          font-size: clamp(12px, 1.6vw, 18px);
          color: #ffffff;
          text-shadow: 0 1px 10px rgba(0,0,0,.6);
          pointer-events: none; text-align: center;
        }

        /* Reduced motion preference: skip fancy timing entirely */
        @media (prefers-reduced-motion: reduce){
          .home-content{ transition: opacity 120ms linear, transform 120ms linear; }
          .intro-blackout{ transition: none; }
          .door3d .leaf, .door3d .light-cone{ transition: none; }
        }

        /* Misc section helpers */
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
