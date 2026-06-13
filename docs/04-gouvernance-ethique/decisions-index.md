---
id: decisions-index
title: Registre des Décisions d'Architecture (ADR)
sidebar_label: Index des ADR
---

# Registre des Décisions d'Architecture (ADR)

Ce registre centralise les décisions d'architecture structurantes de l'**NeuroScaling Architecture**. Chaque décision répond à un défi technique ou cognitif spécifique et s'impose comme un contrat technique strict pour les développeurs et les auditeurs du framework.

---

## 🎯 Statut des ADR

Les décisions respectent la nomenclature officielle du cycle de vie de l'ingénierie NeuroScaling :
* **🟢 Validé / Acté** : Décision ferme, applicable et validée au sein du code source.
* **🎯 À implémenter** : Décision prise et validée, dont le code est en cours de planification.
* **📋 Tracé (P1/P2/P3)** : Option d'architecture identifiée et priorisée pour les versions futures.
* **⏸️ Reporté (DEFERRED)** : Volontairement mis en attente jusqu'à activation des conditions requises.

---

## 📑 Index Complet des Contrats Techniques

### 🛡️ Fondations V1 : Core Architecture & Alignement Humain (ADR 001 à 016)

| Identifiant | Titre de l'ADR | Statut | Impact Implémentation & Robustesse |
| :--- | :--- | :--- | :--- |
| **ADR-001** | Two-Layer Pattern (engine + agents) | 🟢 Validé | **Non-négociable**. Interdiction stricte d'injecter des LLM ou de la logique probabiliste dans la couche `engine/`. |
| **ADR-002** | Shadow IA Phase 1 — Lecture Seule | 🟢 Validé | Niveau 0 d'autonomie par défaut. Évolution conditionnelle des agents. |
| **ADR-003** | Théorie des Contraintes dans DependencyAgent | 🎯 À implémenter | Injection du calcul de flux algorithmique (*drum*) basé sur la ToC. |
| **ADR-004** | Scores agrégés par équipe, jamais individu | 🟢 Validé | **Non-négociable**. Le Quality Guard bloque toute tentative de tracking nominatif. |
| **ADR-005** | Wardley Mapping comme inférence expérimentale | 📋 Tracé (P2) | Composant `WardleyMapper` isolé ; validation humaine systématique requise. |
| **ADR-006** | Format RPD — Recommandation, Preuve, Diagnostic | 🎯 À rétrofiter | Contrat de sortie obligatoire pour tous les agents : Action/Réfutation en premier. |
| **ADR-007** | Complexity Coverage Ratio (Ashby) | 📋 Tracé (P2) | Levée d'un avertissement système si le contexte d'ART est < 50 personnes. |
| **ADR-008** | Checklist HRO obligatoire dans chaque AGENT-GUIDE | 🟢 Validé | Inclusion des critères de Haute Fiabilité avant toute validation humaine. |
| **ADR-009** | LangGraph pour l'orchestration multi-agents | 🟢 Validé | Remplacement des chaînes séquentielles par des graphes d'états cycliques. |
| **ADR-010** | Commande CLI unique `neuroscale` pour le Runtime | 🟢 Validé | Point d'entrée unifié pour l'exécution, les tests et le déploiement. |
| **ADR-011** | Double Boucle d'Apprentissage (Double-Loop) | 🟢 Validé | Persistance des boucles de rétroaction asynchrones et correction des invites. |
| **ADR-012** | Stockage CAS (Content Addressable Storage) | 🟢 Validé | Définition du TTL des données et isolation complète des sessions d'analyse. |
| **ADR-013** | Validation stricte Pydantic sur les entrées Jira | 🟢 Validé | Les payloads corrompus ou hors-schéma sont rejetés à l'entrée de R1. |
| **ADR-014** | Moteur déterministe prévalant sur le sémantique | 🟢 Validé | Les calculs de structure (NetworkX) priment sur les interprétations des agents. |
| **ADR-015** | Isolation complète du runtime d'évaluation | 🟢 Validé | Sandbox hermétique empêchant les effets de bord entre les simulations d'ART. |
| **ADR-016** | Journalisation centralisée des doutes des agents | 🟢 Validé | Métrique d'incertitude sauvegardée en base pour l'auditabilité du système. |

### ⚡ Évolutions V4 : Multi-PI, Graphes Hybrides & Haute Performance (ADR 018 à 031)

