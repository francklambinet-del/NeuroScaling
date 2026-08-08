---
id: influences-ingenierie
title: ⚙️ Influences d'Ingénierie & Paradigmes Technologiques
sidebar_label: Influences d'Ingénierie
slug: /Influences-ingenierie
---

L'infrastructure d'exécution de **NeuroScale** s'appuie sur des patterns avancés d'ingénierie des connaissances et des systèmes d'agents autonomes. Contrairement aux fondements scientifiques globaux du framework, ces influences dictent l'implémentation logicielle concrète de nos registres de données et d'exécution.

Trois piliers de l'ingénierie logicielle moderne gouvernent notre architecture : **L'Ingénierie des Connaissances par Ontologie (OntoKG)**, **L'Ingénierie de Boucle (Loop Engineering)**, et **la Coordination des Agents via un graphe à routage explicite** (LangGraph + Zone R2 — *anciennement présentée comme un pattern Blackboard académique ; voir §3 pour la correction de méthode*).

---

## 1. Ingénierie des Connaissances : L'Approche OntoKG

Pour structurer notre modèle de données organisationnel (le *Dual-Graph*), NeuroScale dépasse la simple base de données relationnelle ou le graphe de propriétés basique. Nous intégrons les principes de construction d'**OntoKG** *(Ontology-Oriented Knowledge Graph Construction with Intrinsic-Relational Routing, Li et al., 2026)*.

Dans NeuroScale, cela se traduit par des patterns d'ingénierie stricts au niveau du **Registre R1** (Assainissement déterministe), exécuté sans aucun recours aux LLM par le composant `graph_builder.py` :

* **Routage Intrinsèque-Relationnel (Intrinsic-Relational Routing) :** Le graphe sépare ce qu'est une entité de la manière dont elle se relie.
  * Les attributs **Intrinsèques** sont stockés au plat sur chaque nœud (ex: `team_type` pour une équipe — *correction* : une version précédente citait `type_topologie`/`sp_en_otage`, 0 occurrence dans le dépôt ; le champ réel équivalent pour les blocages est `sp_hostage`/`sp_held_hostage`, cf. `02-moteur-architecture/agents-specialite.md`).
  * Les attributs **Relationnels** caractérisent des arêtes typées : `INTERACT_AVEC` et `BLOQUÉE_PAR` sont réellement utilisés par `graph_builder.py` (`kg.add_relation()`). `LIVRÉE_EN` est déclaré dans le schéma des relations admises (`graph/knowledge_graph.py:51`) mais n'est produit par aucun appel `add_relation()` trouvé dans le dépôt — déclaré, pas encore instancié.
* **Zéro Calcul Interne (Compatibilité ADR-001) :** Le graphe est une structure de données pure, peuplée par `graph_builder.py`. *Correction* : le `nocicepteur`, cité ici comme moteur R1 aux côtés de `temporal_engine` et `cli_engine`, n'existe plus dans le code exécutable — seule sa trace persiste dans une fixture (`src/fixtures/v4_pi27_enriched.json`), en contradiction directe avec l'ADR-028 (« Suppression complète du jargon biologique », statut Actée). Il est retiré de cette liste.
* **Catégorisation par Schéma d'Ontologie :** le `KnowledgeGraph` déclare 9 catégories de nœuds reconnues (`ENTITY_TYPES`, `graph/knowledge_graph.py:39-42`) : `ART`, `PI`, `SPRINT`, `TEAM`, `FEATURE`, `EPIC`, `USER_STORY`, `DEPENDANCE`, `BLOCAGE` — *correction* : une version précédente listait `MEMBRE` à la place d'`EPIC`, qui est la 9e catégorie réelle. Ces 9 catégories sont un schéma déclaré ; `graph_builder.py` n'instancie effectivement que `ART`, `PI`, `SPRINT`, `TEAM` et `FEATURE` comme nœuds — `USER_STORY` est analysée via la liste brute des tickets sans être ingérée comme nœud (cf. `CLAUDE.md`), et aucun appel `add_entity()` n'a été trouvé pour `DEPENDANCE`, `BLOCAGE` ou `EPIC`. Les données proviennent de Jira ; aucun adapter GitHub n'existe dans le dépôt (cf. `02-moteur-architecture/indicateurs-calculs.md`, `Registres.mdx`).
* **Contrainte de Schéma :** avant qu'une donnée de backlog ne soit exposée aux agents de la Couche 4, le `DataQualityEngine` calcule un score de qualité par dimension (gate `_check_dqs_gate`, HTTP 412 en amont de `POST /workflow/run` si le score est insuffisant). C'est une contrainte de schéma réelle qui réduit plausiblement le risque de dérive sémantique en amont des agents — *correction* : elle ne « élimine » rien mathématiquement. Le mécanisme de vérification côté sortie des affirmations LLM (`kg_anchors`) reste par ailleurs incomplet (cf. `02-moteur-architecture/blackboard-etendu.md`, `DRIFT-003`) : la réduction de risque porte sur l'entrée, pas sur une garantie de sortie.

