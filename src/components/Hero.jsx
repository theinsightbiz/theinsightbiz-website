import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero(){
  const navigate = useNavigate()
  return (
    <section className="hero" style={{backgroundImage: 'url(/src/assets/laptop-hero.png)'}}>
      <div className="hero-overlay">
        <h1 className="hero-title">Insight Beyond Numbers, <br/> Excellence Beyond Limits</h1>
        <div className="hero-ctas">
          <button onClick={() => navigate('/about')} className="btn primary">Meet our Team</button>
          <button onClick={() => navigate('/contact')} className="btn primary">Get Started</button>
        </div>
      </div>
    </section>
  )
}
