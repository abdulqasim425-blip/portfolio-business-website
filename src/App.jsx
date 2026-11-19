import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Brands from './components/Brands'
import Store from './components/Store'
import CartDrawer from './components/CartDrawer'
import Services from './components/Services'
import Process from './components/Process'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { products } from './data'

export default function App() {
  const [cart, setCart] = useState({})
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const add = id => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
    setToast(`${products.find(p => p.id === id).name} added to cart`)
    clearTimeout(window.__t); window.__t = setTimeout(() => setToast(''), 1800)
  }
  const setQty = (id, q) => setCart(c => { const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n })
  return (
    <>
      <Header count={count} openCart={() => setOpen(true)} />
      <main>
        <Hero />
        <Brands />
        <Store add={add} />
        <Services />
        <Process />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer open={open} close={() => setOpen(false)} cart={cart} setQty={setQty} clear={() => setCart({})} />
      <div className={'toast' + (toast ? ' show' : '')}>✓ {toast}</div>
    </>
  )
}
