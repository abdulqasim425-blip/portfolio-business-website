const t = ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind', 'Stripe', 'Figma', 'Git', 'REST APIs', 'TypeScript']
export default function Brands() {
  return <div className="brands"><div className="container"><small>TECHNOLOGIES I WORK WITH</small><div className="brand-row">{t.map(x => <span key={x}>{x}</span>)}</div></div></div>
}
