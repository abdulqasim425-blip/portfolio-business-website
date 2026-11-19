import { profile, services, products, projects, skills, experience } from './data'

const urdu = /\b(kya|kaise|kese|kitna|kitne|aap|ap|hai|hain|ho|mujhe|chahiye|shukriya|shukria|salam|assalam|bhai|karo|krdo|banao|bana|nahi|haan|acha|theek|apna|naam|kam|kaam|kaun)\b/i
const jokes = [
  'Why do programmers prefer dark mode? Because light attracts bugs!',
  'A SQL query walks into a bar, sees two tables and asks: can I join you?',
  "There are only 10 kinds of people: those who understand binary and those who don't.",
  'I told my computer I needed a break. Now it keeps sending me Kit Kat ads.',
]
let ji = 0

export const quick = [
  ['💼 Services', 'What services do you offer?'],
  ['💰 Pricing', 'How much does a website cost?'],
  ['🛍️ Show store', 'Show me the store'],
  ['🧠 Skills', 'What are your skills?'],
  ['📞 Contact', 'How can I contact you?'],
  ['😄 Joke', 'Tell me a joke'],
]

export function reply(raw) {
  const s = raw.toLowerCase().trim()
  const ur = urdu.test(s)
  const R = (lines, mood = 'neutral', go) => ({ lines, mood, go })
  const t = re => re.test(s)

  if (t(/\b(hi|hello|hey|salam|assalam|aoa|good (morning|evening|afternoon))\b/))
    return ur || t(/salam|assalam|aoa/) ? R([`Assalam o Alaikum! Main ${profile.name} hoon. Aap mujh se services, price, projects ya skills ke bare mein pooch sakte hain.`], 'happy')
      : R([`Hello! 👋 Great to meet you. I'm ${profile.name}.`, 'Ask me about my services, pricing, projects or skills, or just say what you need built.'], 'happy')
  if (t(/thank|thanks|shukri|shukria/)) return R([ur ? 'Koi baat nahi! Aur kuch poochna ho to bataiye. 😊' : "You're welcome! Anything else you'd like to know? 😊"], 'happy')
  if (t(/\b(bye|goodbye|allah hafiz|khuda hafiz|see you)\b/)) return R([ur ? 'Allah Hafiz! Phir milte hain. 👋' : 'Goodbye! Come back any time. 👋'], 'happy')
  if (t(/joke|funny|laugh|hasao/)) { const j = jokes[ji++ % jokes.length]; return R([j, 'Ha ha! 😄'], 'laugh') }
  if (t(/(who|what).*(you|your name)|your name|about you|introduce|apna naam|aap kaun|tum kaun/))
    return ur ? R([`Mera naam ${profile.name} hai. Main ek full-stack web developer hoon jo React aur e-commerce mein kaam karta hoon.`], 'happy', 'about')
      : R([`I'm ${profile.name}, a ${profile.role}.`, profile.summary[0]], 'happy', 'about')
  if (t(/price|cost|budget|rate|charge|fee|quote|how much|kitna|kitne|paisa|rupee/))
    return ur ? R(['Price project ke scope par depend karti hai. Chhoti website jaldi aur sasti ban jati hai, full online store mein zyada kaam hota hai.', 'Contact form bhar dein, main free quote bhej dunga.'], 'neutral', 'contact')
      : R(['Pricing depends on the scope. A simple landing page is quick and affordable, while a full online store with payments takes more work.', "Tell me about your project in the contact form and I'll send you a free quote."], 'neutral', 'contact')
  if (t(/store|shop|product|cart|buy|checkout|e-?commerce|dukaan/))
    return R(['Sure! Scrolling to the demo store. 🛍️', `It has ${products.length} sample products with search, filters, a cart and a demo checkout. Try adding something!`], 'happy', 'store')
  if (t(/service|offer|what do you do|kya karte|kaam kya|provide|build for/))
    return ur ? R([`Main ye services deta hoon: ${services.slice(0, 4).map(x => x.title).join(', ')} aur API development.`], 'happy', 'services')
      : R([`I offer ${services.slice(0, 4).map(x => x.title).join(', ')}, plus APIs and ongoing support.`, 'Scroll down to the services section for details.'], 'happy', 'services')
  if (t(/project|portfolio|work sample|case stud|previous work/))
    return R([`Here are some of my projects: ${projects.map(p => p.title).join(', ')}.`], 'happy', 'projects')
  if (t(/skill|tech|stack|react|node|javascript|language|framework|tools/))
    return R([`My strongest skills are ${skills.slice(0, 4).map(x => x.name).join(', ')}.`, 'I mostly build with React on the front end and Node.js on the back end.'], 'neutral', 'about')
  if (t(/experience|education|degree|university|study|qualification|cv|resume/))
    return R([`${experience[0].title}: ${experience[0].text}`, 'You can see my full experience and education in the profile section.'], 'neutral', 'about')
  if (t(/contact|email|mail|phone|number|reach|hire|whatsapp|call|rabta/))
    return ur ? R([`Aap mujhe ${profile.email} par email kar sakte hain, ya neeche contact form use karein.`], 'happy', 'contact')
      : R([`You can email me at ${profile.email}, or use the contact form below.`, "I usually reply within 24 hours!"], 'happy', 'contact')
  if (t(/where|location|city|country|based|live/)) return R([`I'm based in ${profile.location} and I work with clients worldwide.`], 'neutral')
  if (t(/how long|timeline|deadline|time|delivery|kitna time|kab tak/))
    return R(['A landing page can be ready in a few days; a full online store usually takes a few weeks, depending on features.'], 'neutral', 'contact')
  if (t(/available|free|freelance|open for|busy/)) return R(["Yes, I'm available for new projects right now! Tell me about yours. 🚀"], 'happy', 'contact')
  if (t(/help|what can you|kya kar sakte|options/)) return R(['I can tell you about my services, pricing, projects, skills and how to contact me. I can even show you the demo store or tell a joke!'], 'happy')
  return ur ? R(['Maaf kijiye, main ye poori tarah samajh nahi saka. Aap services, price, projects ya contact ke bare mein pooch sakte hain.'], 'think')
    : R(["Hmm, I'm not sure about that one. 🤔", 'Try asking about my services, pricing, projects, skills or how to contact me.'], 'think')
}
