# Solution — Exercice 04 (Tests & accessibilité)

## Setup commun
```ts
import { setupSharedUiTesting } from '../testing/testbed.setup';

beforeEach(() => {
  setupSharedUiTesting();
});
```

## shared-form-field.spec.ts
```ts
it('link hint and error messages', () => {
  component.errorId = 'field-error';
  fixture.detectChanges();
  expect(field.nativeElement.getAttribute('aria-describedby')).toContain('field-error');
});
```

## shared-select.spec.ts
```ts
it('propagates disabled state', () => {
  component.setDisabledState(true);
  fixture.detectChanges();
  expect(selectButton.nativeElement).toHaveClass('is-disabled');
  expect(selectButton.nativeElement.getAttribute('aria-disabled')).toBe('true');
});
```

## Storybook a11y
```js
// .storybook/main.ts
addons: [
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-a11y'
];
```

Résultat axe-core : 0 violation après ajout de `aria-live="polite"` sur messages d’erreur.

## Checklists
- Exigences WCAG (focus visible, ratio 4.5:1) validées.
- Tests screenshot (Chromatic) en bonus : story stable, delta < 0.1%.

## Pitfalls
- `ChangeDetectionStrategy.OnPush` nécessite `fixture.detectChanges()` après `writeValue`.
- `ControlValueAccessor` oubli de `onTouched` → impossible de marquer `touched`.
