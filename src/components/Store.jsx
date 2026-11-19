import { useState } from 'react'
import { products, categories } from '../data'
import Reveal from './Reveal'
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r))
export default function Store({ add }) {
  const [cat, setCat] = useState('All'), [q, setQ] = useState(''), [sort, setSort] = useState('feat'), [fav, setFav] = useState({})
  let list = products.filter(p => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  if (sort === 'rate') list = [...list].sort((a, b) => b.rating - a.rating)
  return (
    <section id="store" className="section alt">
      <div className="container">
        <Reveal><span className="eyebrow">Live demo</span><h3 className="title">E-commerce Store</h3>
          <p className="sub">A working sample of the online stores I build — search, filter, add to cart and check out.</p></Reveal>
        <div className="toolbar">
          <div className="cats">{categories.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className="tools">
            <input placeholder="🔍 Search products…" value={q} onChange={e => setQ(e.target.value)} />
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="feat">Featured</option><option value="low">Price: low → high</option><option value="high">Price: high → low</option><option value="rate">Top rated</option>
            </select>
          </div>
        </div>
        <div className="products">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <article className="product">
                <div className="p-img" style={{ '--h': p.hue }}>
                  {p.badge && <span className={'badge ' + p.badge.toLowerCase()}>{p.badge}</span>}
                  <button className={'heart' + (fav[p.id] ? ' on' : '')} onClick={() => setFav({ ...fav, [p.id]: !fav[p.id] })} aria-label="Wishlist">{fav[p.id] ? '♥' : '♡'}</button>
                  <span className="p-emoji">{p.emoji}</span>
                </div>
                <div className="p-body">
                  <small>{p.cat}</small>
                  <h4>{p.name}</h4>
                  <div className="rate"><span>{stars(p.rating)}</span> {p.rating} <em>({p.reviews})</em></div>
                  <div className="p-foot">
                    <div className="price">${p.price}{p.old && <s>${p.old}</s>}</div>
                    <button className="add" onClick={() => add(p.id)}>Add +</button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          {!list.length && <p className="empty">No products found.</p>}
        </div>
      </div>
    </section>
  )
}
