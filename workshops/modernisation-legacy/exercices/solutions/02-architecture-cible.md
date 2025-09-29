# Solution — Exercice 02 (Architecture cible)

## Modules proposés
- **Domain** : Contrats, Tarification, Facturation, Support (aggregate roots, services).
- **Application** : orchestrateurs, use cases, validations.
- **Infrastructure** : adapters DB (DB2 legacy, MySQL cible), messaging, external APIs.

## Ports & adapters
- Ports entrants : REST (BFF), GraphQL, batch scheduler.
- Ports sortants : DB2 read-only, MySQL write, MQ (events), services externes.
- ACL : adapter legacy pour traduire DTO Swing → DTO REST.

## BFF & Gateway
- BFF REST exposant endpoints métiers (contrats, pricing).
- API Gateway (Kong / Istio) : auth OIDC, throttling, routing.
- Front Angular consomme BFF (HTTP cache, interceptors).

## Observabilité
- Tracing (OpenTelemetry + Grafana Tempo).
- Metrics (Prometheus) + dashboards Grafana.
- Journaux structurés (ELK).

## Sécurité
- Keycloak / IAM centralisé.
- Audit logs (auth, modifications données sensibles).
- Chiffrement TLS end-to-end.

## Résultat mind-map (résumé)
- Nœuds : Domaines + Ports + Adapters + BFF + Gateway + Observabilité.
- Liens avec mentions dépendances et propriétaires métier.
- Quick wins : façade BFF pour reporting, migration read-only MySQL.
