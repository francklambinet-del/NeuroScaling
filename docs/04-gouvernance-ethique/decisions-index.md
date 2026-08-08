---
id: decisions-index
title: Registre des Décisions d'Architecture (ADR)
sidebar_label: Index des ADR
---

# Registre des Décisions d'Architecture (ADR)

Ce registre centralise les décisions d'architecture structurantes de l'**NeuroScaling Architecture**. Chaque décision répond à un défi technique ou cognitif spécifique et s'impose comme un contrat technique strict pour les développeurs et les auditeurs du framework.

> **Dernière vérification de conformité code : 2026-08-02** (`AUDIT-01`, `AUDIT-04`). Les fitness functions exécutables correspondantes se trouvent dans `tests/architecture/test_invariants.py` (racine du dépôt, hors périmètre du site Docusaurus).

---

## 🎯 Statut des ADR

La colonne **Décision** et la colonne **Conformité code** sont deux informations distinctes : la première dit si l'arbitrage a été tranché, la seconde si le code le respecte aujourd'hui. Un ADR peut être 🟢 Actée et pourtant ❌ Violée.

**Décision** :
* **🟢 Actée** : Décision ferme, tranchée par l'humain.
* **🎯 À implémenter** : Décision prise et validée, dont le code est en cours de planification.
* **📋 Tracée (P1/P2/P3)** : Option d'architecture identifiée et priorisée pour les versions futures.
* **⏸️ Reportée (DEFERRED)** : Volontairement mise en attente jusqu'à activation des conditions requises.

**Conformité code** (audit du 2026-08-02) :
* **✅ Vérifiée** : Preuve `fichier:ligne` établissant que le code respecte la décision.
* **⚠️ Partielle** : Une partie du contrat est réalisée, une autre ne l'est pas — voir l'Impact pour le détail.
* **❌ Violée** : Le code contredit ou ne réalise pas la décision.
* **👻 Sans objet en code** : Le composant ou mécanisme cité n'existe pas dans le code (0 occurrence).
* **❔ Non vérifiée** : Non auditée à ce jour, ou affirmation non falsifiable par simple lecture (ex. complexité algorithmique).

---

## 📑 Index Complet des Contrats Techniques

### 🛡️ Fondations V1 : Core Architecture & Alignement Humain (ADR 001 à 016)

