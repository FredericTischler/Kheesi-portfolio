# Exercice 05 — CI & diffusion

## Objectif
Automatiser les contrôles qualité et préparer la publication de la librairie Angular sur un registry interne.

## Étapes

1. **Configurer les scripts npm**
   ```jsonc
   {
     "scripts": {
       "lint": "ng lint shared-ui",
       "test": "ng test shared-ui --watch=false",
       "build:lib": "ng build shared-ui",
       "ci": "npm run lint && npm run test && npm run build:lib"
     }
   }
   ```

2. **Créer un workflow GitHub Actions (ou GitLab CI)**
   ```yaml
   name: shared-ui-ci
   on: [pull_request]
   jobs:
     quality:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: "npm"
         - run: npm ci
         - run: npm run ci
     publish:
       needs: quality
       if: github.event_name == 'workflow_dispatch'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: npm ci
         - run: npm run build:lib
         - run: npm publish --registry ${{ secrets.VERDACCIO_REGISTRY }} --tag prerelease
   ```

3. **Registry local (facultatif)**
   ```bash
   npx verdaccio@latest --config verdaccio.yaml
   npm set registry http://localhost:4873
   npm publish dist/shared-ui --tag prerelease
   ```

4. **Checklist CI**
   - Compléter `checklists/checklist-ci.md` pendant la session.
   - Ajouter un critère “Storybook build ok” avant merge.

## Résultats attendus

- Pipeline `lint + test + build` obligatoire sur chaque PR.
- Publication (prerelease) possible en un clic.
- Checklist CI signée par le tech lead.

## Critères de réussite

- Pipeline < 5 minutes sur repo demo.
- 0 dépendance critique non gérée (audit npm clean).
- Release note automatique (`changeset` ou `semantic-release`) envisagée.

Consultez `exercices/solutions/05-ci-integration.md` pour les exemples détaillés.
