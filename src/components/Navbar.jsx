import logo from '../assets/insight-logo.png'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../actions'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
    // Make sure links don’t shrink on small screens
    style={{ whiteSpace: 'nowrap' }}
  >
    {label}
  </NavLink>
)

export default function Navbar() {
  const dispatch = useDispatch()
  const open = useSelector((s) => s.ui.mobileMenuOpen)

  // Inline styles to guarantee 100% width on mobile viewports
  const styles = {
    header: {
      width: '100%',
      maxWidth: '100vw',
      margin: 0,
      left: 0,
      right: 0,
      boxSizing: 'border-box',
    },
    inner: {
      width: '100%',
      maxWidth: '100%', // prevents any fixed container width
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
    },
    logoImg: {
      height: 48,
      width: 'auto',
      display: 'block',
    },
    nav: {
      width: '100%',        // allow nav to use full width when stacked on mobile
      maxWidth: '100%',
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
    },
    menuBtn: {
      marginLeft: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  return (
    <header className="navbar" style={styles.header}>
      <div className="nav-inner" style={styles.inner}>
        <Link to="/" className="logo" aria-label="Insight Business Consultancy">
          <img
            src={logo}
            alt="Insight Business Consultancy"
            className="logo-img"
            style={styles.logoImg}
          />
        </Link>

        <nav className={'menu ' + (open ? 'open' : '')} style={styles.nav}>
          <NavItem to="/" label="Home" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/about" label="About" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/services" label="Services" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/blog" label="Blog" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/contact" label="Contact Us" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/privacy" label="Privacy Policy" onClick={() => dispatch(toggleMenu())} />
          <NavItem to="/downloads" label="Downloads" onClick={() => dispatch(toggleMenu())} />
        </nav>

        <button
          className="menu-btn"
          onClick={() => dispatch(toggleMenu())}
          aria-label="Menu"
          style={styles.menuBtn}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  )
}
