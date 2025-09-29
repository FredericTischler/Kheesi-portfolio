# Checklist Qualité — Conventions / Tests / Docs / Sécurité / A11y

## Conventions de code
- [ ] ESLint/Stylelint/Prettier configurés, scripts `lint`, `lint:fix`.
- [ ] Hooks pre-commit (lint-staged), temps < 15s.
- [ ] Commit message convention (Conventional Commits / commitlint).

## Tests
- [ ] Stratégie tests documentée (unit/int/e2e).
- [ ] Coverage utile (objectifs par module) suivi.
- [ ] Flaky tests identifiés + plan.
- [ ] Tests CI rapides (< 3 min) & staging E2E (nightly).

## Documentation
- [ ] README/ADR mis à jour (docs-template).
- [ ] Runbooks pour pipeline / rollback.
- [ ] Storybook / design docs partagés.

## Sécurité
- [ ] Scan dépendances (Dependabot/Snyk) intégré.
- [ ] Secrets gérés (vault, GH secrets), jamais commit.
- [ ] Politique revue (2 reviewers dont 1 tech lead sur modules critiques).

## Accessibilité & perf (si UI)
- [ ] Checklist a11y (focus, aria, contrastes).
- [ ] Tests perf (Lighthouse) pour nouvelles pages.
- [ ] Logs/perf metrics instrumentés.
