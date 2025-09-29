# Exercice 03 — Plan migration DB2 → MySQL

## Objectif
Définir une stratégie d’extraction, synchronisation et bascule vers MySQL en limitant les risques.

## Consignes
1. Lister les tables/priorités (critères : usage métier, volumétrie).
2. Définir une stratégie CDC (Change Data Capture) : Debezium, batch incrémental.
3. Planifier 3 incréments :
   - Incrément 1 : reporting read-only (réplica).
   - Incrément 2 : migration progressive des écritures (BFF → MySQL).
   - Incrément 3 : décommission DB2 + archivage.
4. Préciser les tests : non-régression, data quality, performance.
5. Noter outils/outillages (ETL, scripts, monitoring DB).

## Critères de validation
- Rollback plan identifié (bascule en cas d’incident).
- Stratégie de coexistence (double écriture ou event sourcing).
- KPI de migration (latence, pertes, cohérence) définis.
