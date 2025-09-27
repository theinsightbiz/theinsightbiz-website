// src/data/serviceImages.js
// Central image registry for Services pages (All Work, Categories, Detail).
// Edit THIS file only when you add new images: import them and push into coverImages.
// Everything else (list/grid/detail) will automatically use them.

import { SERVICES } from './servicesCatalog'

// ---- Import images individually (adjust paths / add more as you like) ----
import incometaxfiling   from '../assets/incometaxfiling.jpg'
import projectreport     from '../assets/projectreport.jpg'
import dsc               from '../assets/dsc.jpg'
import msme              from '../assets/msme.jpg'
import gst               from '../assets/gst.jpg'
import bookkeeping       from '../assets/bookkeeping.jpg'
import financials        from '../assets/financials.jpg'
import tax               from '../assets/tax.jpg'
import bankloan          from '../assets/bankloan.jpg'
import incorporation     from '../assets/incorporation.jpg'
import incorporationllp  from '../assets/incorporationllp.jpg'
import uae               from '../assets/uae.jpg'
import uk                from '../assets/uk.jpg'
import usa               from '../assets/usa.jpg'
import gst2              from '../assets/gst.jpg'
import roc               from '../assets/roc.jpg'
import fema              from '../assets/fema.jpg'
import audits            from '../assets/audits.jpg'
import vat               from '../assets/vat.jpg'
import irs               from '../assets/irs.jpg'
import bookkeeping2      from '../assets/bookkeeping.jpg'
import tax2              from '../assets/tax.jpg'
import virtual          from '../assets/virtual.jpg'
import incometaxfiling2          from '../assets/incometaxfiling.jpg'
import gst3              from '../assets/gst.jpg'
import bookkeeping3      from '../assets/bookkeeping.jpg'
import financials2       from '../assets/financials.jpg'
import tax3              from '../assets/tax.jpg'
import virtual2          from '../assets/virtual.jpg'
import bankloan2         from '../assets/bankloan.jpg'
import trust             from '../assets/trust.jpg'
import donation          from '../assets/donation.jpg'
import fcra              from '../assets/fcra.jpg'
import npusa             from '../assets/npusa.jpg'
import npuae             from '../assets/npuae.jpg'
import ngo               from '../assets/ngo.jpg'
import bookkeeping4      from '../assets/bookkeeping.jpg'
import financials3       from '../assets/financials.jpg'
import csr               from '../assets/csr.jpg'

// ---- One array to rule them all ----
// You can add/remove items freely; if services > images, it cycles with modulo.
export const coverImages = [
  incometaxfiling,
  projectreport,
  dsc,
  msme,
  gst,
  bookkeeping,
  financials,
  tax,
  bankloan,
  incorporation,
  incorporationllp,
  uae,
  uk,
  usa,
  gst2,
  roc,
  fema,
  audits,
  vat,
  irs,
  bookkeeping2,
  tax2,
  virtual,
  incometaxfiling2,
  gst3,
  bookkeeping3,
  financials2,
  tax3,
  virtual2,
  bankloan2,
  trust,
  donation,
  fcra,
  npusa,
  npuae,
  ngo,
  bookkeeping4,
  financials3,
  csr,
]

// Resolve a cover image for a given service (object or slug).
// Priority: imported images by index in SERVICES → svc.cover (catalog) → ''
export function getCoverForService(input) {
  const svc = typeof input === 'string'
    ? SERVICES.find(s => String(s.slug).toLowerCase() === String(input).toLowerCase())
    : input

  if (!svc) return ''

  const idx = SERVICES.findIndex(s => s.id === svc.id)
  const arr = coverImages.filter(Boolean)

  if (idx >= 0 && arr.length > 0) {
    return arr[idx % arr.length]
  }
  return svc.cover || ''
}
