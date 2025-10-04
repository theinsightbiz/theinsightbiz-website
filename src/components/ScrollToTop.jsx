// src/components/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Let in-page anchors (e.g., /about#team) scroll naturally
    if (hash) return

    try {
      // Valid values are 'auto' or 'smooth'
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } catch {
      // Fallback for older/strict environments
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
