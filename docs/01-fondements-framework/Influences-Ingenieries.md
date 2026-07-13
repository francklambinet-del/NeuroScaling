---
id: influences-ingenierie
title: ⚙️ Influences d'Ingénierie & Paradigmes Technologiques
sidebar_label: Influences d'Ingénierie
slug: /Influences-ingenierie
---

L'infrastructure d'exécution de **NeuroScale** s'appuie sur des patterns avancés d'ingénierie des connaissances et des systèmes d'agents autonomes. Contrairement aux fondements scientifiques globaux du framework, ces influences dictent l'implémentation logicielle concrète de nos registres de données et d'exécution.

Trois piliers de l'ingénierie logicielle moderne gouvernent notre architecture : **L'Ingénierie des Connaissances par Ontologie (OntoKG)**, **L'Ingénierie de Boucle (Loop Engineering)**, et **Le Pattern Architectural Blackboard**.

---

## 1. Ingénierie des Connaissances : L'Approche OntoKG

Pour structurer notre modèle de données organisationnel (le *Dual-Graph*), NeuroScale dépasse la simple base de données relationnelle ou le graphe de propriétés basique. Nous intégrons les principes de construction d'**OntoKG** *(Ontology-Oriented Knowledge Graph Construction with Intrinsic-Relational Routing, Li et al., 2026)*.

Dans NeuroScale, cela se traduit par des patterns d'ingénierie stricts au niveau du **Registre R1** (Assainissement déterministe), exécuté sans aucun recours aux LLM par le composant `graph_builder.py` :

* **Routage Intrinsèque-Relationnel (Intrinsic-Relational Routing) :** Le graphe sépare strictement ce qu'est une entité de la manière dont elle se relie. 
  * Les attributs **Intrinsèques** (définissant l'entité, ex: `type_topologie` pour une équipe, `sp_en_otage` pour un blocage) sont stockés au niveau des nœuds.
  * Les attributs **Relationnels** (définissant les interdépendances, ex: `INTERACT_AVEC`, `BLOQUÉE_PAR`, `LIVRÉE_EN`) caractérisent des arêtes typées traversables[cite: 2]. Ce typage strict permet au système de calculer un routage sémantique des anomalies en $O(1)$.
* **Zéro Calcul Interne & Persistance (Compatibilité ADR-001) :** Le graphe est une structure de données pure[cite: 2]. Aucun calcul n'est effectué au sein du graphe[cite: 2]. Les moteurs R1 (`temporal_engine`, `cli_engine`, `nocicepteur`) lisent et écrivent des attributs enrichis calculés de manière déterministe (scores `cli_score`, `dor_score`, tendances `velocity_trend`) directement sur les nœuds[cite: 2].
* **Catégorisation Rigide et "Gate Matching" :** Les données brutes issues de l'écosystème de delivery (Jira/GitHub) sont triées et projetées selon 9 catégories de nœuds racines mutuellement exclusives : `ART`, `PI`, `TEAM`, `SPRINT`, `FEATURE`, `USER_STORY`, `DEPENDANCE`, `BLOCAGE`, et `MEMBRE` (les données de ce dernier étant strictement agrégées et anonymisées conformément à l'ADR-004).
* **Génération sous Contrainte Sémantique & Audit d'Annotation :** Avant qu'une donnée de backlog ne soit exposée aux agents de la Couche 4, le `DataQualityEngine` réalise un audit d'annotation strict. L'ontologie sert de "rail" sémantique immuable : l'extraction et le diagnostic des anomalies par les LLM sont contraints par ce schéma d'ingénierie, éliminant mathématiquement le risque d'hallucination structurelle.

### Pipeline d'Initialisation et Couplage R1/R2
Le cycle de vie du graphe, orchestré par `graph_builder.py` (via NetworkX en mémoire / Neo4j en production), suit un flux d'ingestion linéaire standardisé avant de passer la main aux agents[cite: 2] :
```text
[Extraction Batch Jira] ──> [Gate Matching / Classification] ──> [Hydratation Intrinsèque]
                                                                        │
                                                                        ▼
[Prêt pour Couche 4] <── [Écriture Métriques R1] <── [temporal_engine: Min 3 Sprints]
```
---

## 2. Ingestion Systémique : Le Loop Engineering

La v4.0 de NeuroScale marque le passage du dialogue linéaire avec l'IA (Prompt Engineering) à la conception de **systèmes automatisés autonomes, bouclés et auto-correcteurs**, selon les principes du **Loop Engineering** *(Osmani, Steinberger, Cherny, juin 2026)*.

Nous traduisons cette ingénierie logicielle par une implémentation stricte en 5 mouvements, principalement matérialisée dans le **Registre R2** :

```text
[Discovery: R1 Engine] ──> [Handoff: Filtre Contextuel] ──> [Execution: R2 Agents]
▲                                                             │
│                                                             ▼
[State Persistence] <── [Human-In-The-Loop / Caps] <── [Verification: EvaluatorAgent]
```

### L'implémentation des 5 Mouvements (Moves)
1. **Discovery (Découverte) :** Le `DataQualityEngine` et le `PatternDetector` (Registre R1) découvrent et isolent de manière déterministe les ruptures de flux ou de données.

