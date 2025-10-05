import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor'
import BlogList from '../components/BlogList'
import BlogSearch from '../components/BlogSearch'

export default function Blog(){
  // Reveal for any tiles/reel inside BlogList once rendered
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
    <>
      {/* Premium hero */}
      <section className="page wide">
        <div className="pr-hero">
          <span className="ribbon" aria-hidden="true"></span>
          <h1>Insights & Updates</h1>
          <p>Curated knowledge across tax, accounting, and global compliance.</p>
        </div>
      </section>

      {/* Editor + Search inside premium panels */}
      <section className="page wide" style={{marginTop:'1.2rem'}}>
        <div className="panel-premium" style={{marginBottom:'1rem'}}>
          <BlogEditor />
        </div>
        <div className="panel-premium">
          <BlogSearch />
        </div>
      </section>

      {/* Blog list */}
      <section className="page wide" style={{marginTop:'1.2rem'}}>
        <BlogList />
      </section>
    </>
  )
}