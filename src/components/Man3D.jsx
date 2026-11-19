import { useEffect, useRef, useState } from 'react'
import { createMan } from '../man3d'
import { script } from '../data'
import { reply, quick } from '../brain'

const tts = typeof window !== 'undefined' && 'speechSynthesis' in window
const noEmoji = s => s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').replace(/\s+/g, ' ').trim()
function pickVoice() {
  const v = speechSynthesis.getVoices().filter(x => /^en/i.test(x.lang))
  return v.find(x => /google uk english male|daniel|david|alex|mark|james|male/i.test(x.name)) || v[0] || null
}

export default function Man3D() {
  const mount = useRef(null)
  const st = useRef({ talking: false, wave: false, mood: 'neutral', listening: false })
  const ctl = useRef({ cancel: () => {}, voice: true })
  const rec = useRef(null)
  const [you, setYou] = useState('')
  const [bot, setBot] = useState('')
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [voice, setVoice] = useState(true)
  const [listening, setListening] = useState(false)
  const [lang, setLang] = useState('en-US')
  const [hint, setHint] = useState('')

  useEffect(() => createMan(mount.current, st.current), [])
  useEffect(() => { ctl.current.voice = voice; if (!voice && tts) speechSynthesis.cancel() }, [voice])

  const say = (lines, mood = 'neutral', wave = false) => {
    ctl.current.cancel()
    let dead = false
    const timers = []
    const s = st.current
    ctl.current.cancel = () => { dead = true; timers.forEach(t => { clearTimeout(t); clearInterval(t) }); if (tts) speechSynthesis.cancel(); s.talking = false; s.wave = false; setTyping(false) }
    const next = i => {
      if (dead) return
      if (i >= lines.length) { s.mood = 'neutral'; s.wave = false; return }
      const text = lines[i]
      let n = 0, isTyping = true, speaking = false
      const update = () => { s.talking = isTyping || speaking; setTyping(isTyping) }
      const check = () => { if (!isTyping && !speaking && !dead) timers.push(setTimeout(() => next(i + 1), 800)) }
      s.mood = mood; s.wave = wave && i === 0
      setBot(''); update()
      const useVoice = ctl.current.voice && tts
      if (useVoice) {
        try {
          speaking = true
          const u = new SpeechSynthesisUtterance(noEmoji(text))
          const v = pickVoice(); if (v) u.voice = v
          u.rate = 1; u.pitch = 0.9
          const end = () => { if (speaking) { speaking = false; update(); check() } }
          u.onend = end; u.onerror = end
          speechSynthesis.speak(u)
          timers.push(setTimeout(end, text.length * 95 + 2500)) // safety net
        } catch { speaking = false }
      }
      const iv = setInterval(() => {
        n++; setBot(text.slice(0, n))
        if (n >= text.length) { clearInterval(iv); isTyping = false; update(); check() }
      }, useVoice ? 60 : 30)
      timers.push(iv)
    }
    next(0)
  }

  useEffect(() => {
    const t = setTimeout(() => say(script, 'happy', true), 2800)
    return () => { clearTimeout(t); ctl.current.cancel() }
  }, [])

  const send = text => {
    text = text.trim(); if (!text) return
    setYou(text); setInput(''); setHint('')
    const r = reply(text)
    say(r.lines, r.mood)
    if (r.go) setTimeout(() => document.getElementById(r.go)?.scrollIntoView({ behavior: 'smooth' }), 1400)
  }

  const toggleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setHint('Voice input is not supported in this browser. Try Google Chrome, or type your question.'); return }
    if (listening) { rec.current?.stop(); return }
    try {
      const r = new SR(); r.lang = lang; r.interimResults = true; r.maxAlternatives = 1
      r.onstart = () => { ctl.current.cancel(); st.current.listening = true; st.current.mood = 'neutral'; setListening(true); setHint('') }
      r.onresult = e => {
        const txt = [...e.results].map(x => x[0].transcript).join('')
        setInput(txt)
        if (e.results[e.results.length - 1].isFinal) send(txt)
      }
      r.onerror = e => setHint(e.error === 'not-allowed' || e.error === 'service-not-allowed'
        ? 'Microphone is blocked here. Voice input works on your deployed https site or localhost — allow the mic when the browser asks. You can still type!'
        : e.error === 'no-speech' ? "I didn't hear anything. Tap the mic and try again." : 'Voice input error: ' + e.error)
      r.onend = () => { st.current.listening = false; setListening(false) }
      r.start(); rec.current = r
    } catch { setHint('Could not start the microphone. Please type your question instead.') }
  }

  return (
    <>
      <div className="bubble show" role="status">
        {you && <small className="you">You: {you}</small>}
        <p>{bot || (listening ? '🎤 Listening…' : 'Hi! Ask me anything…')}{typing && <i className="caret" />}</p>
      </div>
      <div className={'stage-card' + (listening ? ' listening' : '')}>
        <div className="man" ref={mount} role="img" aria-label="3D animated character you can chat with" />
        <div className="dock">
          <div className="quick">
            {quick.map(([l, q]) => <button key={l} onClick={() => send(q)}>{l}</button>)}
            <button onClick={() => say(script, 'happy', true)}>🔊 Replay intro</button>
          </div>
          {hint && <div className="hint">{hint}</div>}
          <form className="chat-row" onSubmit={e => { e.preventDefault(); send(input) }}>
            <button type="button" className={'mic' + (listening ? ' on' : '')} onClick={toggleMic} aria-label={listening ? 'Stop listening' : 'Speak to me'} title="Speak to me">🎤</button>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={listening ? 'Listening… speak now' : 'Type your question…'} aria-label="Chat message" />
            <button type="submit" className="send" aria-label="Send">➤</button>
            <button type="button" className="tgl" onClick={() => setLang(l => (l === 'en-US' ? 'ur-PK' : 'en-US'))} title="Voice input language">{lang === 'en-US' ? 'EN' : 'اردو'}</button>
            <button type="button" className="tgl" onClick={() => setVoice(v => !v)} aria-label="Toggle voice" title="Voice on/off">{voice ? '🔊' : '🔇'}</button>
          </form>
        </div>
      </div>
    </>
  )
}
