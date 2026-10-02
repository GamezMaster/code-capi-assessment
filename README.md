# 🛸 Rick & Morty Explorer

## 🚀 Aan de slag

### 1. Repository klonen & dependencies installeren

```bash
git clone [https://github.com/GamezMaster/code-capi-assessment](https://github.com/GamezMaster/code-capi-assessment)
cd rick-morty-explorer
npm install
```
---

### Project draaien op localhost:
```bash
npm run dev
```
[http://localhost:3000](http://localhost:3000)
---

### Tests draaien
```bash
npm run test
```
---

## ✨ Features

* **🔍 Zoeken & Filteren**: Zoek karakters op naam en filter op status (*Alive*, *Dead*, *Unknown*). Zoekparameters worden netjes in de URL-state bijgehouden.
* **📄 Dynamische Detailpagina's**: Uitgebreide karakterkaarten op `/character/[id]` met achtergrondinformatie, oorsprong en huidige locatie.
* **❤️ Favorieten Systeem**: Sla je favoriete karakters op in `localStorage` via een React Context Provider met hydration-bescherming. Bekijk ze gebundeld op `/favorites`.
* **↩️ Natuurlijke Navigatie**: Slimme `BackButton` die gebruikmaakt van `router.back()` voor het behoud van scrollpositie en zoekfilters.
* **⚡ GraphQL Error Handling**: Ingebouwde afhandeling voor HTTP 429 (*Rate Limit Exceeded*) en netwerkfouten met duidelijke UI-meldingen.
* **🌙 Dark Mode**: Media-query en Tailwind v4 gebaseerde donkere modus.
* **🧪 Test-Driven Architecture**: Co-located unit- en componenttests met Vitest en React Testing Library.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **API & Data**: [Rick and Morty GraphQL API](https://rickandmortyapi.com/documentation/#graphql)
* **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

