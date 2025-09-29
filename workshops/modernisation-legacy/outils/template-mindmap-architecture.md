# Template — Mind-map Architecture Cible

## Domaine Métiers (central)
- [ ] Domaines principaux (ex : Contrats, Tarification, Facturation, Support)
- [ ] Cas d’usage prioritaires

## Ports & Adapters
- [ ] Ports entrants (REST, GraphQL, batch)
- [ ] Adapters sortants (DB2, MySQL, MQ, APIs externes)
- [ ] Anti-corruption layer (ACL)

## BFF & API Gateway
- [ ] BFF REST / GraphQL pour Angular
- [ ] API Gateway (auth, quotas, throttling)
- [ ] Observabilité (metrics, tracing)

## Sécurité & conformité
- [ ] IAM (Keycloak / LDAP / OIDC)
- [ ] Audit trails & journaux
- [ ] Encryption at rest / in transit

## Données & stockage
- [ ] Stratégie transition DB2 → MySQL
- [ ] Cache / streaming (Kafka, Redis)
- [ ] Données analytiques (data lake, BI)

## Outillage & Ops
- [ ] CI/CD (build, tests, déploiement)
- [ ] Monitoring / alerting
- [ ] Gestion configuration / secrets

## Collaboration & gouvernance
- [ ] Rôles IT + métier
- [ ] Process documentation vivante
- [ ] Points de décision sponsor
