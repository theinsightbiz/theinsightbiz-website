import React, { useMemo, useState } from 'react'
import { FaEnvelope, FaWhatsapp, FaPhoneAlt, FaCalendarAlt, FaPaperclip } from 'react-icons/fa'

export default function Contact(){
  // --- simple form state (uncontrolled inputs + light state for chips/radios) ---
  const [types, setTypes] = useState([])
  const [timeline, setTimeline] = useState('')
  const [files, setFiles] = useState([])
  const maxMsg = 900

  const toggleType = (t) =>
    setTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('types', JSON.stringify(types))
    data.append('timeline', timeline)
    data.append('filesCount', files.length.toString())
    // TODO: integrate with your backend/email service
    alert('Thanks! Your message has been queued. We’ll get back shortly.')
    e.target.reset()
    setTypes([]); setTimeline(''); setFiles([])
  }

  const typeOptions = useMemo(()=>[
    'Branding / Identity','Website / UI UX','Regulatory & Compliance',
    'Tax Advisory / Filing','Accounting & Bookkeeping','Other'
  ],[])

  const timeOptions   = ['ASAP','In 1–2 months','In 3–6 months','Exploring']

  return (
    <section className="page wide contact-miux">
      {/* Premium hero */}
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>Let’s build something exceptional</h1>
        <p style={{maxWidth:860}}>Tell us about your needs—advisory, compliance, design, or scale. We’ll respond within 1 business day.</p>
      </div>

      {/* split layout */}
      <div className="miux-grid">
        {/* left rail: actions & offices */}
        <aside className="rail">
          <div className="rail-card">
            <h3 className="rail-title">Start a conversation</h3>
            <a className="rail-action" href="mailto:contact@theinsightbiz.com">
              <span className="ico"><FaEnvelope/></span>
              <div>
                <strong>Email</strong>
                <div className="muted">contact@theinsightbiz.com</div>
              </div>
            </a>
            <a className="rail-action" href="https://wa.me/918298869079" target="_blank" rel="noreferrer">
              <span className="ico" style={{background:'var(--whatsapp, #25D366)'}}><FaWhatsapp/></span>
              <div>
                <strong>WhatsApp</strong>
                <div className="muted">+91 82988 69079</div>
              </div>
            </a>
            <a className="rail-action" href="tel:+918676856153">
              <span className="ico"><FaPhoneAlt/></span>
              <div>
                <strong>Call</strong>
                <div className="muted">+91 86768 56153</div>
              </div>
            </a>
            <a className="rail-action" href="#calendar">
              <span className="ico"><FaCalendarAlt/></span>
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
              <div className="v">A-272, Block A, Surajmal Vihar, New Delhi – 110092</div>
            </div>
            <div className="office">
              <div className="k">Branch Office</div>
              <div className="v">Hamriyah Street, Al Fahidi, Bur Dubai, Dubai</div>
            </div>
            <div className="hours">
              <div className="k">Opening Hours</div>
              <div className="v">Mon–Fri: 10:00–19:00 • Sat: 11:00–16:00</div>
            </div>
          </div>
        </aside>

        {/* right: interactive form */}
        <form className="panel-premium form" onSubmit={onSubmit}>
          <div className="grid">
            <div className="field">
              <label>Full name</label>
              <input type="text" name="name" placeholder="Your full name" required/>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@company.com" required/>
            </div>
            <div className="field">
              <label>Company / Organization</label>
              <input type="text" name="company" placeholder="Company name"/>
            </div>
            <div className="field">
              <label>Country</label>
              <input type="text" name="country" placeholder="India / UAE / UK / USA"/>
            </div>
          </div>

          <div className="field">
            <label>What are you looking for?</label>
            <div className="chips">
              {typeOptions.map(t=>(
                <button
                  key={t}
                  type="button"
                  className={'chip '+(types.includes(t)?'active':'')}
                  onClick={()=>toggleType(t)}
                >{t}</button>
              ))}
            </div>
          </div>

          <div className="grid">
            <div className="field">
              <label>Timeline</label>
              <div className="radios">
                {timeOptions.map(t=>(
                  <label key={t} className={'radio '+(timeline===t?'active':'')}>
                    <input type="radio" name="timeline" value={t} onChange={()=>setTimeline(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <label>Project brief</label>
            <textarea
              name="message"
              rows={6}
              maxLength={maxMsg}
              placeholder="Share goals, current pain points, and any links we should review."
              onInput={(e)=>e.currentTarget.nextSibling.querySelector('em').textContent =
                `${e.currentTarget.value.length}/${maxMsg}`}
              required
            />
            <div className="help"><em>0/{maxMsg}</em></div>
          </div>

          <div className="grid">
            <div className="field">
              <label>Attachments</label>
              <label className="attach">
                <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files||[]))}/>
                <FaPaperclip/> {files.length ? `${files.length} file(s) selected` : 'Upload brief / scope / RFP'}
              </label>
            </div>
            <div className="field">
              <label>Consent</label>
              <label className="consent">
                <input type="checkbox" required/> I agree to be contacted and accept the Privacy Policy.
              </label>
            </div>
          </div>

          <div className="actions">
            <button className="btn-primary" type="submit">Send message</button>
            <a className="btn-ghost" href="mailto:contact@theinsightbiz.com">Email instead</a>
          </div>
        </form>
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

      {/* scoped styles for this page */}
      <style>{`
        .contact-miux :where(h1,h2,h3){ letter-spacing:-0.2px }
        .miux-grid{
          display:grid; grid-template-columns: 320px 1fr; gap:1.2rem; margin-top:1.2rem;
        }
        .rail{ display:grid; gap:1.2rem; align-content:start }
        .rail-card{
          border:1px solid var(--border); background:var(--card); border-radius:16px; padding:1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,.06);
        }
        .rail-title{ margin:.1rem 0 .6rem; font-size:1.05rem }
        .rail-action{
          display:flex; align-items:center; gap:.7rem; padding:.65rem .6rem; border-radius:12px;
          border:1px solid var(--border); text-decoration:none; color:var(--text, #0b1b28);
          transition:transform .2s ease, background .2s ease, border-color .2s ease;
          margin:.45rem 0;
          background:linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.00));
        }
        .rail-action:hover{ transform:translateY(-2px); border-color:rgba(14,153,213,.28) }
        .rail-action .ico{
          display:grid; place-items:center; width:36px; height:36px; border-radius:10px;
          background:var(--accent-600, #0e99d5); color:#fff; flex:0 0 36px;
        }
        .muted{ opacity:.7; font-size:.9rem }
        .office, .hours{ display:grid; grid-template-columns: 110px 1fr; gap:.4rem; padding:.3rem 0 }
        .office .k, .hours .k{ opacity:.7 }
        .office + .office{ border-top:1px dashed var(--border); padding-top:.6rem; margin-top:.6rem }

        .form{ padding:1.1rem; border-radius:16px }
        .form .grid{ display:grid; grid-template-columns: 1fr 1fr; gap:.9rem }
        .field{ display:grid; gap:.35rem }
        .field label{ font-weight:600 }
        input[type="text"], input[type="email"], textarea{
          border:1px solid var(--border); background:var(--surface, #fff); border-radius:12px; padding:.75rem .9rem;
          outline:none; transition:border-color .2s ease, box-shadow .2s ease;
        }
        input:focus, textarea:focus{ border-color:rgba(14,153,213,.45); box-shadow:0 0 0 4px rgba(14,153,213,.12) }

        .chips{ display:flex; flex-wrap:wrap; gap:.5rem }
        .chip{
          border:1px solid var(--border); border-radius:999px; padding:.5rem .75rem; background:#fff;
          transition:all .2s ease; font-size:.92rem;
        }
        .chip.active{ background:rgba(14,153,213,.12); border-color:rgba(14,153,213,.35); color:#085c83 }

        .radios{ display:flex; flex-wrap:wrap; gap:.5rem }
        .radio{ border:1px solid var(--border); border-radius:10px; padding:.5rem .65rem; cursor:pointer; transition:all .2s ease }
        .radio input{ display:none }
        .radio.active{ background:rgba(14,153,213,.10); border-color:rgba(14,153,213,.35); color:#085c83 }

        .attach{
          display:inline-flex; align-items:center; gap:.5rem; border:1px dashed var(--border); padding:.65rem .8rem;
          border-radius:12px; cursor:pointer; user-select:none;
        }
        .attach input{ display:none }

        .consent{ display:flex; align-items:center; gap:.55rem; border:1px solid var(--border); padding:.65rem .75rem; border-radius:12px }
        .help{ font-size:.85rem; opacity:.7 }

        .actions{ display:flex; gap:.6rem; margin-top:.6rem; align-items:center }
        .btn-primary{
          background:var(--accent-600, #0e99d5); color:#fff; border:none; border-radius:12px; padding:.75rem 1rem;
          font-weight:700; transition:transform .2s ease, box-shadow .2s ease; cursor:pointer;
        }
        .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 26px rgba(14,153,213,.25) }
        .btn-ghost{
          border:1px solid var(--border); border-radius:12px; padding:.72rem .95rem; text-decoration:none; color:inherit;
          transition:all .2s ease;
        }
        .btn-ghost:hover{ border-color:rgba(14,153,213,.3) }

        .map-wrap{
          margin-top:1.2rem; border-radius:16px; overflow:hidden; border:1px solid var(--border);
          box-shadow:0 10px 30px rgba(0,0,0,.06);
        }
        .map-wrap iframe{ width:100%; height:380px; border:0 }

        @media (max-width: 980px){
          .miux-grid{ grid-template-columns: 1fr; }
          .form .grid{ grid-template-columns: 1fr }
        }
      `}</style>
    </section>
  )
}
