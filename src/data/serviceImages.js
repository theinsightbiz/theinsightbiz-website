// src/data/serviceImages.js
// Minimal, build-safe version (Option A):
// - No static image imports
// - Relies on `svc.cover` from servicesCatalog (e.g., '/hero/meeting.jpg' in /public/hero)

import { SERVICES } from './servicesCatalog'

// Keep the export (empty) so other modules importing `coverImages` don't break.
export const coverImages = []

/**
 * Resolve a cover image for a given service (object or slug).
 * Priority: svc.cover (from catalog/public) → ''.
 * NOTE: Place your images under /public (e.g., /public/hero/...) and
 * set `cover` in servicesCatalog to '/hero/your-image.jpg'.
 */
export function getCoverForService(input) {
  const slugOrId = (v) => String(v ?? '').toLowerCase()

  const svc =
    typeof input === 'string'
      ? SERVICES.find(
          (s) =>
            slugOrId(s.slug) === slugOrId(input) ||
            slugOrId(s.id) === slugOrId(input)
        )
      : input

  if (!svc) return ''

  if (svc.cover) return svc.cover

  // Fallback kept for compatibility if someone later reintroduces images:
  const idx = SERVICES.findIndex((s) => s.id === svc.id)
  if (idx >= 0 && coverImages.length > 0) {
    return coverImages[idx % coverImages.length]
  }

  return ''
}
