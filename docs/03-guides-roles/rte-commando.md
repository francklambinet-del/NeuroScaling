---
id: rte-commando
title: "🎯 Guide du RTE : Piloter le Train par Exception"
sidebar_label: Guide RTE (Mode Commando)
slug: /guides/rte-commando
---

# 🎯 Guide du RTE : Piloter le Train par Exception

## Philosophie : Du Monitoring à la Protection Cognitive
Le **Release Train Engineer (RTE)** n'est pas un outil humain d'agrégation de rapports Jira, ni un relanceur de tickets en retard. Dans le paradigme *NeuroScaling*, le RTE agit comme le gestionnaire de la stabilité cybernétique et le protecteur de la charge cognitive globale de l'**Agile Release Train (ART)**.

Le framework lui permet de déléguer la surveillance de routine pour concentrer son énergie managériale sur les anomalies critiques et les dérives de structure.

* **Délégation de la Surveillance :** Le moteur déterministe `quality_guard.py` assainit en continu le flux de données en arrière-plan. Si le backlog est structurellement instable ou non documenté, le système isole les éléments perturbateurs.
* **L’Indice de Crédibilité :** Pour chaque tableau de bord, le RTE s'appuie sur les badges de confiance (`CALCULÉ`, `PROBABLE`, `NON VÉRIFIÉ`) certifiés par le **Registre R1**. Il ne prend plus de décisions basées sur des données corrompues ou des estimations fictives.
* **L'Arbitrage de Valeur :** À l'aide de l'agent `ValueArbitrator`, le RTE détecte de manière proactive les désalignements sémantiques ou opérationnels entre l'effort réel fourni par les équipes dans les sprints et les objectifs macro (OKRs) fixés par l'entreprise.

---

## Routine Opérationnelle (Graphe `analyze_graph`)
Pendant la phase de routine des itérations, le framework s'exécute en configuration standard pour maintenir la prévisibilité du delivery sans surcharger le RTE d'alertes secondaires.

### Le Dashboard de Santé des Flux
Le RTE surveille les indicateurs calculés en temps réel par le moteur déterministe `FlowMetricsEngine` (Registre R1) :
* Le temps de cycle (*Cycle Time*) et le débit (*Throughput*).
* L'efficacité du flux (*Flow Efficiency*), mettant en évidence le ratio entre le temps de traitement actif et les temps d'attente inter-équipes.

### Gestion des Frictions avec le `DependencyAgent`
En s'appuyant sur la *Théorie des Contraintes* (ToC), le `DependencyAgent` cartographie les interactions du train et recherche activement les anomalies de structure avant qu'elles ne provoquent un blocage en production. Il isole notamment :
* **Les Deadlocks :** blocages cycliques entre deux équipes.
* **Les Tickets Otages :** User Story bloquée paralysant une part critique des points du sprint.

### Surveillance de la Charge Cognitive
Le `CapacityAgent` applique les seuils de la **loi de Sweller**. Si le *Work In Progress* (WIP) cumulé d'un collectif franchit le seuil critique de **75%**, le système signale une surcharge extrinsèque. Le RTE et le Scrum Master peuvent intervenir pour stabiliser l'équipe et la ramener dans sa **Zone Cible de Flow (40% - 65%)**.

---

## Mode Commando : Le Protocole PI Readiness (J-15)
La fenêtre J-15 avant le PI Planning est la référence du moteur `PIReadinessEngine` (Registre R1) — *correction : aucun déclenchement automatique et daté n'a été trouvé dans le code (cf. `03-guides-roles/rte-pi-readiness.md`) ; l'activation d'une vigilance renforcée reste un choix opérationnel du RTE*. Le moteur s'interface avec `PredictiveEngineAgent` (Registre R2, *correction de nom*) et le graphe LangGraph (*correction : le Dual-Graph est l'ADR-019, pas l'ADR-025 — cf. `04-gouvernance-ethique/decisions-index.md`*) pour traquer les risques de non-préparation.

### Audit de Maturité du Backlog (DoR)
Le système scanne la *Definition of Ready* (DoR) de chaque Feature candidate au PI à venir. Les 3 statuts (`CALCULÉ`/`PROBABLE`/`NON VÉRIFIÉ`) sont réels — *correction d'attribution : assignés par `diagnostic_orchestrator.py` (règles de corrélation pures), pas par `PIReadinessEngine`* :
* **Statut `CALCULÉ` :** Feature estimée (Story Points), Stories enfants liées, critères d'acceptation complets et DoR respectée à 100%.
* **Statut `PROBABLE` :** Estimation macro effectuée, mais dépendances externes ou fournisseurs non confirmées.
* **Statut `NON VÉRIFIÉ` :** Alerte critique. La Feature est instable et risque de polluer les sessions de planification.

