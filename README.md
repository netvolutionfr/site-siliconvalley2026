# Silicon Valley Study Trip — Next.js Starter

Landing moderne (App Router) inspirée Apple/Material 3.

## 1) Création du projet
```bash
# Node 18+ recommandé
npx create-next-app@latest sf-trip --ts --eslint --app --src-dir false --import-alias "@/*"
cd sf-trip
```

## 2) Dépendances
```bash
# Option A — Tailwind v4 (recommandé)
npm i framer-motion
npm i -D tailwindcss @tailwindcss/postcss postcss autoprefixer

# Option B — Tailwind v3 (alternative)
# npm i framer-motion
# npm i -D tailwindcss@3 postcss autoprefixer
```bash
npm i framer-motion
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 3) Fichiers à ajouter/remplacer
- `app/page.tsx` (fourni dans ce dépôt)
- `app/layout.tsx` (fourni)
- `app/globals.css` (fourni)
- `tailwind.config.ts` (fourni — **darkMode: 'media'**)
- `postcss.config.js` (fourni)

> Dans `tailwind.config.ts`, vérifiez bien le tableau `content` selon votre structure.

## 4) Config Tailwind minimale
Dans `app/globals.css` (déjà fourni) :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Le thème clair/sombre suit automatiquement le **choix système** (`prefers-color-scheme`).

## 5) Police & SEO
- `layout.tsx` charge **Inter** via `next/font` et définit les **metadata** (OpenGraph/Twitter). Remplacez `metadataBase` et `/og.jpg` par vos valeurs.

## 6) Lancer en dev
```bash
npm run dev
```
Ouvrez http://localhost:3000

## 7) Build & déploiement
```bash
npm run build
npm start
```
- **Vercel** recommandé (import Git, previews automatiques).

## 8) Accessibilité & performance
- Animations respectent `prefers-reduced-motion`.
- Images optimisées (utilisez idéalement `<Image>` de Next pour vos visuels finaux).

## 9) Formulaire
La section "Je veux participer" utilise un endpoint Formspree placeholder. Remplacez l’URL par la vôtre.

## 10) Aller plus loin (optionnel)
- Ajouter **shadcn/ui** pour des composants typés (Button, Card, Accordion).
- Ajouter un **toggle thème** si vous voulez forcer clair/sombre (sinon le système suffit).
- Mettre en place **@vercel/analytics**.