2. **Handoff (Passation) :** Le *Filtre Contextuel* prend ces faits certifiés et les distribue sous forme de "distillats" compacts aux agents de la Couche 4, optimisant drastiquement la bande passante et le coût en tokens.

3. **Verification (Vérification) :** Rompant avec l'anti-pattern de l'auto-évaluation, NeuroScale introduit la séparation d'ingénierie **Maker-Checker**. Un agent de spécialité (ex: `CapacityAgent`) génère un diagnostic, mais seul l'`EvaluatorAgent` (un modèle distinct doté d'une posture sceptique) a le pouvoir de valider la cohérence de la preuve.

4. **Persistence (Persistance) :** L'état de la boucle est consigné de manière immuable et committé dans l'arborescence (`state/dqs_state.md`).

5. **Scheduling (Ordonnancement) :** L'exécution du pipeline R2 s'effectue de manière asynchrone (via LangGraph et des routines planifiées) pour ne jamais impacter le delivery humain.

### Sûreté Logique et Barrières d'Ingénierie (M1 à M3)
Pour contrer les risques inhérents aux boucles autonomes (tels que la *dette de vérification* ou le *Token Blowout*), NeuroScale implémente les verrous définis par l'ADR-031 et l'ADR-032 :
* **Plafonds Budgétaires Précoces (Token Caps) :** Configurés impérativement dans `config/loop_limits.yaml` *avant* tout run asynchrone non supervisé.
* **Point de Contrôle "Porte Ouverte" :** Le graphe expose une primitive native `interrupt()`. Si un indicateur de la phase 2 (DQS) franchit un seuil critique, la boucle se fige instantanément. **L'IA suggère, l'algorithme prouve, l'humain décide.** Le système n'effectue aucune action automatique (pas d'écriture automatisée ou de modification dans Jira sans validation du RTE).

---

## 3. Coordination Décentralisée : Le Pattern Blackboard
Pour orchestrer la collaboration entre nos différents agents experts spécialisés sans tomber dans le piège d'un couplage rigide (de type "chaîne d'appels" séquentielle), la Couche 4 de NeuroScale implémente une variante moderne du pattern architectural Blackboard (Extended Blackboard Systems for Heterogeneous Multi-Agent Consensus, ACM, 2026).

Ce modèle repose sur un espace de travail partagé global et asynchrone, structurant l'intelligence collective du framework à travers trois composants :

* **Le Blackboard (Espace Commun)** : Il s'agit de la mémoire partagée et volatile d'un run, matérialisée par l'état global de notre graphe d'agents. Cet espace est segmenté en zones d'hypothèses, de preuves et de diagnostics validés. Aucun agent ne s'invoque directement ; ils lisent et écrivent exclusivement sur ce tableau de bord.

* **Les Sources de Connaissances (Agents Spécialistes)** : Nos agents (CapacityAgent, DependencyAgent[cite: 2], RiskAgent) agissent comme des experts autonomes. Chacun surveille le Blackboard. Dès que des données correspondant à leur domaine d'expertise y sont publiées par le Registre R1 (ex: une anomalie de topologie ou un conflit de dépendance inter-équipes INTERACT_AVEC), l'agent s'active pour enrichir le tableau avec son diagnostic partiel.

* **Le Contrôleur d'Orchestration (Orchestrator)** : Représenté par notre diagnostic_orchestrator.py[cite: 1, 2], son rôle n'est pas de dicter les étapes, mais d'évaluer continuellement l'état du Blackboard. Il gère les priorités d'exécution des agents en fonction des nouvelles billes déposées sur le tableau et déclare la fin de la session de diagnostic lorsque le consensus ou la validation par l'EvaluatorAgent est atteint.  Cette approche garantit une extensibilité totale : ajouter une nouvelle spécialité d'agent dans NeuroScale consiste simplement à l'abonner aux types d'événements du Blackboard, sans modifier une seule ligne de logique des agents existants.

## Synthèse des Composants d'Ingénierie

| Paradigme d'Ingénierie | Rôle Architectural | Statut dans la v4.0 | Référence Internet | Composants Logiciels |
| :--- | :--- | :--- | :--- | :--- |
| **Ontology-Oriented KG (OntoKG)** | Modélisation et routage déterministe des anomalies du Dual-Graph. Typage strict Intrinsèque/Relationnel | 🟢 Production / Stable | https://arxiv.org/abs/2604.02618| `graph_builder.py`, `DataQualityEngine`, API Graphe (NetworkX/Neo4j) |
| **Loop Engineering** | Orchestration asynchrone multi-agents, isolation Maker-Checker et gestion des limites. | 🔴 Déploiement Ciblé (Phase 2 DQS) | | `diagnostic_orchestrator.py`, `EvaluatorAgent`, `loop_limits.yaml` |
| **Architecture Blackboard** | Découplage des agents experts, gestion asynchrone du statut et consensus de diagnostic. | 🟢 Production / Stable | https://arxiv.org/abs/2510.01285 |`diagnostic_orchestrator.py`, Context State Graph |

Pour comprendre comment  étendre ces boucles ou enrichir nos contrats d'interfaces d'agents, reportez-vous aux [Spécifications de l'Architecture Blackboard Étendue](./blackboard-etendu).