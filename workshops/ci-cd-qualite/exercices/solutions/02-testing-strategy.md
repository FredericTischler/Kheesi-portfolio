# Solution — Exercice 02 (Stratégie tests)

## Matrice exemple
| Type | Outil | Fréquence | Owner | Coverage cible |
| --- | --- | --- | --- | --- |
| Unit | Jest / Vitest | PR + merge | Dev feature | 80% modules métier |
| Integration | Playwright API / Nest testing | Nightly + PR critique | QA / Tech lead | Cas Priorité 1 |
| E2E | Cypress smoke | Nuit + avant release | QA | 10 scénarios business |
| Contract | Pact | Weekly | Backend lead | Tous services exposés |
| Performance | k6 | Sprint (pré-release) | SRE | SLA validé |

## Gestion coverage
- Coverage global cible : 70%.
- Modules critiques (paiement) : 90%.
- Documenter exclusions (legacy, generated).

## Flaky tests
- `retry` (max 2) + fail build si persiste.
- Tag `@flaky` + board suivi.
- Dédié owner pour fix (SLA 2 jours).

## Documentation
- `docs/testing-strategy.md` : pyramide, outils, cadence.
- Template PR : case à cocher "tests ajoutés/MAJ" + lien coverage.
