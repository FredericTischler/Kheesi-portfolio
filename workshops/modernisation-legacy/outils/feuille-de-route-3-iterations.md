# Feuille de route — Modernisation Legacy → Web

## Vue d’ensemble
- Horizon : 3 itérations (≈ 20 semaines) pour passer d’un diagnostic à un socle web opérationnel.
- Critères : ROI mesurable, risques maîtrisés, adoption progressive.

## Itération 1 (Semaines 0-6)
- Objectif : cadrage, quick wins, reporting read-only.
- Livrables :
  - Checklist audit complète
  - PoC BFF + Angular (écran critique)
  - Réplica DB2 → MySQL (lecture seule)
- Risques : manque de disponibilité métier (mitigation : sponsor dédié).
- ROI : visibilité sur backlog, premiers gains UX (reporting web).

## Itération 2 (Semaines 6-12)
- Objectif : construction du socle (Hexagonale + Spring Boot) et modules domaines prioritaires.
- Livrables :
  - Modules domaine (ex : Contrats, Paiement)
  - Pipeline CI/CD automatisé
  - Observabilité (logs/metrics) + APM
- Risques : montée en compétences Angular/Spring (mitigation : pair programming, formation).
- ROI : temps de mise en production réduit, uniformisation API.

## Itération 3 (Semaines 12-20)
- Objectif : migration complète et décommission legacy.
- Livrables :
  - Migration DB2 → MySQL en production (write)
  - Décommission composants Swing clés
  - Plan de support / change management
- Risques : dépendances batch, résistances utilisateurs (mitigation : plan communication, tests UAT).
- ROI : réduction coûts maintenance, gain productivité équipes terrain.

## Business case minimal
- Impact (gains) :
  - +30% vitesse release front
  - -40% incidents critiques (UI/DB)
  - Expérience client modernisée (mobile, responsive)
- Coûts :
  - Montée en compétences (formation Angular/Spring)
  - Infra cloud / licences
  - Temps interne (IT + métier)
- Risques :
  - Compétences insuffisantes  
  - Endettement technique résiduel  
  - Gouvernance data

## Prochaines étapes
1. Valider roadmap avec sponsor + métier.
2. Lancer PoC BFF (Angular + Spring Boot) sous 4 semaines.
3. Planifier cut-over data et tests de non-régression.
