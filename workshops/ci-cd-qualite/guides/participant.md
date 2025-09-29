# Guide participant — CI/CD & Qualité (1h30)

## Objectifs
- Harmoniser lint/format & conventions.
- Définir une stratégie tests utile (pas de vanity metrics).
- Mettre en place un pipeline build/test rapide & fiable.
- Clarifier quality gates et revue.

## Préparation
- Cloner le repo / sandbox, installer dépendances.
- Collecter stats pipeline (durée, taux échec, coverage).
- Lister irritants (hook lent, tests flaky, doc outdated).

## Glossaire rapide
| Terme | Définition |
| --- | --- |
| Pipeline | Succession jobs automatisés (lint/test/build/…)
| Quality gate | Critère bloquant ou non pour merge (tests, review)
| Flaky test | Test instable (aléatoire, dépend externe)
| DoD | Definition of Done (critères finalisation)
| Pre-commit hook | Script exécuté avant commit (lint, format)

## Programme
1. Contexte & ROI (10’)
2. Lint / conventions & hooks (20’)
3. Tests & coverage utile (30’)
4. Pipeline build/test (20’)
5. Quality gates & revue (10’)

## Pendant l’atelier
- Prendre des notes dans les fiches d’exercices.
- Partager vos métriques actuelles (temps pipeline, coverage).
- Challengez blocages : “est-ce utile ? mesurable ?”

## Après l’atelier
- Implémenter scripts & hooks validés.
- Ajuster pipeline (cache, matrix, artifacts) sur projet pilote.
- Intégrer checklists CI & Qualité dans Definition of Done.

## Ressources
- GitHub Actions caching : [doc officielle](https://docs.github.com/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- Google Testing Blog : flaky tests
- Conventional Commits, Semantic Release
- Storybook a11y handbook

Bonne session !
