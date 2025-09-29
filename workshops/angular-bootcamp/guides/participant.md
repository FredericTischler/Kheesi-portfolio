# Guide participant — Angular Component Library Bootcamp

Bienvenue ! Ce workshop de ½ journée vise à doter votre équipe d’une librairie Angular partagée, typée et accessible. Vous trouverez ici les prérequis, le déroulé et les ressources pour tirer parti de la session.

## 1. Avant l’atelier

### Prérequis techniques
- Node.js 20+, npm ou pnpm.
- Angular CLI ≥ 17 installé (`npm install -g @angular/cli`).
- Accès au repository sandbox communiqué par l’animateur.
- Storybook 8 (`npx storybook@latest init --type angular` si besoin).

### Préparation
- Cloner le repo et lancer `npm install` + `npm run lint` + `npm run test`.
- Parcourir `exercices/00-setup.md` (structure, scripts, branche de départ).
- Lister les composants existants qui posent le plus de problèmes (dette, duplication, a11y).

### Glossaire express
| Terme | Définition |
| --- | --- |
| **OnPush** | Stratégie de détection Angular qui limite les re-renders, essentielle pour des composants performants. |
| **CVA** | `ControlValueAccessor` — interface permettant à un composant d’interagir avec Angular Forms. |
| **Typed forms** | API forms introduisant des types stricts (`FormControl<string>`). |
| **Tokens DS** | Variables de design system (couleurs, spacing) réutilisables dans toute la lib. |
| **Verdaccio** | Registry npm local pour tester la publication d’un package. |

## 2. Pendant l’atelier

### Programme
1. **Kick-off & démo** — vision, livrables, état cible.
2. **Lib Angular** — génération, structure modulaire, OnPush.
3. **Composants réutilisables** — boutons, inputs, patterns d’injection.
4. **Typed forms & CVA** — factorisation form-field, validations.
5. **Design system** — tokens, thèmes, variants, i18n.
6. **Tests & a11y** — jest/test bed + axe-core Storybook.
7. **CI & diffusion** — lint/test/build/publish.

### Attentes vis-à-vis des participants
- Partager vos retours terrain (composants les plus utilisés, irritants UX).
- Participer aux exercices en duo (pair programming encouragé).
- Documenter toutes les décisions dans les checklists fournies.

## 3. Après l’atelier

### Livrables disponibles
- Starter kit (`shared-ui`), modules et snippets prêts.
- Guide de naming et conventions API dans `templates/`.
- Checklists (design system, accessibilité, CI) validées pendant la session.

### Plan d’action recommandé
1. Prioriser la migration des formulaires critiques vers typed forms.
2. Publier la lib `shared-ui` sur le registry interne (ou Verdaccio).
3. Intégrer les checklists dans vos revues de code / Definition of Done.
4. Planifier une rétro à J+30 pour mesurer adoption et points d’amélioration.

## 4. Ressources utiles

- [Angular Standalone Components](https://angular.dev/guide/standalone-components)
- [Typed Forms Angular](https://angular.dev/guide/typed-forms)
- [Storybook Accessibility](https://storybook.js.org/docs/angular/writing-tests/accessibility-testing)
- [WCAG 2.1 AA Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

## 5. Rappels qualité & accessibilité
- Toujours définir `aria-label` / `aria-labelledby` sur vos champs.
- Tester `tab` + `shift+tab` pour valider l’ordre de focus.
- Vérifier le contraste (`>= 4.5:1`) sur boutons et liens.
- Ajouter au moins un test unitaire ciblé par composant créé.

## 6. Support post-workshop
- Canal Slack/Teams temporaire (48h) pour les questions.
- Foire aux questions alimentée par l’animateur (voir `handouts/starter-kit-notes.md`).
- Possibilité de mini-sessions 30’ pour aider à la migration de composants.

Bonne session !
