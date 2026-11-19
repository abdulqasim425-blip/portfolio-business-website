import { testimonials } from '../data'
import Reveal from './Reveal'
export default function Testimonials() {
  return (
    <section className="section alt">
      <div className="container">
        <Reveal><span className="eyebrow">Testimonials</span><h3 className="title">What clients say</h3></Reveal>
        <div className="grid3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="card quote"><div className="stars">★★★★★</div><p>“{t.text}”</p>
                <div className="who"><span>{t.name[0]}</span><div><b>{t.name}</b><small>{t.role}</small></div></div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
