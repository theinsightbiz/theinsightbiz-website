// src/pages/Post.jsx
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadPosts, findBySlug } from '../store/postsStore';
import '../styles/blog.css';

export default function Post() {
  const { slug } = useParams();
  const post = useMemo(() => findBySlug(loadPosts(), slug), [slug]);

  if (!post) {
    return (
      <section className="page wide section-gap">
        <p className="muted">Post not found.</p>
        <p><Link to="/blog" className="btn">Back to Blog</Link></p>
      </section>
    );
  }

  return (
    <section className="page wide section-gap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <article className="tile" style={{ padding: '1rem' }}>
        <h1 style={{ marginTop: 0 }}>{post.title}</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          {new Date(post.createdAt).toLocaleString()} · {post.category || 'General'}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.tags?.length ? (
          <ul className="hero-stats" role="list" style={{ marginTop: '1rem' }}>
            {post.tags.map(t => <li key={t}><strong>#</strong><span>{t}</span></li>)}
          </ul>
        ) : null}
      </article>
    </section>
  );
}
