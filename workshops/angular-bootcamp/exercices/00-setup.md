# Exercice 00 — Setup

Objectif : préparer l’environnement afin de dérouler le bootcamp sans friction.

## 1. Cloner le repository de démonstration

```bash
git clone https://github.com/example/angular-shared-ui-demo.git
cd angular-shared-ui-demo
npm install
```

> Si vous partez d’un monorepo NX, créez un workspace `apps/legacy-portal` + `libs/shared-ui`.

## 2. Vérifications rapides

- `npm run lint` → doit être green.
- `npm run test` → doit passer (tests basiques fournis).
- `npm run storybook -- --smoke-test` → Storybook buildable.

## 3. Scripts utiles

| Script | Description |
| --- | --- |
| `npm run start` | Angular legacy app (dépendant de `shared-ui`). |
| `npm run storybook` | Documentation interactive des composants. |
| `npm run test shared-ui` | Tests ciblés des composants partagés. |
| `npm run lint shared-ui` | ESLint + stylelint sur la lib. |

## 4. Préflight “composants existants”

- Identifier une page ou un écran métier qui souffre de duplications.
- Lister les composants critiques (ex. `Button`, `Input`, `Select`).
- Noter les douleurs actuelles : manque de typage, accessibilité, incohérences visuelles.

## 5. Branches recommandées

- Créez une branche `feature/workshop-shared-ui` pour conserver le travail.
- Utilisez des commits courts `feat(shared-ui): add typed form-field`.

## 6. Ressources

- [Angular CLI Library Guide](https://angular.dev/tools/cli/libraries)
- [Nx Best Practices (facultatif)](https://nx.dev/concepts/best-practices)

Une fois ce setup validé, passez à l’exercice 01.
