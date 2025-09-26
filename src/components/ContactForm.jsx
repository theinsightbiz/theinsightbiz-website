import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addInquiry, showToast, clearToast } from '../actions'

const initial = { name: '', email: '', phone: '', message: '' }

export default function ContactForm(){
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validate = () => {
    const e = {}
    if(!form.name.trim()) e.name = 'Name is required'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if(!/^\+?\d{7,15}$/.test(form.phone)) e.phone = 'Valid phone required'
    if(form.message.trim().length < 10) e.message = 'Message should be at least 10 chars'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!validate()) return
    dispatch(addInquiry({...form, ts: new Date().toISOString()}))
    dispatch(showToast('Thanks! We will get back to you shortly.'))
    setForm(initial)
    setTimeout(() => dispatch(clearToast()), 3000)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="grid">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" />
          {errors.name && <em>{errors.name}</em>}
        </label>
        <label>
          <span>Email</span>
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
          {errors.email && <em>{errors.email}</em>}
        </label>
        <label>
          <span>Phone</span>
          <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 99999 99999" />
          {errors.phone && <em>{errors.phone}</em>}
        </label>
      </div>
      <label className="full">
        <span>Your Query</span>
        <textarea rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us how we can help" />
        {errors.message && <em>{errors.message}</em>}
      </label>
      <button className="btn primary">Submit</button>
    </form>
  )
}
