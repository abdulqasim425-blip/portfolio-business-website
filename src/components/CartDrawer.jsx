import { useState } from 'react'
import { products } from '../data'
export default function CartDrawer({ open, close, cart, setQty, clear }) {
  const [done, setDone] = useState(null)
  const items = products.filter(p => cart[p.id]).map(p => ({ ...p, qty: cart[p.id] }))
  const sub = items.reduce((a, p) => a + p.price * p.qty, 0)
  const ship = sub === 0 || sub >= 50 ? 0 : 5
  const checkout = () => { setDone('#' + Math.floor(10000 + Math.random() * 89999)); clear() }
  const shut = () => { close(); setTimeout(() => setDone(null), 400) }
  return (
    <>
      <div className={'overlay' + (open ? ' show' : '')} onClick={shut} />
      <aside className={'drawer' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="d-head"><h4>Your cart</h4><button onClick={shut} aria-label="Close">✕</button></div>
        {done ? (
          <div className="d-done"><div className="check">✓</div><h4>Order placed!</h4><p>Order {done} confirmed. This is a demo store, so no payment was taken.</p><button className="btn primary" onClick={shut}>Continue</button></div>
        ) : !items.length ? (
          <div className="d-empty"><span>🛒</span><p>Your cart is empty</p><button className="btn outline" onClick={shut}>Start shopping</button></div>
        ) : (
          <>
            <div className="d-list">
              {items.map(p => (
                <div className="d-item" key={p.id}>
                  <div className="d-thumb" style={{ '--h': p.hue }}>{p.emoji}</div>
                  <div className="d-info"><b>{p.name}</b><span>${p.price}</span>
                    <div className="qty"><button onClick={() => setQty(p.id, p.qty - 1)}>−</button><i>{p.qty}</i><button onClick={() => setQty(p.id, p.qty + 1)}>+</button></div></div>
                  <strong>${p.price * p.qty}</strong>
                </div>
              ))}
            </div>
            <div className="d-foot">
              <div><span>Subtotal</span><b>${sub}</b></div>
              <div><span>Shipping</span><b>{ship ? '$' + ship : 'Free'}</b></div>
              <div className="total"><span>Total</span><b>${sub + ship}</b></div>
              <button className="btn primary block" onClick={checkout}>Checkout (demo)</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
