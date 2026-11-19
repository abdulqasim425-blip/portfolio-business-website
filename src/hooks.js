import { useEffect, useRef, useState } from 'react'

export function useInView(opts = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, opts)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function useTyping(words, speed = 80, pause = 1400) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setI(i + 1) }
      }
    }, del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [text, del, i])
  return text
}

export function useCount(target, seen, duration = 1600) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    let raf, start
    const step = ts => {
      start ??= ts
      const p = Math.min((ts - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, target])
  return n
}