### Pipeline d'Initialisation et Couplage R1/R2
Le cycle de vie du graphe, orchestré par `graph_builder.py` (via NetworkX en mémoire — une migration vers Neo4j est évoquée comme piste V5 dans `knowledge_graph.py:16`, mais aucun driver ni dépendance `neo4j` n'existe dans `pyproject.toml` : ce n'est pas un état de production actuel), suit un flux d'ingestion linéaire standardisé avant de passer la main aux agents :
```text
[Extraction Batch Jira] ──> [Gate Matching / Classification] ──> [Hydratation Intrinsèque]
                                                                        │
                                                                        ▼
[Prêt pour Couche 4] <── [Écriture Métriques R1] <── [temporal_engine: Min 3 Sprints]
```
---

## 2. Ingestion Systémique : Le Loop Engineering

La v4.0 de NeuroScale marque le passage du dialogue linéaire avec l'IA (Prompt Engineering) à la conception de **systèmes automatisés autonomes, bouclés et auto-correcteurs**, selon les principes du **Loop Engineering** *(Osmani, Steinberger, Cherny, juin 2026)*.

Nous **adaptons** cette ingénierie logicielle — et non transposons littéralement — en 5 mouvements propres à NeuroScale, principalement matérialisés dans le **Registre R2**. *Précision* : l'architecture en cinq parties d'Osmani (découverte, décomposition de tâches, couche d'orchestration, vérification, mémoire persistante) est différente de celle décrite ci-dessous ; la coïncidence du chiffre 5 ne doit pas laisser penser qu'il s'agit de la même taxonomie.

```text
[Discovery: R1 Engine] ──> [Handoff: Filtre Contextuel] ──> [Execution: R2 Agents]
▲                                                             │
│                                                             ▼
[State Persistence] <── [Human-In-The-Loop / Caps] <── [Verification: EvaluatorAgent]
```

### L'implémentation des 5 Mouvements (Moves)
1. **Discovery (Découverte) :** Le `DataQualityEngine` et le `PatternDetector` (Registre R1) découvrent et isolent de manière déterministe les ruptures de flux ou de données.

2. **Handoff (Passation) :** Le *Filtre Contextuel* prend ces faits certifiés et les distribue sous forme de "distillats" compacts aux agents de la Couche 4, optimisant drastiquement la bande passante et le coût en tokens.

3. **Verification (Vérification) — témoin positif.** Rompant avec l'anti-pattern de l'auto-évaluation, NeuroScale introduit la séparation d'ingénierie **Maker-Checker** (ADR-032). Un agent de spécialité (ex: `CapacityAgent`) génère un diagnostic, mais seul l'`EvaluatorAgent` — sur un **modèle distinct** du générateur (`call_neuro_scaling_r2`, `EVALUATOR_MODEL`, température 0.0) — a le pouvoir de valider la cohérence de la preuve. Réserve connue, résolue et implémentée (`ADR-037`, 2026-08-03) : pour les Makers déterministes (`capacity_maker`, `dependency_maker`), 3 des 4 checks de l'Evaluator passent toujours en PASS vacuous plutôt que de s'exécuter — désormais marqué explicitement `verdict_kind = "deterministic_bypass"` et affiché avec un badge distinct dans le rapport, plutôt que présenté comme une vérification adversariale complète (`DRIFT-002`).

4. **Persistence (Persistance) :** `state/dqs_state.md` existe réellement et porte l'avertissement « Ne pas modifier manuellement sauf escalade humaine explicite » — géré par le skill `dqs-triage` (`.claude/skills/dqs-triage/`), commité en historique git. Au moment de cette vérification, son contenu est encore à l'état `INIT` (2026-07-06) : le mécanisme est en place, son usage en cycle réel n'est pas encore observable dans le dépôt.

5. **Scheduling (Ordonnancement) :** confirmé réel — `.github/workflows/triage.yml` déclenche un cron quotidien (`0 6 * * 1-5`, jours ouvrés) en plus de l'exécution asynchrone LangGraph.

### Sûreté Logique et Barrières d'Ingénierie
Pour contrer les risques inhérents aux boucles autonomes (tels que la *dette de vérification* ou le *Token Blowout*), NeuroScale implémente les verrous définis par l'**ADR-033** (Loop Engineering — Budget Guard) — *correction* : une version précédente citait ADR-031/ADR-032 ; le sujet réel est l'ADR-033 (cf. `04-gouvernance-ethique/decisions-index.md`). Note de méthode : le code lui-même se trompe au même endroit (`workflow_router.py:33,66` cite ADR-031 pour le gate DQS) — la numérotation était instable jusque dans le code, arbitrage rendu au bon de travaux 01 (le registre fait foi, les commentaires de code restent à corriger séparément).
* **Plafonds Budgétaires Précoces (Token Caps) — témoin positif :** `config/loop_limits.yaml` existe réellement et est relu par `budget_guard_node` à chaque passage (`state_monitor/graph.py:60,422`), premier nœud du graphe (`set_entry_point`).
* **Point de Contrôle HITL :** *correction* : le graphe vivant n'expose pas de primitive `interrupt()` — il utilise `interrupt_before=["human_review"]` (`graph.py:1289`), un routage conditionnel vers un nœud d'arrêt, pas un appel direct. Le seul `interrupt()` du dépôt est dans un module orphelin (`agents/rituals/pi_readiness_graph.py:118`, jamais importé). Par ailleurs, le gate DQS ne « fige » pas une boucle en cours : il retourne un **HTTP 412 en amont** du graphe (`POST /workflow/run`), avant tout démarrage — et il est **fail-open** en l'absence de `team_id`, sans couvrir les 11 endpoints `/uva/*`. **L'IA suggère, l'algorithme prouve, l'humain décide** reste une description fidèle du principe HITL réel ; aucune écriture automatique n'a été trouvée dans un chemin R2 atteignable sans validation, à l'exception notable de `TriageAgent` qui écrit sur Jira sans HITL (cf. `04-gouvernance-ethique/decisions-index.md`, ADR-002).

---

## 3. Coordination des Agents : Graphe LangGraph + Zone R2

*Correction de méthode (2026-08-02)* : une version précédente de cette section citait une référence académique — « Extended Blackboard Systems for Heterogeneous Multi-Agent Consensus, ACM, 2026 » — dont l'URL pointait vers un papier réel mais sans rapport : titre, auteurs, support et année étaient tous inventés. Le papier réel à cette adresse (arXiv, 2025, Salemi et al., *LLM-Based Multi-Agent Blackboard System for Information Discovery in Data Science*) décrit un modèle volontariste — un agent central poste des requêtes, des sous-agents se portent volontaires selon leurs capacités — qui ne correspond pas à l'architecture de NeuroScale, un graphe à **routage explicite**, pas un tableau où les agents s'invitent eux-mêmes. La citation est retirée plutôt que raccommodée ; la section décrit ci-dessous le mécanisme réel, sans référence académique à l'appui.

Les agents de la Couche 4 ne s'invoquent pas entre eux : ils sont des nœuds d'un graphe **LangGraph** compilé (`agents/orchestrators/state_monitor/graph.py`), reliés par un routage conditionnel explicite (`add_conditional_edges`), et communiquent principalement via un état partagé transporté de nœud en nœud, `NeuroScaleState` (`core/models.py:185`). Un canal complémentaire existe :

* **La Zone R2 (`OntologyGraph`)** : mémoire partagée et **volatile** d'un run (`graph/ontology_graph.py`) — *ce point était juste dans une version précédente de cette page, et reste vrai* : aucune méthode save/load, TTL par `node_type` (720h). *Correction* : les zones « d'hypothèses, de preuves et de diagnostics validés » ne sont pas des structures nommées comme telles dans le code — à ne pas présenter comme un schéma figé. *Correction* : les agents n'écrivent pas « exclusivement » sur cette zone — l'essentiel de leur échange transite par `NeuroScaleState`, et l'écriture sur l'`OntologyGraph` se fait via un seul point d'entrée, `publish_agent_observation()`.
* **Les agents spécialistes** (`CapacityAgent`, `DependencyAgent`, etc.) sont invoqués par le routeur du graphe (`ontology_category_router`, `specialist_maker_router`), pas par une surveillance volontaire d'un tableau partagé. *Correction* : `RiskAgent`, cité ici, a **zéro occurrence** dans le dépôt — retiré.
* **Le routage** est assuré par le graphe LangGraph lui-même (nœuds `flow_dispatcher`, `arbiter`), pas par `diagnostic_orchestrator.py` — ce module ne contient que des dataclasses et des règles pures de corrélation, avec **zéro import du Blackboard, zéro appel d'agent, zéro écriture** sur une quelconque zone mémoire ; sa seule dépendance externe est `temporal_engine.TemporalContext`. Le nœud qui clôture effectivement une session de diagnostic est `arbiter_node` (`graph.py:1019`). *Correction* : ajouter un nouveau Maker exige d'ajouter un nœud et de modifier le routeur (`add_node` + `add_conditional_edges` + `ontology_category_router`, `graph.py:1085-1120`) — ce n'est pas un abonnement à des événements sans modification de code.

## Synthèse des Composants d'Ingénierie

| Paradigme d'Ingénierie | Rôle Architectural | Statut dans la v4.0 | Référence Internet | Composants Logiciels |
| :--- | :--- | :--- | :--- | :--- |
| **Ontology-Oriented KG (OntoKG)** | Modélisation et routage déterministe des anomalies du Dual-Graph. Typage strict Intrinsèque/Relationnel | 🟢 Production / Stable | https://arxiv.org/abs/2604.02618 | `graph_builder.py`, `DataQualityEngine`, `graph/knowledge_graph.py` (NetworkX — *Neo4j retiré : piste V5 non implémentée, aucune dépendance dans `pyproject.toml`*) |
| **Loop Engineering** | Orchestration asynchrone multi-agents, isolation Maker-Checker et gestion des limites. | 🔴 Déploiement Ciblé (Phase 2 DQS) — statut le plus honnête de ce tableau, conservé tel quel | https://www.oreilly.com/radar/loop-engineering-the-new-frontier-of-software-engineering/ | `state_monitor/graph.py` (*correction : `diagnostic_orchestrator.py` retiré, n'orchestre rien*), `EvaluatorAgent`, `loop_limits.yaml` |
| **Coordination des Agents** | Découplage des agents experts via routage LangGraph explicite et état partagé. | 🟢 Production / Stable | *(référence académique retirée — ne soutenait pas le modèle réel, cf. §3)* | `state_monitor/graph.py` (*correction : `diagnostic_orchestrator.py` retiré*), `graph/ontology_graph.py` (Zone R2) |

Pour comprendre comment  étendre ces boucles ou enrichir nos contrats d'interfaces d'agents, reportez-vous aux [Spécifications de l'Architecture Blackboard Étendue](./blackboard-etendu).