import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function HorizontalScroller({ items = [] }){
  const ref = useRef(null)
  useEffect(()=>{
    const cards = ref.current?.querySelectorAll('.h-card') || []
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target) } })
    }, { threshold:.15 })
    cards.forEach(c=>{ c.classList.add('reveal-up'); io.observe(c) })
    return ()=>io.disconnect()
  }, [])
  return (
    <div className="h-reel" ref={ref}>
      {items.map((it, i)=>(
        <Link to={it.href || '#'} className="h-card" key={i}>
          {it.img && <img src={it.img} alt={it.title}/>}
          <div className="label">
            <h3>{it.title}</h3>
            {it.description && <p>{it.description}</p>}
          </div>
        </Link>
      ))}
    </div>
  )
}
