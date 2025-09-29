# Exercice 02 — Architecture cible

## Objectif
Esquisser l’architecture Hexagonale cible, intégrer BFF/API Gateway et exigences sécurité.

## Consignes
1. Repartir du template mind-map (domaine, ports, adapters).
2. Définir modules Spring Boot (domain, application, infrastructure).
3. Positionner BFF REST / GraphQL pour Angular (roles, caching).
4. Ajouter API Gateway (auth, throttling, logging).
5. Lister besoins observabilité (tracing, metrics, logs).

## Rendu attendu
- Mind-map enrichie : modules, flux entrants/sortants, ACL.
- Liste d’adapters (DB2, MySQL, MQ, external APIs) + sécurité (Keycloak/OIDC).

## Critères de validation
- Distinction claire domain/application/infrastructure.
- BFF et Gateway identifiés + responsabilités.
- Observabilité / monitoring prévus (Prometheus, Grafana, ELK).
