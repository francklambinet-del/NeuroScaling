---
title: "ADR-037 — Statut des nœuds déterministes dans la boucle Maker-Checker R2"
---

# ADR-037 — Statut des nœuds déterministes dans la boucle Maker-Checker R2

**Statut :** 🟢 Actée (arbitrage humain rendu le 2026-08-03, sur la base du brouillon produit par `Documentation/Audit/AUDIT-05` §5.3)
**Contexte de l'arbitrage :** `DRIFT-002` (registre de dérives, `Documentation/Audit/AUDIT-04`) — le traitement des nœuds déterministes dans le graphe R2, seul écart candidat à une formalisation ADR resté ouvert à l'issue de la Phase 5 de l'audit (l'autre, le Blackboard, a été tranché par `ADR-036`).

## Contexte

`capacity_maker_node` et `dependency_maker_node` (`src/neuro_scale/agents/orchestrators/state_monitor/graph.py`) sont 100 % déterministes : calcul direct sur données R1 (WIP Jira via `CapacityAgent`/`WorkloadOptimizer`, cycles NetworkX via `DependencyAgent`), zéro appel LLM. Ils sont néanmoins routés dans la même boucle Maker-Checker (ADR-032/033) que `executor_node`, une boucle conçue spécifiquement contre le risque d'hallucination d'un générateur LLM.

Sur ce chemin, `EvaluatorAgent` (`src/neuro_scale/agents/evaluators/evaluator_agent.py`) n'a structurellement rien à challenger adversarialement sur 3 de ses 4 checks :
- `_check_threshold` : vacuously PASS en l'absence de `confidence` (jamais produit par un Maker déterministe).
- `_check_rule_id` : vacuously PASS en l'absence de `rule_id` cité dans le draft.
- `_check_hypothesis` (le seul check à appel LLM) : vacuously PASS explicite sur `state["maker_source"] == "deterministic"` — pas d'hypothèse générée par LLM à contre-argumenter.

Seul `_check_kg` s'exécute réellement sur ce chemin, et il valide l'entrée (`source_id` résolvable dans le KnowledgeGraph), jamais le contenu produit par le Maker. Ce raisonnement (« pas de risque d'hallucination par construction ») est correct en soi (`AUDIT-03`), mais sa conséquence de gouvernance — un verdict `PASS` visuellement et structurellement indiscernable d'un PASS obtenu par vérification adversariale réelle sur un draft LLM — n'avait jamais été assumée comme un choix architectural explicite avant cet ADR.

## Décision

**Option A retenue** (des trois options du brouillon `AUDIT-05` §5.3 — B : retirer ces nœuds de la boucle Evaluator ; C : concevoir un check dédié — écartées à ce stade, non définitivement) : assumer le statu quo de routage, et le rendre visible plutôt que de le masquer derrière un verdict `PASS` de même forme qu'un verdict adversarial.

Mise en œuvre :

1. **`EvaluatorAgent.evaluate()`** retourne désormais un champ `verdict_kind: Literal["adversarial", "deterministic_bypass"]`, aux côtés du `verdict` binaire existant (préservé sans changement pour la compatibilité du routage `arbiter_router`). `verdict_kind = "deterministic_bypass"` uniquement quand `verdict == "PASS"` **et** `state["maker_source"] == "deterministic"` ; tout REJECT reste `"adversarial"` (un rejet réel n'est jamais un "bypass").
2. **`state_monitor/graph.py::evaluator_node`** commite ce champ dans l'état (`evaluator_verdict_kind`), aux côtés de `evaluator_verdict`.
3. **`workflow_router.py::run_workflow`** l'expose dans la réponse API (`evaluator_verdict_kind`).
4. **Rapport HTML** (`reporting/html_generator.py::_render_r2_audit_matrix`) affiche un badge distinct — gris (`badge-grey`, cohérent avec la palette existante `badge-green`/`badge-red`/`badge-orange`/`badge-grey`), libellé « PASS — vérification non applicable (source déterministe) » — au lieu du badge vert identique à un PASS LLM vérifié.

## Conséquences

- Aucun changement de topologie du graphe LangGraph : `capacity_maker_node`/`dependency_maker_node` restent dans la boucle Maker-Checker.
- Aucun changement au routage `arbiter_router` : celui-ci continue de lire `evaluator_verdict` (PASS/REJECT binaire), inchangé — `verdict_kind` est un champ d'observabilité/reporting, pas un troisième état de décision.
- `tests/architecture/test_invariants.py::test_inv04_aucun_pass_totalement_vacuous` reste `xfail(strict=True)` : cet ADR ne supprime aucun vacuous PASS dans le code (le court-circuit sur `maker_source == "deterministic"` existe toujours dans `_check_hypothesis`), il en documente et en affiche la nature. Le test vérifie une propriété du code source (absence de chemin vacuous), pas la présence du nouveau champ — il n'y a donc rien à corriger dans son assertion.
- Cette décision peut être révisée : si un futur audit ou un incident montre que le PASS "deterministic_bypass" masque un vrai risque (ex: un bug dans `CapacityAgent` produisant un draft incorrect que rien ne vérifie), les options B ou C du brouillon `AUDIT-05` §5.3 restent disponibles.

## Portée de cet ADR

Formalise un choix de gouvernance sur un comportement de code déjà existant (le court-circuit déterministe, introduit le 2026-07-31, `ROAD-PH3-X19`) ; ajoute un champ d'observabilité (`verdict_kind`) et son affichage dans le rapport. Ne modifie ni la logique de dispatch des Makers, ni le comportement des Makers LLM (`maker_source` absent ou différent de `"deterministic"` → `verdict_kind` toujours `"adversarial"`, comportement inchangé).
