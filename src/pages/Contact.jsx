import React, { useMemo, useState, useCallback } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaCalendarAlt,
  FaPaperclip,
} from "react-icons/fa";

export default function Contact() {
  // --- simple form state (uncontrolled inputs + light state for chips/radios) ---
  const [types, setTypes] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [files, setFiles] = useState([]);
  const [msgLen, setMsgLen] = useState(0); // controlled counter (avoids DOM thrash)
  const maxMsg = 900;

  const toggleType = useCallback(
    (t) =>
      setTypes((prev) =>
        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
      ),
    []
  );

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    const name = (fd.get("name") || "").toString().trim();
    const tel = (fd.get("tel") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const company = (fd.get("company") || "").toString().trim();
    const country = (fd.get("country") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    const lines = [
      "*New Contact Enquiry*",
      `Name: ${name}`,
      `Mobile: ${tel}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      country ? `Country: ${country}` : null,
      types.length ? `Service Type(s): ${types.join(", ")}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      "",
      "Project brief:",
      message,
    ].filter(Boolean);

    if (files.length) {
      lines.push("", `Attachments selected (${files.length}):`);
      files.forEach((f, i) => {
        const sizeKB = Math.round(f.size / 1024);
        lines.push(`${i + 1}. ${f.name} (${sizeKB} KB)`);
      });
      lines.push(
        "",
        "Note: Please attach the above file(s) in WhatsApp after redirect — web pages cannot auto-attach local files."
      );
    }

    const text = lines.join("\n");
    const waUrl = `https://wa.me/918298869079?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener");

    // reset form state
    e.target.reset();
    setTypes([]);
    setTimeline("");
    setFiles([]);
    setMsgLen(0);
  }, [files, timeline, types]);

  const typeOptions = useMemo(
    () => [
      "Financial Advisory",
      "Tax Advisory / Filing",
      "Accounting & Bookkeeping",
      "Regulatory & Compliance",
      "Others",
    ],
    []
  );

  const timeOptions = ["ASAP", "In 1 week", "In 1–2 months", "Exploring"];

  return (
    <section className="page wide contact-prime">
      {/* Premium hero */}
      <div className="prime-hero">
        <div className="prime-hero__badge">Response in 1 business day</div>
        <h1 className="prime-hero__title">Let’s build something exceptional</h1>
        <p className="prime-hero__lead">
          Tell us about your needs—advisory, compliance, design, or other business matters.
          We review every enquiry and reply within one business day.
        </p>
      </div>

      {/* Conversion-first layout: form first, actions rail second */}
      <div className="prime-grid">
        {/* === MAIN: FORM === */}
        <form className="prime-form panel-premium" onSubmit={onSubmit}>
          {/* Progress header / reassurance */}
          <div className="form-top">
            <div className="form-top__title">Start your enquiry</div>
            <div className="form-top__meta">
              <span>Secure • No spam • WhatsApp follow-up</span>
            </div>
          </div>

          {/* Section: Contact details */}
          <div className="form-section">
            <div className="section-head">
              <h3>Contact details</h3>
              <p>We’ll use these to get back to you.</p>
            </div>
            <div className="grid">
              <div className="field">
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="field">
                <label>Mobile number</label>
                <input
                  name="tel"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  pattern="^[6-9]\d{9}$"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="field">
                <label>Company / Organization</label>
                <input type="text" name="company" placeholder="Company name" />
              </div>
              <div className="field">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="India / UAE / UK / USA"
                />
              </div>
            </div>
          </div>

          {/* Section: Scope & timeline */}
          <div className="form-section">
            <div className="section-head">
              <h3>Scope & timeline</h3>
              <p>Choose what fits best right now.</p>
            </div>

            <div className="field">
              <label>What are you looking for?</label>
              <div className="chips">
                {typeOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={"chip " + (types.includes(t) ? "active" : "")}
                    onClick={() => toggleType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid">
              <div className="field">
                <label>Timeline</label>
                <div className="radios">
                  {timeOptions.map((t) => (
                    <label
                      key={t}
                      className={"radio " + (timeline === t ? "active" : "")}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={t}
                        onChange={() => setTimeline(t)}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Brief & files */}
          <div className="form-section">
            <div className="section-head">
              <h3>Project brief</h3>
              <p>Share goals, pain points, and any useful links.</p>
            </div>

            <div className="field">
              <label>Project brief</label>
              <textarea
                name="message"
                rows={6}
                maxLength={maxMsg}
                placeholder="Example: We need monthly bookkeeping for India & UAE, GST returns, and MIS dashboards…"
                onInput={(e) => setMsgLen(e.currentTarget.value.length)}
                required
              />
              <div className="help">
                <em>{msgLen}/{maxMsg}</em>
              </div>
            </div>

            <div className="grid">
              <div className="field">
                <label>Attachments</label>
                <label className="attach">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  />
                  <FaPaperclip />{" "}
                  {files.length
                    ? `${files.length} file(s) selected`
                    : "Upload brief / scope / RFP"}
                </label>
              </div>
              <div className="field">
                <label>Consent</label>
                <label className="consent">
                  <input type="checkbox" required /> I agree to be contacted and
                  accept the Privacy Policy.
                </label>
              </div>
            </div>
          </div>

          {/* Primary actions */}
          <div className="actions">
            <button className="btn-primary" type="submit">
              Send message
            </button>
            <a className="btn-ghost" href="mailto:contact@theinsightbiz.com">
              Email instead
            </a>
          </div>

          {/* Trust strip */}
          <div className="trust-strip" aria-hidden="true">
            <div>ISO-aligned process</div>
            <div>Multi-jurisdiction expertise</div>
            <div>Board-ready documentation</div>
          </div>
        </form>

        {/* === ASIDE: QUICK CONTACT & OFFICES (sticky) === */}
        <aside className="prime-rail">
          <div className="rail-card callout">
            <h3 className="rail-title">Talk to us</h3>
            <a className="rail-action" href="mailto:contact@theinsightbiz.com">
              <span className="ico">
                <FaEnvelope />
              </span>
              <div>
                <strong>Email</strong>
                <div className="muted">contact@theinsightbiz.com</div>
              </div>
            </a>
            <a
              className="rail-action"
              href="https://wa.me/918298869079"
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="ico"
                style={{ background: "var(--whatsapp, #25D366)" }}
              >
                <FaWhatsapp />
              </span>
              <div>
                <strong>WhatsApp</strong>
                <div className="muted">+91 82988 69079</div>
              </div>
            </a>
            <a className="rail-action" href="tel:+918676856153">
              <span className="ico">
                <FaPhoneAlt />
              </span>
              <div>
                <strong>Call</strong>
                <div className="muted">+91 86768 56153</div>
              </div>
            </a>
            <a className="rail-action" href="#calendar">
              <span className="ico">
                <FaCalendarAlt />
              </span>
              <div>
                <strong>Book a slot</strong>
                <div className="muted">We’ll share calendar on request</div>
              </div>
            </a>
          </div>

          <div className="rail-card">
            <h3 className="rail-title">Offices</h3>
            <div className="office">
              <div className="k">Head Office</div>
              <div className="v">
                A-272, Block A, Surajmal Vihar, New Delhi – 110092
              </div>
            </div>
            <div className="office">
              <div className="k">Branch Office</div>
              <div className="v">
                Hamriyah Street, Al Fahidi, Bur Dubai, Dubai
              </div>
              <div className="k">Branch Office</div>
              <div className="v">
                134-140 Church Road, Hove, East Sussex, UK
              </div>
            </div>
            <div className="hours">
              <div className="k">Opening Hours</div>
              <div className="v">Mon–Fri: 10:00–19:00 • Sat: 11:00–16:00</div>
            </div>
          </div>
        </aside>
      </div>

      {/* full-bleed map */}
      <div className="map-wrap" id="calendar" aria-label="Our location on Google Maps">
        <iframe
          title="INSIGHT — New Delhi"
          src="https://www.google.com/maps?q=A-272,+Block+A,+Surajmal+Vihar,+New+Delhi+-+110092&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* scoped styles */}
      <style>{`
        .contact-prime :where(h1,h2,h3){ letter-spacing:-0.2px }

        /* Hero */
        .prime-hero{
          position: relative; padding: 1.1rem 0 0.2rem 0;
        }
        .prime-hero__badge{
          display:inline-block; font-size:.8rem; font-weight:700;
          padding:.35rem .6rem; border-radius:999px;
          background:rgba(14,153,213,.12); color:#086488; border:1px solid rgba(14,153,213,.28);
          margin-bottom:.5rem;
        }
        .prime-hero__title{
          font-weight:900; margin:0 0 .25rem 0; letter-spacing:-.3px;
        }
        .prime-hero__lead{
          max-width: 860px; opacity:.92;
        }

        /* Grid */
        .prime-grid{
          display:grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 1.2rem;
          margin-top: 1.1rem;
        }
        @media (max-width: 1000px){
          .prime-grid{ grid-template-columns: 1fr; }
        }

        /* Form (primary) */
        .prime-form{
          border:1px solid var(--border); border-radius:16px; padding: 1.05rem;
          /* Removed backdrop-filter to prevent repaint cost on scroll */
          background:#fff;
          /* Lighter shadow to reduce paint time */
          box-shadow: 0 6px 18px rgba(0,0,0,.05);
          /* Promote to own layer without animating on every frame */
          transform: translateZ(0);
        }
        .form-top{
          display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem;
        }
        .form-top__title{ font-weight:900; letter-spacing:.2px }
        .form-top__meta{ font-size:.88rem; opacity:.75 }

        .form-section{
          border:1px dashed var(--border);
          border-radius:14px; padding:.85rem; margin:.8rem 0;
          background:#fff;
        }
        .section-head h3{ margin:.1rem 0 .2rem 0 }
        .section-head p{ margin:0; opacity:.75; font-size:.92rem }

        .grid{ display:grid; grid-template-columns: 1fr 1fr; gap:.9rem }
        @media (max-width: 680px){
          .grid{ grid-template-columns: 1fr; }
        }

        .field{ display:grid; gap:.35rem }
        .field label{ font-weight:600 }

        input[type="text"], input[type="email"], input[type="tel"], textarea{
          border:1px solid var(--border); background:var(--surface, #fff); border-radius:12px; padding:.75rem .9rem;
          outline:none; transition:border-color .18s ease, box-shadow .18s ease;
        }
        input:focus, textarea:focus{ border-color:rgba(14,153,213,.45); box-shadow:0 0 0 4px rgba(14,153,213,.12) }

        .chips{ display:flex; flex-wrap:wrap; gap:.5rem }
        .chip{
          border:1px solid var(--border); border-radius:999px; padding:.5rem .75rem; background:#fff;
          transition:transform .16s ease, border-color .16s ease, color .16s ease, background-color .16s ease;
          font-size:.92rem; will-change: transform;
        }
        .chip.active{ background:rgba(14,153,213,.12); border-color:rgba(14,153,213,.35); color:#085c83; transform:translateY(-1px) }

        .radios{ display:flex; flex-wrap:wrap; gap:.5rem }
        .radio{ border:1px solid var(--border); border-radius:10px; padding:.5rem .65rem; cursor:pointer;
          transition:transform .16s ease, border-color .16s ease, color .16s ease, background-color .16s ease; will-change: transform; }
        .radio input{ display:none }
        .radio.active{ background:rgba(14,153,213,.10); border-color:rgba(14,153,213,.35); color:#085c83; transform:translateY(-1px) }

        .attach{
          display:inline-flex; align-items:center; gap:.5rem; border:1px dashed var(--border); padding:.65rem .8rem;
          border-radius:12px; cursor:pointer; user-select:none;
        }
        .attach input{ display:none }

        .consent{ display:flex; align-items:center; gap:.55rem; border:1px solid var(--border); padding:.65rem .75rem; border-radius:12px }
        .help{ font-size:.85rem; opacity:.7 }

        .actions{
          display:flex; gap:.6rem; margin-top:.6rem; align-items:center; justify-content:flex-start;
          border-top:1px dashed var(--border); padding-top:.8rem;
        }
        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.75rem 1rem;
          font-weight:700; transition:transform .16s ease, box-shadow .16s ease; cursor:pointer; will-change: transform;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.22) }
        .btn-ghost{
          border:1px solid var(--border); border-radius:12px; padding:.72rem .95rem; text-decoration:none; color:inherit;
          transition:border-color .16s ease, background-color .16s ease;
        }
        .btn-ghost:hover{ border-color:rgba(14,153,213,.3) }

        .trust-strip{
          margin-top: .9rem;
          display:grid; grid-template-columns: repeat(3, 1fr); gap:.6rem;
          font-size:.9rem; color:#0b1b28; opacity:.8;
        }
        .trust-strip > div{
          border:1px dashed var(--border); border-radius:12px; padding:.6rem .7rem; text-align:center;
          background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.00));
        }
        @media (max-width: 680px){
          .trust-strip{ grid-template-columns: 1fr; }
        }

        /* Aside (secondary) */
        .prime-rail{ display:grid; gap:1.2rem; align-content:start; position:relative }
        @media (min-width: 1001px){
          .prime-rail{ position: sticky; top: 86px; height: fit-content; }
        }
        .rail-card{
          border:1px solid var(--border); background:var(--card,#fff); border-radius:16px; padding:1rem;
          box-shadow: 0 6px 18px rgba(0,0,0,.05);
        }
        .rail-card.callout{
          background:linear-gradient(180deg, rgba(21,30,69,.85), rgba(21,30,69,.65));
          color:#e6f3ff; border-color: rgba(255,255,255,.18);
        }
        .rail-title{ margin:.1rem 0 .6rem; font-size:1.05rem; font-weight:800 }
        .rail-action{
          display:flex; align-items:center; gap:.7rem; padding:.65rem .6rem; border-radius:12px;
          border:1px solid var(--border); text-decoration:none; color:inherit;
          transition:transform .16s ease, background-color .16s ease, border-color .16s ease;
          margin:.45rem 0;
          background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.00));
          will-change: transform;
        }
        .rail-card.callout .rail-action{ border-color: rgba(255,255,255,.18) }
        .rail-action:hover{ transform:translateY(-2px); border-color:rgba(14,153,213,.28) }
        .rail-action .ico{
          display:grid; place-items:center; width:36px; height:36px; border-radius:10px;
          background:var(--accent-600, #0e99d5); color:#fff; flex:0 0 36px;
        }
        .muted{ opacity:.85; font-size:.92rem }

        .office, .hours{ display:grid; grid-template-columns: 110px 1fr; gap:.4rem; padding:.3rem 0 }
        .office .k, .hours .k{ opacity:.7 }
        .office + .office{ border-top:1px dashed var(--border); padding-top:.6rem; margin-top:.6rem }

        /* Map */
        .map-wrap{
          margin-top:1.2rem; border-radius:16px; overflow:hidden; border:1px solid var(--border);
          box-shadow:0 6px 18px rgba(0,0,0,.05);
          /* Let browser skip offscreen work where supported */
          content-visibility: auto;
          contain-intrinsic-size: 380px 1000px;
        }
        .map-wrap iframe{ width:100%; height:380px; border:0 }

        /* Respect user preference to reduce motion */
        @media (prefers-reduced-motion: reduce){
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}
