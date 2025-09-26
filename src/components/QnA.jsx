import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaChevronDown } from 'react-icons/fa'

export default function QnA(){
  const faqs = useSelector(s => s.content.faqs)
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section className="qna">
      <h3>Frequently Asked Questions</h3>
      <ul className="accordion">
        {faqs.map((f, i) => (
          <li key={i} className={'item ' + (openIdx === i ? 'open' : '')} onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
            <div className="q">
              <span>{f.q}</span>
              <FaChevronDown />
            </div>
            <div className="a">{f.a}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