| Identifiant | Titre de l'ADR | Décision | Conformité code (2026-08-02) | Impact Implémentation & Robustesse |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-001** | Two-Layer Pattern (engine + agents) | 🟢 Actée | ❌ Violée | **Non-négociable en intention.** Interdiction stricte d'injecter des LLM dans `engine/`. Exception constatée : `engine/signals/early_warning_engine.py` appelle un LLM (`use_llm=True` par défaut). Correction en attente d'arbitrage. |
| **ADR-002** | Shadow IA Phase 1 — Lecture Seule | 🟢 Actée | ❌ Violée | Niveau 0 d'autonomie annoncé par défaut, mais `TriageAgent.triage_incident` (`agents/orchestrators/triage_agent.py:79-90`) écrit sans HITL sur Jira (`update_issue` priorité/labels + `add_comment`), atteignable via `POST /uva/triage` (`api/routers/uva_router.py:113-116`). Ce n'est pas de la lecture seule. |
| **ADR-003** | Théorie des Contraintes dans DependencyAgent | 🎯 À implémenter | ✅ Vérifiée | Aucune. **Témoin positif** : statut « à implémenter » confirmé par `dependency_agent.py:24-27`. Ne pas modifier. |
| **ADR-004** | Scores agrégés par équipe, jamais individu | 🟢 Actée | ⚠️ Partielle | Aucun champ d'identité individuelle n'existe dans les modèles de données. L'invariant tient par absence de champ, non par un mécanisme de blocage actif — il n'existe pas de « Quality Guard » qui bloque un tracking nominatif en amont. |
| **ADR-005** | Wardley Mapping comme inférence expérimentale | 📋 Tracée (P2) | 👻 Sans objet | `WardleyMapper` : **0 occurrence** dans le code. Le Wardley Mapping est implémenté dans `StrategicAdvisor`, pas dans un composant isolé dédié. |
| **ADR-006** | Format RPD — Recommandation, Preuve, Diagnostic | 🎯 À rétrofiter | ⚠️ Partielle | Implémenté sur 3 agents (capacity, predictive_engine, value_arbitrator). Format réel : 3 champs (R/P/D). Aucune validation de contrat (pas de modèle Pydantic RPD générique). |
| **ADR-007** | Complexity Coverage Ratio (Ashby) | 📋 Tracée (P2) | ❌ Violée | Aucun avertissement système lié à un seuil de 50 personnes n'a été trouvé (`rg "50" engine/context/*.py agents/advisors/capacity_agent.py` = aucune occurrence pertinente). Le CCR est mentionné (`cli_engine.py:63,402`) mais sans le mécanisme d'alerte annoncé. |
| **ADR-008** | Checklist HRO obligatoire dans chaque AGENT-GUIDE | 🟢 Actée | ❌ Violée | 0 des 14 fichiers `AGENT-GUIDE_*.md` ne contient de checklist HRO. La seule occurrence du sigle « HRO » (`AGENT-GUIDE_PatternDetector.md:25`) référence un framework dans un tableau de patterns, pas une checklist de Haute Fiabilité. |
| **ADR-009** | LangGraph pour l'orchestration multi-agents | 🟢 Actée | ✅ Vérifiée | Aucune. Preuve : `graph.py:1205-1290`. |
| **ADR-010** | Commande CLI unique `neuroscale` pour le Runtime | 🎯 À implémenter | 👻 Sans objet | Aucun `[project.scripts]` ni entry point console dans `pyproject.toml`. Points d'entrée réels : `analyze.py`, `uvicorn`, `make cockpit`. |
| **ADR-011** | Double Boucle d'Apprentissage (Double-Loop) | 🟢 Actée | ⚠️ Partielle | Persistance réelle des propositions (`retro_agent.py:24,133-166` écrit dans `state/rule_proposals.md`), mais aucune relecture ni correction automatique des invites n'a été trouvée — la boucle s'arrête à l'écriture, en attente d'un HITL humain (conforme à `AUDIT-002`, mais ce n'est pas un double-loop bouclé automatiquement). |
| **ADR-012** | TTL par type de nœud & isolation de session | 🟢 Actée | ⚠️ Partielle | « CAS / Content Addressable Storage » retiré du titre : aucun stockage content-addressable n'existe. Le TTL, lui, est réel (`graph/ontology_graph.py`, TTL par `node_type`). |
| **ADR-013** | Validation stricte Pydantic sur les entrées Jira | 🟢 Actée | ⚠️ Partielle | Les payloads corrompus sont rejetés au niveau de l'API (routers Pydantic). La couche `engine/` ingère des dict bruts, sans validation — pas « à l'entrée de R1 » comme annoncé. |
| **ADR-014** | Moteur déterministe prévalant sur le sémantique | 🟢 Actée | ⚠️ Partielle | Aucun mécanisme de priorité explicite (arbitrage code) trouvé entre calculs NetworkX et interprétations d'agents — seul un ordre de priorité de sévérité sans lien avec ce contrat existe (`graph/graph_reader.py:18`). L'invariant est déclaratif, pas appliqué par un mécanisme dédié. |
| **ADR-015** | Isolation complète du runtime d'évaluation | 🟢 Actée | 👻 Sans objet | Aucune trace de sandbox process/conteneur/namespace pour isoler les simulations d'ART (`rg -i "sandbox\|namespace\|container\|isolation"` ne retourne que des noms de classes CSS/UI sans rapport). « Sandbox hermétique » ne correspond à rien dans le code. |
| **ADR-016** | Journalisation centralisée des doutes des agents | 🟢 Actée | 👻 Sans objet | Aucune persistance d'une métrique d'incertitude/doute d'agent trouvée (`rg` sur uncertainty/doute/confidence croisé avec save/store/persist/db = 0 résultat pertinent). |

