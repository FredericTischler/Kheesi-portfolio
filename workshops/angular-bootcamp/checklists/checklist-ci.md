# Checklist CI — Angular Component Library Bootcamp

## Jobs & gating
- [ ] Jobs séparés `lint`, `test`, `build`, `storybook:build`.
- [ ] Workflow déclenché sur PR + push main/tag.
- [ ] Merge bloqué si un job échoue.

## Cache & performances
- [ ] Cache npm/Angular CLI activé (actions/setup-node, Nx cloud éventuel).
- [ ] Temps total pipeline < 5 min (objectif).
- [ ] Artifacts build/storybook uploadés pour inspection.

## Qualité
- [ ] `npm audit --production` exécuté et monitoré.
- [ ] Couverture minimale définie (ex : 80%) + badge généré.
- [ ] Tests a11y automatisés (Storybook + axe-core) intégrés.

## Publication
- [ ] Registry (Verdaccio, GitHub Packages) accessible via token secret.
- [ ] Versionnage prérelease (`0.0.0-pr.<sha>`) configuré.
- [ ] Release note (Changeset / semantic-release) envisagée.

## Documentation
- [ ] README CI à jour (`docs/ci.md`).
- [ ] Checklist signée par tech lead & product owner.
- [ ] Plan de rollback documenté.
