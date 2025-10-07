import logo from '../assets/insight-logo.png'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../actions'
import { FaBars, FaTimes } from 'react-icons/fa'

/** Global hotfix: kill any max-width caps causing the narrow column on mobile */
const GlobalWidthFix = () => (
  <style>{`
    html, body, #root {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0;             
    }
    /* If your CSS framework uses container/wrapper classes, override them */
    .container, .container-fluid, .wrapper, .page, .content, .section, .hero, .grid {
      width: 100% !important;
      max-width: 100% !important;
    }
    header.navbar, .nav-inner, nav.menu {
      width: 100% !important;
      max-width: 100vw !important;
      box-sizing: border-box;
    }
  `}</style>
)

const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
    style={{ whiteSpace: 'nowrap' }}
  >
    {label}
  </NavLink>
)

export default function Navbar() {
  const dispatch = useDispatch()
  const open = useSelector((s) => s.ui?.mobileMenuOpen)

  // Inline styles to guarantee full-width layout for the bar itself
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
      maxWidth: '100%',
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
      width: '100%',
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
      <GlobalWidthFix />

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
