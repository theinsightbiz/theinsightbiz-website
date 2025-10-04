// src/store/postsStore.js
// Lightweight blog store with localStorage persistence.

const KEY = 'myblog.posts.v1';

export function loadPosts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePosts(posts) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function slugify(title = '') {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export function addPost(posts, { title, content, tags = [], category = '' }) {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  const slug = slugify(title || id);
  const createdAt = new Date().toISOString();
  const post = { id, slug, title, content, tags, category, createdAt, updatedAt: createdAt };
  const next = [post, ...posts];
  savePosts(next);
  return next;
}

export function updatePost(posts, id, patch = {}) {
  const next = posts.map(p => p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p);
  savePosts(next);
  return next;
}

export function deletePost(posts, id) {
  const next = posts.filter(p => p.id !== id);
  savePosts(next);
  return next;
}

export function findBySlug(posts, slug) {
  return posts.find(p => p.slug === slug);
}
