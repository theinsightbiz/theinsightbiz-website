import logo from '../assets/insight-logo.png'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../actions'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavItem = ({ to, label, onClick }) => (
  <NavLink to={to} onClick={onClick}
    className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>
    {label}
  </NavLink>
)

export default function Navbar(){
  const dispatch = useDispatch()
  const open = useSelector(s => s.ui.mobileMenuOpen)

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" aria-label="Insight Business Consultancy">
        <img src={logo} alt="Insight Business Consultancy" className="logo-img" />
        </Link>
        <nav className={'menu ' + (open ? 'open' : '')}>
          <NavItem to="/" label="Home" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/about" label="About" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/services" label="Services" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/blog" label="Blog" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/contact" label="Contact Us" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/privacy" label="Privacy Policy" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/downloads" label="Downloads"      onClick={() => dispatch(toggleMenu())} />        
        </nav>
        <button className="menu-btn" onClick={() => dispatch(toggleMenu())} aria-label="Menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  )
}
