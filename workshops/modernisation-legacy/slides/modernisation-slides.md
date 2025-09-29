---
title: Modernisation Legacy → Web
subtitle: Diagnostic express & feuille de route en 3 itérations
paginate: true
theme: default
---

# Kick-off (10’)

- Contexte : appli AS400 / Java Swing, UX datée, maintenance lourde.
- Ambition : architecture hexagonale + Spring Boot + Angular + BFF.
- Livrables : mind-map cible, roadmap 3 itérations, checklist audit.

---

# Enjeux clés

1. **Traçabilité** : documenter flux, contrats, dépendances.
2. **Collaboration** : IT + métier alignés sur priorités.
3. **Retours rapides** : incréments livrables dès l’itération 1.
4. **Sécurité & conformité** : accès, traçabilité, audit.

---

# Étape 1 — Audit express (30’)

- UI legacy : ergonomie, debt UX, composants critiques.
- Base DB2 AS400 : volumétrie, jobs batch, triggers.
- Interfaces externes : flux FTP, MQ, SOAP/REST, batch partagée.
- Risques : skills, licence, obsolescence, SLA.

_Output_: checklist audit complétée, pains priorisés.

---

# Exercice 01 · Mapping flux (15’)

Objectif : recenser acteurs, systèmes, flux & dépendances.

- Utiliser la carte fournie (`outils/template-mindmap-architecture.md`).
- Identifier : canaux (UI, API, batch), données clés, SLA.
- Noter irritants (performance, support mobile, latence).

---

# Étape 2 — Architecture cible (40’)

Vision cible :
- Hexagonale (domain, application, ports/adapters).
- Spring Boot multi-modules + BFF REST/GraphQL.
- Angular pour UI (module platform + domain features).
- API Gateway + IAM (Keycloak, OIDC).
- Observabilité (logs centralisés, metrics, tracing).

---

# Avant / Après (schéma)

Avant :
- Monolithe Swing, logique métier couplée.
- Accès direct DB2 via DAOs.
- Intégrations point à point.

Après :
- Ports/Adapters : DB2 migrée -> MySQL + data lake.
- BFF orchestrant Angular clients.
- MQ / event streaming pour batch.

---

# Exercice 02 · Architecture cible (20’)

Livrable : mind-map architecture avec domaines, ports, BFF.
- Définir modules domaines (Pricing, Orders, Inventory).
- Positionner anti-corruption layer (ACL) pour legacy.
- Lister besoins sécurité (auth, journaux, chiffrement).

Critères : clair pour sponsor métier + équipe dev.

---

# Étape 3 — Migration DB2 → MySQL (20’)

Stratégie :
- Analyse volumétrie, tables prioritaires.
- Synchronisation bidirectionnelle transitoire (CDC).
- Scripts ETL (batch Spring + Debezium).
- Plans rollback + bascule progressive.

Risques : pertes données, downtime, dépendances batch.

---

# Exercice 03 · Plan migration DB (15’)

- Définir incrément 1 (read replica / reporting).
- Incrément 2 (write via BFF, API Gateway).
- Incrément 3 (décommission legacy, audit + archivage).
- Noter outils nécessaires (CDC, mapping, tests).

---

# Étape 4 — Roadmap & quick wins (20’)

Itération 1 (0-6 semaines)
- Cadrage, audit complet, quick wins UX, reporting read-only.

Itération 2 (6-12 semaines)
- Modules domaine, BFF, tests auto, pipeline CI/CD.

Itération 3 (12-20 semaines)
- Migration complète DB, décommission legacy, monitoring.

---

# Business case minimal

- Impact : gains en vitesse release, UX, maintenance.
- Coût : infra, licences, montée en compétences.
- Risques : change management, dépendances SI, sécurité.
- ROI : focus quick wins (reporting web, batch modernisé).

---

# Synthèse

Livrables :
- Mind-map architecture (cible + dépendances).
- Feuille de route 3 itérations
- Checklist audit & quick wins.

Prochaine étape : POC BFF + module domaine pilote.

---

# Q&A / Next actions

- Confirmer sponsor & budget POC.
- Prioriser lot 1 (module critique + data read-only).
- Planifier ateliers métiers (co-construction UX).
