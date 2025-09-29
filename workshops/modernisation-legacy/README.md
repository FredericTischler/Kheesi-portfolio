# Modernisation Legacy → Web (2h) — Pack de support

Ce dossier fournit l’ensemble des ressources pour animer le workshop **Modernisation Legacy → Web**. L’objectif est d’aider une équipe backend/architecte/chef de projet à diagnostiquer une application AS400/Java Swing et à cadrer une cible Web évolutive (Architecture Hexagonale, Spring Boot, Angular).

## Contenu du pack
- `slides/modernisation-slides.md` — deck lean (remark/reveal-friendly) structuré par séquence.
- `guides/animateur.md` — déroulé précis (2h), scripts d’animation, risques & parades.
- `guides/participant.md` — support autonome (notions clés, glossaire, ressources).
- `outils/` — modèles prêts à remplir (mind-map architecture, feuille de route 3 itérations, checklist audit).
- `exercices/` — fiches d’ateliers + corrigés (`solutions/`).
- `exports/` — dossier cible pour les PDF générés (vide par défaut).

## À qui s’adresse ce pack ?
- **Équipes backend / architectes** pilotant une modernisation progressive.
- **Chefs de projet** souhaitant objectiver le plan de transformation.
- **Sponsors métier** devant arbitrer ROI, risques et dépendances.

## Prérequis
- Connaissances de base Java/Spring Boot et Angular.
- Accès à une carte applicative de l’existant (diagrammes, inventaire interfaces).
- Participants munis de leur laptop pour renseigner les outils fournis.

## Générer les PDF
Ce dossier embarque un `package.json` local. Procédure :

```bash
cd workshops/modernisation-legacy
npm install
npm run docs:pdf
npm run docs:open # ouvre le dossier exports (optionnel)
```

Les PDF générés reprennent les fichiers clés (slides, guides, outils, exercices).

## Déroulé recommandé
1. Lire `guides/animateur.md` pour préparer le workshop (contextualisation, time-boxing).
2. Envoyer `guides/participant.md` aux invités 48h avant la session.
3. Pendant l’atelier, alterner input (slides) et exercices guidés.
4. Capitaliser les résultats dans `outils/` et partager la feuille de route à l’issue.

Bonne modernisation !