> **ADR-017** : numéro non attribué. Aucune décision n'a été enregistrée sous cet identifiant.

### ⚡ Évolutions V4 : Multi-PI, Graphes Hybrides & Haute Performance (ADR 018 à 033)

> **Note de numérotation (A.1, 2026-08-02)** : `workflow_router.py:33,66` cite « ADR-031 » pour désigner le gate DQS, et `Influences-Ingenieries.md` cite « ADR-031/032 » pour des sujets relevant en réalité d'ADR-033. Le registre ci-dessous fait foi ; ces citations de code et de documentation sont erronées et doivent être corrigées dans leurs fichiers respectifs, pas ici.

| Identifiant | Titre de l'ADR | Décision | Conformité code (2026-08-02) | Impact Implémentation & Robustesse |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-018** | Passage à la structure Multi-PI native | 🟢 Actée | ✅ Vérifiée | Preuve : `graph_builder.py:76-146` (nœuds `PI:{pi_id}` distincts, y compris PI historiques). |
| **ADR-019** | Pattern B : Architecture Dual-Graph | 🟢 Actée | ✅ Vérifiée | Aucune. Preuve : `graph/knowledge_graph.py` (R1, persistant) vs `graph/ontology_graph.py` (Zone R2, in-memory). **Témoin positif.** Voir `ADR-036`. |
| **ADR-020** | Algorithme FlowMetricsEngine V4 | 🟢 Actée | ❌ Violée | `engine/metrics/flow_metrics_engine.py` ne déclare aucune fonction `async def` (grep = 0) — le moteur est intégralement synchrone, contrairement au « calcul d'états asynchrone » annoncé. |
| **ADR-021** | Registre R1 déterministe immutable | 🟢 Actée | ✅ Vérifiée | Aucune. Écritures R2 limitées à `publish_agent_observation()`. Aucune écriture sur `KnowledgeGraph`. **Témoin positif fort.** |
| **ADR-022** | Moteur de prompt dynamique via Distillats | 🟢 Actée | ❌ Violée | Le cache `lru_cache` est **réel** (`knowledge/distillats.py:60`). L'invariant « zéro seuil codé en dur » est **faux** : ~60 seuils métier en dur répartis sur 15 fichiers, aucun lu depuis un distillat. Arbitrage en attente. |
| **ADR-023** | PredictiveEngineAgent probabiliste | 🟢 Actée | 👻 Sans objet | Titre et impact fantômes : le composant est déterministe (projection linéaire sur pente de vélocité), et **0 occurrence** de « Monte Carlo » dans tout le repo — aucun conteneur isolé. Décision à requalifier en 🎯 À implémenter si le probabiliste reste un objectif. |
| **ADR-024** | Système d'alerte et de badges Bento Grid | 🟢 Actée | ❔ Non vérifiée | Non couverte par `AUDIT-01`. |
| **ADR-025** | Indépendance de déploiement des Graphes R1/R2 | 🟢 Actée | 👻 Sans objet | Un seul artefact déployable trouvé (`docker/Dockerfile`) — aucune preuve de deux artefacts indépendants pour R1 et R2. |
| **ADR-026** | Intégration de la fonction d'interruption `interrupt()` | 🟢 Actée | ❌ Violée | Le graphe principal **n'appelle jamais `interrupt()`** ; il utilise `interrupt_before=["human_review"]` (`graph.py:1289`). Le seul `interrupt()` réel est dans `pi_readiness_graph.py:118`, **module orphelin jamais importé**. Le seuil 0.60 existe (`pi_readiness_engine.py:52`) mais n'est relié à aucun `interrupt()` atteignable. |
| **ADR-027** | Indexation topologique orientée objet du Blackboard | 🟢 Actée | ❔ Non vérifiée | Affirmation de complexité algorithmique — non falsifiable par simple lecture de code ; nécessiterait un benchmark. Ne pas la valider par lecture seule. |
| **ADR-028** | Suppression complète du jargon biologique | 🟢 Actée | ❌ Violée | `ResilienceArchitecture` : **0 occurrence**. `thalamus_cynefin` / `nocicepteur` persistent dans `src/fixtures/v4_pi27_enriched.json` (l.557, 3882, 4205-4319). → Requalifiée 🎯 À implémenter, « renommage partiel, fixtures non migrées ». |
| **ADR-029** | Représentation par Deltas de l'état du Blackboard | 🟢 Actée | ✅ Vérifiée | Aucune. Preuve : `ontology_graph.py:36` (`SprintDelta`), `:346`. Relève de la Zone R3 (cf. `ADR-036`). |
| **ADR-030** | Routage automatique des anomalies via Cynefin | 🟢 Actée | ✅ Vérifiée | *Correction (bon de travaux 08, 2026-08-02)* : `graph.py:33` importe `okr_engine.build_flow_dispatcher_analysis`, pas `cynefin_router.py` directement — la chaîne réelle est `flow_dispatcher_node` (`graph.py:699`) → `okr_engine.build_flow_dispatcher_analysis` (`okr_engine.py:189`) → `cynefin_router.classify_cynefin`. Invocation confirmée, mais indirecte. |
| **ADR-031** | Persistance et export du KnowledgeGraph | 🟢 Actée | ✅ Vérifiée | Aucune sur le fond (`analyze.py:2027` écrit bien le chemin cité). Voir note de numérotation ci-dessus (A.1) : ce n'est pas cet ADR-031 que citent à tort `workflow_router.py` et `Influences-Ingenieries.md` pour le gate DQS. |
| **ADR-032** | DQS Gate R2 — Seuil de qualité données obligatoire | 🟢 Actée | ⚠️ Partielle | Deux écarts : (a) « 26 règles D1→D6 dans `dqs_rules.json` » est triplement faux — 23 fonctions réelles (pas 26), aucune sous une clé `rules` dans ce fichier, et seules D1-D5 sont implémentées (pas D6). (b) « Aucun agent R2 ne s'active si DQS < 70 » est trop large : le gate est **fail-open** en l'absence de `team_id`, et ne couvre que `POST /workflow/run` — les 11 endpoints `/uva/*` (dont `triage_incident`, cf. ADR-002 ci-dessus) ne passent aucun gate. |
| **ADR-033** | Loop Engineering — Séparation générateur/évaluateur & Budget Guard | 🟢 Actée | ⚠️ Partielle | Le fond est conforme (`budget_guard` bien en `set_entry_point`, Evaluator sur modèle distinct, `loop_limits.yaml` chargé). Deux réserves : le chemin `maker_source == "deterministic"` produit un PASS vacuous sur 3 des 4 checks — arbitrage rendu et implémenté, voir `ADR-037` ci-dessous ; `node_timeout_seconds: 120` est déclaré dans `loop_limits.yaml` mais lu par aucun code (réserve restante, hors périmètre `ADR-037`). |
| **ADR-037** | Statut des Makers déterministes dans le Maker-Checker R2 | 🟢 Actée | ✅ Vérifiée | Aucune. Preuve : `evaluator_agent.py` retourne `verdict_kind` (`"adversarial"` \| `"deterministic_bypass"`), commité par `graph.py::evaluator_node`, exposé par `workflow_router.py`, affiché avec un badge distinct par `html_generator.py::_render_r2_audit_matrix`. Tests : `tests/unit/agents/evaluators/test_evaluator_agent.py::test_verdict_kind_adversarial_for_llm_maker_pass`, `::test_hypothesis_vacuously_passes_for_deterministic_maker_no_llm_call`, `::test_verdict_kind_adversarial_on_reject_even_if_deterministic`. |

