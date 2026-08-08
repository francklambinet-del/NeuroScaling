---
id: agents-specialite
title: "🤖 Couche 4 : Catalogue des Agents de Spécialité (NeuroScaling v4.0)"
sidebar_label: Les Agents spécialisés
slug: /agents-specialite
---

# Le Catalogue des Agents de Spécialité

L'infrastructure de **Couche 4** répartit son analyse sémantique entre plusieurs agents spécialisés (cf. `02-moteur-architecture/Registres.mdx` pour le registre complet et le compte vérifié). Chaque agent est un nœud du graphe **LangGraph** compilé (`agents/orchestrators/state_monitor/graph.py`) : ils ne communiquent pas directement entre eux mais reçoivent et transmettent un état partagé, `NeuroScaleState` (`core/models.py:185`, TypedDict), qui transite de nœud en nœud à chaque étape du graphe. Un canal latéral existe — le Blackboard (`publish_agent_observation`) — mais il reçoit des observations, il n'est pas le mécanisme par lequel les agents échangent leur état d'exécution.

Voici les spécifications d'ingénierie de 4 des agents spécialisés du framework.

---

> ¹ *Mise à jour (bon de travaux 08, passe transverse 3)* : « Irréfutable » a été retiré du corpus — le code n'admet que `CALCULÉ`/`PROBABLE`/`NON VÉRIFIÉ` (`diagnostic_orchestrator.py:34-36`), jamais un palier au-dessus de `CALCULÉ`. Vocabulaire aligné sur **ÉTABLI**, cf. `04-gouvernance-ethique/certitudes-gouvernance.md`.

## 1. DependencyAgent (Le Cartographe du Réseau)

### Mission
Le `DependencyAgent` a pour rôle de neutraliser les risques systémiques de livraison en qualifiant la nature des frictions inter-équipes. Il transcende la simple liste de blocages Jira pour modéliser la topologie réelle des flux.
* **Fondement Scientifique :** Loi de la Variété Requise (Ashby) (Niveau vert - ÉTABLI) et Team Topologies (Niveau jaune - Robuste)
* **Triggers (Déclencheurs) :**
  * Détection d'un lien bloquant non résolu (`blocked_by`) entre équipes de l'ART.
  * *Retiré, non confirmé* : un trigger daté « J-7 avant changement de sprint » et un trigger « équipe Goulot par la Théorie des Contraintes » figuraient ici — aucun des deux n'a de référent en code. Le calcul du « drum » (contrainte du système, ADR-003) est explicitement documenté comme non implémenté dans le code lui-même (`dependency_agent.py:23-26` : « reste à implémenter ; seule la détection structurelle est actée à ce jour »).
