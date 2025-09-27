// src/data/serviceImages.js
// Build-safe (no imports) + robust path normalizer for covers placed in /public

import { SERVICES } from './servicesCatalog'

// Kept for compatibility with earlier imports elsewhere
export const coverImages = []

function normalizeCoverPath(raw) {
  if (!raw) return ''

  let p = String(raw).trim()
  // If it's an absolute URL, return as-is
  if (/^https?:\/\//i.test(p)) return p

  // Common mistakes: 'public/...' or './...' or 'hero/...'
  p = p.replace(/^public[\\/]/i, '')       // remove leading 'public/'
  p = p.replace(/^\.?\//, '')              // remove leading './' or '/'

  // At this point p is like 'hero/images/foo.jpg'
  // Serve from the site's base URL (Vite's base-aware)
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
  return `${base}/${p}`
}

/**
 * Resolve a cover image for a given service (object or slug).
 * Priority: svc.cover (string path or absolute URL) → ''.
 * Place images under /public (e.g., /public/hero/images/...) and set
 * svc.cover to '/hero/images/your-file.jpg' (but we also accept
 * 'public/hero/images/your-file.jpg' or 'hero/images/your-file.jpg').
 */
export function getCoverForService(input) {
  const toKey = (v) => String(v ?? '').toLowerCase()

  const svc =
    typeof input === 'string'
      ? SERVICES.find(
          (s) => toKey(s.slug) === toKey(input) || toKey(s.id) === toKey(input)
        )
      : input

  if (!svc) return ''

  if (svc.cover) return normalizeCoverPath(svc.cover)

  // Soft fallback if someone later re-introduces imports
  const idx = SERVICES.findIndex((s) => s.id === svc?.id)
  if (idx >= 0 && coverImages.length > 0) {
    const candidate = coverImages[idx % coverImages.length]
    return candidate ? normalizeCoverPath(candidate) : ''
  }

  return ''
}
