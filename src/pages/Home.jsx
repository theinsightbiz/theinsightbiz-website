import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import QnA from '../components/QnA'
import ContactForm from '../components/ContactForm'
import { FaCheckCircle } from 'react-icons/fa'
import Counters from '../components/Counters'
import Testimonials from '../components/Testimonials'

export default function Home(){
  // Dice/pop + horizontal reel reveal
  useEffect(() => {
    const svc = Array.from(document.querySelectorAll('.services .svc-card'))
    const reel = Array.from(document.querySelectorAll('.h-reel .h-card'))
    const targets = [...svc, ...reel]
    if (!targets.length) return
    targets.forEach(el => el.classList.add('reveal-up'))
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('show'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* HERO */}
      <Hero />
      <Counters />

      {/* Oversized typographic intro (Made-in-UX feel) */}
      <section className="page wide">
        <div className="miux-hero">
          <h1>We build clarity.<br/>We design compliance.<br/>We scale trust.</h1>
          <p>Finance, tax and regulatory outcomes crafted with the polish of a product studio.</p>
        </div>
      </section>

      {/* Welcome / Mission / Vision */}
      <section className="page wide welcome">
        <h2>WELCOME TO INSIGHT</h2>
        <div className="grid3">
          <div className="card glass">
            <h3>Our Mission</h3>
            <p>Provides expert advice to improve operations, strategies, and profitability, helping organizations solve challenges, streamline processes, and achieve their goals.</p>
          </div>
          <div className="card glass">
            <h3>Our Vision</h3>
            <p>The vision, is to empower organizations by providing strategic insights, optimizing operations, and driving sustainable growth and innovation.</p>
          </div>
          <div className="card glass">
            <h3>What We Do</h3>
            <p>With our in-depth knowledge of Indian and UAE regulatory landscapes, commitment to personalized client service, and expertise across finance, tax, and compliance, we help businesses navigate complex challenges and drive sustainable growth. Partner with us to unlock value, reduce risk, and stay ahead in a competitive market.</p>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="page wide services">
        <h2>What services we are offering</h2>
        <div className="grid4">
          <div className="svc-card">
            <h4><FaCheckCircle/> Financial Advisory Services</h4>
            <p>Guidance to individuals and businesses on managing finances, investments, and wealth. These services include financial planning, risk management, tax strategies, retirement planning, and portfolio optimization.</p>
          </div>
          <div className="svc-card">
            <h4><FaCheckCircle/> Tax Compliance & Advisory</h4>
            <p>Ensures businesses adhere to tax regulations while optimizing tax strategies. We provide expert guidance, accurate filings, and personalized advice to help you navigate complex tax laws and minimize financial risks.</p>
          </div>
          <div className="svc-card">
            <h4><FaCheckCircle/> Accounting & Bookkeeping</h4>
            <p>From managing daily transactions to preparing financial statements, we ensure accuracy, compliance, and valuable insights to help your business grow efficiently.</p>
          </div>
          <div className="svc-card">
            <h4><FaCheckCircle/> Regulatory & Compliance</h4>
            <p>Ensure your business adheres to legal standards and industry regulations. We provide expert guidance, audits, and streamline operations effectively.</p>
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section className="page wide">
        <QnA />
      </section>

      {/* Contact */}
      <section className="page wide contact-cta">
        <h3>Questions? Contact us</h3>
        <ContactForm />
      </section>
    </>
  )
}
