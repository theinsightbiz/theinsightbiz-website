import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

let lenis

export function initSmoothScroll(){
  if (lenis) return
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, smoothTouch: false })

  function raf(time){
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // keep ScrollTrigger in sync with Lenis
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(()=>{ lenis.raf(performance.now()) })
}
