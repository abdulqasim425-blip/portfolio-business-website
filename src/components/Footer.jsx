import { profile } from '../data'
export default function Footer() {
  return (
    <footer className="footer"><div className="container f-in">
      <div><b>{profile.name}</b><p>{profile.role} · {profile.location}</p></div>
      <div className="f-links">{profile.links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
      <small>© {new Date().getFullYear()} {profile.name}. All rights reserved.</small>
    </div></footer>
  )
}
