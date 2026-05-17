# 🌊 NightWave: The Sanctuary of Stories

*&quot;Where rare blue waves meet your heart&apos;s desire.&quot;*

Welcome to **NightWave**, a bioluminescent digital library designed to hold more than just data—it holds your journeys, your wishes, and your finished chapters. This isn't just a book manager; it's a sanctuary for the stories that shape you.

---

## 🌙 The Aesthetic (Atmosphere)

NightWave is crafted with a deep, nocturnal palette and bioluminescent accents. Every interaction is designed to feel fluid, like a calm tide under a moonlit sky.

*   **Deep Indigo & Moon White:** A high-contrast, eye-soothing theme.
*   **Bioluminescent UI:** Floating particles and glowing waves that respond to your presence.
*   **Fluid Motion:** Powered by Framer Motion, every page transition feels like a gentle drift.

---

## 🛠 The Alchemy (Tech Stack)

*   **The Vision:** [Next.js](https://nextjs.org/) (App Router) for a seamless, lightning-fast experience.
*   **The Memory:** [Prisma](https://www.prisma.io/) with SQLite, ensuring your library is permanent and personal.
*   **The Soul:** [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) for the aesthetic pulse of the application.
*   **The Icons:** [Lucide React](https://lucide.dev/) for elegant, minimalist iconography.

---

## 🚀 Awakening the Sanctuary

### 1. The Ritual (Installation)
First, gather your dependencies:
```bash
npm install
```

### 2. The Foundation (Database)
NightWave uses Prisma to manage its memory. Initialize your local sanctuary:
```bash
npx prisma generate
npx prisma db push
```

### 3. The Awakening (Development)
Bring the NightWave to life:
```bash
npm run dev
```
Open `http://localhost:3000` and watch the blue waves begin to glow.

---

## 🔍 The Internal Compass

*   **`src/app/page.tsx`**: The shore. Where you land and make your first wish.
*   **`src/components/AddBookModal.tsx`**: The gateway to adding new stories to your collection.
*   **`prisma/schema.prisma`**: The blueprint of a Book—Title, Author, Rating, and its current status in your heart (Want to Read, Reading, or Completed).

---

## 🎯 Final Chapter
NightWave is more than a project; it's a mood. We hope it helps you find the same peace in organizing your library that we found in building its waves.

**Stay curious. Stay moonlit.** 🌊✨