---

## 📈 Matrice d'Impact Technique (Contrats Critiques)

Le tableau suivant permet aux auditeurs et aux développeurs de vérifier rapidement quels modules du framework sont impactés par les contrats techniques les plus structurants. La colonne « Métrique » renvoie au test réel qui la vérifie quand il existe — une métrique sans test correspondant est une intention, pas une métrique, et n'apparaît pas ici (cf. lignes retirées : présence du nœud `human_review`, validation de types agents à la compilation, indépendance de déploiement R1/R2, non falsifiables ou fantômes) :

| Identifiant | Titre de l'ADR | Composant Principal Impacté | Test / Preuve |
| :--- | :--- | :--- | :--- |
| **ADR-004** | Anonymat & Équipes | `core/models.py` | Absence de champ d'identité individuelle dans les modèles — vérifié par `test_inv09_aucun_champ_d_identite_individuelle_en_sortie` (`tests/architecture/test_invariants.py:409`) |
| **ADR-021** | Registre R1 immutable | `graph/knowledge_graph.py` | Aucune écriture R2 sur `KnowledgeGraph` — vérifié par `test_inv02_r2_n_ecrit_jamais_sur_knowledge_graph` (`tests/architecture/test_invariants.py:107`) |
| **ADR-022** | Prompt par Distillats | `distillats.py` | ❌ Écart connu : ~60 seuils métier codés en dur (`DRIFT-005`), aucun test ne les détecte à ce jour |
| **ADR-026** | Fonction `interrupt()` | `agents/orchestrators/state_monitor/graph.py:1289` | `interrupt_before=["human_review"]` réel — vérifié par `test_inv10b_interrupt_est_atteignable` (`tests/architecture/test_invariants.py:359`) |

