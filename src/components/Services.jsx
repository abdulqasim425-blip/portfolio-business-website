import { services } from '../data'
import Reveal from './Reveal'
export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal><span className="eyebrow">What I do</span><h3 className="title">Services</h3><p className="sub">End-to-end development — from idea and design to launch and support.</p></Reveal>
        <div className="grid3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}><div className="card service"><div className="s-icon">{s.icon}</div><h4>{s.title}</h4><p>{s.text}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
