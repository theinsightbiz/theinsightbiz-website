import React from 'react'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'

export default function FloatingActions(){
  return (
    <div className="fab-wrap" aria-label="Quick contact">
      <a className="fab" href="tel:+91829869079">
        <FaPhoneAlt/> Call Us
      </a>
      <a
        className="fab ghost"
        href="https://wa.me/918298869079?text=Hi%20Insight%20Business%20Consultancy%2C%20I%27d%20like%20to%20know%20more."
        target="_blank" rel="noreferrer"
      >
        <FaWhatsapp/> WhatsApp
      </a>
    </div>
  )
}
