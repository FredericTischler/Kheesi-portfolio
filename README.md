# Portfolio – Frédéric Tischler

Portfolio React/TypeScript ultra-moderne construit avec Vite, Tailwind CSS, Framer Motion et shadcn/ui. Il sert de vitrine générale : bio, expérience, projets GitHub dynamiques et galerie RedBubble.

## 🚀 Stack

- **Build** : Vite + React 19 + TypeScript strict
- **UI** : Tailwind CSS, shadcn/ui, design tokens personnalisés (dark/light)
- **Animations** : Framer Motion (stagger, parallax léger, respect `prefers-reduced-motion`)
- **Intégrations** : lucide-react, API GitHub, Command Palette ⌘K

## 📁 Structure principale

```
src/
  App.tsx              // Router + layout global
  main.tsx             // Entrée React
  styles/index.css     // Styles Tailwind & variables
  components/          // Navbar, CommandPalette, cards, filtres, modals...
  pages/               // Home, About, Experience, Projects, Redbubble, Contact
  data/                // profile.ts, redbubble.ts
  lib/                 // github.ts, format.ts, queryParams.ts, clipboard.ts, metadata.ts
public/
  assets/projects/     // Thumbnails optionnels pour les projets
  assets/designs/      // Visuels RedBubble (remplacez par vos images)
  robots.txt, sitemap.xml
```

## 🔄 Projets GitHub auto-chargés

- `src/lib/github.ts` interroge `https://api.github.com/users/FredericTischler/repos?per_page=100&sort=updated`.
- Les résultats sont normalisés en objets `Project` (name, description, tech, stars, updatedAt...).
- Si la description GitHub est vide, un extrait du README (branche par défaut) est utilisé.
- Les projets mis en avant ou enrichis sont définis dans `FEATURED`: overrides de description, tech et flag `featured`.
- Le cache est stocké dans `localStorage` (`ft-projects-v1`) pendant 24h.
- Le hook `useGitHubProjects()` renvoie `{ projects, featured, status, error }` pour les pages et la Command Palette.

## 🎨 Galerie RedBubble

- Données exemples dans `src/data/redbubble.ts` (type `RBItem`).
- Remplacez `src`/`src2x` par vos visuels déposés dans `public/assets/designs/`.
- Les liens `rbLink` pointent actuellement vers des placeholders.
- Filtres : tags, recherche plein texte, tri `recent/featured/A→Z`.
- Aperçu rapide via modal (code-splitting) + copy link.

## 🧾 Données profil

- `src/data/profile.ts` : informations personnelles, compétences, intérêts, société actuelle.
- `src/data/navigation.ts` : libellé + path utilisés par la navbar et la Command Palette.

## 🛠️ Mise à jour des contenus

1. **Profil** : modifiez `PROFILE` (nom, rôle, socials, company...).
2. **Projets favoris** : ajustez `FEATURED` (descriptions, tech, flag `featured`).
3. **Images RedBubble / projets** : placez vos fichiers dans `public/assets/designs/` et `public/assets/projects/` (nom du projet slugifié : `slug.jpg`).
4. **SEO** : titres/meta dynamiques via `usePageMetadata`. L’`index.html` contient les balises OG/Twitter par défaut.

## 🧪 Scripts

```bash
npm install      # installer les dépendances
npm run dev      # serveur de développement (http://localhost:5173)
npm run lint     # ESLint (TS strict)
npm run build    # build de production
```

## 📦 Déploiement

Le projet est un site statique. Déployez le dossier `dist/` généré par `npm run build` sur la plateforme de votre choix (Vercel, Netlify, GitHub Pages...).

### Netlify / Vercel (exemple)

- **Commande build** : `npm run build`
- **Dossier à publier** : `dist`

## 🙌 Accessibilité & UX

- Mode sombre/clair persistant (`localStorage`).
- Focus visibles, contraste AA, navigation clavier.
- Animations limitées si `prefers-reduced-motion` est actif.
- Images lazy-loaded avec dégradés et ratio fixes.
- Command Palette globale (⌘K / Ctrl+K) pour accéder rapidement aux pages/projets.

Bon hacking !
