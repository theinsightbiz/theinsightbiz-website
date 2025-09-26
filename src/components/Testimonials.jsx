import React, { useEffect, useState } from 'react'

const data = [
  { name: 'Ananya, COO (Delhi)', text: 'Their tax and compliance advisory saved us weeks each quarter.' },
  { name: 'Omar, Founder (Dubai)', text: 'Flawless UAE VAT onboarding and ongoing support.' },
  { name: 'Rohit, CFO (Mumbai)', text: 'Strategic insights turned into measurable growth within months.' },
]

export default function Testimonials(){
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % data.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="testimonials">
      <h2>What our clients say</h2>
      <div className="t-card">
        <p>“{data[idx].text}”</p>
        <small>— {data[idx].name}</small>
      </div>
      <div className="t-nav">
        {data.map((_, i) => (
          <span key={i} className={'dot ' + (i===idx?'active':'')} onClick={() => setIdx(i)} />
        ))}
      </div>
    </section>
  )
}
