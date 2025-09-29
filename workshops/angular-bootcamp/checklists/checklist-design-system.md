# Checklist Design System — Angular Component Library Bootcamp

## Naming & structure
- [ ] Prefix `shared-` appliqué à tous les sélecteurs.
- [ ] Variants (`primary`, `ghost`, `destructive`) documentés.
- [ ] Modules exportés via `@shared/ui` + barrel files nettoyés.

## Tokens & thèmes
- [ ] Tokens CSS définis pour couleurs, spacing, radius, typographie.
- [ ] Thème dark prêt (data-theme="dark").
- [ ] Tokens alignés avec la charte design (Figma / guidelines produit).

## Documentation
- [ ] Storybook inclut page “Design Tokens” automatisée.
- [ ] Stories `Controls`, `A11y`, `Docs` présentes pour chaque composant clé.
- [ ] Guide de naming livré (fichier MD + exemple).

## Responsiveness & layout
- [ ] Composants testés en largeur < 320px, > 1440px.
- [ ] Breakpoints alignés sur tokens (sm/md/lg).
- [ ] Grilles/flex sans style inline (utiliser classes utilitaires).

## Gouvernance
- [ ] Process de revue inter-équipes validé (Frontend + UX).
- [ ] Backlog des composants prioritaires priorisé.
- [ ] KPI suivis : adoption, bugs, satisfaction UX.
