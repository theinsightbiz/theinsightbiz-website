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

// ⬇️ Intro video (place your uploaded file at src/assets/intro.mp4)
import introVideo from '../assets/intro.mp4'

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef(null)

  const enterSite = useCallback(() => {
    setIntroOpen(false)
  }, [])

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
      {/* === INTRO OVERLAY WITH VIDEO === */}
      <div
        className={`intro-video-overlay ${introOpen ? 'show' : 'hide'} ${isFading ? 'fade' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Intro"
      >
        <video
          ref={videoRef}
          className="intro-video"
          src={introVideo}
          autoPlay
          muted
          playsInline
          onEnded={enterSite}
          onTimeUpdate={() => {
            const v = videoRef.current
            if (!v) return
            // Start fading ~1.2s before the end
            if (!isFading && v.duration && v.duration - v.currentTime <= 1.2) {
              setIsFading(true)
            }
          }}
        />
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

      {/* === Styles for the video intro and smooth reveal === */}
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

        /* Fullscreen video intro overlay */
        .intro-video-overlay{
          position: fixed; inset: 0;
          background: #000;
          display: grid; place-items: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 600ms ease, visibility 0s linear 600ms;
        }
        .intro-video-overlay.show{
          opacity: 1; visibility: visible; transition-delay: 0s, 0s;
        }
        .intro-video-overlay.hide{
          opacity: 0; visibility: hidden; transition-delay: 0s, 600ms;
        }
        /* Start fading slightly before the video ends for a smooth handoff */
        .intro-video-overlay.fade{
          opacity: 0;
          transition-duration: 1000ms;
        }
        .intro-video{
          width: 100vw;
          height: 100vh;
          object-fit: contain; /* ensure no zoom/crop; letterbox as needed */
          background: #000;    /* fill any empty space around the video */
        }

        @media (prefers-reduced-motion: reduce){
          .home-content{ transition: none; }
          .intro-video-overlay{ transition: none; }
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
