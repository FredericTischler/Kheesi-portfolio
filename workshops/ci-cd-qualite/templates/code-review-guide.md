# Guide de revue de code

## Checklist rapide (≤ 10 items)
- [ ] **Lisibilité** : nommages clairs, fonctions courtes, pattern respecté.
- [ ] **Tests** : unitaires / integration / e2e pertinents, coverage mis à jour.
- [ ] **Accessibilité** : focus, aria, contrastes (si UI).
- [ ] **Performance** : appels réseau, boucles, mémoïsation si nécessaire.
- [ ] **Sécurité** : validation inputs, secrets, auth.
- [ ] **Logs & observabilité** : logs utiles, métriques if needed.
- [ ] **Documentation** : README, ADR, runbook mis à jour.
- [ ] **Feature flag / rollback** : stratégie en place si changement critique.

## Process
1. Reviewer principal : tech lead ou pair.
2. QA/Design consultés si impact UX.
3. Post-review : auteur résout commentaires, push fix, mention reviewer.
4. Merge uniquement si CI verte + checklist validée.

## Anti-patterns à éviter
- “LGTM” sans commentaire.
- Requérir 3 reviewers “par défaut” sans valeur.
- Bloquer sur style/format (prettier/lint se charge de ça).

## Conseils
- Privilégier commentaires constructifs (“proposer patch” si possible).
- Ajouter liens doc (guidelines, ADR).
- Mesurer temps review (ex : < 48h) pour suivi.
