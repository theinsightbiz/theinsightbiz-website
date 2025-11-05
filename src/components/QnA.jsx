import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';

export default function QnA() {
  const faqs = useSelector((s) => s.content.faqs);
  const [openIdx, setOpenIdx] = useState(-1); // start closed
  const panelsRef = useRef([]);

  const toggle = (i) => setOpenIdx((idx) => (idx === i ? -1 : i));

  return (
    <section className="qna" style={{ color: '#000' }}>
      <h3 style={{ color: '#fff' }}>Frequently Asked Questions</h3>
      <ul className="accordion">
        {faqs.map((f, i) => {
          const isOpen = openIdx === i;
          const panel = panelsRef.current[i];
          const maxHeight = isOpen && panel ? panel.scrollHeight : 0;

          return (
            <li key={i} className={`item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="q"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
              >
                <span>{f.q}</span>
                <FaChevronDown className="chev" />
              </button>

              <div
                id={`faq-panel-${i}`}
                ref={(el) => (panelsRef.current[i] = el)}
                className="a"
                style={{
                  maxHeight,
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 280ms ease, opacity 220ms ease',
                  overflow: 'hidden',
                }}
              >
                {f.a}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