* **Comportement Algorithmique :** Utilise NetworkX (R1, zéro LLM) pour identifier trois structures pathologiques réelles : les blocages cycliques (*Deadlocks*, détection de cycles), les frictions en chaîne (*Gridlocks*, ex. A bloque B bloque C bloque D — aucun seuil numérique de profondeur n'est configuré dans le code, contrairement à une affirmation précédente de cette page), et les « Tickets Otages » (`compute_sp_hostage`) : Story Points immobilisés par une dépendance non résolue, seuil de criticité `HITL_SP_THRESHOLD = 20` **SP absolus** (`dependency_agent.py:53`) — pas un pourcentage de l'itération. Cette description fait foi contre `02-moteur-architecture/Registres.mdx`, qui attribuait par erreur un usage LLM à ce composant : c'est ici, et dans le code, que le zéro-LLM est confirmé.

```mermaid
graph LR
    %% Configuration des styles
    classDef default fill:#2b2b2b,stroke:#555,stroke-width:1px,color:#ffffff;
    classDef team fill:#0d47a1,stroke:#1976d2,stroke-width:2px,color:#ffffff;
    classDef alerte fill:#5c0606,stroke:#d32f2f,stroke-width:2px,color:#ffffff;

    %% Style spécifique pour le subgraph Deadlock
    style Deadlock fill:#2a0808,stroke:#d32f2f,stroke-width:1.5px,color:#ffffff;

    A[Équipe A] -->|Attend / S'appuie sur| B[Équipe B]
    B -->|Attend / Bloquée par| A

    subgraph Deadlock [Structure Cyclique Détectée]
        A
        B
    end

    class A,B team;
    ```

---

## 2. CapacityAgent (Le Gardien du Flow)

### Mission
Le `CapacityAgent` protège la santé cognitive des collectifs et sécurise la prévisibilité du delivery. Il agit comme un pare-feu biologique contre l'infobésité et le sur-engagement.
* **Fondement Scientifique :** Théorie de la Charge Cognitive (Sweller) (Niveau vert - ÉTABLI)
* **Triggers (Déclencheurs) :**
  * Taux de Work In Progress (WIP) cumulé d'une équipe franchissant le seuil critique de 75% (`SWELLER_OVERLOAD_THRESHOLD`, `capacity_agent.py:45-50`).
* **Comportement Algorithmique :** Il calcule l'indice de charge cognitive extrinsèque du train. Lorsque le seuil de saturation est dépassé, il pousse un diagnostic RPD (3 champs R/P/D, `build_rpd()`, `capacity_agent.py:70`) sommant le management de réduire le WIP ou de geler temporairement l'injection de nouvelles tâches pour ramener le système dans sa Zone Cible de Flow (`FLOW_ZONE_MIN=40` à `FLOW_ZONE_MAX=65`) — seuils exacts et cohérents sur l'ensemble du corpus, fiche de référence.

---

## 3. ValueArbitratorAgent (Le Protecteur Stratégique)

### Mission
Le `ValueArbitratorAgent` (`agents/uva/value_arbitrator_agent.py` — nom de classe réel, corrigé ici) audite l'alignement entre l'effort opérationnel réel du train et la stratégie macro de l'entreprise.
* **Fondement Scientifique :** Alignement OKR (`okr_engine.py`, Niveau jaune - Robuste). *Correction d'attribution* : le Wardley Mapping n'est pas implémenté ici — il l'est dans `StrategicAdvisor` (`agents/advisors/strategic_advisor.py`), cf. `04-gouvernance-ethique/decisions-index.md`, ADR-005.
* **Trigger réel :** dans le graphe d'exécution, ce nœud est déclenché quand `cli_score > cli_budget` **et** `feature_wsjf > 20` (`state_monitor/graph.py:383`). Le champ `feature_wsjf` est un **état transporté**, jamais calculé par un composant du dépôt (cf. `02-moteur-architecture/indicateurs-calculs.md` : aucun calcul WSJF complet trouvé) — son origine n'est pas tracée dans ce lot.
* *Retirés, non confirmés* : un trigger sur « score WSJF » calculé au clôture de sprint, une détection d'incohérence « via embeddings R2 » (le composant est un prompt LLM + chaîne LangChain, aucun embedding — les embeddings du dépôt sont ailleurs, dans le pipeline RAG de `executor_node`), et un seuil de « 25% de bande passante sur un composant commoditisé » — aucune constante de ce type dans le module.
* **Comportement Algorithmique :** Le LLM évalue l'alignement stratégique à partir de l'état transmis (score CLI, `feature_wsjf`, OKR parent) et propose une dé-priorisation quand le conflit CLI/OKR est détecté.

---

## 4. MentorAgent (Le Catalyseur de Posture)

### Mission
Le `MentorAgent` agit comme un conseiller d'architecture et de gouvernance à haute posture pour le Release Train Engineer (RTE). Il utilise l'historique de l'organisation pour transformer les incidents en apprentissages profonds.
* **Fondement Scientifique :** Apprentissage en Double Boucle (Argyris & Schön) (Niveau vert - ÉTABLI) et Naturalistic Decision Making (Niveau jaune - Robuste)
* *Retirés, non confirmés* : un trigger « activation du Mode Commando à J-15 » et un trigger « échec répété sur deux sprints consécutifs » — aucun couplage `PIReadinessEngine`/sprint-history de ce type n'a été trouvé dans `mentor_agent.py`. Ce composant expose 5 modes d'interaction activés à la demande via l'API (`POST /uva/mentor/*`), pas par déclenchement automatique documenté.
* **Comportement Algorithmique :** Il extrait les patterns historiques de réussite et d'échec du train via **5 modes LLM distincts** (JIT, Shadow, Dette, entre autres — `mentor_agent.py`, endpoints `/uva/mentor/jit`, `/uva/mentor/shadow`, `/uva/mentor/debt`). Les distillats décisionnels réellement injectés dans ses prompts sont **Theory of Constraints** et **OODA Loop** (`mentor_agent.py:32,34`) — *correction* : une version précédente de cette page attribuait à ce composant le modèle VSM de Beer ; vérification faite, ce distillat n'est pas injecté ici (`vsm_beer` est chargé par `RetroAgent`, pas par `MentorAgent`). Le principe de double boucle (Boucle Simple vs Boucle Double) reste un fondement conceptuel valide de l'agent, indépendamment de ce distillat.

---

## 5. Garde-fou réel : contrat d'état et vérification adversariale

Une version précédente de cette section décrivait un contrat d'interface `AgentSpecification` (`agent_id`, `trigger_source`, `rpd_payload`, `pattern_detected`, `evidence_facts`) — vérification faite le 2026-08-02, **4 de ces 5 champs ont zéro occurrence dans le dépôt**, le cinquième (`confidence_label`) existe mais uniquement comme sortie interne de `diagnostic_orchestrator.py` (R1), jamais comme champ de contrat en sortie d'agent. Aucun modèle Pydantic ne correspond à cette interface. Elle est retirée intégralement (`AUDIT-02 §B.14`).

Le dispositif réel qui joue ce rôle repose sur trois éléments, avec une lacune connue qui doit être dite sans détour :

1. **Le contrat d'échange réel : `NeuroScaleState`.** Un `TypedDict` de 290 lignes (`core/models.py:185`) transporté de nœud en nœud dans le graphe LangGraph compilé — c'est le contrat que cette section aurait dû décrire depuis le début, et il est absent de l'intégralité du corpus documentaire avant cette révision.
2. **Le mécanisme d'ancrage : `kg_anchors`.** Une liste de références au `KnowledgeGraph` produite par le LLM et incluse dans l'état (`state_monitor/graph.py:900,953`).
3. **Le dispositif de vérification : `EvaluatorAgent`.** (`agents/evaluators/evaluator_agent.py`, 294 LOC) — Checker du Maker-Checker (ADR-032), sur un modèle **distinct** du générateur (`call_neuro_scaling_r2`, `EVALUATOR_MODEL`, température 0.0), invoqué à chaque run (`graph.py:229,983`). Il exécute 4 checks indépendants et verdict PASS/REJECT : `_check_kg`, `_check_threshold`, `_check_rule_id`, `_check_hypothesis`.

> **Ce garde-fou est réel mais incomplet — DRIFT-003.** Le check `_check_kg` (`evaluator_agent.py:128-151`) résout bien `state["source_id"]` contre le `KnowledgeGraph` (`get_knowledge_graph().get_entity(source_id)`) et vérifie un score de confiance minimal. Mais la liste `kg_anchors` elle-même — produite par le LLM, affichée dans le rapport — **n'est jamais résolue contre le `KnowledgeGraph`** : aucun code n'appelle `get_entity()` sur chacune de ses entrées. La vérification d'ancrage porte sur un seul identifiant transporté par ailleurs dans l'état, pas sur les ancres que l'agent prétend citer. C'est la lacune la plus importante de ce dispositif ; documenter le contraire reproduirait, à un niveau plus grave, la fiction que cette révision corrige.
>
> **Réserve secondaire — DRIFT-002, résolue et implémentée (`ADR-037`, 2026-08-03).** Pour les Makers déterministes (`capacity_maker`, `dependency_maker`, zéro LLM), le chemin `maker_source == "deterministic"` fait toujours passer 3 des 4 checks en PASS vacuous plutôt que de les exécuter — ce fait n'a pas changé. Ce qui a changé : `evaluate()` retourne désormais un champ `verdict_kind` (`"adversarial"` | `"deterministic_bypass"`), commité dans l'état et affiché dans le rapport HTML avec un badge distinct (« PASS — vérification non applicable (source déterministe) »), pour ne plus présenter ce chemin comme équivalent visuellement à une vérification adversariale complète. Détail : [`ADR-037`](../adr/ADR-037-statut-makers-deterministes.md).