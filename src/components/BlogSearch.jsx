// CREATE or VERIFY this file exists with a default export
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogFilter } from '../actions'

export default function BlogSearch(){
  const dispatch = useDispatch()
  const { posts = [], filter = {} } = useSelector(s => (s && s.content) ? s.content : { posts: [], filter: {} })
  const allTags = useMemo(() => {
    const s = new Set()
    posts.forEach(p => (p.tags || []).forEach(t => s.add(t)))
    return Array.from(s)
  }, [posts])

  return (
    <div className="blog-toolbar">
      <div className="blog-search">
        <input
          value={filter.q || ''}
          onChange={e => dispatch(setBlogFilter({ q: e.target.value }))}
          placeholder="Search posts…"
        />
      </div>
      <span className={'chip ' + (!filter.tag ? 'active' : '')} onClick={() => dispatch(setBlogFilter({ tag: null }))}>All</span>
      {allTags.map((t) => (
        <span
          key={t}
          className={'chip ' + (filter.tag === t ? 'active' : '')}
          onClick={() => dispatch(setBlogFilter({ tag: t }))}
        >
          {t}
        </span>
      ))}
    </div>
  )
}
