# Checklist Accessibilité — Angular Component Library Bootcamp

## Focus & navigation
- [ ] Tous les composants ont un focus visible (outline >= 2px, contraste AA).
- [ ] Navigation clavier testée (`Tab`, `Shift+Tab`, `Enter`, `Space`, flèches).
- [ ] Aucun piège clavier (pas de blocage sur modales, menus, selects).

## Roles & aria
- [ ] `aria-label` ou `aria-labelledby` présent sur éléments interactifs.
- [ ] `role="alert"` pour les messages d’erreur de formulaire.
- [ ] `aria-describedby` relie hints/erreurs au champ.

## Couleurs & contrastes
- [ ] Ratio couleur texte/fond ≥ 4.5:1 (AA) / 3:1 (icônes).
- [ ] États disabled/hover/focus identifiables.
- [ ] Dark mode respecté (mêmes contrastes).

## Contenu dynamique
- [ ] Annonces écran lecteur testées (`aria-live="polite"`).
- [ ] Modales utilisent `cdkTrapFocus` ou équivalent.
- [ ] Snackbar/toasts accessibles (durée > 5s ou dismissible).

## Tests automatisés
- [ ] axe-core exécuté sur Storybook (0 violation).
- [ ] Tests unitaires vérifient `aria-invalid`, `aria-describedby`.
- [ ] Rapport Lighthouse a11y ≥ 90 (écran cible).
