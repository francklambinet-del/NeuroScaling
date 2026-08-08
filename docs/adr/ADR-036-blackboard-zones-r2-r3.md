---
title: "ADR-036 — Nature du Blackboard R2 : volatile (Zone R2) vs persistant (Zone R3)"
---

# ADR-036 — Arbitrage de la contradiction Blackboard volatile / persistant

**Statut :** 🟢 Validé (arbitrage humain rendu le 2026-08-02, dans le cadre de l'audit de conformité architecturale, `Documentation/Audit/AUDIT-011`)
**Contexte de l'arbitrage :** contradiction C-03 relevée en Phase 0 de l'audit — `Influences-Ingenieries.md` décrivait le Blackboard comme « mémoire partagée et volatile d'un run », tandis que `blackboard-etendu.md` décrivait une « persistance par deltas » et du snapshotting différentiel. Ces deux affirmations ne pouvaient pas être vraies simultanément pour un seul et même objet.

## Preuve de code (source unique de vérité, ADR-009/AUDIT-009)

Le module `src/neuro_scale/graph/__init__.py` (docstring de tête, autorité du package) distingue explicitement **trois zones**, pas deux :

```
ADR-026 — Blackboard (OntologyGraph) :
- OntologyGraph : graphe in-memory (publish R1 / read R2 + zone R2 ADR-030)
...
ADR-029 — Knowledge Graph structurel SAFe (Pattern B) :
- KnowledgeGraph : graphe orienté SAFe persistant (R1 uniquement)
```

Et dans `src/neuro_scale/graph/ontology_graph.py` :
- `publish_agent_observation()` (ligne 216) écrit dans la **Zone R2** — aucune méthode `save()`/`load()` n'existe pour cette zone ; son cycle de vie est piloté uniquement par TTL/dédoublonnage via `GraphEventBus` (720h logiques, mais bornées par la durée de vie du process — aucun snapshot disque).
- `save_temporal_profiles()` / `load_temporal_profiles()` (lignes 408-432, sous le commentaire explicite `# ------ Zone R3 persistance JSON ----`) sérialisent des `SprintDelta`/`HistoricalProfile` — c'est **cette** zone, distincte, qui implémente réellement la « persistance par deltas ».

**Conclusion factuelle :** les deux documents avaient chacun raison sur un objet réel du code, mais les décrivaient sous le même nom (« le Blackboard »), sans distinguer que ce nom recouvre en réalité deux mécanismes différents avec des garanties différentes :

| Zone | Objet code | Persistance | Portée |
|---|---|---|---|
| **R2** (raisonnement agentique) | `OntologyGraph._graph`, `publish_agent_observation()` | **Aucune** — in-memory, TTL/dédup only | Un run / la durée de vie du process |
| **R3** (profils temporels) | `OntologyGraph._temporal_profiles` (`SprintDelta`/`HistoricalProfile`) | **JSON sur disque**, deltas, chargée/sauvée par `analyze.py` | Cross-sprint, cross-run |

## Décision

1. **La Zone R2 (observations d'agents R2, raisonnement Maker/Evaluator) reste volatile et in-memory.** Aucune persistance disque n'est introduite pour cette zone. Justification :
   - Cohérent avec ADR-021 (monopole d'écriture R1 sur les faits persistés) — persister les sorties R2 créerait un artefact disque qui pourrait être confondu avec un fait R1 validé, érodant la séparation Dual-Graph (ADR-019).
   - Cohérent avec ADR-002 (Shadow IA — lecture seule par défaut, aucune modification automatique sans HITL) — une observation R2 non validée ne doit pas devenir un état durable par défaut.
   - Coût de mise en œuvre nul : c'est déjà l'état réel du code, pas un changement.
2. **La Zone R3 (profils temporels multi-sprints) reste persistée par deltas JSON**, car son objet est structurellement différent : elle sert à des analyses de tendance cross-run (`HistoricalProfile`) et ne représente pas un jugement R2 non vérifié, mais des métriques dérivées.
3. **Correction documentaire requise (à traiter en Phase 4 du registre de dérives, DOC-FAUSSE / OMISSION-DOC selon le fichier)** : `blackboard-etendu.md` doit être corrigé pour ne plus attribuer sa description de « persistance par deltas » à « le Blackboard » générique, mais explicitement à la Zone R3. `Influences-Ingenieries.md` reste correcte pour la Zone R2 et n'a pas besoin de correction sur ce point précis.

## Conséquence pour l'audit en cours

INV-02 et INV-03 (`architecture_contract.yaml`) sont débloqués : la cible d'audit est désormais sans ambiguïté — Zone R2 = volatile, Zone R3 = persistante par deltas, deux objets distincts. Le grep/lecture de code ci-dessus constitue déjà la vérification Phase 1/3 pour ce point précis ; il n'a pas besoin d'être refait.

## Portée de cet ADR

Cet arbitrage documente un fait déjà implémenté (aucun changement de code effectué). Il ne préjuge pas des autres dérives relevées dans `AUDIT-011` (comptage d'agents, ADR-031/032 à double sens, etc.), qui restent à traiter en Phase 1-4 de l'audit.
