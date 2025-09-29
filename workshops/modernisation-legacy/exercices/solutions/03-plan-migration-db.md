# Solution — Exercice 03 (Migration DB2 → MySQL)

## Stratégie en 3 incréments
1. **Incrément 1 (Sem. 0-6)**
   - Mettre en place un réplica read-only MySQL via CDC (Debezium + Kafka).
   - Exposer reporting Angular via BFF (lecture seule).
   - KPI : latence réplica < 5s, pas de perte événements.

2. **Incrément 2 (Sem. 6-12)**
   - Double écriture via BFF (écritures dans DB2 + MySQL).
   - Tests de non-régression automatisés (contrôle datasync).
   - Préparer scripts migration batch (jobs Spring Batch).

3. **Incrément 3 (Sem. 12-20)**
   - Cut-over : MySQL devient source de vérité, DB2 en lecture archivage.
   - Décommission batch legacy remplacé par pipeline Spring.
   - KPI : downtime < 30 min, cohérence 100% vérifiée.

## Tests & rollback
- Tests intégration (API, batch) + tests data (checksum, sampling).
- Plan rollback : bascule DNS appli, scripts reverse, fallback ACL.

## Outillage
- Debezium / Kafka Connect pour CDC.
- Flyway / Liquibase pour migrations schéma.
- DataDog / Prometheus pour monitoring replication lag.
- Scripts validation (SQL comparatif, reports BI).

## Risques & mitigations
- Compétences DB2 limitées → prévoir expert externe.
- Batch non compatibles → replatforming progressif via Spring Batch.
- Problèmes performance MySQL → tuning indexes, partitioning.
