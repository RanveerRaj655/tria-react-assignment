# Tria — Contacts

A small React + Vite contacts UI built with Tailwind CSS. Features a modern gradient UI, animated toasts, responsive layout and localStorage persistence.

## Website Preview
![App overview / contacts list](/public/sc.png)


## Notable features
- Add / Edit / Delete contacts
- View contact details in a read-only modal
- Favorite contacts and a "Favorite" tab
- Tabs: All, Frequent, Recent, Favorite
- Search (type + press Enter or click Enter button) and Clear search
- Empty-state and "No contact found" states
- Toast notifications for Add / Edit / Delete (animated)
- LocalStorage persistence — data remains after page refresh
- Fully responsive UI with animated gradient text and colorful glowing card backdrops

## Folder structure
```
tria-react-assignment/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ ContactCard.jsx
│  │  ├─ ContactModal.jsx
│  │  ├─ ContactViewModal.jsx
│  │  ├─ Tabs.jsx
│  │  └─ Toasts.jsx
│  ├─ pages/
│  │  └─ Home.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ data.js
│  └─ index.css
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
```

---

## Setup & run (Windows)
1. Install Node.js (v16+ recommended).
2. Clone repo and install:
   - Open terminal in desired folder:
     - git clone <your-github-repo-url>
     - cd tria-react-assignment
     - npm install
3. Run locally:
   - npm run dev
   - Open http://localhost:5173 (Vite will print the URL)

Build for production:
- npm run build
- npm run preview

---


## Deployed app
Deployed here: https://triatask.vercel.app/

## Assumptions & design choices
- LocalStorage is used for persistence to keep the app simple (no backend).
- Search is explicit (user presses Enter / clicks Enter) to avoid frequent re-filtering on every keystroke.
- Contact IDs are generated using Date.now() for simplicity — replace with UUID in production if needed.
- Minimal validation is applied in the modal; you can extend validation rules as needed.
- Animations and gradients use Tailwind utility classes + a few custom CSS rules in index.css for consistency and rapid iteration.

## Libraries & tooling
- React — UI
- Vite — fast dev server and build
- Tailwind CSS — utility-first styling and responsive utilities
- No heavy component libraries to keep bundle small and styling fully customizable

## Files of interest
- src/pages/Home.jsx — main page + state management (localStorage, search, tabs, toasts)
- src/components/ContactModal.jsx — add/edit modal
- src/components/ContactViewModal.jsx — view-only modal
- src/components/ContactCard.jsx — row-style contact card (click to view)
- src/components/Toasts.jsx — animated toast component
- src/index.css — custom gradient / glow styles + Tailwind imports
- src/data.js — initialContacts used on first load
