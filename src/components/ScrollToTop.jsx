// src/components/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash (e.g., /about#team), try to scroll to that element
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        // smooth for anchors; change to 'auto' if you prefer instant jump
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    // Otherwise always go to the very top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
