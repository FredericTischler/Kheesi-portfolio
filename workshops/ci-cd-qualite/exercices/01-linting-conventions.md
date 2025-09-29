# Exercice 01 — Lint & conventions

## Objectif
Définir scripts lint/format et hooks pre-commit adaptés.

## Étapes
1. Énumérer outils : ESLint, Stylelint, Prettier, commitlint.
2. Proposer scripts npm :
   - `lint`, `lint:fix`
   - `format`, `format:check`
   - `commitlint`
3. Définir règles blocking vs warning (ex : `no-console`, `complexity`).
4. Configurer `husky` ou `lefthook` :
   - Pre-commit (lint-staged sur fichiers modifiés).
   - Pre-push (`npm run test`).

## Livrable
- Table `Règle | Blocking ? | Tool | Responsable`.
- `package.json` scripts proposés.
- Hooks listés + temps d’exécution cible (< 15s pre-commit).

## Critères de réussite
- Hooks rapides (exécution < 15s).
- Règles blocking justifiées (qualité, sécurité, readability).
- Process adoption (doc dans README/CONTRIBUTING).
