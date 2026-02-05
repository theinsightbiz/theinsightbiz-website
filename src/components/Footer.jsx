import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa'

export default function Footer(){
  return (
    <footer className="footer" style={{ color: '#000000' }}>
      <div className="footer-grid">
        <div>
          <h4>About Us</h4>
          <p style={{ color: '#000000' }}>At the Insight Biz, we are dedicated to providing expert consulting services in finance, tax, and compliance, helping businesses thrive in India, UAE, UK and USA. Our tailored solutions, deep regulatory knowledge, and commitment to excellence make us a trusted partner for your business success.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="links">
            <li><a href="https://www.incometax.gov.in/" target="_blank" rel="noreferrer">Income Tax <FaExternalLinkAlt/></a></li>
            <li><a href="https://www.mca.gov.in/" target="_blank" rel="noreferrer">MCA <FaExternalLinkAlt/></a></li>
            <li><a href="https://www.gst.gov.in/" target="_blank" rel="noreferrer">GST <FaExternalLinkAlt/></a></li>
            <li><a href="https://ipindia.gov.in/" target="_blank" rel="noreferrer">Trademark <FaExternalLinkAlt/></a></li>
            <li><a href="https://tax.gov.ae" target="_blank" rel="noreferrer">UAE VAT &amp; CT <FaExternalLinkAlt/></a></li>
            <li><a href="https://mof.gov.ae/en" target="_blank" rel="noreferrer">UAE MoF <FaExternalLinkAlt/></a></li>
          </ul>
        </div>
        <div>
          <h4>Head Office</h4>
          <p style={{ color: '#000000' }}><FaMapMarkerAlt/> Office No. 34 & 35, C Block, DDA Market, Surajmal Vihar, New Delhi – 110092</p>
          <h4>Branch Office</h4>
          <p style={{ color: '#000000' }}><FaMapMarkerAlt/> Hamriyah Street, Al Fahidi, Bur Dubai, Dubai</p>
          <h4>Branch Office</h4>
          <p style={{ color: '#000000' }}><FaMapMarkerAlt/> 134-140 Church Road, Hove, East Sussex, UK</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p style={{ color: '#000000' }}><FaPhone/> +91 86768 56153</p>
          <p style={{ color: '#000000' }}><FaPhone/> +91 82988 69079</p>
          <p style={{ color: '#000000' }}><FaEnvelope/> contact@theinsightbiz.com</p>
          <h4>Opening Hours</h4>
          <p style={{ color: '#000000' }}><FaClock/> Mon–Fri: 10:00–19:00</p>
          <p style={{ color: '#000000' }}><FaClock/> Sat: 11:00–16:00</p>
        </div>
      </div>
      <div className="copy" style={{ color: '#000000' }}>© {new Date().getFullYear()} Insight Biz. All rights reserved.</div>
    </footer>
  )
}
