# Exercice 02 — Stratégie de tests

## Objectif
Aligner sur une pyramide de tests utile, coverage pragmatique.

## Étapes
1. Lister types tests : unit, integration, e2e, contract, snapshot.
2. Définir objectifs coverage (global, par module).
3. Identifier flaky tests et plan de remédiation.
4. Assigner responsabilités (owners) et cadence exécution.
5. Documenter approach (README/tests.md).

## Livrable
- Tableau : `Type | Outil | Fréquence | Owner | Coverage cible`.
- Règles ajout/MAJ tests (template PR).
- Stratégie gestion flaky (retry, quarantine, bot).

## Critères de réussite
- Coverage utile (ex : 80% domain critique, 60% global).
- Tests lents isolés (e2e) + max 10 min.
- Document “tests strategy” partagé.
