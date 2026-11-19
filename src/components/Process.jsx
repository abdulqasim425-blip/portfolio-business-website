import Reveal from './Reveal'
const steps = [
  ['01', '🔍', 'Discover', 'We talk about your goals, audience and budget so the project starts with a clear plan.'],
  ['02', '🎨', 'Design', 'I create a clean, on-brand design and share it for feedback before writing code.'],
  ['03', '💻', 'Develop', 'Fast, responsive and secure development with regular progress updates.'],
  ['04', '🚀', 'Deliver', 'Testing, launch and ongoing support so your site keeps performing.'],
]
export default function Process() {
  return (
    <section className="section">
      <div className="container">
        <Reveal><span className="eyebrow">How I work</span><h3 className="title">A simple 4-step process</h3></Reveal>
        <div className="steps">
          {steps.map(([n, i, t, d], k) => (
            <Reveal key={n} delay={k * 100}><div className="step"><span className="num">{n}</span><div className="s-ico">{i}</div><h4>{t}</h4><p>{d}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
