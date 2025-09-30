import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICES, SERVICE_CATEGORIES } from '../data/servicesCatalog'
import { getCoverForService } from '../data/serviceImages'  // ← NEW

export default function Services(){
  const navigate = useNavigate()
  const [view, setView] = useState('list') // 'list' | 'grid'
  const [cat, setCat] = useState('all')

  const data = useMemo(() => {
    return cat === 'all' ? SERVICES : SERVICES.filter(s => s.category === cat)
  }, [cat])

  // reveal on scroll
  useEffect(() => {
  if (typeof window === 'undefined') return;

  const elements = Array.from(
    document.querySelectorAll('.work-row, .work-card')
  );

  // Ensure base state exists but avoid redundant work
  elements.forEach((el) => el.classList.add('reveal'));

  let io;

  const onIntersect = (entries, observer) => {
    // Batch DOM writes to avoid layout thrash while scrolling
    requestAnimationFrame(() => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          observer.unobserve(e.target);
        }
      });
    });
  };

  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.15,             // a bit lower to trigger earlier
      rootMargin: '0px 0px -5% 0px' // gentler bottom margin
    });

    // Only observe items not already shown
    elements.forEach((el) => {
      if (!el.classList.contains('show')) io.observe(el);
    });
  } else {
    // Fallback: just show all
    elements.forEach((el) => el.classList.add('show'));
  }

  return () => io?.disconnect();
}, [view, cat]);


  const openDetail = (slug) => navigate(`/services/${slug}`)

  return (
    <section className="page wide works">
      {/* premium intro */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>All Work</h1>
        <p>Explore our service lines across Individuals, Companies, Partnerships, and Non-Profits.</p>
      </div>

      {/* toolbar */}
      <div className="work-toolbar">
        <div className="cats">
          <button
            className={'tab ' + (cat==='all'?'active':'')}
            onClick={()=>setCat('all')}
          >All</button>
          {SERVICE_CATEGORIES.map(c =>
            <button key={c.key}
              className={'tab ' + (cat===c.key?'active':'')}
              onClick={()=>setCat(c.key)}
            >{c.label}</button>
          )}
        </div>
        <div className="views">
          <button className={'view ' + (view==='list'?'active':'')} onClick={()=>setView('list')}>List</button>
          <span className="sep">/</span>
          <button className={'view ' + (view==='grid'?'active':'')} onClick={()=>setView('grid')}>Grid</button>
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
                  <button className="btn-primary" onClick={()=>openDetail(s.slug)}>View Project</button>
                </div>
                <div className="chips">
                  <span className="chip">{SERVICE_CATEGORIES.find(c => c.key === s.category)?.label}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* GRID */}
      {view === 'grid' && (
        <div className="work-grid">
          {data.map((s) => (
            <button key={s.id} className="work-card" onClick={()=>openDetail(s.slug)} aria-label={`Open ${s.title}`}>
              <img src={getCoverForService(s)} alt={s.title} />
              <div className="card-label">
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* styles unchanged */}
      <style>{`
        .works :where(h1,h2){ letter-spacing:-.2px }
        .work-toolbar{
          display:grid; place-items:center; gap:.6rem; margin:1rem 0 1.2rem;
        }
        .cats{ display:flex; flex-wrap:wrap; justify-content:center; gap:.4rem }
        .tab{
          border:1px solid var(--border); border-radius:999px; padding:.5rem .8rem; background:#fff;
          transition:all .2s ease; font-size:.92rem;
        }
        .tab.active{ background:rgba(14,153,213,.12); border-color:rgba(14,153,213,.35); color:#085c83 }
        .views{ display:flex; align-items:center; gap:.4rem; opacity:.9 }
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
