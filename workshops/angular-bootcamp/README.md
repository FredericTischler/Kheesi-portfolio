# Angular Component Library Bootcamp — Pack de support

Ce dossier réunit tous les supports nécessaires pour animer ou suivre le workshop **Angular Component Library Bootcamp (½ journée)**. Il couvre la préparation, le déroulé, les exercices guidés, les solutions et les checklists opérationnelles pour accélérer la modernisation d’une application Java/Angular.

## Contenu du pack

- `slides/bootcamp-slides.md` — deck de présentation (compatible remark/reveal.js).
- `guides/animateur.md` — déroulé minute par minute, anticipations risques.
- `guides/participant.md` — guide autonome (prérequis, ressources, lexique).
- `exercices/` — sept fiches pratiques et les corrigés détaillés.
- `templates/` — exemples de composants/form-fields/stories prêts à intégrer.
- `checklists/` — audits express design system, accessibilité, CI.
- `handouts/starter-kit-notes.md` — note de synthèse à transmettre après l’atelier.
- `exports/` — répertoire cible pour les PDF générés (vide par défaut).

## Prérequis

- Node.js 20+, npm ou pnpm.
- Angular CLI ≥ 17 (installé globalement).
- Accès à un projet Angular sandbox ou au repository de démonstration fourni dans `exercices/00-setup.md`.

## Génération des PDF

Ce pack embarque son propre `package.json` pour produire les PDF à partir des fichiers Markdown.

```bash
cd workshops/angular-bootcamp
npm install
npm run docs:pdf
npm run docs:open # ouvre le dossier exports
```

Les PDF générés sont nommés selon la convention `<chemin-remplacé-par-des-tirets>.pdf` afin d’éviter toute collision.

## Recommandations d’usage

1. **Avant l’atelier** :
   - Lire `guides/animateur.md` pour préparer le contexte client et adapter les exemples.
   - Envoyer `guides/participant.md` et `exercices/00-setup.md` au moins 48h avant la session.
   - Vérifier que Storybook et Angular CLI fonctionnent localement.
2. **Pendant l’atelier** :
   - Utiliser les slides comme fil conducteur.
   - Alterner démonstrations et exercices pair-programming.
   - Documenter les décisions dans la checklist design system.
3. **Après l’atelier** :
   - Partager `handouts/starter-kit-notes.md` enrichi des décisions prises.
   - Ouvrir un canal de support court (Slack/Teams) pour répondre aux questions.

Bon workshop !
