# Guide animateur — Angular Component Library Bootcamp

Durée totale : ~4h. Groupe cible : équipe frontend / tech lead (6–12 personnes). Objectif : repartir avec une librairie Angular factorisée, des conventions partagées et une trame CI opérationnelle.

## Préparation (J-7 → J-1)

### 1. Cadre & attentes
- Collecter auprès du client : stack actuelle, niveau Angular, contraintes accessibilité, outils CI.
- Identifier 2 écrans métiers prioritaires pour illustrer la refonte.
- Confirmer accès au repository sandbox ou créer un repo Git dédié.

### 2. Logistique
- Vérifier que tous les participants disposent de : Node 20+, Angular CLI 17+, Storybook 8.
- Pré-installer dépendances (Spectator, Testing Library, eslint configs) dans le repo demo.
- Partager `guides/participant.md` + `exercices/00-setup.md` + checklist design system.

### 3. Préflight technique
- Lancer `npm run lint && npm run test && npm run build` dans le repo demo.
- Tester l’export Storybook (`npm run storybook -- --smoke-test`).
- Préparer un registry local (Verdaccio) si démo publish.

## Déroulé minute par minute

| Temps | Étape | Objectifs | Risques & parades |
| --- | --- | --- | --- |
| 00:00 – 00:10 | Kick-off | Partager vision, livrables, démo cible | Participants non alignés → montrer composant final (Storybook) |
| 00:10 – 00:50 | Création lib Angular | Générer lib, config OnPush, structure modulaire | Erreurs ng-packagr → vérifier `public-api.ts` |
| 00:50 – 01:40 | Composants réutilisables | Bouton, input, form-field | Scope creep → limiter aux 3 composants clés |
| 01:40 – 02:30 | Forms typés & CVA | ControlValueAccessor + validations | Participants bloqués sur typed forms → fournir snippet complet (solutions/02) |
| 02:30 – 03:10 | Design system | Tokens, thèmes, variants, i18n | Discussions trop longues → capture décisions dans checklist DS |
| 03:10 – 03:40 | Tests & a11y | Tests unitaires + axe-core | Temps serré → imposer un test par composant minimum |
| 03:40 – 04:00 | CI & wrap-up | Lint/test/build, publish local | Pas de registry dispo → fallback sur tarball npm |

## Animation détaillée

### Kick-off (10’)
- Présenter contexte (legacy Java/Angular), vision (“boutons/inputs unifiés en <10 min”).
- Montrer la story finale (`shared-form-field` + typed form) pour créer l’effet “wahou”.
- Distribuer plan + objectifs mesurables (lib buildée, form-field typé, pipeline lint/test + story a11y verte).

### Création de la lib (40’)
- Live coding : `ng generate library shared-ui` → config `tsconfig.base.json`.
- Expliquer `OnPush`, `Standalone Components`, `inject(ChangeDetectorRef)`.
- Pitfalls : `CommonModule` à importer, `schemas: [CUSTOM_ELEMENTS_SCHEMA]` à éviter.

### Composants réutilisables (50’)
- Pair programming : créer `shared-button`, `shared-input`.
- Focus sur API : `@Input({ required: true })`, `host: { class: ... }`, `aria-*` automatiques.
- Montrer comment documenter via Storybook (Controls + Docs tab).

### Forms typés & CVA (50’)
- Démo rapide : `FormBuilder.nonNullable`, `FormGroup<{ email: FormControl<string> }>;`.
- Implémenter `SharedSelectCva` avec `ControlValueAccessor` + `onTouched`.
- Laisser 20’ de pratique, circuler pour débloquer (ex : generics sur `Option<T>`).

### Design system (40’)
- Atelier : définir tokens `spacing`, `radius`, `palette`, `z-index`.
- Créer un fichier `tokens.scss` + injection via CSS variables.
- Vérifier i18n (libellés `aria-label` centralisés).

### Tests & a11y (30’)
- Quick win : test sur `aria-invalid`, `aria-describedby`.
- Lancer `npm run test shared-ui` → analyser coverage.
- Axe-core sur Storybook : corriger contraste et focus.

### CI & publish (20’)
- Config GitHub Actions (ou GitLab CI) : jobs `lint`, `test`, `build`, `publish` conditionnel.
- Montrer publish sur registry local : `npm publish --registry http://localhost:4873`.
- Distribuer checklist CI, valider gating avec tech lead.

## Gestion des risques

| Risque | Probabilité | Impact | Parade |
| --- | --- | --- | --- |
| Participants sans setup | Moyenne | Haute | Prévoir 15’ de support avant séance (00-setup) |
| Discussion design system dérive | Moyenne | Moyenne | Timebox, noter sujets parking lot |
| Temps tests/a11y sacrifié | Haute | Haute | Imposer test minimal + rappel qualité oblige |
| Registry externe indisponible | Faible | Moyenne | Démontrer publish en local (Verdaccio ou tarball) |

## Post-workshop (J+1)

- Envoyer `handouts/starter-kit-notes.md` complété (décisions + TODO).
- Planifier un checkpoint à J+14 pour suivre adoption des composants.
- Partager pipeline CI exemple + checklist CI signée.

## KPIs de réussite

- Temps de création d’un composant standard < 30 min.
- Couverture tests composants > 80% sur librairie.
- 100% des formulaires critiques migrés vers typed forms en < 6 semaines.

Bon workshop !
