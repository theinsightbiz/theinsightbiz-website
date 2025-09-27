import React, { useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SERVICES, SERVICE_CATEGORIES } from '../data/servicesCatalog'
import { getCoverForService } from '../data/serviceImages'   // ← NEW

export default function ServicesCategory(){
  const { key } = useParams()
  const navigate = useNavigate()

  const category = SERVICE_CATEGORIES.find(c => c.key === key)

  useEffect(() => {
    if (!category) navigate('/services', { replace: true })
  }, [category, navigate])

  const items = useMemo(() => SERVICES.filter(s => s.category === key), [key])

  if (!category) return null

  return (
    <section className="page wide">
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>{category.label}</h1>
        <p>Explore services in this category. Click any to view full details—scope, timeline, and documents.</p>
      </div>

      <div className="work-grid">
        {items.map(s => (
          <button
            key={s.id}
            className="work-card show"
            onClick={()=>navigate(`/services/${s.slug}`)}
            aria-label={`Open ${s.title}`}
          >
            <img src={getCoverForService(s)} alt={s.title} />  {/* ← changed */}
            <div className="card-label">
              <h4>{s.title}</h4>
              <p>{s.summary}</p>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .work-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-top:.4rem }
        .work-card{ position:relative; border:1px solid var(--border); border-radius:16px; overflow:hidden; cursor:pointer; background:var(--card); padding:0; text-align:left }
        .work-card img{ width:100%; height: 220px; object-fit:cover; display:block; transform:scale(1.03); transition:transform 1.2s ease }
        .work-card:hover img{ transform:scale(1.06) }
        .card-label{ padding:.75rem .9rem }
        .card-label p{ opacity:.85; margin:.25rem 0 0 }
        @media (max-width: 1020px){
          .work-grid{ grid-template-columns: 1fr 1fr }
        }
        @media (max-width: 680px){
          .work-grid{ grid-template-columns: 1fr }
        }
      `}</style>
    </section>
  )
}
