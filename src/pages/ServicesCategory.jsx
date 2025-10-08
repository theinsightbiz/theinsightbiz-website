// src/pages/ServicesCategory.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVICES, SERVICE_CATEGORIES } from "../data/servicesCatalog";
import { getCoverForService } from "../data/serviceImages";

export default function ServicesCategory() {
  const navigate = useNavigate();
  const { cat: catFromRoute } = useParams();
  const tabs = useMemo(() => SERVICE_CATEGORIES.filter(Boolean), []);
  const initialCat = useMemo(
    () => tabs.find((t) => (t.key || "").toLowerCase() === (catFromRoute || "").toLowerCase())?.key || tabs[0]?.key || null,
    [tabs, catFromRoute]
  );

  const [cat, setCat] = useState(initialCat);
  const [view, setView] = useState("list"); // 'list' | 'grid'

  // keep URL in sync when user switches tabs
  useEffect(() => {
    if (!cat) return;
    // assumes your route is /services/category/:cat
    navigate(`/services/category/${cat}`, { replace: true });
  }, [cat, navigate]);

  // re-evaluate when route changes externally (e.g. via back/forward)
  useEffect(() => {
    if (!tabs.length) return;
    const matched = tabs.find((t) => (t.key || "").toLowerCase() === (catFromRoute || "").toLowerCase())?.key;
    if (matched && matched !== cat) setCat(matched);
  }, [catFromRoute, tabs]); // eslint-disable-line react-hooks/exhaustive-deps

  const data = useMemo(() => (!cat ? [] : SERVICES.filter((s) => s.category === cat)), [cat]);

  // reveal-on-scroll for smooth entrance
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".svcCat .reveal"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [view, cat]);

  const openDetail = (slug) => navigate(`/services/${slug}`);

  const catLabel = tabs.find((t) => t.key === cat)?.label || "Services";

  return (
    <section className="page wide svcCat">
      {/* Premium header */}
      <header className="svcCat-hero">
        <div className="svcCat-badge">Curated for: {catLabel}</div>
        <h1 className="svcCat-title">{catLabel}</h1>
        <p className="svcCat-lead">
          Explore tailored services for <strong>{catLabel}</strong>. Open any card to see what’s included, timelines,
          and documents required.
        </p>
      </header>

      {/* Category tabs + view toggle */}
      <div className="svcCat-toolbar">
        <nav className="svcCat-tabs" role="tablist" aria-label="Service categories">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={cat === t.key}
              className={"svcCat-tab" + (cat === t.key ? " active" : "")}
              onClick={() => setCat(t.key)}
              title={t.label}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="svcCat-views" aria-label="Toggle view">
          <button
            className={"svcCat-view" + (view === "list" ? " active" : "")}
            onClick={() => setView("list")}
          >
            List
          </button>
          <span className="svcCat-sep">/</span>
          <button
            className={"svcCat-view" + (view === "grid" ? " active" : "")}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Empty state */}
      {!data.length && (
        <div className="svcCat-empty panel-premium">
          <div className="svcCat-empty__title">No services found under {catLabel} yet.</div>
          <p className="svcCat-empty__sub">Please choose a different category.</p>
        </div>
      )}

      {/* List view */}
      {view === "list" && !!data.length && (
        <div className="svcCat-stream">
          {data.map((s, i) => (
            <article key={s.id} className={"svcCat-row reveal " + (i % 2 ? "flip" : "")}>
              <div className="svcCat-img">
                <img src={getCoverForService(s)} alt={s.title} />
              </div>
              <div className="svcCat-meta">
                <h3 className="svcCat-h3">{s.title}</h3>
                <p className="svcCat-sum">{s.summary}</p>
                <div className="svcCat-actions">
                  <button className="svcCat-btnPrimary" onClick={() => openDetail(s.slug)}>
                    View Project
                  </button>
                </div>
                <div className="svcCat-chips">
                  <span className="svcCat-chip">{catLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && !!data.length && (
        <div className="svcCat-grid">
          {data.map((s) => (
            <button
              key={s.id}
              className="svcCat-card reveal"
              onClick={() => openDetail(s.slug)}
              aria-label={`Open ${s.title}`}
            >
              <img src={getCoverForService(s)} alt={s.title} />
              <div className="svcCat-cardLabel">
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Scoped styles (namespace: .svcCat) */}
      <style>{`
        .svcCat :where(h1,h2,h3,h4){ letter-spacing:-.2px }

        .svcCat-hero{ padding: 1rem 0 .6rem }
        .svcCat-badge{
          display:inline-block; font-size:.8rem; font-weight:800; padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28); margin-bottom:.5rem;
        }
        .svcCat-title{ font-weight:900; margin:0 0 .25rem }
        .svcCat-lead{ max-width: 960px; opacity:.92 }

        .svcCat-toolbar{
          display:grid; gap:.75rem; margin: .9rem 0 1.1rem;
          background: linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0));
          border:1px solid var(--border); border-radius:16px; padding:.7rem .8rem;
        }
        @media (min-width: 860px){
          .svcCat-toolbar{ grid-template-columns: 1fr auto; align-items:center; }
        }

        .svcCat-tabs{ display:flex; flex-wrap:wrap; gap:.5rem }
        .svcCat-tab{
          background:#fff; border:1px solid var(--border); border-radius:999px; padding:.46rem .9rem; cursor:pointer; font-weight:700;
          transition: all .18s ease;
        }
        .svcCat-tab.active{
          background: var(--accent-600, #0e99d5); color:#fff; border-color: transparent; transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(14,153,213,.18);
        }

        .svcCat-views{ display:flex; align-items:center; gap:.45rem; justify-self:end; opacity:.95 }
        .svcCat-view{ background:transparent; border:none; padding:.2rem .4rem; font-weight:800; cursor:pointer }
        .svcCat-view.active{ color: var(--accent-700, #085c83) }
        .svcCat-sep{ opacity:.4 }

        /* Empty */
        .svcCat-empty{
          padding: 1rem; text-align:center; border:1px solid var(--border); border-radius:16px; background:var(--card);
        }
        .svcCat-empty__title{ font-weight:900 }
        .svcCat-empty__sub{ opacity:.85 }

        /* LIST */
        .svcCat-stream{ display:grid; gap:1rem }
        .svcCat-row{
          --r:16px;
          display:grid; grid-template-columns: 1fr 1fr; gap:1rem; align-items:center;
          border:1px solid var(--border); border-radius:var(--r); overflow:hidden; background:var(--card);
          box-shadow: 0 12px 30px rgba(0,0,0,.06); transform: translateY(10px); opacity:0;
        }
        .svcCat-row.flip .svcCat-img{ order:2 } .svcCat-row.flip .svcCat-meta{ order:1 }
        .svcCat-row.show{ transform: translateY(0); opacity:1; transition: all .6s cubic-bezier(.22,.61,.36,1) }

        .svcCat-img{ height: 300px; overflow:hidden }
        .svcCat-img img{ width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.03); transition: transform 1.2s ease }
        .svcCat-row:hover .svcCat-img img{ transform:scale(1.06) }

        .svcCat-meta{ padding:1rem 1rem 1.1rem; display:grid; gap:.55rem }
        .svcCat-h3{ margin:0 }
        .svcCat-sum{ opacity:.88 }
        .svcCat-actions{ margin-top:.2rem }
        .svcCat-btnPrimary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.7rem .95rem;
          font-weight:800; cursor:pointer; transition: transform .2s ease, box-shadow .2s ease;
        }
        .svcCat-btnPrimary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }

        .svcCat-chips{ display:flex; gap:.4rem; flex-wrap:wrap }
        .svcCat-chip{ border:1px solid var(--border); border-radius:999px; padding:.35rem .6rem; background:#fff }

        /* GRID */
        .svcCat-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem; margin-top:.3rem }
        .svcCat-card{
          position:relative; border:1px solid var(--border); border-radius:16px; overflow:hidden; cursor:pointer;
          background:var(--card); padding:0; text-align:left; transform: translateY(10px); opacity:0;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .svcCat-card.show{ transform: translateY(0); opacity:1; transition: all .6s cubic-bezier(.22,.61,.36,1) }
        .svcCat-card:hover{ transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,.08); border-color: rgba(14,153,213,.35) }
        .svcCat-card img{ width:100%; height: 220px; object-fit:cover; display:block; transform:scale(1.02); transition: transform 1.2s ease }
        .svcCat-card:hover img{ transform:scale(1.06) }
        .svcCat-cardLabel{ padding:.75rem .9rem }
        .svcCat-cardLabel p{ opacity:.86; margin:.25rem 0 0 }

        @media (max-width: 1020px){
          .svcCat-row{ grid-template-columns: 1fr }
          .svcCat-img{ height: 240px }
          .svcCat-grid{ grid-template-columns: 1fr 1fr }
        }
        @media (max-width: 680px){
          .svcCat-grid{ grid-template-columns: 1fr }
        }
      `}</style>
    </section>
  );
}
