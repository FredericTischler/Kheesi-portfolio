# CI/CD & Qualité (1h30) — Pack de support

Ce pack regroupe tous les supports nécessaires pour animer le workshop **CI/CD & Qualité**. Il s’adresse à une équipe full-stack / tech lead / QA souhaitant mettre en place des pipelines efficaces, des conventions de code partagées et des quality gates pragmatiques.

## Contenu du pack
- `slides/ci-cd-slides.md` — deck concis utilisable avec remark/reveal.
- `guides/animateur.md` — plan d’animation détaillé (1h30), anti-patterns et quick wins.
- `guides/participant.md` — support autonome (glossaire CI/CD, ressources clés).
- `exercices/` — 4 fiches pratiques (linting, stratégie tests, pipeline build/test, quality gates) + corrigés dans `solutions/`.
- `templates/` — modèles réutilisables : GitHub Actions/GitLab CI, guide de revue, documentation courte.
- `checklists/` — listes actionnables pour la fiabilité CI et la qualité produit.
- `exports/` — dossier généré pour les PDF (vide tant que `docs:pdf` n’est pas exécuté).

## Objectifs pédagogiques
1. Définir des conventions lint/format et réduire la dette “cosmétique”.
2. Concevoir une stratégie de tests utile (unité/intégration/e2e, coverage pertinent).
3. Construire un pipeline build/test rapide, fiable et lisible.
4. Mettre en place des quality gates réalistes (PR checks, revue, documentation).

## Prérequis
- Node.js 20+ (ou environnement équivalent) et accès au dépôt cible.
- Outil CI (GitHub Actions, GitLab CI/CD ou équivalent) déjà accessible.
- Equipe prête à partager ses scripts existants pour audit.

## Génération des PDF
Ce dossier dispose d’un `package.json` local.

```bash
cd workshops/ci-cd-qualite
npm install
npm run docs:pdf
npm run docs:open   # optionnel, ouvre le dossier exports
```

Les scripts nécessitent les dépendances Chromium (voir message d’erreur éventuel).

## Déroulé recommandé
1. Lire `guides/animateur.md` pour préparer l’atelier (adapter exemples, identifier quick wins).
2. Envoyer `guides/participant.md` et `templates/` aux participants 48h avant.
3. Pendant l’atelier, alterner apports (slides) et exercices (lint, tests, pipeline, gates).
4. À la fin, partager les checklists et le plan d’action issu des exercices.

Bon workshop !
