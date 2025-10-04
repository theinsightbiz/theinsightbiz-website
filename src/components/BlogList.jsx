// src/components/BlogList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BlogList
 * Props:
 *  - posts: Array<{ id, slug, title, content, tags, category, createdAt }>
 *  - onDelete?: (id: string) => void
 *  - onUpdate?: (id: string, patch: object) => void
 */
export default function BlogList({ posts = [], onDelete, onUpdate }) {
  if (!Array.isArray(posts)) posts = [];

  const strip = (html = '') =>
    String(html)
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const fmt = (iso) => {
    try { return new Date(iso).toLocaleString(); } catch { return ''; }
  };

  if (posts.length === 0) {
    return (
      <div className="tile" style={{ padding: '1rem' }}>
        <p className="muted" style={{ margin: 0 }}>No posts yet.</p>
        <p style={{ marginTop: '.5rem' }}>
          <a href="#create" className="btn btn-primary">Create your first post</a>
        </p>
      </div>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.8rem' }}>
      {posts.map((p) => {
        const excerpt = strip(p.content).slice(0, 180) + (strip(p.content).length > 180 ? '…' : '');
        return (
          <li key={p.id} className="tile" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'baseline' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>
                <Link to={`/post/${p.slug}`} style={{ textDecoration: 'none' }}>
                  {p.title || 'Untitled'}
                </Link>
              </h3>
              <span className="muted" style={{ fontSize: '.85rem', whiteSpace: 'nowrap' }}>
                {fmt(p.createdAt)}{p.category ? ` · ${p.category}` : ''}
              </span>
            </div>
            <p className="muted" style={{ margin: '.35rem 0 .6rem' }}>{excerpt}</p>

            {Array.isArray(p.tags) && p.tags.length > 0 && (
              <ul className="hero-stats" role="list" style={{ marginTop: '.3rem' }}>
                {p.tags.map((t) => (
                  <li key={t}><strong>#</strong><span>{t}</span></li>
                ))}
              </ul>
            )}

            <div style={{ display: 'flex', gap: '.4rem', marginTop: '.6rem' }}>
              <Link to={`/post/${p.slug}`} className="btn">Read</Link>
              {typeof onUpdate === 'function' && (
                <button type="button" className="btn btn-ghost" onClick={() => onUpdate(p.id, {})}>Edit</button>
              )}
              {typeof onDelete === 'function' && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => { if (confirm('Delete this post?')) onDelete(p.id); }}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
