// src/data/serviceImages.js
// Uses covers from servicesCatalog (which already imports from src/assets).

import { SERVICES } from './servicesCatalog'

// For compatibility with any legacy imports elsewhere
export const coverImages = SERVICES.map(s => s.cover)

/**
 * Resolve a cover image for a given service (object or slug).
 * Returns the imported asset reference (so Vite bundles it).
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
  return svc.cover || ''
}
