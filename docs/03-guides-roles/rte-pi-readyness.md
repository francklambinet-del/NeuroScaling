---
id: rte-pi-readiness
title: "🛡️ PI Readiness & Mode Commando"
sidebar_label: Mode Commando (PI Readiness)
slug: /rte-pi-readiness
---

# PI Readiness & Mode Commando

Le runtime réel de Neuro-Scale est un graphe **LangGraph** compilé (`agents/orchestrators/state_monitor/graph.py`), pas un moteur nommé — une version précédente de cette page décrivait un « NeuroScaling Execution Engine (NXE) » qui n'a jamais existé dans le code (0 occurrence, vérifié le 2026-08-02). Cette page a été régénérée en conséquence ; voir `CHANGELOG-LOT1-04.md` pour le détail de la purge.

Le mécanisme de **PI Readiness** s'appuie sur `engine/metrics/pi_readiness_engine.py` (R1), dont la fenêtre de référence est J-15 avant le PI Planning (`days_to_pi=15` figure en exemple dans le code) — aucun déclenchement automatique et daté n'a été trouvé dans le code ; l'activation du mode de préparation renforcée est aujourd'hui un choix opérationnel du RTE, pas un basculement automatique.

---

## 🚨 Les 3 alertes de rupture (Format RPD)

Ces exemples illustrent une sortie type au format **RPD** (Recommandation / Preuve / Diagnostic). Le format RPD réel est implémenté sur **3 agents** (capacity, predictive_engine, value_arbitrator) avec 3 champs simples, sans validation de schéma généralisée — ce n'est pas un standard imposé à tous les agents (cf. `04-gouvernance-ethique/decisions-index.md`, ADR-006).

### A. Alerte de Saturation Cognitive (`CapacityAgent`)
* **R (Recommandation) :** Reporter la Feature [ID] au PI suivant ou augmenter la capacité de l'équipe Alpha.
* **P (Preuve - R1) :** La charge projetée est de 115% sur les sprints 1 et 2 du futur PI (zone cible empirique 40-65%, `capacity_agent.py:45-50`).
* **D (Diagnostic - R2) :** Le `CapacityAgent` détecte un risque de surchauffe (WIP projeté > 75%) entraînant une chute de prévisibilité systémique dès le milieu du train.

### B. Alerte de Dépendance Bloquante (`DependencyAgent`)
* **R (Recommandation) :** Organiser une synchronisation immédiate entre le Train A et le Train B pour sécuriser l'API "Core-Services".
* **P (Preuve - R1) :** 3 Features critiques dépendent d'un composant non encore planifié par le Train fournisseur.
* **D (Diagnostic - R2) :** Le `DependencyAgent` identifie un « Ticket Otage » via NetworkX (`compute_sp_hostage`, `dependency_agent.py:360`) : si la livraison du fournisseur glisse, une part significative de la capacité de sprint peut se retrouver immobilisée. Le seuil de blocage systémique documenté ailleurs dans le corpus (`AGENT-GUIDE_DependencyAgent.md`, `agents-specialite.md`) est **20 % de la capacité de sprint** — cette page utilisait auparavant 40 %, sans source ; corrigé pour converger sur le chiffre confirmé par deux sources indépendantes.

### C. Alerte de Dérive de Valeur (`ValueArbitratorAgent`)
* **R (Recommandation) :** Dé-prioriser la Feature [ID] au profit de la Feature [ID-2].
* **P (Preuve - R1) :** La Feature [ID] consomme 25% de la bande passante globale pour une valeur business jugée marginale.
* **D (Diagnostic - R2) :** Le `ValueArbitratorAgent` signale un désalignement critique avec l'OKR stratégique "Expansion Cloud" : effort technique disproportionné pour une valeur business marginale. Note : aucun calcul de score WSJF complet n'a été trouvé dans le dépôt (cf. `02-moteur-architecture/indicateurs-calculs.md`) — la mention d'un « score WSJF » comme preuve R1 a été retirée de cet exemple.

---

## 🛑 Le cran de sûreté : routage conditionnel vers `human_review`

Le seuil et le mécanisme de blocage décrits ici sont réels et vérifiés — c'est le vocabulaire qui était faux dans une version précédente de cette page (elle attribuait ce mécanisme à l'ADR-001 et à un appel `interrupt()`, tous deux inexacts).

* **Seuil réel :** `PI_READINESS_RISK_THRESHOLD = 0.60` (`engine/metrics/pi_readiness_engine.py:52`) et, dans le graphe d'exécution principal, `if state.get("dor_score", 100.0) < 60.0` route vers `human_review` (`agents/orchestrators/state_monitor/graph.py:396`). Une régression historique de ce seuil à 40.0 a existé et a été corrigée — vérifiée indépendamment lors de l'audit du 2026-07-12 (`AUDIT-007`).
* **Mécanisme réel :** le graphe compilé déclare `interrupt_before=["human_review"]` (`graph.py:1289`) — ce n'est **pas** un appel à la fonction `interrupt()`. Le seul `interrupt()` du dépôt se trouve dans `agents/rituals/pi_readiness_graph.py:118`, un module **orphelin, jamais importé** par aucun point d'entrée (cf. `02-moteur-architecture/Registres.mdx`, `DRIFT-036`). Ne pas confondre les deux : un routage conditionnel avec interruption avant nœud (le mécanisme vivant) et un appel `interrupt()` direct (le mécanisme mort).
* **Conformité invoquée :** le sujet relève de l'ADR-026 (interruption automatique), pas de l'ADR-001 (Two-Layer Pattern engine/agents) — l'ADR-001 n'a aucun rapport avec ce mécanisme.
* **Non confirmé, retiré de cette page :** le verrouillage automatique de la génération d'un rapport de synthèse et la traçabilité d'un « forçage manuel explicite » n'ont aucun référent trouvé dans `reporting/html_generator.py` ni ailleurs dans le dépôt (grep = 0 occurrence). Si ce mécanisme existe, il n'a pas été localisé dans ce lot ; ne pas l'affirmer tant qu'il n'est pas vérifié.

---

## 📋 Checklist de sortie

Avant de clore la phase de préparation, le RTE peut s'appuyer sur les signaux R1 suivants :

* [ ] **Prédictibilité :** La vélocité historique certifiée par `TemporalEngine` (R1, minimum 3 sprints) couvre-t-elle l'engagement du plan proposé ?
* [ ] **Clarté :** Les Features prioritaires possèdent-elles des critères d'acceptation conformes au `QualityGuard` (statuts CONFIANT ≥80 / AVERTISSEMENT 60-79 / BLOQUANT moins de 60) ?

**Retiré de cette page, non confirmé** : une checklist HRO « gérée par le `MentorAgent` » (aucune checklist ni référence HRO trouvée dans `mentor_agent.py`) et une zone tampon chiffrée à 15 % de capacité non engagée (aucune constante de ce type trouvée dans `capacity_agent.py` — les constantes réelles y sont 40/65/75, cf. alerte A ci-dessus).
