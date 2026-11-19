import { profile, skills, experience, education } from '../data'
import Reveal from './Reveal'
import { useInView } from '../hooks'
function Bar({ name, level, i }) {
  const [ref, seen] = useInView()
  return <div ref={ref} className="bar"><div><span>{name}</span><span>{level}%</span></div><div className="track"><i style={{ width: seen ? level + '%' : 0, transitionDelay: i * 90 + 'ms' }} /></div></div>
}
const TL = ({ items }) => <div className="timeline">{items.map(e => <div className="t-item" key={e.title}><span>{e.period}</span><h5>{e.title}</h5><small>{e.place}</small><p>{e.text}</p></div>)}</div>
export default function About() {
  return (
    <section id="about" className="section alt">
      <div className="container">
        <Reveal><span className="eyebrow">Professional profile</span><h3 className="title">About me</h3></Reveal>
        <div className="about-grid">
          <Reveal dir="left"><div className="card profile">
            <div className="p-avatar">{profile.name.split(' ').map(n => n[0]).join('')}</div>
            <h4>{profile.name}</h4><p className="muted">{profile.role}</p>
            <ul><li>📍 {profile.location}</li><li>✉️ {profile.email}</li><li>📞 {profile.phone}</li></ul>
            <div className="p-links">{profile.links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
          </div></Reveal>
          <div>
            <Reveal>{profile.summary.map((p, i) => <p key={i} className="lead">{p}</p>)}</Reveal>
            <Reveal delay={100}><h5 className="h5">Core skills</h5><div className="bars">{skills.map((s, i) => <Bar key={s.name} {...s} i={i} />)}</div></Reveal>
          </div>
        </div>
        <div className="two">
          <Reveal><h5 className="h5">💼 Experience</h5><TL items={experience} /></Reveal>
          <Reveal delay={100}><h5 className="h5">🎓 Education &amp; Certifications</h5><TL items={education} /></Reveal>
        </div>
      </div>
    </section>
  )
}
