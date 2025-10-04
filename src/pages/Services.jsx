import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICES, SERVICE_CATEGORIES } from '../data/servicesCatalog'
import { getCoverForService } from '../data/serviceImages'

export default function Services() {
  const navigate = useNavigate()
  const [view, setView] = useState('list') // 'list' | 'grid'

  // Keep only these category tabs (remove "All")
  const desiredLabels = [
    'Individuals & Sole Prop.',
    'Companies',
    'Partnerships',
    'NGOs & Non-Profits'
  ]

  // Build the tabs from your catalog, filtered + ordered as desired
  const tabs = useMemo(() => {
    const byLabel = new Map(SERVICE_CATEGORIES.map(c => [c.label, c]))
    return desiredLabels
      .map(lbl => byLabel.get(lbl))
      .filter(Boolean) // drops any missing labels gracefully
  }, [])

  // Default to first available tab
  const [cat, setCat] = useState(() => (tabs[0]?.key ?? null))

  // Re-sync cat if tabs load later
  useEffect(() => {
    if (!cat && tabs.length) setCat(tabs[0].key)
  }, [tabs, cat])

  // Filter services by active category
  const data = useMemo(() => {
    if (!cat) return []
    return SERVICES.filter(s => s.category === cat)
  }, [cat])

  // Reveal-on-scroll (plain JS)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const selector = '.work-row, .work-card'
    const elements = Array.from(document.querySelectorAll(selector))

    // base state once
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal')
    })

    let cancelled = false

    const onIntersect = (entries, observer) => {
      if (cancelled) return
      const toShow = []
      for (const e of entries) {
        if (e.isIntersecting) {
          toShow.push(e.target)
          observer.unobserve(e.target)
        }
      }
      if (toShow.length) {
        requestAnimationFrame(() => {
          if (cancelled) return
          for (const el of toShow) el.classList.add('show')
        })
      }
    }

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(onIntersect, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -5% 0px'
          })
        : null

    if (io) {
      for (const el of elements) {
        if (!el.classList.contains('show')) io.observe(el)
      }
    } else {
      for (const el of elements) el.classList.add('show')
    }

    return () => {
      cancelled = true
      io?.disconnect()
    }
  }, [view, cat])

  const openDetail = slug => navigate(`/services/${slug}`)

  return (
    <section className="page wide works">
      {/* Header */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>Services</h1>
        <p>Browse our offerings by client type.</p>
      </div>

      {/* Toolbar: Tabs (no "All") + View Toggle */}
      <div className="work-toolbar">
        <div className="tabs" role="tablist" aria-label="Service categories">
          {tabs.map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={cat === t.key}
              className={'tab' + (cat === t.key ? ' active' : '')}
              onClick={() => setCat(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="views">
          <button
            className={'view ' + (view === 'list' ? 'active' : '')}
            onClick={() => setView('list')}
          >
            List
          </button>
          <span className="sep">/</span>
          <button
            className={'view ' + (view === 'grid' ? 'active' : '')}
            onClick={() => setView('grid')}
          >
            Grid
          </button>
        </div>
      </div>

      {/* LIST */}
      {view === 'list' && (
        <div className="work-stream">
          {data.map((s, i) => (
            <article key={s.id} className={'work-row side-' + (i % 2 ? 'right' : 'left')}>
              <div className="image">
                <img src={getCoverForService(s)} alt={s.title} />
              </div>
              <div className="meta">
                <h3>{s.title}</h3>
                <p className="sum">{s.summary}</p>
                <div className="row-actions">
                  <button className="btn-primary" onClick={() => openDetail(s.slug)}>
                    View Project
                  </button>
                </div>
                <div className="chips">
                  <span className="chip">
                    {
                      SERVICE_CATEGORIES.find(c => c.key === s.category)
                        ?.label
                    }
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* GRID */}
      {view === 'grid' && (
        <div className="work-grid">
          {data.map(s => (
            <button
              key={s.id}
              className="work-card"
              onClick={() => openDetail(s.slug)}
              aria-label={`Open ${s.title}`}
            >
              <img src={getCoverForService(s)} alt={s.title} />
              <div className="card-label">
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <style>{`
        .work-toolbar{
          display:grid; gap:0.75rem; margin:1rem 0 1.2rem;
        }
        @media (min-width: 840px){
          .work-toolbar{
            grid-template-columns: 1fr auto;
            align-items:center;
          }
        }

        .tabs{
          display:flex; flex-wrap:wrap; gap:.5rem;
        }
        .tab{
          background:transparent; border:1px solid var(--border);
          border-radius:999px; padding:.45rem .9rem; cursor:pointer;
          font-weight:600;
        }
        .tab.active{
          background:var(--accent-600, #0e99d5);
          color:#fff; border-color:transparent;
        }

        .views{ display:flex; align-items:center; gap:.4rem; justify-self:end; opacity:.9 }
        .view{ background:transparent; border:none; padding:.2rem .4rem; font-weight:700; cursor:pointer }
        .view.active{ color:var(--accent-700, #085c83) }
        .sep{ opacity:.4 }

        .work-stream{ display:grid; gap:1.2rem }
        .work-row{
          --radius: 16px;
          display:grid; grid-template-columns: 1fr 1fr; gap:1rem; align-items:center;
          border:1px solid var(--border); border-radius:var(--radius); overflow:hidden;
          background:var(--card);
          box-shadow: 0 12px 30px rgba(0,0,0,.06);
          transform: translateY(10px);
          opacity:0;
        }
        .work-row.show{ transform: translateY(0); opacity:1; transition: all .6s cubic-bezier(.22,.61,.36,1) }
        .work-row.side-left .image{ order:1 } .work-row.side-left .meta{ order:2 }
        .work-row.side-right .image{ order:2 } .work-row.side-right .meta{ order:1 }
        .work-row .image{ height: 300px; overflow:hidden }
        .work-row .image img{ width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.04); transition:transform 1.2s ease }
        .work-row:hover .image img{ transform:scale(1.07) }
        .work-row .meta{ padding:1rem 1rem 1.1rem; display:grid; gap:.55rem }
        .work-row .sum{ opacity:.85 }
        .chips{ display:flex; gap:.4rem; flex-wrap:wrap }
        .chip{ border:1px solid var(--border); border-radius:999px; padding:.35rem .6rem; background:#fff }
        .row-actions{ margin-top:.2rem }
        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.7rem .95rem;
          font-weight:700; cursor:pointer; transition:transform .2s ease, box-shadow .2s ease;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }

        .work-grid{
          display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-top:.4rem;
        }
        .work-card{
          position:relative; border:1px solid var(--border); border-radius:16px; overflow:hidden; cursor:pointer;
          background:var(--card); padding:0; text-align:left; transform: translateY(10px); opacity:0;
        }
        .work-card.show{ transform: translateY(0); opacity:1; transition: all .6s cubic-bezier(.22,.61,.36,1) }
        .work-card img{ width:100%; height: 220px; object-fit:cover; display:block; transform:scale(1.03); transition:transform 1.2s ease }
        .work-card:hover img{ transform:scale(1.06) }
        .card-label{ padding:.75rem .9rem }
        .card-label p{ opacity:.85; margin:.25rem 0 0 }

        @media (max-width: 1020px){
          .work-row{ grid-template-columns: 1fr }
          .work-row .image{ height: 240px }
          .work-grid{ grid-template-columns: 1fr 1fr }
        }
        @media (max-width: 680px){
          .work-grid{ grid-template-columns: 1fr }
        }
      `}</style>
    </section>
  )
}
