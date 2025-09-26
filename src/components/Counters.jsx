import React, { useEffect, useState } from 'react'

const items = [
  { label: 'Years of Experience', to: 10 },
  { label: 'Clients Served', to: 500 },
  { label: 'Projects Delivered', to: 1000 },
  { label: 'Jurisdictions', to: 4 },
]

function useCount(to, duration = 1200){
  const [n, setN] = useState(0)
  useEffect(() => {
    let start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      setN(Math.round(p * to))
      if(p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return n
}

export default function Counters(){
  return (
    <section className="counters">
      <div className="counter-grid">
        {items.map((it, i) => {
          const n = useCount(it.to)
          return (
            <div className="counter" key={i}>
              <div className="num">{n}+</div>
              <div className="label">{it.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
