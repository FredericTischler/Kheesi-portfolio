# Guide participant — Modernisation Legacy → Web (2h)

## Objectifs de la session
- Comprendre le diagnostic de l’application legacy (AS400/Java Swing).
- Visualiser une architecture cible modulaire (Hexagonale, Spring Boot, Angular).
- Définir une feuille de route en 3 itérations, quick wins inclus.

## À préparer avant l’atelier
- Lister vos écrans/processus les plus critiques (UX, performance, maintenance).
- Recenser les flux externes (FTP, MQ, APIs, batch).
- Vérifier l’accès aux documents disponibles (dossier architecture, incidents, SLA).

## Programme (2h)
1. Contexte & enjeux.
2. Audit express (UI, DB, batch, interfaces, risques).
3. Architecture cible (Hexagonale, BFF, sécurité, observabilité).
4. Migration DB2 → MySQL (stratégie incrémentale).
5. Roadmap & quick wins (3 itérations, ROI).

## Notions clés
- **Hexagonale / Ports & Adapters** : isoler logique métier, adapters DB/UI.
- **BFF (Backend For Frontend)** : API dédiée aux clients Angular/web/mobile.
- **CDC (Change Data Capture)** : synchronisation progressive des données.
- **Anti-Corruption Layer (ACL)** : couche de traduction entre legacy et cible.
- **Observabilité** : logs, metrics, tracing pour superviser la migration.

## Glossaire
| Terme | Définition |
| --- | --- |
| AS400 | Plateforme IBM (midrange) souvent adossée à DB2. |
| DB2 | Base relationnelle IBM utilisée sur AS400. |
| MySQL | Base open-source (InnoDB) cible pour la modernisation. |
| Gateway/API Gateway | Point d’entrée centralisé pour les services (auth, routing). |
| Quick win | Livraison à court terme générant bénéfice immédiat. |

## Pendant la session
- Contribuez aux exercices (mind-map, architecture cible, plan migration).
- Documentez les risques/mitigations dans les fichiers fournis.
- Challengez les hypothèses (budget, compétences, ROI).

## Après la session
- Relire la feuille de route validée.
- Préparer la décision sponsor (Go/NoGo POC).
- Planifier workshop complémentaire (UX, CI/CD, data) si besoin.

## Ressources recommandées
- « Clean Architecture » — Robert C. Martin.
- « Domain-Driven Design » — Eric Evans.
- REX migration DB2 → MySQL (partage interne, Cf. Confluence).
- Guides IBM → Cloud modernization.

Bon atelier !
