# Solution — Exercice 01 (Mapping flux)

## Exemple de mind-map (texte)
- **Acteurs** : Service client (call center), Agents terrain (tablettes), Facturation.
- **Systèmes** : AS400/DB2, Application Swing, Batch nocturne (COBOL), API CRM (REST), FTP banques.
- **Flux** :
  - `Orders` → Batch nocturne → FTP partenaires (SLA 6h).
  - `Inventory` → API REST CRM (latence 2s).
  - `Billing` → DB2 direct (queries lourdes > 30s).
- **Irritants** :
  - Duplications de logique (Swing vs batch).
  - Aucune traçabilité des erreurs API.
  - Batch > 4h, fenêtre restreinte.

## Risques identifiés
- Compétences AS400 en diminution.
- Pas de solution fallback en cas de batch échoué.
- API externes non documentées.

## Actions
- Prioriser inventory/reporting pour quick wins web.
- Documenter API externes (contrats).
- Prévoir monitoring temps réel (APM).
