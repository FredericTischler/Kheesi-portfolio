# Solution — Exercice 03 (Design system)

## Tokens SCSS
```scss
:root {
  --shared-spacing-2: 0.5rem;
  --shared-spacing-4: 1rem;
  --shared-radius-md: 0.75rem;
  --shared-font-family: "Inter", system-ui, sans-serif;
  --shared-color-primary: #0f766e;
  --shared-color-primary-contrast: #ffffff;
  --shared-color-surface: #f8fafc;
}

:root[data-theme="dark"] {
  --shared-color-surface: #0f172a;
  --shared-color-primary: #5eead4;
  --shared-color-primary-contrast: #052e16;
}
```

## Variants bouton
```ts
const VARIANT_CLASSES: Record<ButtonKind, string> = {
  primary: 'bg-primary text-primary-foreground',
  ghost: 'bg-transparent border border-primary text-primary',
  destructive: 'bg-destructive text-destructive-foreground',
};

@HostBinding('class')
get hostClasses(): string {
  return `shared-btn shared-btn--${this.kind} ${VARIANT_CLASSES[this.kind]}`;
}
```

## Storybook Guidelines (extrait)
```md
# Guidelines Shared UI

- Conserver un `padding` minimal de `var(--shared-spacing-4)`.
- Variants autorisés : `primary`, `ghost`, `destructive`.
- Dark mode : activer le toggle via `document.documentElement.dataset.theme = 'dark'`.
- Accessibilité : tous les boutons doivent avoir `aria-label` si texte masqué.
```

## Checklists
- `checklist-design-system.md` complétée avec décisions (naming, tokens, responsive, doc).
- `storybook` affiche une page “Design Tokens” générée via MDX + Controls.

## Points de vigilance
- Synchroniser tokens CSS avec design tokens Figma (export JSON si dispo).
- Fournir un thème “legacy” pour adoption progressive.
- Documenter la stratégie i18n (transloco/ng ngx translate) pour labels.
