# Checklist CI — Fiabilité / Vitesse / Coût

## Fiabilité
- [ ] Jobs séparés lint/test/build (pas de monolithe).
- [ ] Tests unitaires flakiness < 2% (tracking automatique).
- [ ] Pipeline idempotent (rerun = mêmes résultats).
- [ ] Rollback script documenté.

## Vitesse
- [ ] Cache dépendances (npm/pnpm/yarn) + build.
- [ ] Durée pipeline < 7 min (objectif), alertes si > 10 min.
- [ ] Jobs parallèles (lint/test) si possible.
- [ ] Analyse logs pour goulots (collecte metrics).

## Coût / Temps d’opération
- [ ] Artifacts limités (coverage, storybook, build).
- [ ] Matrix raisonnable (1 OS + LTS node sauf besoin multi-OS).
- [ ] Cleanup artifacts (TTL 7 jours max).
- [ ] Pipeline n’exécute que jobs nécessaires (skip doc-only PR).

## Observabilité
- [ ] Durée pipeline/ job tracée (DataDog, GH Insights).
- [ ] Alerte email/Slack en cas d’échec.
- [ ] Rapports coverage & vulnérabilités agrégés.
