import { projects } from '../data'
import Reveal from './Reveal'
export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal><span className="eyebrow">Portfolio</span><h3 className="title">Selected Projects</h3><p className="sub">A few recent case studies.</p></Reveal>
        <div className="grid2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="card case">
                <div className="c-img" style={{ '--h': p.hue }}><span>{p.emoji}</span></div>
                <div className="c-body"><h4>{p.title}</h4><p>{p.desc}</p>
                  <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <a href="#contact" className="link">View case study →</a></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
