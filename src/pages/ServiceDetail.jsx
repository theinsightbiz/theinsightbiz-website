import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { findServiceBySlug, SERVICE_CATEGORIES } from '../data/servicesCatalog'
import { getCoverForService } from '../data/serviceImages'   // ← NEW

export default function ServiceDetail(){
  const { slug } = useParams()
  const svc = findServiceBySlug(slug)
  const navigate = useNavigate()

  if(!svc){
    return (
      <section className="page wide">
        <div className="panel-premium">
          <h2>Service not found</h2>
          <p>The item you’re looking for isn’t available.</p>
          <button className="btn-primary" onClick={()=>navigate('/services')}>Back to Services</button>
        </div>
      </section>
    )
  }

  const catLabel = SERVICE_CATEGORIES.find(c => c.key === svc.category)?.label
  const cover = getCoverForService(svc)   // ← use centralized image

  return (
    <section className="page wide">
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>{svc.title}</h1>
        <p>{catLabel}</p>
      </div>

      <article className="detail">
        <div className="lead">
          <img src={cover} alt={svc.title} />
        </div>
        <div className="panel-premium prose">
          <p>{svc.details}</p>

          <h3>Getting Started</h3>
          <ul>
            <li>Free discovery call to confirm scope & timelines.</li>
            <li>Document checklist and access setup (where needed).</li>
            <li>Milestones, deliverables, and review cadence.</li>
          </ul>

          <div className="cta">
            <Link className="btn-primary" to="/contact">Contact for more</Link>
            <Link className="btn-ghost" to="/services">Back to All Work</Link>
          </div>
        </div>
      </article>

      <style>{`
        .detail{ display:grid; gap:1rem; grid-template-columns: 1fr 1fr }
        .lead{ border:1px solid var(--border); border-radius:16px; overflow:hidden; background:var(--card) }
        .lead img{ width:100%; height:100%; max-height:420px; object-fit:cover; display:block }
        .prose p{ opacity:.9 }
        .cta{ display:flex; gap:.6rem; margin-top:.6rem }
        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.7rem .95rem;
          font-weight:700; cursor:pointer; text-decoration:none; display:inline-block;
        }
        .btn-ghost{
          border:1px solid var(--border); border-radius:12px; padding:.68rem .95rem; text-decoration:none; color:inherit;
        }
        @media (max-width: 1020px){ .detail{ grid-template-columns: 1fr } .lead img{ max-height:320px } }
      `}</style>
    </section>
  )
}
