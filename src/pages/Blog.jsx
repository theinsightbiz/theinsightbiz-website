import React, { useEffect, useMemo, useState } from 'react';
import BlogEditor from '../components/BlogEditor';
import BlogList from '../components/BlogList';
import BlogSearch from '../components/BlogSearch';
import { loadPosts, addPost, deletePost, updatePost } from '../store/postsStore';
import '../styles/blog.css';

export default function Blog() {
  // ---- State & persistence ----
  const [posts, setPosts] = useState(() => loadPosts());
  const [query, setQuery] = useState('');

  // Handlers passed to child components
  function handleSave({ title, content, tags = [], category = '' }) {
    setPosts(prev => addPost(prev, { title, content, tags, category }));
  }
  function handleDelete(id) {
    setPosts(prev => deletePost(prev, id));
  }
  function handleUpdate(id, patch) {
    setPosts(prev => updatePost(prev, id, patch));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  // ---- Reveal animation (unchanged) ----
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.tile, .h-reel .h-card, [data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((el) => el.classList.add('show'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [posts]); // re-run when list changes so new cards reveal

  const categories = [
    'Direct & Indirect Tax',
    'Company Law',
    'IBC',
    'FEMA/ECB/ODI',
    'SEBI & Markets',
    'Accounting Standards',
    'Audit & Assurance',
    'ADR & Arbitration',
    'Criminal Law',
    'Constitutional Law',
  ];

  return (
    <div>
      {/* Premium hero */}
      <section className="page wide">
        <div className="pr-hero" data-reveal>
          <span className="ribbon" aria-hidden="true"></span>
          <div className="hero-top">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li><a href="/">Home</a></li>
                <li aria-current="page">Blog</li>
              </ol>
            </nav>
            <span className="badge">Updated weekly</span>
          </div>
          <h1>Insights &amp; Updates</h1>
          <p className="sub">Curated knowledge across tax, accounting, and global compliance.</p>
          <div className="hero-ctas">
            <a href="#create" className="btn btn-primary">Write a new post</a>
            <a href="#latest" className="btn btn-ghost">Browse latest</a>
          </div>
          <ul className="hero-stats" role="list">
            <li><strong>120+</strong><span>Expert notes</span></li>
            <li><strong>35</strong><span>Case digests</span></li>
            <li><strong>12</strong><span>Practice areas</span></li>
          </ul>
        </div>
      </section>

      {/* Editor + Search inside premium panels */}
      <section id="create" className="page wide section-gap">
        <div className="grid-2">
          <div className="panel-premium" data-reveal>
            <div className="panel-hd">
              <h2>Create</h2>
              <p>Draft or refine a post. Auto-saves in your editor component.</p>
            </div>
            {/* Expect BlogEditor to call onSave with {title, content, tags?, category?} */}
            <BlogEditor onSave={handleSave} onUpdate={handleUpdate} />
          </div>
          <div className="panel-premium" data-reveal>
            <div className="panel-hd">
              <h2>Search</h2>
              <p>Find posts by title, tag, or citation quickly.</p>
            </div>
            {/* Expect BlogSearch to call onQueryChange with a string */}
            <BlogSearch onQueryChange={setQuery} />
          </div>
        </div>
      </section>

      {/* Categories rail */}
      <section className="page wide section-gap" aria-labelledby="cat-hd">
        <div className="panel-neutral" data-reveal>
          <div className="panel-hd">
            <h2 id="cat-hd">Categories</h2>
          </div>
          <div className="h-reel" role="list">
            {categories.map((cat) => (
              <button
                key={cat}
                className="h-card"
                type="button"
                data-reveal
                onClick={() => setQuery(cat)}
                title={`Filter by ${cat}`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog list */}
      <section id="latest" className="page wide section-gap">
        <header className="sec-hd" data-reveal>
          <h2>Latest publications</h2>
          <p className="muted">Hand-picked updates and longform guidance.</p>
        </header>
        {/* Pass posts + optional handlers to your list component */}
        <BlogList posts={filtered} onDelete={handleDelete} onUpdate={handleUpdate} />
      </section>
    </div>
  );
}
