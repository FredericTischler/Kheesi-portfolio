# Exercice 03 — Pipeline build/test

## Objectif
Concevoir un pipeline minimal fiable : lint → test → build, avec cache et artifacts.

## Étapes
1. Décomposer jobs : `lint`, `test`, `build`, optionnel `storybook`.
2. Ajouter cache dépendances (npm/pnpm/yarn) + build (Angular/React).
3. Configurer matrix (node versions / OS si pertinent).
4. Prévoir artifacts : coverage, storybook static, rapports lint.
5. Mesurer temps cible (< 5 min) et plan d’amélioration.

## Livrable
- YAML pipeline (GitHub Actions/GitLab adaptable).
- Liste scripts npm (ci = lint+test+build).
- Plan monitoring (durée, taux échec, flake rate).

## Critères de réussite
- Jobs parallélisables (lint/test). Build unique.
- Cache efficace (hit rate > 70%).
- Artifacts publiés pour revue (coverage report, storybook zip).
