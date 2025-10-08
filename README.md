# Kheesi Portfolio

Portfolio personnel construit avec React 19, TypeScript et Tailwind CSS. L’interface couvre les sections essentielles d’une vitrine (accueil, projets, expériences, ateliers/workshops) avec une attention particulière à l’accessibilité, aux animations maîtrisées et à la personnalisation des contenus.

## Fonctionnalités clés

- Contenu bilingue français/anglais avec bascule instantanée et gestion automatique du référencement (`hreflang`, `lang`).
- Navigation rapide : barre globale, Command Palette (`⌘K` / `Ctrl+K`), liens profonds par locale.
- Thèmes clair, sombre et contraste élevé persistés côté client, tokens pastel personnalisables (`src/styles/index.css`).
- Pages projets et workshops avec modales riches (aperçu, ressources téléchargeables, liens GitHub, copier/coller).
- Formulaire de contact progressif : envoi API facultatif ou fallback `mailto:` avec message pré-rempli.
- Animations Framer Motion respectant `prefers-reduced-motion`, lazy-loading d’images, focus visibles et navigation clavier.

## Stack technique

| Domaine           | Outils principaux |
| ----------------- | ----------------- |
| Build & DX        | Vite 5, React 19, TypeScript strict |
| UI & design       | Tailwind CSS, shadcn/ui, Radix Primitives, Tailwind Merge |
| Animations & UX   | Framer Motion, lucide-react, Command Palette maison |
| Qualité           | ESLint v9, Prettier, TypeScript `tsc -b` |

## Structure du projet

```text
src/
  App.tsx              // Routes, layout global, gestion des locales
  main.tsx             // Point d’entrée React
  components/          // Sections, cartes projets, modales, nav, palette de commandes…
  pages/               // Home, About, Experience, Projects, Workshops, Contact
  data/                // profile.ts, projects.ts, navigation.ts, workshops.ts
  hooks/               // useModalSelection, useClipboard…
  i18n/                // LocaleProvider, configuration des locales
  lib/                 // SEO dynamique, formatage, clipboard, utils
  styles/              // Variables CSS & directives Tailwind
public/
  assets/projects/     // Visuels projets (PNG/SVG/WEBP)
  assets/workshops/    // Couvertures + ressources PDF/ZIP liées aux ateliers
  assets/social/       // Images Open Graph / partage
```

## Prise en main

1. **Prérequis** : Node.js ≥ 20 et npm ≥ 10.
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
   L’UI est accessible sur `http://localhost:5173`.

## Scripts npm

| Commande        | Description |
| --------------- | ----------- |
| `npm run dev`   | Serveur Vite avec rechargement instantané |
| `npm run build` | Build de production (`tsc -b` + `vite build`) |
| `npm run preview` | Prévisualisation du dossier `dist/` |
| `npm run lint`  | Analyse ESLint (plugins React & TypeScript) |
| `npm run format` | Formatage Prettier des fichiers TS/TSX/JS/JSON/CSS/MD |

## Variables d’environnement

Créer un fichier `.env` à la racine si nécessaire.

| Variable | Rôle |
| -------- | ---- |
| `VITE_SITE_URL` | URL canonique utilisée pour générer les balises OG/Twitter (fallback sur `https://frederictischler.dev`). |
| `VITE_CONTACT_FORM_ENDPOINT` | Endpoint POST JSON pour le formulaire de contact. Si absent, l’UI bascule automatiquement sur le mode `mailto:`. |

## Personnaliser le contenu

- **Profil & navigation** : `src/data/profile.ts` et `src/data/navigation.ts` (identité, rôles, liens sociaux, sections visibles).
- **Projets** : `src/data/projects.ts` (slug, description, stack, URLs, badges). Placez vos visuels dans `public/assets/projects/<slug>.<ext>`.
- **Workshops** : `src/data/workshops.ts` (objectifs, programme, livrables, ressources). Les assets sont stockés dans `public/assets/workshops/` et `workshops/` pour les documents sources.
- **SEO & méta** : `src/lib/metadata.ts` gère titres, descriptions et alternates ; les valeurs par défaut sont à adapter.
- **Identité visuelle** : ajustez les tokens couleurs, rayons et fonds dans `src/styles/index.css` (variants clair/sombre/contraste).

## Workflow i18n

- **Structure** : chaque langue dispose d’un fichier JSON unique (`src/i18n/fr.json`, `src/i18n/en.json`) qui regroupe des *namespaces* (`home`, `projects`, `navbar`, etc.). Les typages attendus se trouvent dans `src/i18n/types.ts`; la moindre évolution de schéma doit y être reflétée.
- **Chargement** : les pages et composants consomment leurs textes via le hook `useTranslations(namespace)` (exemples : `src/pages/Projects.tsx`, `src/components/Navbar.tsx`). Les identifiants de navigation (`src/data/navigation.ts`) pointent vers des clés de traduction plutôt que des libellés codés en dur.
- **Validation** : `src/i18n/validation.ts` vérifie à l’exécution que chaque JSON respecte le contrat défini dans `types.ts`. Toute clé manquante ou valeur mal typée provoque un échec du build (`npm run build`).
- **Placeholders** : les chaînes paramétrées utilisent la syntaxe `{{placeholder}}` (ex. `projects.resultsLabel.other`). Remplacez-les côté code avec `string.replace("{{placeholder}}", valeur)` pour conserver la logique dans les traductions.
- **Ajout d’un namespace** :
  1. Définir sa forme dans `src/i18n/types.ts`.
  2. Étendre la fonction `validateMessages` (et, si besoin, ajouter un validateur dédié).
  3. Ajouter les clés correspondantes dans chaque fichier JSON.
  4. Consommer le nouveau namespace via `useTranslations`.
- **Nouveaux textes/pages** : privilégiez la mise à jour des JSON plutôt que des composants. Un `npm run build` permet de vérifier qu’aucune clé n’a été oubliée.

## Déploiement

Le build produit un site 100 % statique. Après `npm run build`, servez le contenu du dossier `dist/` (Vercel, Netlify, GitHub Pages, Cloudflare Pages…).

- Commande de build : `npm run build`
- Répertoire à publier : `dist/`

## Pistes d’évolution

1. Ajouter de nouvelles locales via `src/i18n/config.ts` et compléter les textes dans les pages/composants.
2. Brancher le formulaire de contact sur un provider (Formspree, Netlify Forms, serverless maison) via `VITE_CONTACT_FORM_ENDPOINT`.
3. Automatiser la mise à jour des projets depuis l’API GitHub en alimentant `src/data/projects.ts` lors du build.

Bon hacking et belles prestations !
