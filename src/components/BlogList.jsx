import React from 'react'
import { useSelector } from 'react-redux'

export default function BlogList(){
  const { posts = [], filter = {} } = useSelector(s => (s && s.content) ? s.content : { posts: [], filter: {} })
   const matches = (p) => {
     const q = (filter.q || '').toLowerCase()
     const inText = (p.title || '').toLowerCase().includes(q) || (p.body || '').toLowerCase().includes(q)
     const tagOk = !filter.tag || (p.tags || []).map(t=>String(t).toLowerCase()).includes(String(filter.tag).toLowerCase())
     return inText && tagOk
   }
  return (
    <div className="blog-list">
      {posts.filter(matches).map(p => (
        <article key={p.id} className="post">
          <h3>{p.title}</h3>
          <small>{new Date(p.date).toLocaleString()}</small>
          <p>{p.body}</p>
          {p.tags && p.tags.length > 0 && (
            <div style={{marginTop:'.4rem', display:'flex', gap:'.4rem', flexWrap:'wrap'}}>
              {p.tags.map((t,i)=> <span key={i} className="chip">{t}</span>)}
            </div>
           )}
        </article>
      ))}
    </div>
  )
}
