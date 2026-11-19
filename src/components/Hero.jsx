import { profile } from "../data";
import { useTyping, useInView, useCount } from "../hooks";
import Man3D from "./Man3D";
function Stat({ value, label }) {
  const [ref, seen] = useInView();
  const n = useCount(parseInt(value), seen);
  return (
    <div ref={ref}>
      <b>
        {n}
        {value.replace(/[0-9]/g, "")}
      </b>
      <span>{label}</span>
    </div>
  );
}
export default function Hero() {
  const typed = useTyping([
    "Web Developer",
    "E-commerce Specialist",
    "React Engineer",
    "UI Designer",
  ]);
  return (
    <section id="home" className="hero container">
      <div className="hero-text">
        <span className="pill">
          <i className="dot" /> Available for new projects
        </span>
        <h1>{profile.headline}</h1>
        <h2 className="role">
          {profile.name} · <em>{typed}</em>
          <i className="caret" />
        </h2>
        <p className="lead">
          Websites, online stores and web apps built with React &amp; Node.js —
          fast, secure and designed to convert visitors into customers.
        </p>
        <div className="btns">
          <a className="btn primary" href="#store">
            Explore demo store →
          </a>
          <a className="btn outline" href="#contact">
            Hire me
          </a>
        </div>
        <div className="hero-stats">
          {profile.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
      <div className="stage">
        <Man3D />
        <div className="chip-float c1">⭐ 5.0 client rating</div>
        <div className="chip-float c2">⚡ 98 Lighthouse score</div>
      </div>
    </section>
  );
}
