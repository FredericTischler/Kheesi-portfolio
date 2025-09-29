# Exercice 03 — Design system & tokens

## Objectif
Structurer un jeu de tokens (couleurs, espaces, rayons) et décliner les variants de composant.

## Étapes

1. **Créer un fichier de tokens** (`projects/shared-ui/src/styles/tokens.scss`)
   ```scss
   :root {
     --shared-color-primary: #0f766e;
     --shared-color-secondary: #3b82f6;
     --shared-radius-md: 0.75rem;
     --shared-spacing-4: 1rem;
   }

   :root[data-theme="dark"] {
     --shared-color-primary: #5eead4;
     --shared-color-secondary: #60a5fa;
   }
   ```

2. **Connecter les tokens aux composants**
   - Exposer un service `SharedThemeService` permettant de switcher les thèmes.
   - Utiliser `@HostBinding('class')` pour appliquer un variant (`primary`, `ghost`).

3. **Documenter dans Storybook**
   - Story `DesignTokens` qui affiche tableau des tokens + usage recommandé.
   - Ajouter un onglet “Guidelines” (MDX) mentionnant i18n & accessibilité.

4. **Audit express**
   - Remplir `checklists/checklist-design-system.md` avec les décisions prises (naming, spacing, tonalités, etc.).

## Résultats attendus

- Les composants réagissent aux tokens (changer data-theme modifie la charte).
- Les variants sont documentés dans Storybook (Controls + Docs + A11y).
- Les règles de naming sont consignées (ex : `shared-btn--primary`).

## Critères de validité

- Couleurs conformes WCAG AA (> 4.5:1) pour texte/boutons.
- Aucun style inline — tout passe par tokens ou classes.
- Storybook fournit un aperçu dark/light.

Besoin d’aide ? Voir `exercices/solutions/03-design-system.md`.
