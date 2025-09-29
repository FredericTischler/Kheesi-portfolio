# Solution — Exercice 01 (Bases de la librairie)

## Arborescence finale
```
projects/shared-ui/
  src/
    lib/
      button/
      shared-ui.module.ts
      shared-ui.config.ts
    public-api.ts
  package.json
```

## Points clés

1. **Génération librairie**
   ```bash
   ng generate library shared-ui --standalone --prefix shared
   ```

2. **ChangeDetection**
   ```ts
   @Component({
     selector: 'shared-button',
     standalone: true,
     changeDetection: ChangeDetectionStrategy.OnPush,
   })
   export class SharedButtonComponent {}
   ```

3. **Public API**
   ```ts
   export * from './lib/shared-ui.module';
   export * from './lib/button/button.component';
   ```

4. **Module utilitaire**
   ```ts
   @NgModule({
     imports: [SharedButtonComponent],
     exports: [SharedButtonComponent],
   })
   export class SharedUiModule {}
   ```

5. **Config injection token**
   ```ts
   export interface SharedUiConfig {
     defaultVariant: 'primary' | 'ghost';
   }

   export const SHARED_UI_CONFIG = new InjectionToken<SharedUiConfig>('SHARED_UI_CONFIG');
   ```

6. **Tests / build**
   ```bash
   ng build shared-ui
   npm run lint shared-ui
   ```

## QA rapide

- [x] `dist/shared-ui` contient la lib packagée.
- [x] `@shared/ui` résout bien les composants.
- [x] Storybook peut charger la lib (`npm run storybook`).
