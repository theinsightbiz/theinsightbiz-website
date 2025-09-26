import React, { useEffect, useRef } from 'react'

export default function SectionHeader({ title, subtitle }){
  const ref = useRef(null)
  useEffect(()=>{
    const el = ref.current
    if (!el) return
    el.classList.add('reveal-up')
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting){ el.classList.add('show'); io.disconnect() }
    }, { threshold:.2 })
    io.observe(el)
    return ()=>io.disconnect()
  }, [])
  return (
    <div className="pr-hero" ref={ref}>
      <span className="ribbon" aria-hidden="true"></span>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
