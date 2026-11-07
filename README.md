# 💪 FitLog — Workout Library

**FitLog** is a dark, no-nonsense gym companion web app: pick a lift, lock it into today's plan, watch the week's work add up — and save extras for later. It ships a full workout library backed by a live API, a details view for every lift, and a personal "log" page that tracks your daily exercises, minutes, and calories.

---

## 🚀 Getting Started

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev

# 3. open the app
# → http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16** (App Router) | UI building + file-based page routing |
| **React 19** | Component state, context, interactivity |
| **Tailwind CSS v4** | Styling, design tokens, responsiveness |
| **next/font** | Oswald (display) + Inter (body) Google Fonts |
| **next/image** | Optimized local + remote workout images |
| **localStorage** | Persisting plan/saved lists across reloads |
| **FitLog API** | Live workout data (`api.abcz.workers.dev`, fallback `api.api-store.workers.dev`) |

---

## ✨ Key Features (5+)

1. **Workout Library Grid** — all 12 lifts from the API in a responsive 3×4 card grid with image, muscle-group tag pills, equipment, and duration / calories / rating stats; cards link to detail pages.
2. **Workout Details Page** — two-column layout with a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating), ordered instructions, and "Add to today's plan" / "Save for later" actions.
3. **My Plan Log Page** — live metrics row (Exercises / Minutes / Calories), `Today's Plan` and `Saved` tabs, sort dropdown (Duration / Calories / Rating), Mark as Done, remove (X), and an empty state with a CTA.
4. **Live Navbar Badges** — the filled `Plan` and outlined `Saved` counters update instantly and both link to `/my-plan`; the active page link is highlighted.
5. **Toasts, Loading & 404** — toast notifications on every action, skeleton loading while fetching, a "Loading workouts…" state on My Plan, and a custom 404 page for unknown/invalid routes.
6. **Reload-Safe State** — plan and saved lists persist in `localStorage`, survive page refreshes, and "Add to today's plan" respects the five-lift daily cap.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js            # App shell: fonts, navbar, footer, providers
│   ├── page.js              # Home: hero banner + workout library
│   ├── my-plan/page.js      # My Plan log page (tabs, metrics, sort)
│   ├── workout/[id]/page.js # Workout details (server component)
│   ├── not-found.js         # Custom 404 page
│   └── globals.css          # Theme tokens + shared component classes
├── components/              # Navbar, Footer, cards, detail, toast, icons
├── context/PlanContext.js   # Plan/Saved state + localStorage persistence
└── lib/api.js               # API fetch helpers (primary + fallback)
```

---

## 🔌 API

```
All data:     https://api.abcz.workers.dev/api/fitlog
Single item:  https://api.abcz.workers.dev/api/fitlog/:id
Fallback:     https://api.api-store.workers.dev/api/fitlog
```

---

## 📬 Submission

- **Live Link:** [https://fit-log-pi-ashy.vercel.app](https://fit-log-pi-ashy.vercel.app)
- **GitHub Repository Link:** [https://github.com/rahatlab/fit-log](https://github.com/rahatlab/fit-log)
