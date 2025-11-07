// src/App.jsx
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createPortal } from 'react-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServicesCategory from './pages/ServicesCategory'
import ServiceDetail from './pages/ServiceDetail'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Downloads from './pages/downloads'
import ScrollToTop from './components/ScrollToTop'
import pageBg from './assets/page-bg.jpg'
import FluidCursor from './components/FluidCursor'

/** A small floating toggle rendered into <body> so it's never clipped/hidden */
function FxToggle({ on, setOn }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <>
      <button
        type="button"
        className="fx-toggle"
        aria-pressed={on}
        onClick={() => setOn(v => !v)}
        title={on ? 'Disable Fluid Cursor' : 'Enable Fluid Cursor'}
      >
        <span className="fx-dot" aria-hidden="true" />
        {on ? 'Fluid: ON' : 'Fluid: OFF'}
      </button>
      <style>{`
        .fx-toggle{
          position: fixed;
          left: 14px; bottom: 14px;
          z-index: 2147483647; /* on top of everything */
          padding: .55rem .8rem;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,.18);
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(8px);
          font-weight: 700;
          box-shadow: 0 8px 28px rgba(0,0,0,.12);
          cursor: pointer;
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          color: #111;
        }
        .fx-toggle:hover{ background: rgba(255,255,255,.98); }
        .fx-dot{
          width: 10px; height: 10px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 0 2px rgba(34,197,94,.18);
        }
        .fx-toggle[aria-pressed="false"] .fx-dot{
          background: #ef4444; box-shadow: 0 0 0 2px rgba(239,68,68,.18);
        }
      `}</style>
    </>,
    document.body
  )
}

export default function App(){
  // UI toggle for the fluid cursor (default OFF)
  const [fxOn, setFxOn] = useState(false)

  return (
    <div className="app-container">
      <Navbar />

      {/* Global page background (CSS variable consumed by your global CSS) */}
      <div className="site-shell" style={{ '--page-bg': `url(${pageBg})` }} />

      {/* Mount the effect only when ON */}
      {fxOn && <FluidCursor />}

      {/* Ensure each route loads at top */}
      <ScrollToTop />

      {/* Floating toggle rendered into <body> (cannot be hidden by app layout) */}
      <FxToggle on={fxOn} setOn={setFxOn} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Services landing */}
          <Route path="/services" element={<Services />} />

          {/* Category segment to avoid clashing with slug */}
          <Route path="/services/category/:key" element={<ServicesCategory />} />

          {/* Service details (slug) */}
          <Route path="/services/:slug" element={<ServiceDetail />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/downloads" element={<Downloads/>} />
        </Routes>
      </main>

      <FloatingActions />
      <Footer />

      {/* Keep your app above the canvas created by FluidCursor */}
      <style>{`
        #root, .app-container, .main-content { position: relative; z-index: 1; }
      `}</style>
    </div>
  )
}
