# Solution — Exercice 03 (Pipeline)

## Exemple GitHub Actions (extrait)
```yaml
name: ci
on:
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run test -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

## Temps cible
- lint: 1m30
- test: 3m (cache jest)
- build: 2m (cache)
Total < 7 min (optimiser via parallel + selective runs).

## Monitoring
- Ajouter step `actions/github-script` pour publier durée.
- Historiser dans DataDog/Prometheus.
- Alerting si > 10 min ou > 5% échecs.