---

## 🔍 Processus d'Audit de Conformité

Le dispositif réel est `tests/architecture/test_invariants.py` (racine du dépôt) : 10 tests d'analyse statique (AST), exécutables sans dépendance runtime (`python -m pytest tests/architecture/test_invariants.py`), résultat au 2026-08-02 : **5 `passed`, 5 `xfailed`**. Il n'y a ni linter personnalisé pour un `RPDBaseModel` (0 occurrence dans le code), ni script CI/CD de télémétrie, ni isolation réseau des instances de calcul — ces trois mécanismes ne correspondent à rien d'exécutable dans ce repo.

---

## 📋 Prochains ADRs à Rédiger (Feuille de Route)

* **ADR-034 [Priorité P1]** : Enrichissement du `FlowMetricsEngine` — Intégration de 6 indicateurs simples (*Ratio Features*, *Tech Debt*, *Support*, *Densité Défauts*, *Taux Débordement*, *Prédictibilité Sprint*).
* **ADR-035 [Priorité P2]** : Enrichissement du `FlowMetricsEngine` / `VSMEngine` — Intégration de 5 indicateurs au niveau PI (*Vélocité PI*, *Prédictibilité PI*, *Taux Complétion Features*, *Epic Cycle Time*, *Scope Creep*).

## 🟢 ADR Validé — hors table principale

* **ADR-036** [Validé, 2026-08-02] : Nature du Blackboard R2 — Zone R2 (`OntologyGraph.publish_agent_observation`) reste **volatile in-memory**, Zone R3 (`SprintDelta`/`HistoricalProfile`) reste **persistée par deltas JSON**. Arbitrage rendu lors de `Documentation/Audit/AUDIT-011` (contradiction C-03 entre `Influences-Ingenieries.md` et `blackboard-etendu.md`). Détail complet : [`docs/adr/ADR-036-blackboard-zones-r2-r3.md`](../adr/ADR-036-blackboard-zones-r2-r3.md).
* **ADR-037** [Validé, 2026-08-03] : Statut des Makers déterministes dans le Maker-Checker R2 — le PASS `EvaluatorAgent` sur `capacity_maker_node`/`dependency_maker_node` (zéro LLM) reste vacuous sur 3 des 4 checks, mais porte désormais un `verdict_kind = "deterministic_bypass"` distinct, affiché par un badge dédié dans le rapport HTML plutôt que masqué derrière un PASS de forme identique à une vérification adversariale réelle. Arbitrage rendu sur la base du brouillon `Documentation/Audit/AUDIT-05` §5.3 (`DRIFT-002`, `AUDIT-04`). Détail complet : [`docs/adr/ADR-037-statut-makers-deterministes.md`](../adr/ADR-037-statut-makers-deterministes.md).