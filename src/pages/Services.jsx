import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICES, SERVICE_CATEGORIES } from '../data/servicesCatalog'
import { getCoverForService } from '../data/serviceImages'

export default function Services() {
  const navigate = useNavigate()
  const [view, setView] = useState('list') // 'list' | 'grid'

  // Build tabs from your catalog as-is (no hard-coded labels)
  const tabs = useMemo(() => SERVICE_CATEGORIES.filter(Boolean), [])

  // Default to first available tab
  const [cat, setCat] = useState(() => (tabs[0]?.key ?? null))
  useEffect(() => { if (!cat && tabs.length) setCat(tabs[0].key) }, [tabs, cat])

  // Filter services by active category
  const data = useMemo(() => (!cat ? [] : SERVICES.filter(s => s.category === cat)), [cat])

  // Reveal-on-scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.svx .reveal'))
    if (!els.length) return
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('show')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target) } })
    }, { threshold: .18, rootMargin: '0px 0px -6% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [view, cat])

  const openDetail = slug => navigate(`/services/${slug}`)

  return (
    <section className="page wide svx">
      {/* Premium header */}
      <header className="svx-hero">
        <div className="svx-badge" style={{ color: "#000000" }}>Clear scope • Transparent timelines</div>
        <h1 className="svx-title" style={{ color: "#07cbfcff" }}>Services</h1>
        <p className="svx-lead" style={{ color: "#000000" }}>Browse our offerings by client type and open a service to see what’s included, timelines, and documents required.</p>
      </header>

      {/* Toolbar: Tabs + View Toggle */}
      <div className="svx-toolbar">
        <nav className="svx-tabs" role="tablist" aria-label="Service categories">
          {tabs.map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={cat === t.key}
              className={'svx-tab' + (cat === t.key ? ' active' : '')}
              onClick={() => setCat(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="svx-views" aria-label="Toggle view">
          <button
            className={'svx-view' + (view === 'list' ? ' active' : '')}
            onClick={() => setView('list')}
          >List</button>
          <span className="svx-sep">/</span>
          <button
            className={'svx-view' + (view === 'grid' ? ' active' : '')}
            onClick={() => setView('grid')}
          >Grid</button>
        </div>
      </div>

      {/* LIST VIEW */}
      {view === 'list' && (
        <div className="svx-stream">
          {data.map((s, i) => (
            <article key={s.id} className={'svx-row reveal ' + (i % 2 ? 'flip' : '')}>
              <div className="svx-img">
                <img src={getCoverForService(s)} alt={s.title} />
              </div>
              <div className="svx-meta">
                <h3 className="svx-h3">{s.title}</h3>
                <p className="svx-sum">{s.summary}</p>
                <div className="svx-actions">
                  <button className="svx-btn-primary" onClick={() => openDetail(s.slug)}>
                    View
                  </button>
                </div>
                <div className="svx-chips">
                  <span className="svx-chip">
                    {SERVICE_CATEGORIES.find(c => c.key === s.category)?.label}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* GRID VIEW */}
      {view === 'grid' && (
        <div className="svx-grid">
          {data.map(s => (
            <button
              key={s.id}
              className="svx-card reveal"
              onClick={() => openDetail(s.slug)}
              aria-label={`Open ${s.title}`}
            >
              <img src={getCoverForService(s)} alt={s.title} />
              <div className="svx-card-label">
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Scoped styles (unique .svx namespace so you SEE changes immediately) */}
      <style>{`
        .svx :where(h1,h2,h3,h4){ letter-spacing:-.2px }

        .svx-hero{ padding: 1rem 0 .6rem }
        .svx-badge{
          display:inline-block; font-size:.8rem; font-weight:800; padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28); margin-bottom:.5rem;
        }
        .svx-title{ font-weight:900; margin:0 0 .25rem }
        .svx-lead{ max-width: 920px; opacity:.92 }

        .svx-toolbar{
          display:grid; gap:.75rem; margin: .9rem 0 1.1rem;
          background: linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0));
          border:1px solid var(--border); border-radius:16px; padding:.7rem .8rem;
        }
        @media (min-width: 860px){
          .svx-toolbar{ grid-template-columns: 1fr auto; align-items:center; }
        }

        .svx-tabs{ display:flex; flex-wrap:wrap; gap:.5rem }
        .svx-tab{
          background:#fff; border:1px solid var(--border); border-radius:999px; padding:.46rem .9rem; cursor:pointer; font-weight:700;
          transition: all .18s ease;
        }
        .svx-tab.active{
          background: var(--accent-600, #0e99d5); color:#fff; border-color: transparent; transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(14,153,213,.18);
        }

        .svx-views{ display:flex; align-items:center; gap:.45rem; justify-self:end; opacity:.95 }
        .svx-view{ background:transparent; border:none; padding:.2rem .4rem; font-weight:800; cursor:pointer }
        .svx-view.active{ color: var(--accent-700, #085c83) }
        .svx-sep{ opacity:.4 }

        /* LIST */
        .svx-stream{ display:grid; gap:1rem }
        .svx-row{
          --r:16px;
          display:grid; grid-template-columns: 1fr 1fr; gap:1rem; align-items:center;
          border:1px solid var(--border); border-radius:var(--r); overflow:hidden; background:var(--card);
          box-shadow: 0 12px 30px rgba(0,0,0,.06); transform: translateY(10px); opacity:0;
        }
        .svx-row.flip .svx-img{ order:2 } .svx-row.flip .svx-meta{ order:1 }
        .svx-row.show{ transform: translateY(0); opacity:1; transition: all .6s cubic-bezier(.22,.61,.36,1) }

        .svx-img{ height: 300px; overflow:hidden }
        .svx-img img{ width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.03); transition: transform 1.2s ease }
        .svx-row:hover .svx-img img{ transform:scale(1.06) }

        .svx-meta{ padding:1rem 1rem 1.1rem; display:grid; gap:.55rem }
        .svx-h3{ margin:0 }
        .svx-sum{ opacity:.88 }
        .svx-actions{ margin-top:.2rem }
        .svx-btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.7rem .95rem;
          font-weight:800; cursor:pointer; transition: transform .2s ease, box-shadow .2s ease;
        }
        .svx-btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }

        .svx-chips{ display:flex; gap:.4rem; flex-wrap:wrap }
        .svx-chip{ border:1px solid var(--border); border-radius:999px; padding:.35rem .6rem; background:#fff }

        /* GRID */
        .svx-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-top:.3rem }
        .svx-card{
          position:relative; border:1px solid var(--border); border-radius:16px; overflow:hidden; cursor:pointer;
          background:var(--card); padding:0; text-align:left; transform: translateY(10px); opacity:0;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .svx-card.show{ transform: translateY(0); opacity:1; transition: all .6s cubic-bezier(.22,.61,.36,1) }
        .svx-card:hover{ transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,.08); border-color: rgba(14,153,213,.35) }
        .svx-card img{ width:100%; height: 220px; object-fit:cover; display:block; transform:scale(1.02); transition: transform 1.2s ease }
        .svx-card:hover img{ transform:scale(1.06) }
        .svx-card-label{ padding:.75rem .9rem }
        .svx-card-label p{ opacity:.86; margin:.25rem 0 0 }

        @media (max-width: 1020px){
          .svx-row{ grid-template-columns: 1fr }
          .svx-img{ height: 240px }
          .svx-grid{ grid-template-columns: 1fr 1fr }
        }
        @media (max-width: 680px){
          .svx-grid{ grid-template-columns: 1fr }
        }
      `}</style>
    </section>
  )
}
