// Reveal-on-scroll + Click-ripple initializers

const REVEAL_SELECTORS = [
  'section',
  '.card', '.svc-card', '.pro-card', '.counter', '.t-card',
  '.blog-list .post', '.accordion .item',
  '.dropdown', '.dropdown-header', '.chip',
  '.nav-link', '.btn'
].join(',')

export function initReveal() {
  const nodes = Array.from(document.querySelectorAll(REVEAL_SELECTORS))
  if (!nodes.length) return
  // Fallback if IO not supported
  if (!('IntersectionObserver' in window)) {
    nodes.forEach(el => el.classList.add('show'))
    return
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  nodes.forEach(el => { el.classList.add('reveal'); io.observe(el) })
}

export function initRipple() {
  const SEL = '.btn, .chip, .dropdown-header, .nav-link'
  document.addEventListener('click', (ev) => {
    const host = ev.target.closest(SEL)
    if (!host) return
    const rect = host.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const span = document.createElement('span')
    span.className = 'ripple'
    span.style.width = span.style.height = `${size}px`
    span.style.left = `${ev.clientX - rect.left - size/2}px`
    span.style.top = `${ev.clientY - rect.top - size/2}px`
    host.appendChild(span)
    setTimeout(() => span.remove(), 650)
  }, { passive: true })
}
