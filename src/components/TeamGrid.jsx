import React from 'react'

// ✅ Update: import photos from src/assets root (no /team subfolder)
import Priyam from '../assets/priyam-adarsh.jpg'
import Pratik from '../assets/pratik-raj.jpg'
import Aniket from '../assets/aniket-kishore.jpg'
import Hrithik from '../assets/hrithik-raj.jpg'

const TEAM = [
  {
    name: 'Hrithik Raj',
    role: 'Consultant',
    bio: 'Chartered Accountant, expert in Tax and Finance across India, UAE, UK and USA.',
    photo: Hrithik,
  },
  {
    name: 'Pratik Raj',
    role: 'Partner',
    bio: 'Compliance Officer, expert in Audit and Regulatory Compliances across India, UAE, UK and USA.',
    photo: Pratik,
  },
  {
    name: 'Aniket Kishore',
    role: 'Expert',
    bio: 'Expert in Accounting and Bookkeeping across India, UAE, UK and USA.',
    photo: Aniket,
  },
  {
    name: 'Priyam Adarsh',
    role: 'Partner',
    bio: 'Expert in Regulatory Compliance and Risk Management across India, UAE, UK and USA.',
    photo: Priyam,
  },
]

export default function TeamGrid(){
  return (
    <section className="pros">
      <h2 className="section-title">Our Professionals</h2>
      <p className="section-sub">Seasoned partners and consultants delivering cross-border expertise.</p>
      <div className="pro-grid">
        {TEAM.map((m, i) => (
          <article className="pro-card" key={i}>
            <div className="pro-photo-wrap">
              <img className="pro-photo" src={m.photo} alt={`${m.name} — ${m.role}`} />
              <span className="badge">{m.role}</span>
            </div>
            <h3 className="pro-name">{m.name}</h3>
            <p className="pro-bio">{m.bio}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
