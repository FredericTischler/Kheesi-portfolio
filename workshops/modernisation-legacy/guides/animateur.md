# Guide animateur — Modernisation Legacy → Web (2h)

Durée : 2h. Public : équipe backend, architecte, chef de projet. Objectif : poser un diagnostic partagé et définir une architecture cible + feuille de route 3 itérations.

## Préparation (J-5 à J-1)
1. **Collecte d’informations**
   - Demander au sponsor : cartographie applicative, SLA, incidents majeurs, périmètre métier critique.
   - Obtenir un extrait DB2 (structure) + inventaire batch + interfaces externes.
   - Identifier les parties prenantes clé (métier, infra, sécurité).

2. **Logistique**
   - Salle (ou visio) avec tableau / mural digital pour mind-map.
   - Inviter participants (6–10 personnes max) ; partager `guides/participant.md` + exercices.
   - Préparer support (slides) + outils (mindmap template, feuille de route, checklist audit).

3. **Préflight**
   - Étudier l’application legacy : capture d’écran, flux principaux.
   - Recenser irritants à présenter en ouverture.

## Chrono détaillé

| Temps | Sujet | Livrables | Risques & parades |
| --- | --- | --- | --- |
| 00:00 – 00:10 | Contexte & objectifs | Aligner sponsor & participants | Trop général → montrer capture legacy + KPI (ex : temps traitement) |
| 00:10 – 00:40 | Audit express | Checklist audit remplie | Discussions hors scope → timebox, parking lot |
| 00:40 – 01:20 | Architecture cible | Mind-map architecture | Focalisation technique uniquement → rappeler attente métier (use cases) |
| 01:20 – 01:40 | Migration DB2 → MySQL | Plan en 3 incréments | Sous-estimation contraintes data → insister sur CDC, rollback |
| 01:40 – 02:00 | Roadmap & quick wins | Feuille de route 3 itérations | Divergences sponsor/dev → afficher ROI + dépendances |

## Scripts et conseils

### Kick-off (10’)
- Slide “Avant/Après”. Insister sur : alignement business + IT, visibilité ROI.
- Poser la question : « Quels écrans/processus vous bloquent aujourd’hui ? »
- Annoncer livrables attendus (mind-map, roadmap, checklist signée).

### Audit express (30’)
- Utiliser la checklist audit comme fil conducteur (UI, DB, batch, interfaces externes, sécurité).
- Timebox 5 min par rubrique. Demander preuves (logs, tickets incident, métriques).
- Noter irritants dans `audit-checklist.md` (colonne risques/mitigation).

### Architecture cible (40’)
- Dessiner la macro : modules domaines, adapters, BFF, gateway, observabilité.
- Faire participer métier/chef de projet : quels processus prioriser ?
- Mentionner patterns : anti corruption layer, caching, observability (Prometheus, Grafana).

### Migration DB2 → MySQL (20’)
- Introduire stratégies : répliques read-only, CDC (Debezium), migration table par table.
- Aborder gouvernance data : mapping, nettoyages, tests de non-régression.

### Roadmap (20’)
- S’appuyer sur `feuille-de-route-3-iterations.md` : itération 1 (diagnostic + quick wins), itération 2 (modules domaine + BFF), itération 3 (migration complète + décommission).
- Identifier quick wins : reporting web, API publiques, automatisation batch.

## Gestion des risques
- **Manque d’alignement métier** : inviter sponsor métier, planifier restitution.
- **Sous-estimation migration data** : prévoir phase pilote, tests rollback.
- **Compétences Angular/Spring Boot** insuffisantes : plan de montée en compétences.

## Post-session
- Nettoyer et partager : mind-map finale, roadmap, checklist.
- Proposer un atelier complémentaire (POC BFF) sous 2 semaines.
- Suivre actions (JIRA / Azure DevOps) et assigner responsables.

## KPI de réussite
- Engagement sponsor (feuille de route validée).
- Quick wins identifiés (≤ 6 semaines) + owner.
- Décision POC prise à l’issue (Go/No Go).