### Les 3 Alertes de Rupture (Format RPD - ADR-006)
Les alertes envoyées au RTE suivent le format **RPD (Recommandation / Preuve / Diagnostic)** validé par l'ADR-006 — *correction : pas la structure Naturalistic Decision Making (NDM), une inspiration conceptuelle distincte* :

#### A. Alerte de Saturation Cognitive (`CapacityAgent`)
* **R (Recommandation) :** Reporter la Feature `[ID]` à l'itération suivante ou geler le périmètre de l'Équipe Delta.
* **P (Preuve R1) :** Le WIP actuel de l'équipe est à 82% et le temps de cycle a augmenté de 35% sur les 7 derniers jours.
* **D (Diagnostic R2) :** L'agent identifie une saturation par sur-engagement technique. Ajouter la Feature candidate va provoquer une rupture de delivery.

#### B. Alerte de Gridlock Topologique (`DependencyAgent`)
* **R (Recommandation) :** Convoquer un arbitrage d'urgence entre l'Équipe Alpha (Stream-Aligned) et l'Équipe Sigma (Complicated-Subsystem).
* **P (Preuve R1) :** Présence d'une chaîne de dépendance linéaire de 4 niveaux bloquée par un ticket non estimé chez le fournisseur.
* **D (Diagnostic R2) :** L'agent identifie un goulot d'étranglement de type "Ticket Otage" (`compute_sp_hostage`) : le seuil de blocage systémique documenté par deux sources indépendantes du corpus est **20 % de la capacité de sprint** (*correction : pas 40 %, chiffre sans source dans une version précédente*).

#### C. Alerte de Dérive de Valeur (`ValueArbitrator`)
* **R (Recommandation) :** Dé-prioriser ou diviser la Feature `[ID]` au profit de la Feature `[ID-2]`.
* **P (Preuve R1) :** Le score WSJF de la Feature est inférieur à la moyenne du train, mais elle consomme déjà 25% de la bande passante globale.
* **D (Diagnostic R2) :** L'agent signale un désalignement sémantique avec l'OKR stratégique "Expansion Cloud".

---

## Le Cran de Sûreté : Routage Conditionnel vers `human_review`
*Correction* : ce mécanisme relève de l'ADR-026, pas de l'ADR-001 (Two-Layer Pattern, sans rapport). Le seuil est réel et exact : `PI_READINESS_RISK_THRESHOLD = 0.60` (`pi_readiness_engine.py:52`) et `graph.py:396` (`dor_score < 60.0` → `human_review`) — une régression historique à 40.0 a été corrigée et vérifiée indépendamment (`AUDIT-007`).

Si l'indice de préparation du train calculé par le `PIReadinessEngine` tombe **en dessous de 60%**, le graphe route vers `human_review`, avec `interrupt_before=["human_review"]` (`graph.py:1289`) — *correction : pas un appel direct à une fonction `interrupt()`. Le seul `interrupt()` du dépôt est dans un module orphelin jamais importé (`agents/rituals/pi_readiness_graph.py:118`)* — suspendant les automatismes au profit d'un arbitrage humain prioritaire.

**Conséquence pour l'Organisation :** le graphe s'arrête avant `human_review`, en attente d'une action du RTE. *Retiré, non confirmé* : un verrouillage automatique de la génération de rapport et un forçage manuel tracé (« Audit d'Exception ») figuraient ici — aucun des deux mécanismes n'a de référent trouvé dans le code (cf. `03-guides-roles/rte-pi-readiness.md`).

---

## Checklist de Sortie
Avant de clore la phase de préparation et d'autoriser l'ouverture du PI Planning, le RTE peut s'appuyer sur les signaux R1 suivants — *correction : aucune checklist HRO ni référence à ce sigle n'a été trouvée dans `mentor_agent.py` ; retiré comme mécanisme géré par le `MentorAgent`* :

- [ ] **Prédictibilité :** La vélocité historique certifiée par R1 couvre-t-elle à 100% la charge du plan proposé ?
- [ ] **Anti-fragilité (Buffer) :** Un tampon de capacité de minimum 15% a-t-il été préservé sur les équipes identifiées comme "Goulots" ?
- [ ] **Alignement des Engagements :** 100% des Features au statut `CALCULÉ` disposent d'un lien d'arborescence valide avec un OKR parent de l'entreprise.