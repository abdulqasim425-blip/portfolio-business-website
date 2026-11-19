import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const rnd = (a, b) => a + Math.random() * (b - a)
const ease = (c, t, k) => c + (t - c) * k

export function createMan(container, state) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
  camera.position.set(0, 1.0, 7.2); camera.lookAt(0, 1.0, 0)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.45
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9fb4d8, 0.9))
  const key = new THREE.DirectionalLight(0xfff3e6, 2.2); key.position.set(2.5, 4, 5); scene.add(key)
  const rim = new THREE.DirectionalLight(0xffd9b0, 2.2); rim.position.set(-4, 2, -3); scene.add(rim)
  const rim2 = new THREE.DirectionalLight(0xbcd4ff, 1.4); rim2.position.set(4, 1, -3); scene.add(rim2)

  const M = (c, r = 0.55, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m })
  const skin = new THREE.MeshPhysicalMaterial({ color: 0xe8b58a, roughness: 0.55, sheen: 0.7, sheenRoughness: 0.5, sheenColor: new THREE.Color(0xff9d86) })
  const skinD = M(0xd29672, 0.6)
  const suit = new THREE.MeshPhysicalMaterial({ color: 0x14325c, roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.6 })
  const suitD = M(0x0d2547, 0.6), white = M(0xffffff, 0.35), tie = M(0xff6b35, 0.4)
  const hair = M(0x1b1a22, 0.45), dark = M(0x10101a, 0.3), frame = M(0x20222e, 0.35, 0.4)
  const S = new THREE.SphereGeometry(1, 40, 28)
  const CAP = (r, l) => new THREE.CapsuleGeometry(r, l, 4, 10)
  const add = (parent, geo, mat, pos = [0, 0, 0], sc = [1, 1, 1]) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(...pos); m.scale.set(...sc); parent.add(m); return m
  }

  const root = new THREE.Group(); scene.add(root)
  // ---- body: blazer, shirt, tie ----
  const torso = add(root, new THREE.CapsuleGeometry(0.75, 0.9, 10, 32), suit, [0, -0.15, 0], [1.15, 1, 0.7])
  add(root, S, white, [0, 0.76, 0.4], [0.25, 0.4, 0.1])
  ;[-1, 1].forEach(s => { const l = add(root, new THREE.BoxGeometry(0.14, 0.62, 0.05), suitD, [s * 0.25, 0.68, 0.46]); l.rotation.z = s * 0.3 })
  add(root, new THREE.BoxGeometry(0.1, 0.09, 0.05), tie, [0, 0.96, 0.37])
  const blade = add(root, new THREE.BoxGeometry(0.13, 0.52, 0.03), tie, [0, 0.62, 0.52])
  add(root, new THREE.CylinderGeometry(0.19, 0.22, 0.42, 24), skin, [0, 1.02, 0])
  const collar = add(root, new THREE.TorusGeometry(0.25, 0.05, 12, 32), white, [0, 0.97, 0.02]); collar.rotation.x = Math.PI / 2

  // ---- head ----
  const head = new THREE.Group(); head.position.set(0, 1.12, 0); root.add(head)
  add(head, S, skin, [0, 0.55, 0], [0.6, 0.68, 0.62])
  add(head, new THREE.SphereGeometry(1, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.38), hair, [0, 0.6, -0.04], [0.65, 0.73, 0.67])
  add(head, S, hair, [0, 0.45, -0.2], [0.58, 0.62, 0.5])
  const quiff = add(head, S, hair, [0.04, 0.95, 0.2], [0.4, 0.19, 0.32]); quiff.rotation.z = -0.12; quiff.rotation.x = -0.2
  ;[-1, 1].forEach(s => {
    add(head, new THREE.BoxGeometry(0.04, 0.16, 0.07), hair, [s * 0.545, 0.55, 0.2])
    add(head, S, skin, [s * 0.59, 0.52, 0], [0.09, 0.14, 0.07])
    add(head, S, skinD, [s * 0.585, 0.52, 0.01], [0.05, 0.09, 0.04])
  })
  add(head, S, skinD, [0, 0.43, 0.61], [0.07, 0.09, 0.07])
  add(head, S, hair, [0, 0.335, 0.565], [0.17, 0.034, 0.05])      // moustache
  const blushM = new THREE.MeshBasicMaterial({ color: 0xff8f86, transparent: true, opacity: 0.25, depthWrite: false })
  ;[-1, 1].forEach(s => add(head, S, blushM, [s * 0.37, 0.37, 0.49], [0.1, 0.06, 0.03]))

  const eyes = [], lids = [], brows = []
  ;[-1, 1].forEach(s => {
    const g = new THREE.Group(); g.position.set(s * 0.22, 0.58, 0.53); head.add(g)
    add(g, S, white, [0, 0, 0], [0.112, 0.112, 0.112])
    add(g, S, M(0x6b4528, 0.25), [0, 0, 0.07], [0.07, 0.07, 0.05])
    add(g, S, dark, [0, 0, 0.1], [0.04, 0.04, 0.03])
    add(g, S, white, [0.025, 0.03, 0.118], [0.016, 0.016, 0.016])
    eyes.push(g)
    lids.push(add(head, S, skin, [s * 0.22, 0.58, 0.53], [0.126, 0.0001, 0.126]))
    const b = add(head, new THREE.BoxGeometry(0.2, 0.042, 0.05), hair, [s * 0.22, 0.76, 0.56]); b.rotation.y = s * 0.28; brows.push(b)
    add(head, new THREE.TorusGeometry(0.16, 0.014, 12, 40), frame, [s * 0.22, 0.58, 0.68])
    const lens = add(head, new THREE.CircleGeometry(0.155, 32), new THREE.MeshBasicMaterial({ color: 0xbcd4ff, transparent: true, opacity: 0.1, depthWrite: false }), [s * 0.22, 0.58, 0.685])
    add(head, new THREE.BoxGeometry(0.018, 0.018, 0.4), frame, [s * 0.5, 0.6, 0.47])
  })
  add(head, new THREE.BoxGeometry(0.12, 0.018, 0.018), frame, [0, 0.6, 0.68])

  const mouth = new THREE.Group(); mouth.position.set(0, 0.2, 0.53); head.add(mouth)
  const hole = add(mouth, S, M(0x3a1620, 0.4), [0, -0.05, 0.02], [0.1, 0.02, 0.04])
  const tongue = add(mouth, S, M(0xd96a73, 0.5), [0, -0.1, 0.03], [0.05, 0.02, 0.02])
  const smile = add(mouth, new THREE.TorusGeometry(0.13, 0.015, 8, 28, Math.PI), M(0x8a4b3a, 0.5), [0, 0.07, 0.045]); smile.rotation.z = Math.PI

  // ---- arms with hands ----
  const arms = [-1, 1].map(s => {
    const sh = new THREE.Group(); sh.position.set(s * 0.95, 0.62, 0); root.add(sh)
    add(sh, S, suit, [0, 0, 0], [0.21, 0.21, 0.21])
    add(sh, CAP(0.17, 0.5), suit, [0, -0.36, 0])
    const el = new THREE.Group(); el.position.set(0, -0.7, 0); sh.add(el)
    add(el, CAP(0.14, 0.42), suit, [0, -0.3, 0])
    add(el, new THREE.CylinderGeometry(0.135, 0.135, 0.06, 20), white, [0, -0.5, 0])
    const hand = new THREE.Group(); hand.position.set(0, -0.66, 0); el.add(hand)
    add(hand, S, skin, [0, -0.02, 0], [0.14, 0.15, 0.075])
    const fingers = [0, 1, 2, 3].map(k => {
      const f = new THREE.Group(); f.position.set((k - 1.5) * 0.058, -0.12, 0); hand.add(f)
      add(f, CAP(0.028, 0.09), skin, [0, -0.06, 0]); return f
    })
    const th = new THREE.Group(); th.position.set(-s * 0.13, -0.04, 0.02); th.rotation.z = -s * 0.6; hand.add(th)
    add(th, CAP(0.032, 0.07), skin, [0, -0.05, 0])
    return { sh, el, fingers, s, z: s * 0.1, ez: -s * 0.35 }
  })

  // ---- interaction ----
  let mx = 0, my = 0, tmx = 0, tmy = 0
  const onMove = e => { tmx = Math.max(-1, Math.min(1, (e.clientX / innerWidth) * 2 - 1)); tmy = Math.max(-1, Math.min(1, (e.clientY / innerHeight) * 2 - 1)) }
  addEventListener('mousemove', onMove)
  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false); camera.aspect = w / h
    camera.position.z = w / h < 0.85 ? 8.2 : 7.2
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize); ro.observe(container); resize()
  let visible = true
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(container)

  let nextBlink = 1.5, blinkStart = -1, blinkDur = 0.16, doubleBlink = false
  let nextGlance = 2, gx = 0, gy = 0
  let fid = { type: null, t0: 0, dur: 1 }, nextFid = 4
  const types = ['shrug', 'tilt', 'nod', 'brow', 'away', 'lean', 'shake']
  const clock = new THREE.Clock(); let raf, mouthOpen = 0, talkMix = 0, smileV = 0.35, listenMix = 0, thinkMix = 0

  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (!visible) return
    const t = clock.getElapsedTime()
    mx = ease(mx, tmx, 0.06); my = ease(my, tmy, 0.06)
    const mood = state.mood || 'neutral'
    listenMix = ease(listenMix, state.listening ? 1 : 0, 0.1)
    thinkMix = ease(thinkMix, mood === 'think' ? 1 : 0, 0.08)
    const laugh = mood === 'laugh' && !state.listening

    if (t > nextFid && !state.listening) { fid = { type: types[Math.floor(Math.random() * types.length)], t0: t, dur: rnd(1.1, 2.0) }; nextFid = t + fid.dur + rnd(2.5, 6) }
    const p = (t - fid.t0) / fid.dur, env = p >= 0 && p < 1 && !state.listening ? Math.sin(Math.PI * p) : 0
    const is = n => fid.type === n

    smileV = ease(smileV, state.listening ? 0.5 : mood === 'happy' ? 0.85 : laugh ? 1 : mood === 'think' ? 0.1 : 0.35, 0.08)
    const squint = laugh ? 0.5 : smileV * 0.12

    // blink
    if (t > nextBlink && blinkStart < 0) { blinkStart = t; doubleBlink = Math.random() < 0.3 }
    let ls = 0.05 + squint
    if (state.listening) ls = 0
    if (blinkStart >= 0) {
      const bp = (t - blinkStart) / blinkDur
      if (bp >= 1) { if (doubleBlink) { doubleBlink = false; blinkStart = t } else { blinkStart = -1; nextBlink = t + rnd(1.8, 5) } }
      else ls = Math.max(ls, Math.sin(Math.PI * bp))
    }
    lids.forEach(l => { l.scale.y = Math.max(0.0001, 0.126 * ls); l.position.y = 0.58 + 0.126 * (1 - ls) })

    // eyes
    if (t > nextGlance) { gx = rnd(-0.3, 0.3); gy = rnd(-0.2, 0.2); nextGlance = t + rnd(1.2, 3.8) }
    const ax = is('away') ? 0.5 * env : 0
    eyes.forEach(e => {
      const lx = ease(0, mx * 0.5 + gx + ax, 1) * (1 - thinkMix) + 0.35 * thinkMix
      const ly = (my * 0.35 + gy) * (1 - thinkMix) - 0.3 * thinkMix
      e.rotation.y = ease(e.rotation.y, listenMix > 0.5 ? 0 : lx, 0.12)
      e.rotation.x = ease(e.rotation.x, listenMix > 0.5 ? 0.05 : ly, 0.12)
    })

    // head
    const ry = (mx * 0.5 + 0.07 * Math.sin(t * 0.5) + ax * 0.7) * (1 - listenMix * 0.8)
    const rx = my * 0.22 + 0.035 * Math.sin(t * 0.8) + (is('nod') ? 0.2 * Math.sin(p * Math.PI * 4) * env : 0) + (state.talking ? 0.03 * Math.sin(t * 4) : 0) + (laugh ? 0.08 * Math.sin(t * 14) : 0) - thinkMix * 0.08 + listenMix * 0.05
    const rz = 0.035 * Math.sin(t * 0.37) + (is('tilt') ? 0.22 * env : 0) + (is('shake') ? 0.12 * Math.sin(p * Math.PI * 6) * env : 0) + thinkMix * 0.12 + listenMix * 0.12
    head.rotation.y = ease(head.rotation.y, ry, 0.07)
    head.rotation.x = ease(head.rotation.x, rx, 0.08)
    head.rotation.z = ease(head.rotation.z, rz, 0.08)

    brows.forEach((b, i) => {
      const asym = i === 1 ? thinkMix * 0.08 : 0
      b.position.y = 0.76 + (is('brow') ? 0.07 * env : 0) + listenMix * 0.05 + asym + smileV * 0.012 + (state.talking ? 0.012 * Math.sin(t * 6 + i) : 0)
      b.rotation.z = (i ? 1 : -1) * (is('brow') ? 0.1 * env : 0) + (i === 1 ? -thinkMix * 0.18 : 0)
    })
    blushM.opacity = 0.2 + smileV * 0.3

    // mouth
    talkMix = ease(talkMix, state.talking ? 1 : 0, 0.15)
    const vowel = 0.5 + 0.5 * Math.sin(t * 3.1)
    let target = 0
    if (state.talking) target = 0.015 + Math.abs(Math.sin(t * 13)) * 0.085 * (0.55 + 0.45 * Math.sin(t * 4.3))
    else if (laugh) target = 0.06 + 0.035 * Math.sin(t * 18)
    mouthOpen = ease(mouthOpen, target, 0.4)
    hole.visible = tongue.visible = mouthOpen > 0.03
    hole.scale.set(0.07 + vowel * 0.06 + mouthOpen * 0.5 + (laugh ? 0.05 : 0), mouthOpen, 0.04)
    hole.position.y = -0.05 - mouthOpen * 0.55
    tongue.scale.set(hole.scale.x * 0.55, mouthOpen * 0.4, 0.02); tongue.position.y = hole.position.y - mouthOpen * 0.3
    smile.scale.y = 0.55 + smileV * 0.95 - talkMix * 0.25

    // body
    const shake = laugh ? 0.02 * Math.sin(t * 16) : 0
    root.position.y = 0.03 * Math.sin(t * 1.2) + shake
    root.rotation.y = ease(root.rotation.y, 0.05 * Math.sin(t * 0.4) + mx * 0.12 + (is('lean') ? 0.22 * env : 0), 0.05)
    root.rotation.x = ease(root.rotation.x, listenMix * 0.06, 0.06)
    torso.scale.y = 1 + 0.014 * Math.sin(t * 1.6)
    blade.rotation.z = 0.02 * Math.sin(t * 1.6)
    head.position.y = 1.12 + 0.012 * Math.sin(t * 1.6) + (is('shrug') ? 0.05 * env : 0)

    arms.forEach(a => {
      let tz, te, spread = a.s === -1 && state.wave ? 0.18 : 0.05
      const ty = 0.62 + 0.01 * Math.sin(t * 1.6) + (is('shrug') ? 0.12 * env : 0)
      if (a.s === -1 && state.wave) { tz = -2.85; te = -0.2 + 0.4 * Math.sin(t * 9) }
      else if (a.s === 1 && state.talking) { tz = 0.3 + 0.08 * Math.sin(t * 2.3); te = -0.95 + 0.3 * Math.sin(t * 3.1 + 1); spread = 0.09 }
      else if (a.s === 1 && thinkMix > 0.5) { tz = 0.1; te = -2.3; spread = 0.02 }
      else { tz = a.s * (0.1 + 0.02 * Math.sin(t * 1.6)); te = -a.s * 0.35 + (is('shrug') ? -a.s * 0.2 * env : 0) }
      a.z = ease(a.z, tz, 0.09); a.ez = ease(a.ez, te, 0.14)
      a.sh.rotation.z = a.z; a.el.rotation.z = a.ez; a.sh.position.y = ty
      a.fingers.forEach((f, k) => { f.rotation.z = ease(f.rotation.z, (k - 1.5) * spread * 2, 0.15); f.rotation.x = ease(f.rotation.x, spread > 0.1 ? 0.05 : 0.35, 0.1) })
    })
    renderer.render(scene, camera)
  }
  loop()

  return () => {
    cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); ro.disconnect(); io.disconnect()
    pmrem.dispose(); renderer.dispose(); renderer.domElement.remove()
  }
}
