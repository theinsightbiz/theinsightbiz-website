import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function Dropdown({ title, children }){
  const [open, setOpen] = useState(false)
  return (
    <div className={'dropdown ' + (open ? 'open' : '')}>
      <button className="dropdown-header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <FaChevronDown/>
      </button>
      {open && <div className="dropdown-body">{children}</div>}
    </div>
  )
}
