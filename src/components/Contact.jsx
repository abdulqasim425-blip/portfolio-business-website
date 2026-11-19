import { useState } from 'react'
import { profile } from '../data'
import Reveal from './Reveal'
export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => { e.preventDefault(); location.href = `mailto:${profile.email}?subject=Project%20enquiry&body=${encodeURIComponent(f.message + '\n\n— ' + f.name + ' (' + f.email + ')')}` }
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="cta">
          <Reveal dir="left"><span className="eyebrow light">Let's talk</span><h3>Have a project in mind?</h3>
            <p>Tell me about your idea and I'll get back to you within 24 hours.</p>
            <ul><li>✉️ {profile.email}</li><li>📞 {profile.phone}</li><li>📍 {profile.location}</li></ul></Reveal>
          <Reveal dir="right"><form onSubmit={submit}>
            <input required placeholder="Your name" value={f.name} onChange={set('name')} />
            <input required type="email" placeholder="Your email" value={f.email} onChange={set('email')} />
            <textarea required rows="4" placeholder="Tell me about your project" value={f.message} onChange={set('message')} />
            <button className="btn primary block" type="submit">Send message</button>
          </form></Reveal>
        </div>
      </div>
    </section>
  )
}
