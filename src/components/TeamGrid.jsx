import React from 'react'
import Priyam from '../assets/team/priyam-adarsh.jpg'
import Pratik from '../assets/team/pratik-raj.jpg'
import Aniket from '../assets/team/aniket-kishore.jpg'

const TEAM = [
  {
    name: 'Priyam Adarsh',
    role: 'Partner',
    bio: 'Chartered Accountant, expert in Tax and Finance across India, UAE, UK and USA.',
    photo: Priyam,
  },
  {
    name: 'Pratik Raj',
    role: 'Partner',
    bio: 'Company Secretary, expert in Audit and Regulatory Compliances across India, UAE, UK and USA.',
    photo: Pratik,
  },
  {
    name: 'Aniket Kishore',
    role: 'Consultant',
    bio: 'Expert in Accounting and Bookkeeping across India, UAE, UK and USA.',
    photo: Aniket,
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