| Identifiant | Titre de l'ADR | Statut | Impact Implémentation & Robustesse |
| :--- | :--- | :--- | :--- |
| **ADR-018** | Passage à la structure Multi-PI native | 🟢 Validé | Refactoring global des structures de données pour supporter $n$ PIs simultanés. |
| **ADR-019** | Pattern B : Architecture Dual-Graph | 🟢 Validé | Séparation étanche : `KnowledgeGraph` structurel (SAFe) + Zone `R2 Blackboard`. |
| **ADR-020** | Algorithme FlowMetricsEngine V4 | 🟢 Validé | Transition vers un modèle de calcul d'états asynchrone ultra-rapide. |
| **ADR-021** | Registre R1 déterministe immutable | 🟢 Validé | Les agents R2 disposent d'un droit de lecture universel mais d'aucune écriture sur R1. |
| **ADR-022** | Moteur de prompt dynamique via Distillats | 🟢 Validé | Centralisation des règles métier dans `distillats.py`. Cache `lru_cache` activé. |
| **ADR-023** | PredictiveEngineAgent probabiliste | 🟢 Validé | Simulation Monte Carlo exécutée dans un conteneur isolé et sécurisé. |
| **ADR-024** | Système d'alerte et de badges Bento Grid | 🟢 Validé | Standardisation visuelle : États d'alerte *CALCULÉ*, *PROBABLE*, *NON VÉRIFIÉ*. |
| **ADR-025** | Indépendance de déploiement des Graphes R1/R2 | 🟢 Validé | Architecture découplée autorisant la mise à jour des agents sans rupture de R1. |
| **ADR-026** | Intégration de la fonction d'interruption `interrupt()` | 🟢 Validé | Cran de sûreté automatique stoppant LangGraph si la préparation du train est < 60%. |
| **ADR-027** | Indexation topologique orientée objet du Blackboard | 🟢 Validé | Transition de la logique propositionnelle vers une complexité d'accès en $O(1)$. |
| **ADR-028** | Suppression complète du jargon biologique | 🟢 Validé | Alignement corporate : Remplacement de "Thalamus" par `ResilienceArchitecture`. |
| **ADR-029** | Représentation par Deltas de l'état du Blackboard | 🟢 Validé | Optimisation mémoire majeure : Seuls les écarts d'états sont historisés. |
| **ADR-030** | Routage automatique des anomalies via Cynefin | 🟢 Validé | Implémentation de `cynefin_router.py` pour qualifier la sévérité des dérives. |
| **ADR-031** | Persistance et export du KnowledgeGraph | 🟢 Validé | Persistance assurée via `data/knowledge_graph_snapshot.json` dans `analyze.py`. |

---

## 📈 Matrice d'Impact Technique (Contrats Critiques)

Le tableau suivant permet aux auditeurs et aux développeurs de vérifier rapidement quels modules du framework sont impactés par les contrats techniques les plus structurants :

| Identifiant | Titre de l'ADR | Composant Principal Impacté | Métrique de Conformité |
| :--- | :--- | :--- | :--- |
| **ADR-001** | Alignement Tripartite | Orchestrateur / LangGraph | Taux d'interruption / Présence obligatoire du nœud `human_review` |
| **ADR-004** | Anonymat & Équipes | `quality_guard.py` / R1 | Échec du build ou de la compilation si détection d'un champ ID utilisateur |
| **ADR-006** | Format RPD | Schémas / Pydantic Models | Validation stricte des types de réponses agents à la compilation |
| **ADR-011** | Double Boucle | Métacognition / Analytics | Présence fonctionnelle de la boucle de feedback asynchrone |
| **ADR-019** | Dual-Graph Architecture | Runtime / LangGraph | Indépendance totale des déploiements et des tests des deux graphes |
| **ADR-022** | Prompt par Distillats | `distillats.py` | Zéro règle métier ou seuil méthodologique codé en dur dans les invites |
| **ADR-026** | Fonction `interrupt()` | `temporal_engine.py` / Core | Arrêt instantané du graphe et verrouillage des rapports si score < 60% à J-7 |

---

## 🔍 Processus d'Audit de Conformité

1. **Analyse Statique** : Utilisation de linters personnalisés pour vérifier l'implémentation de `RPDBaseModel` (ADR-006) et la conformité des schémas Pydantic (ADR-013).
2. **Audit de Graphe** : Validation automatique via un script de CI/CD que chaque graphe d'exécution possède un canal de télémétrie branché sur le graphe de supervision et respecte le critère d'interruption (ADR-001 / ADR-026).
3. **Contrôle de Souveraineté** : Isolation réseau stricte des instances de calcul pour garantir le respect de l'immutabilité des faits de R1 (ADR-021).

---

## 📋 Prochains ADRs à Rédiger (Feuille de Route)

* **ADR-032 [Priorité P1]** : Enrichissement du `FlowMetricsEngine` — Intégration de 6 indicateurs simples (*Ratio Features*, *Tech Debt*, *Support*, *Densité Défauts*, *Taux Débordement*, *Prédictibilité Sprint*).
* **ADR-033 [Priorité P2]** : Enrichissement du `FlowMetricsEngine` / `VSMEngine` — Intégration de 5 indicateurs au niveau PI (*Vélocité PI*, *Prédictibilité PI*, *Taux Complétion Features*, *Epic Cycle Time*, *Scope Creep*).