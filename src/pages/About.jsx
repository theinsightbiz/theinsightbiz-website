import React, { useEffect, useState } from "react";
import TeamGrid from "../components/TeamGrid";

// Assets (keep your existing imports)
import ceo1 from "../assets/ceo-1.jpg";
import founder2 from "../assets/founder-2.jpg";
import trustee3 from "../assets/trustee-3.jpg";
import phoneBg from "../assets/feedback-bg.jpg";
import Priyam from "../assets/priyam-adarsh.jpg";
import Pratik from "../assets/pratik-raj.jpg";
import Aniket from "../assets/aniket-kishore.jpg";
import Hrithik from "../assets/hrithik-raj.jpg";

// NEW: photo shown in the left space below "Why Work With Us ?"
// ▸ Put your image file in /src/assets and update the path/name below.
import aboutLeft from "../assets/about-left.jpg";

export default function About() {
  // --- Testimonial slider state (kept) ---
  const slides = [
    {
      photo: ceo1,
      name: "Faiyaz & Ramesh",
      role: "Co-Founders • ABIZ-Global, India → UAE",
      quote:
        "From VAT to Corporate Tax readiness, they made compliance in the UAE effortless.",
    },
    {
      photo: founder2,
      name: "Jyoti",
      role: "CEO • Jankees India, India",
      quote:
        "Their documents are clear and easy to find. When audit time came, everything was exactly where we needed it.",
    },
    {
      photo: trustee3,
      name: "Riya",
      role: "Director • RK Designs, India",
      quote:
        "They set up our company and handled all compliances so we could launch in weeks, not months.",
    },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3800);
    return () => clearInterval(t);
  }, [slides.length]);

  // ===== 3D tilt (kept but lightweight) =====
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll("#team .tcard[data-tilt], #team .member-card")
    );
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const listeners = [];

    cards.forEach((card, idx) => {
      card.style.setProperty("--i", idx);
      const glare = card.querySelector(".tcard__glare");
      let rect, cx, cy, hover = false;

      const onEnter = () => {
        rect = card.getBoundingClientRect();
        cx = rect.left + rect.width / 2;
        cy = rect.top + rect.height / 2;
        hover = true;
      };
      const onMove = (e) => {
        if (!hover) return;
        const tiltX = clamp(((cy - e.clientY) / (rect.height / 2)) * 6, -8, 8);
        const tiltY = clamp(((e.clientX - cx) / (rect.width / 2)) * 6, -8, 8);
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      };
      const onLeave = () => { hover = false; card.style.transform = ""; };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      const onTouchStart = () => { if (glare) glare.style.opacity = 1; };
      const onTouchEnd = () => { if (glare) glare.style.opacity = 0; };

      card.addEventListener("touchstart", onTouchStart, { passive: true });
      card.addEventListener("touchend", onTouchEnd);

      listeners.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("touchstart", onTouchStart);
        card.removeEventListener("touchend", onTouchEnd);
      });
    });

    return () => listeners.forEach((off) => off());
  }, []);

  // ===== member-card hover/tap (kept) =====
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll("#team .member-card"));
    const offs = [];
    cards.forEach((card) => {
      const info = card.querySelector(".member-card__info");
      const activate = () => { card.classList.add("active"); card.classList.remove("revert"); if (info) info.setAttribute("aria-hidden", "false"); };
      const deactivate = () => { card.classList.remove("active"); card.classList.add("revert"); if (info) info.setAttribute("aria-hidden", "true"); };
      const onEnter = () => activate();
      const onLeaveCard = () => deactivate();
      const onLeaveInfo = () => deactivate();
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeaveCard);
      if (info) info.addEventListener("mouseleave", onLeaveInfo);
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const onClick = (e) => {
        if (isTouch) {
          const withinInfo = info && info.contains(e.target);
          if (card.classList.contains("active") && !withinInfo) deactivate();
          else if (!card.classList.contains("active")) activate();
        }
      };
      card.addEventListener("click", onClick);
      offs.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeaveCard);
        if (info) info.removeEventListener("mouseleave", onLeaveInfo);
        card.removeEventListener("click", onClick);
      });
    });
    return () => offs.forEach((fn) => fn());
  }, []);

  const s = slides[idx];

  return (
    <section className="page wide about-prime">
      {/* ===== Premium hero ===== */}
      <div className="prime-hero">
        <div className="prime-hero__badge"
        style={{ color: "#fff" }}
        >
        Since 2011 • Multi-jurisdiction advisory</div>
        <h1 className="prime-hero__title"
        style={{ color: "#07cbfcff" }}
        >
        About INSIGHT</h1>
        <p className="prime-hero__lead"
        style={{ color: "#fff" }}
        >
        We are a seasoned business consultant specializing in financial advisory, tax compliance and business setup solutions across India, UAE, UK and USA. With deep expertise in regulatory frameworks and financial strategies, we help businesses optimise operations, save costs and achieve sustainable growth.
        </p>
      </div>

      {/* ===== Conversion-first rows ===== */}
      <div className="prime-rows">
        {/* Row 1: Why work with us + highlight cards */}
        <section id="bio" className="panel-premium bio-card">
          <header className="card-head">
            <h2>Why Work With Us ?</h2>
            <p className="muted"
            style={{ color: "#000" }}
            >
              Personalized, results-driven engagement—from first call to final filing.
            </p>
          </header>

          <div className="bio-body">
            {/* LEFT column */}
                <div className="bio-text">
                <p style={{ color: "#000" }}>
                We bring a personalized, results-driven approach to every client engagement. Whether you're expanding internationally, optimizing taxes, or seeking financial clarity, we ensure tailored solutions to meet your business goals.
              </p>
              <p className="m0" style={{ color: "#000" }}>
                Let’s connect—discover how we can streamline your operations and keep you compliant across dynamic markets.
              </p>

              {/* NEW: visual photo in the left space */}
              <figure className="bio-visual">
                <img
                  src={aboutLeft}
                  alt="INSIGHT team collaborating with clients"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            {/* RIGHT column */}
            <div className="bio-highlights">
              <article className="tile">
                <h3>4+ Jurisdictions</h3>
                <p className="m0" style={{ color: "#000" }}>India, UAE, UK, USA — global coverage, consistent delivery.</p>
              </article>
              <article className="tile">
                <h3>Precision You Can Present</h3>
                <p className="m0" style={{ color: "#000" }}>Investor-ready documents and clean papers your board can act on.</p>
              </article>
              <article className="tile">
                <h3>From Call to Filing</h3>
                <p className="m0" style={{ color: "#000" }}>We plan, paper, file and maintain so you always stay current.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Row 2: Services summary (clean, scannable) */}
        <section id="services" className="panel-premium svc-summary">
          <header className="card-head">
            <h2>Our Services</h2>
            <p className="muted" style={{ color: "#000" }}>Advisory, documentation and filing—clear scope, timelines and deliverables.</p>
          </header>
          <div className="svc-grid">
            <div className="card glass svc">
              <h4>Financial Advisory</h4>
              <p className="m0" style={{ color: "#000" }}>Guidance to individuals and businesses—investments, retirement planning, portfolio optimization.</p>
            </div>
            <div className="card glass svc">
              <h4>Tax Compliance & Advisory</h4>
              <p className="m0" style={{ color: "#000" }}>Adhere to regulations while optimizing liabilities; navigate complex tax laws with confidence.</p>
            </div>
            <div className="card glass svc">
              <h4>Accounting & Bookkeeping</h4>
              <p className="m0" style={{ color: "#000" }}>Daily transactions to financial statements—accurate records and decision-ready insights.</p>
            </div>
            <div className="card glass svc">
              <h4>Regulatory & Compliance</h4>
              <p className="m0" style={{ color: "#000" }}>Multi-jurisdiction guidance, audits, and streamlined operations that scale.</p>
            </div>
          </div>
        </section>

        {/* Row 3: Team */}
        <section id="team" className="panel-premium">
          <header className="card-head">
            <h2>Our Experts</h2>
            <p className="muted" style={{ color: "#000" }}>Certified team backed by internal reviews, checklists, and audit-grade documentation.</p>
          </header>

          <div className="tm-grid">
            {/* Card 1 */}
            <article className="member-card">
              <img
                className="member-card__photo"
                src={Hrithik}
                alt="Portrait of Hrithik Raj"
                loading="lazy"
                decoding="async"
              />
              <div className="member-card__glass"></div>
              <div className="member-card__info" aria-hidden="true">
                <h3 className="member-card__name">Hrithik Raj</h3>
                <p className="member-card__role">Consultant • Chartered Accountant</p>
                <p className="member-card__bio">
                  Cross-border consultant for India, UAE, UK & USA tax and compliances; structures, filings, and checklists.
                </p>
                <div className="member-card__socials">
                  <a className="icon-btn" href="https://wa.me/918676856153" aria-label="WhatsApp chat" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.95L0 24l6.2-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52ZM12 21.5a9.44 9.44 0 0 1-4.82-1.32l-.35-.2-3.67.96.98-3.57-.23-.37A9.5 9.5 0 1 1 21.5 12 9.52 9.52 0 0 1 12 21.5Zm5.44-6.98c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.78-1.65-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.18-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.07 2.92 1.22 3.12.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z"/></svg>
                  </a>
                  <a className="icon-btn" href="https://www.instagram.com/insight_biz_global?igsh=Y2ZkN2c3MmFpdzc5" aria-label="Instagram profile" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/></svg>
                  </a>
                </div>
              </div>
              <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
            </article>

            {/* Card 2 */}
            <article className="member-card">
              <img
                className="member-card__photo"
                src={Pratik}
                alt="Portrait of Pratik Raj"
                loading="lazy"
                decoding="async"
              />
              <div className="member-card__glass"></div>
              <div className="member-card__info" aria-hidden="true">
                <h3 className="member-card__name">Pratik Raj</h3>
                <p className="member-card__role">Partner • Compliance Officer</p>
                <p className="member-card__bio">
                  Incorporations across India/UAE/UK/USA; SEBI, FEMA (ODI/FDI), and Companies Act, 2013 compliances.
                </p>
                <div className="member-card__socials">
                  <a className="icon-btn" href="https://wa.me/918676856153" aria-label="WhatsApp chat" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.95L0 24l6.2-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52ZM12 21.5a9.44 9.44 0 0 1-4.82-1.32l-.35-.2-3.67.96.98-3.57-.23-.37A9.5 9.5 0 1 1 21.5 12 9.52 9.52 0 0 1 12 21.5Zm5.44-6.98c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.78-1.65-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.18-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.07 2.92 1.22 3.12.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z"/></svg>
                  </a>
                  <a className="icon-btn" href="https://www.instagram.com/insight_biz_global?igsh=Y2ZkN2c3MmFpdzc5" aria-label="Instagram profile" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/></svg>
                  </a>
                </div>
              </div>
              <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
            </article>

            {/* Card 3 */}
            <article className="member-card">
              <img
                className="member-card__photo"
                src={Aniket}
                alt="Portrait of Aniket Kishore"
                loading="lazy"
                decoding="async"
              />
              <div className="member-card__glass"></div>
              <div className="member-card__info" aria-hidden="true">
                <h3 className="member-card__name">Aniket Kishore</h3>
                <p className="member-card__role">Manager • Business Advisor</p>
                <p className="member-card__bio">
                  Income-tax compliance & assessments; bank-ready project finance models and term-sheet documentation.
                </p>
                <div className="member-card__socials">
                  <a className="icon-btn" href="https://wa.me/918676856153" aria-label="WhatsApp chat" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.95L0 24l6.2-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52ZM12 21.5a9.44 9.44 0 0 1-4.82-1.32l-.35-.2-3.67.96.98-3.57-.23-.37A9.5 9.5 0 1 1 21.5 12 9.52 9.52 0 0 1 12 21.5Zm5.44-6.98c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.78-1.65-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.18-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.07 2.92 1.22 3.12.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z"/></svg>
                  </a>
                  <a className="icon-btn" href="https://www.instagram.com/insight_biz_global?igsh=Y2ZkN2c3MmFpdzc5" aria-label="Instagram profile" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/></svg>
                  </a>
                </div>
              </div>
              <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
            </article>

            {/* Card 4 */}
            <article className="member-card">
              <img
                className="member-card__photo"
                src={Priyam}
                alt="Portrait of Priyam Adarsh"
                loading="lazy"
                decoding="async"
              />
              <div className="member-card__glass"></div>
              <div className="member-card__info" aria-hidden="true">
                <h3 className="member-card__name">Priyam Adarsh</h3>
                <p className="member-card__role">Partner • Tax Advisor</p>
                <p className="member-card__bio">
                  Monthly MIS ownership, books close, variance analysis; India GST and UAE VAT with robust reconciliations.
                </p>
                <div className="member-card__socials">
                  <a className="icon-btn" href="https://wa.me/918676856153" aria-label="WhatsApp chat" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.95L0 24l6.2-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52ZM12 21.5a9.44 9.44 0 0 1-4.82-1.32l-.35-.2-3.67.96.98-3.57-.23-.37A9.5 9.5 0 1 1 21.5 12 9.52 9.52 0 0 1 12 21.5Zm5.44-6.98c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.78-1.65-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.18-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0 -.52 .07 -.8 .37 -.27 .3 -1.05 1.03 -1.05 2.52 0 1.48 1.07 2.92 1.22 3.12 .15 .2 2.1 3.2 5.08 4.48 .71 .31 1.27 .49 1.7 .63 .71 .23 1.35 .2 1.86 .12 .57 -.09 1.77 -.72 2.02 -1.42 .25 -.7 .25 -1.3 .17 -1.42 -.08 -.12 -.27 -.2 -.57 -.35Z"/></svg>
                  </a>
                  <a className="icon-btn" href="https://www.instagram.com/insight_biz_global?igsh=Y2ZkN2c3MmFpdzc5" aria-label="Instagram profile" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.26 5.26 0 0 1 12 7.75zm0 2a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 9.75zM18.5 6.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13z"/></svg>
                  </a>
                </div>
              </div>
              <button className="member-card__sr-toggle" aria-label="Toggle details for touch devices"></button>
            </article>
          </div>

          {/* Team styles (optimized) */}
          <style>{`
            .tm-grid{
              display:grid;
              grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
              gap: clamp(16px, 2.5vw, 28px);
              margin-top:.9rem;
            }
            .member-card{
              position: relative; aspect-ratio: 3 / 4; border-radius: 20px; overflow: hidden;
              box-shadow: 0 10px 24px rgba(2, 6, 23, 0.12);
              background: #000; isolation: isolate;
              will-change: transform;
            }
            .member-card__photo{
              position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform-origin: 50% 30%;
              transition: transform 380ms cubic-bezier(.2,.7,.2,1);
              will-change: transform;
            }
            .member-card__glass{
              position: absolute; inset: auto 0 0 0; height: 56%;
              background: linear-gradient(to top, rgba(2,6,23,.78), rgba(2,6,23,0.18) 60%, transparent);
              opacity: 0; transform: translateY(10%); transition: opacity 260ms ease, transform 260ms ease;
              pointer-events: none; z-index: 1;
            }
            .member-card__info{
              position: absolute; left: 0; right: 0; bottom: 0; padding: 18px 18px 20px; color: #fff; z-index: 2;
              opacity: 0; transform: translateY(18px); transition: opacity 240ms ease, transform 240ms ease;
            }

            /* 👇 on hover/focus: blur image and show text */
            .member-card:hover .member-card__photo,
            .member-card:focus-within .member-card__photo {
            filter: blur(3px);
            transform: translateY(-4%) scale(0.78);
            }

            .member-card:hover .member-card__glass,
            .member-card:focus-within .member-card__glass {
            opacity: 1;
            transform: translateY(0);
            }

            .member-card:hover .member-card__info,
            .member-card:focus-within .member-card__info {
            opacity: 1;
            transform: translateY(0);
            }
            .member-card__name{ font-size: 1.1rem; margin: 0 0 2px; line-height:1.1; font-weight: 700; }
            .member-card__role{ margin: 0 0 8px; font-size: .88rem; color: #cbd5e1; }
            .member-card__bio{ margin: 0 0 12px; font-size: .86rem; line-height: 1.45; color: #e2e8f0; }
            .member-card__socials{ display: flex; gap: 10px; }
            .icon-btn{
              --size: 36px; width: var(--size); height: var(--size); display: inline-grid; place-items: center;
              border-radius: 50%;
              background: rgba(255,255,255,0.12);
              text-decoration: none; transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
              outline: none; border: 1px solid rgba(255,255,255,.15);
              will-change: transform;
            }
            .icon-btn:hover, .icon-btn:focus-visible{ transform: translateY(-2px); background: rgba(255,255,255,0.2); }
            .icon-btn svg{ width: 18px; height: 18px; fill: #fff; }
            .member-card__sr-toggle{ position: absolute; inset: 0; width: 100%; height: 100%; background: none; border: 0; padding: 0; margin: 0; cursor: default; z-index: 3; opacity: 0; pointer-events: none; }
            .member-card.active .member-card__photo{ transform: translateY(-4%) scale(0.78); }
            .member-card.active .member-card__glass{ opacity: 1; transform: translateY(0); }
            .member-card.active .member-card__info{ opacity: 1; transform: translateY(0); }
            .member-card.revert .member-card__photo{ transform: translateY(0) scale(1); }
            @media (prefers-reduced-motion: reduce){
              .member-card__photo, .member-card__glass, .member-card__info{ transition: none; }
            }
            @media (max-width: 420px){
              .icon-btn{ --size: 40px; }
              .member-card__bio{ font-size: .93rem; }
            }
          `}</style>
        </section>

        {/* Row 4: Client feedback scene (optimized) */}
        <section id="feedback" className="feedback-scene">
          <div
            className="feedback-bg"
            style={{ backgroundImage: `url(${phoneBg})` }}
            aria-hidden="true"
          />
          <div className="feedback-caption">
            Their expertise transformed<br/>our business presence.
          </div>

          <div
            key={idx}
            className="feedback-card"
            onClick={(event) => {
              if (window.matchMedia('(hover: none)').matches) {
                event.currentTarget.classList.toggle('is-zoomed');
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="photo-wrap">
              <img
                src={s.photo}
                alt={s.name}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="meta">
              <div className="who">{s.name}</div>
              <div className="role">{s.role}</div>
              {s.logo && <img className="brand" src={s.logo} alt="brand" loading="lazy" decoding="async" />}
            </div>
            <div className="quote">“{s.quote}”</div>
          </div>

          <style>{`
            .feedback-scene{
              position: relative; min-height: clamp(560px, 72vh, 860px);
              border-radius: 20px; overflow: hidden; border: 1px solid var(--border); background: var(--card);
              content-visibility: auto;
              contain-intrinsic-size: 680px 1200px;
            }
            .feedback-bg{
              position:absolute; inset:0; background-size: cover; background-position: center;
              z-index: 0;
            }
            .feedback-caption{
              position:absolute; right:2rem; top:2.4rem; color:#fff; text-align:right;
              text-shadow: 0 2px 16px rgba(0,0,0,.45);
              font-weight:800; letter-spacing:.2px; font-size: clamp(18px, 1.6vw, 22px); line-height:1.3; z-index:2;
            }
            .feedback-card{
              position:absolute; left:60%; top:50%; transform: translate(-50%, -50%) rotate(-1.2deg);
              width: min(285px, 90vw); max-height: 64vh; background:#fff; color:#111; border-radius: 16px;
              border: 1px solid rgba(0,0,0,.06); overflow:hidden;
              animation: cardIn .65s cubic-bezier(.22,.61,.36,1);
              z-index:3; will-change: transform;
              box-shadow: 0 10px 24px rgba(2, 6, 23, 0.14);
            }
            .feedback-card::after{ content:''; position:absolute; inset:0;
              background: linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,.05));
              pointer-events:none; }
            .photo-wrap{ height: 34%; overflow:hidden; background: #fff; border: 10px solid #fff; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); }
            .photo-wrap img{ width:100%; height:100%; object-fit:cover; display:block; border-radius: 6px; transform: scale(1.02); transition: transform 800ms ease; will-change: transform; }
            @media (hover: hover) and (pointer: fine){
              .feedback-card:hover .photo-wrap img{ transform: scale(1.06); }
            }
            @media (hover: none) and (pointer: coarse){
              .feedback-card.is-zoomed .photo-wrap img{ transform: scale(1.06); }
            }
            .meta{ padding:.55rem .85rem .1rem .85rem; display:grid; gap:.1rem }
            .who{ font-weight:900; font-size:.95rem; line-height:1.2 }
            .role{ opacity:.8; font-size:.83rem }
            .brand{ height:18px; width:auto; margin-top:.22rem; opacity:.9 }
            .quote{ padding:.45rem .85rem .75rem .85rem; border-top: 1px dashed rgba(0,0,0,.08); font-style: italic; font-size:.9rem; line-height:1.34; }
            @keyframes cardIn{
              0%{ opacity:0; transform: translate(-50%, -44%) rotate(-4deg) scale(.97) }
              100%{ opacity:1; transform: translate(-50%, -50%) rotate(-1.2deg) scale(1) }
            }
            @media (max-width: 680px){
              .feedback-caption{ right:1rem; top:1rem }
              .feedback-card{ left:50%; top:56%; width: 92vw; max-height: 76vh; transform: translate(-50%, -50%) rotate(-1.2deg); }
              .photo-wrap{ height: 42% }
            }
          `}</style>
        </section>
      </div>

      {/* ===== Bottom CTA ===== */}
      <div className="about-cta">
        <div className="about-cta__title" style={{ color: "#fff" }}>Ready to get started?</div>
        <div className="about-cta__actions">
          <a className="btn-primary" href="/contact">Contact us</a>
          <a className="btn-ghost" href="/services">Explore services</a>
        </div>
      </div>

      {/* ===== Scoped page styles (premium layout) ===== */}
      <style>{`
        .about-prime :where(h1,h2,h3){ letter-spacing:-0.2px }

        /* Hero */
        .prime-hero{ position: relative; padding: 1.1rem 0 .5rem 0; }
        .prime-hero__badge{
          display:inline-block; font-size:.8rem; font-weight:700; padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28); margin-bottom:.5rem;
        }
        .prime-hero__title{ font-weight:900; margin:0 0 .25rem 0; letter-spacing:-.3px; }
        .prime-hero__lead{ max-width: 860px; opacity:.92; }

        /* Rows container */
        .prime-rows{ display:grid; gap: 1rem; margin-top: 1rem; }

        /* Cards */
        .panel-premium{
          border:1px solid var(--border); border-radius:16px; background:var(--card);
          box-shadow: 0 6px 18px rgba(0,0,0,.05);
        }
        .bio-card{ background: linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.65)); padding: 1rem; }
        .svc-summary{ background: linear-gradient(180deg, rgba(255,255,255,.70), rgba(255,255,255,.62)); padding: 1rem; }

        .card-head{ display:grid; gap:.2rem; margin: .1rem 0 .6rem 0; }
        .card-head .muted{ opacity:.82 }

        .bio-body{
          display:grid; grid-template-columns: 1.2fr .8fr; gap:.8rem;
        }
        @media (max-width: 920px){
          .bio-body{ grid-template-columns: 1fr; }
        }

        .bio-text p{ margin: .4rem 0; line-height:1.45 }

        /* NEW: left photo block */
        .bio-visual{
          margin-top:.8rem;
          border-radius:16px; overflow:hidden;
          border:1px solid var(--border);
          box-shadow: 0 8px 18px rgba(2,6,23,.08);
          background:#fff;
          aspect-ratio: 16 / 9; /* reserves layout space (prevents CLS) */
        }
        .bio-visual img{
          width:100%; height:100%; object-fit:cover; display:block;
          transform: translateZ(0); /* promote to layer for scroll smoothness */
        }

        .bio-highlights{
          display:grid; gap:.6rem;
        }
        .tile{
          background: rgba(255,255,255,.78);
          border: 1px dashed var(--border);
          border-radius: 14px; padding: .75rem .85rem;
        }
        .tile h3{ margin: 0 0 .35rem 0; }

        /* Services grid */
        .svc-grid{
          display:grid; grid-template-columns: repeat(4, minmax(220px,1fr)); gap:.8rem;
        }
        @media (max-width: 1000px){
          .svc-grid{ grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px){
          .svc-grid{ grid-template-columns: 1fr; }
        }
        .svc{ padding: 1rem }
        .svc h4{ margin: 0 0 .25rem; }

        /* CTA */
        .about-cta{
          margin: 1rem 0 0; display:grid; place-items:center; gap:.5rem; text-align:center;
          border:1px dashed var(--border); border-radius:16px; padding: .9rem; background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,0));
        }
        .about-cta__title{ font-weight:900; letter-spacing:.2px; }
        .about-cta__actions{ display:flex; gap:.6rem; }

        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.72rem .95rem;
          font-weight:700; text-decoration:none; display:inline-block; transition: transform .18s ease, box-shadow .18s ease;
          will-change: transform;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }
        .btn-ghost{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.72rem .95rem;
          font-weight:700; text-decoration:none; display:inline-block; transition: transform .18s ease, box-shadow .18s ease;
          will-change: transform;
        }
        .btn-ghost:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce){
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}
