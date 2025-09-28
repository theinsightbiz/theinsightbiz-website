// src/pages/Home.jsx
import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Counters from '../components/Counters'
import QnA from '../components/QnA'

// 🔗 Bring full pages into Home
import About from './About'
import Services from './Services'
import Blog from './Blog'
import Contact from './Contact'
import PrivacyPolicy from './Privacy'
import { Link } from 'react-router-dom' // <-- needed for <Link>

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
        <div className="miux-hero">
          <h1>We build clarity.<br/>We design compliance.<br/>We scale trust.</h1>
          <p>Finance, tax and regulatory outcomes crafted with the polish of a product studio.</p>
        </div>
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
