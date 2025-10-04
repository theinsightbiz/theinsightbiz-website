import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServicesCategory from './pages/ServicesCategory'
import ServiceDetail from './pages/ServiceDetail'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Downloads from './pages/downloads'

export default function App(){
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Services landing */}
          <Route path="/services" element={<Services />} />

          {/* EXPLICIT category segment to avoid clashing with slug */}
          <Route path="/services/category/:key" element={<ServicesCategory />} />

          {/* Service details (slug) */}
          <Route path="/services/:slug" element={<ServiceDetail />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/downloads" element={<Downloads/>} />
        </Routes>
      </main>
      <FloatingActions />
      <Footer />
    </div>
  )
}

