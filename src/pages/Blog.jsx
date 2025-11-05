import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor'
import BlogList from '../components/BlogList'
import BlogSearch from '../components/BlogSearch'

export default function Blog(){
  // Reveal animation for tiles/cards after render
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.tile, .h-reel .h-card'))
    nodes.forEach(el => el.classList.add('reveal-up'))
    if (!('IntersectionObserver' in window)) { nodes.forEach(el => el.classList.add('show')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target) } })
    }, { threshold:.18 })
    nodes.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="page wide blog-prime">
      {/* Premium hero */}
      <div className="prime-hero">
        <div className="prime-hero__badge" style={{ color: "#fff" }}>Expert takes • Practical playbooks</div>
        <h1 className="prime-hero__title" style={{ color: "#07cbfcff" }}>Insights & Updates</h1>
        <p className="prime-hero__lead" style={{ color: "#fff" }}>
          Curated knowledge across tax, accounting, and global compliance—written for decision-makers.
        </p>
      </div>

      {/* Tools: Editor + Search */}
      <div className="tools-grid">
        <div className="panel-premium tool-card">
          <div className="tool-head">
            <h3>Publish</h3>
            <p className="muted" style={{ color: "#000" }}>Create or edit posts</p>
          </div>
          <BlogEditor />
        </div>

        <div className="panel-premium tool-card">
          <div className="tool-head">
            <h3>Find articles</h3>
            <p className="muted" style={{ color: "#000" }}>Search by topic, tag, or date</p>
          </div>
          <BlogSearch />
        </div>
      </div>

      {/* Feed */}
      <div className="panel-premium feed-card">
        <div className="feed-head">
          <h2>Latest from the blog</h2>
          <p className="muted" style={{ color: "#000" }}>Fresh perspectives and step-by-step guidance</p>
        </div>
        <BlogList />
      </div>

      {/* CTA */}
      <div className="blog-cta">
        <div className="blog-cta__title" style={{ color: "#fff" }}>Want help applying these ideas?</div>
        <div className="blog-cta__actions">
          <Link className="btn-primary" to="/contact">Talk to us</Link>
          <Link className="btn-ghost" to="/services">Explore services</Link>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .blog-prime :where(h1,h2,h3){ letter-spacing:-.2px }

        .prime-hero{ padding: 1.1rem 0 .5rem }
        .prime-hero__badge{
          display:inline-block; font-size:.8rem; font-weight:700; padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28); margin-bottom:.5rem;
        }
        .prime-hero__title{ font-weight:900; margin:0 0 .25rem; letter-spacing:-.3px }
        .prime-hero__lead{ max-width:860px; opacity:.92 }

        .tools-grid{
          display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-top:1rem;
        }
        @media (max-width: 980px){ .tools-grid{ grid-template-columns: 1fr } }

        .tool-card{ padding: .9rem }
        .tool-head{ margin: .1rem 0 .6rem }
        .tool-head .muted{ opacity:.8 }

        .feed-card{ margin-top:1rem; padding: 1rem }
        .feed-head{ margin: .1rem 0 .6rem }
        .feed-head .muted{ opacity:.8 }

        .blog-cta{
          margin: 1rem 0 0; display:grid; place-items:center; text-align:center; gap:.5rem;
          border:1px dashed var(--border); border-radius:16px; padding:.9rem; background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0));
        }
        .blog-cta__title{ font-weight:900; letter-spacing:.2px }
        .blog-cta__actions{ display:flex; gap:.6rem }

        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.72rem .95rem;
          font-weight:700; text-decoration:none; transition: transform .18s ease, box-shadow .18s ease;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }
        .btn-ghost{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.72rem .95rem;
          font-weight:700; text-decoration:none; transition: transform .18s ease, box-shadow .18s ease;
        }
        .btn-ghost:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }
      `}</style>
    </section>
  )
}
