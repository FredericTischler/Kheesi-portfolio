# Solution — Exercice 04 (Quality gates)

## Checks PR
| Critère | Type | Détails |
| --- | --- | --- |
| Lint | Blocking | `npm run lint` ok |
| Tests unitaires | Blocking | Coverage >= seuil module |
| Build | Blocking | `npm run build` |
| Storybook | Warning | Build doc pour QA |
| Scan vulnérabilités | Warning | Dependabot/Snyk |

## Definition of Done
- Tests pertinents ajoutés/MAJ.
- Docs (README/ADR) actualisées.
- Storybook / screenshots attachés si UI.
- Ticket mis à jour (état, notes).

## Template PR (extrait)
```
## Checklist
- [ ] Tests unitaires ajoutés ou non nécessaires
- [ ] Documentation (README/ADR) à jour
- [ ] Vérification accessibilité (tab order, contrastes)
- [ ] Storybook/preview jointe (si UI)
```

## Revue
- Guide revue (`templates/code-review-guide.md`) pour aligner reviewers.
- Rappeler rôles : tech lead -> architecture, QA -> tests/a11y.
- Documentation “juste nécessaire” via `templates/docs-template.md`.

## KPIs
- Temps moyen review < 48h.
- % PR bloquées (lint/tests) < 10%.
- % PR sans doc à 0 (grâce checklist).
