# Abdul Qasim — Portfolio

A professional portfolio website with a built-in demo e-commerce store and a 3D animated character that introduces the site.

## Features
- Responsive, modern UI (React 19 + Vite)
- 3D animated character (three.js) you can chat with: type or speak, he answers with voice and typewriter text, blinks, fidgets, and changes mood
- Voice chat uses the browser Web Speech API (speech output + microphone input); replies come from a built-in rule-based assistant (`src/brain.js`), no server or data collection
- Working demo store: search, category filter, sort, wishlist, cart and demo checkout (no real payments)
- Services, professional profile, projects, testimonials and contact sections
- Smooth scroll animations (respects `prefers-reduced-motion`)

## Run locally
```bash
npm install
npm run dev      # development server
npm run build    # production build in /dist
```

## Customise
All text, products and profile details live in [`src/data.js`](src/data.js).

## Privacy
This site has no tracking, cookies, analytics or backend. The contact form only opens the visitor's email app (`mailto:`). Fonts are loaded from Google Fonts.

## Credits & licences
React, Vite and three.js are MIT licensed. Inter and Sora fonts are licensed under the SIL Open Font License. All product names, testimonials and project case studies shown are sample/demo content.

## License
[MIT](LICENSE) © Abdul Qasim
