# Solution — Exercice 01 (Lint & conventions)

## Scripts npm proposés
```jsonc
{
  "scripts": {
    "lint": "eslint 'src/**/*.{ts,tsx,js}'",
    "lint:fix": "npm run lint -- --fix",
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "stylelint": "stylelint 'src/**/*.{css,scss}'",
    "commitlint": "commitlint --edit"
  }
}
```

## Husky / lint-staged
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

```jsonc
{
  "lint-staged": {
    "src/**/*.{ts,tsx,js}": ["eslint --fix", "prettier --write"],
    "src/**/*.{css,scss}": ["stylelint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

## Règles blocking vs warning
| Règle | Type | Motivation |
| --- | --- | --- |
| `no-floating-promises` | blocking | éviter erreurs runtime async |
| `eqeqeq` | blocking | lisibilité, bugs |
| `max-len` (120) | warning | cohérence sans bloquer |
| `no-console` (warning) | warning | autoriser debug ponctuel |

## Temps cible
- Pre-commit < 12s (tests non exécutés ici).
- `npm run ci` (lint+test+build) < 5 min.

## Documentation
- Ajouter section “Conventions” dans README.
- Script `npm run format:write` pour fix global.
