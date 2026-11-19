import { useEffect, useState } from 'react'
import { profile } from '../data'
const links = [['home', 'Home'], ['store', 'Store'], ['services', 'Services'], ['about', 'About'], ['projects', 'Projects'], ['contact', 'Contact']]
export default function Header({ count, openCart }) {
  const [menu, setMenu] = useState(false)
  const [sc, setSc] = useState(false)
  useEffect(() => { const f = () => setSc(scrollY > 10); addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  return (
    <>
      <div className="topbar">🚚 Free delivery on demo orders over $50 &nbsp;•&nbsp; 💼 Open for freelance projects</div>
      <header className={'header' + (sc ? ' scrolled' : '')}>
        <a href="#home" className="logo"><span className="mark">{profile.name[0]}</span>{profile.name}</a>
        <nav className={menu ? 'open' : ''}>
          {links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{l}</a>)}
        </nav>
        <div className="h-actions">
          <button className="cart-btn" onClick={openCart} aria-label="Open cart">🛒{count > 0 && <b key={count}>{count}</b>}</button>
          <a href="#contact" className="btn primary sm hide-m">Hire me</a>
          <button className="burger" onClick={() => setMenu(m => !m)} aria-label="Menu">{menu ? '✕' : '☰'}</button>
        </div>
      </header>
    </>
  )
}
