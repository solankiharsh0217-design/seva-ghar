# SevaGhar — सेवाघर
### Bahadurgarh's #1 Home & Office Services Platform

> "Ghar Ho Ya Office, Seva Hum Denge!"

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

App runs at `http://localhost:3000`

---

## 📁 Project Structure

```
sevaghar/
├── public/
│   ├── index.html          # HTML template (PWA-ready)
│   └── manifest.json       # PWA manifest for mobile install
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── BookingModal.js
│   │   │   ├── SectionHeader.js
│   │   │   ├── ServiceCard.js
│   │   │   ├── StarRating.js
│   │   │   └── Ticker.js
│   │   ├── layout/          # App shell components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── WhatsAppButton.js
│   │   ├── home/            # Home page
│   │   │   └── HomePage.js
│   │   ├── services/        # Services page (detail view)
│   │   │   └── ServicesPage.js
│   │   ├── business/        # B2B corporate page
│   │   │   └── BusinessPage.js
│   │   ├── areas/           # Service areas page
│   │   │   └── AreasPage.js
│   │   └── about/           # About us page
│   │       └── AboutPage.js
│   ├── data/
│   │   └── services.js      # All app data (services, areas, materials, etc.)
│   ├── hooks/
│   │   └── useScrollReveal.js  # Custom hooks (scroll, resize)
│   ├── styles/
│   │   └── global.css       # CSS variables, global styles, animations
│   ├── App.js               # Root component with React Router
│   └── index.js             # Entry point
└── package.json
```

---

## 📱 Pages

| Route        | Component      | Description                                |
|-------------|----------------|--------------------------------------------|
| `/`         | HomePage       | Hero, services overview, materials, testimonials |
| `/services` | ServicesPage   | Detailed service accordions + building materials |
| `/business` | BusinessPage   | B2B corporate services + upcoming features |
| `/areas`    | AreasPage      | Bahadurgarh coverage map + city info       |
| `/about`    | AboutPage      | Mission, values, why Bahadurgarh           |

---

## 🔧 Services Offered

1. **Housekeeping & Safai** — Daily cleaning, deep clean, post-construction
2. **Electrician & Plumber** — Wiring, switches, taps, pipes, emergency
3. **AC & Appliance Repair** — AC service, washing machine, fridge, RO
4. **Pest Control & Painting** — Cockroach/termite, interior/exterior paint
5. **House Contractor** — Full construction, renovation, flooring, modular kitchen
6. **Building Material Supply** — 9 categories: cement, bricks, steel, sand, tiles, plumbing, electrical, paint, wood

---

## 📲 Converting to Mobile App (React Native)

This project is architected for easy conversion to React Native / Expo:

### Option A: React Native (Expo) — Recommended
```bash
npx create-expo-app sevaghar-mobile
```

**What changes:**
| Web (React)                    | Mobile (React Native)              |
|-------------------------------|-------------------------------------|
| `react-router-dom`           | `@react-navigation/native`         |
| `BrowserRouter`              | `NavigationContainer`               |
| `Routes/Route`               | `Stack.Navigator/Screen`            |
| `<div>`                      | `<View>`                            |
| `<p>`, `<span>`, `<h1>`     | `<Text>`                            |
| CSS file / `style={{}}`      | `StyleSheet.create()`               |
| `global.css` variables       | `theme.js` constants                |
| `useScrollReveal` (IO)       | `react-native-reanimated`           |
| BookingModal (DOM)           | `react-native` `<Modal>`           |
| `window.scrollTo`           | `scrollRef.current.scrollTo()`      |

**What stays the same:**
- `src/data/services.js` — all data
- Component architecture (pages, common, layout)
- State management patterns
- Custom hooks logic
- Business logic

### Option B: Capacitor (Wrap Web App)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init SevaGhar com.sevaghar.app
npm run build
npx cap add android
npx cap add ios
npx cap sync
npx cap open android  # Opens Android Studio
```

### Option C: PWA (Progressive Web App)
Already configured! The `manifest.json` and meta tags are set up.
Add a service worker for offline support:
```bash
# In src/index.js, register the service worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();
```

---

## 🎨 Design System

### Colors (CSS Variables)
- `--saffron: #E8722A` — Primary brand
- `--turmeric: #F5A623` — Secondary accent
- `--deep-brown: #3D1F00` — Dark backgrounds
- `--warm-cream: #FFFBF5` — Light background
- `--green: #2D8B4E` — Success/verified

### Typography
- **Display:** Poppins (800/900 weight)
- **Body:** Poppins (400/500)
- **Hindi accent:** Tiro Devanagari Hindi

### Components
- `.btn--primary` — Gradient CTA button
- `.btn--outline` — Outlined button
- `.card` — Standard card with shadow
- `.chip` — Clickable area tag
- `.tag` — Small label badge

---

## 🛠️ Future Additions

- [ ] Backend API (Node.js/Express or Django)
- [ ] User authentication (OTP-based)
- [ ] Karigar (professional) dashboard
- [ ] Real-time booking tracking
- [ ] Payment gateway (Razorpay/PhonePe)
- [ ] Push notifications
- [ ] Admin panel
- [ ] Multi-language support (Hindi/English toggle)

---

## 📄 License

© 2026 SevaGhar. All rights reserved.

Built with ❤️ in Bahadurgarh, Haryana
