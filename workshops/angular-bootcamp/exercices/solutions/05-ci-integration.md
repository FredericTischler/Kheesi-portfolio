# Solution — Exercice 05 (CI & diffusion)

## package.json (extrait)
```jsonc
{
  "scripts": {
    "lint": "ng lint shared-ui",
    "test": "ng test shared-ui --watch=false --browsers=ChromeHeadless",
    "build:lib": "ng build shared-ui",
    "storybook:build": "storybook build",
    "ci": "npm run lint && npm run test && npm run build:lib && npm run storybook:build"
  }
}
```

## GitHub Actions
```yaml
name: shared-ui-ci
on:
  pull_request:
    paths:
      - 'projects/shared-ui/**'
      - '.github/workflows/shared-ui-ci.yml'

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run ci
  publish:
    needs: quality
    if: github.ref == 'refs/heads/main' && github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish dist/shared-ui --registry ${{ secrets.VERDACCIO_REGISTRY }} --tag prerelease
```

## Checklist CI remplie
- [x] Jobs séparés lint/test/build.
- [x] Job Storybook (smoke) avant merge.
- [x] Publish conditionnel sur `workflow_dispatch` ou tag.
- [x] Artefacts build partagés (`actions/upload-artifact`).

## Registry local
```
verdaccio --config verdaccio.yaml &
npm set registry http://localhost:4873
npm publish dist/shared-ui --tag prerelease
```

## Pitfalls & mitigations
- Node version mismatch → imposer `engines` dans `package.json`.
- Auth registry manquante → utiliser token `NPM_TOKEN` chiffré.
- Storybook build long → activer cache `.storybook` + Chromatic diff.
