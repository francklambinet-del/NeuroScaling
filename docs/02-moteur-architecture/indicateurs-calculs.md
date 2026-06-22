---
id: indicateurs-calculs
title: "📈 Référentiel des Indicateurs & Formules Mathématiques"
sidebar_label: Indicateurs & Calculs
slug: /indicateurs-calculs
---

# Référentiel des Indicateurs & Formules Mathématiques

Ce document constitue la source unique de vérité (*Single Source of Truth*) pour l'ensemble des métriques calculées de manière déterministe par le Registre R1 (couche `engine/`). Ces indicateurs qualifient la santé de vos flux de livraison, l'alignement stratégique et la charge cognitive des équipes — avant toute interprétation sémantique par les agents du Registre R2.

---

## 🔬 Philosophie de la Mesure en R1

Conformément aux principes de Neuro-Scale V4, l'intégralité des calculs repose sur des données factuelles issues des API de vos outils de gestion (Jira) et d'ingénierie (GitHub).

* **Zéro Biais :** Aucun modèle probabiliste ou LLM n'intervient dans cette couche.
* **Consommation asymétrique :** Les seuils franchis alimentent automatiquement le Blackboard sémantique pour déclencher les rituels et alertes des agents R2.

---

## 📊 Cartographie des Patterns de Blocage Systémiques

Voici le catalogue officiel des **28 patterns** détectés par le moteur `PatternDetector` (Registre R1), classés par niveau de criticité, avec leurs algorithmes de déclenchement et les actions correctives immédiates associées.

### Vue d'ensemble par criticité

| # | Pattern | Type de problème | Criticité |
| :-- | :--- | :--- | :--- |
| 01 | Effondrement Vélocité | Performance équipe | 🔴 Critique |
| 02 | Sous-livraison Chronique | Prédictibilité | 🔴 Critique |
| 03 | Saturation WIP Critique | Flux / WIP | 🔴 Critique |
| 04 | Pic Injection Défauts | Qualité | 🔴 Critique |
| 05 | Blocage Delivery Pipeline | CI/CD | 🔴 Critique |
| 06 | Spirale Qualité | Qualité / Dette | 🔴 Critique |
| 07 | Déraillement Feature | Delivery Feature | 🔴 Critique |
| 08 | Paralysie Décisionnelle | Gouvernance | 🔴 Critique |
| 25 | Désalignement Stratégique | Stratégie | 🔴 Critique |
| 27 | Budgétisation Rigide | Lean Budget | 🔴 Critique |
| 09 | Érosion Prédictibilité | Prédictibilité | 🟡 Haute |
| 10 | Explosion Dette Tech | Dette technique | 🟡 Haute |
| 11 | Défaillance Qualité | Qualité | 🟡 Haute |
| 12 | Goulot Livraison | Flow / Delivery | 🟡 Haute |
| 13 | Surcharge Composant | Architecture | 🟡 Haute |
| 14 | Instabilité Équipe | Performance | 🟡 Haute |
| 15 | Explosion Scope | Scope | 🟡 Haute |
| 16 | Gridlock Dépendances | Dépendances | 🟡 Haute |
| 24 | Zombie Epics | Portfolio | 🟡 Haute |
| 26 | Surcharge de la Solution | Large Solution | 🟡 Haute |
| 17 | Dérive Innovation | Innovation | 🟢 Moyenne |
| 18 | Explosion Lead Time | Delivery Feature | 🟢 Moyenne |
| 19 | Déséquilibre Portfolio | Portfolio | 🟢 Moyenne |
| 20 | Faible ROI Features | Business Value | 🟢 Moyenne |
| 21 | Fragmentation Efforts | Flux / Focus | 🟢 Moyenne |
| 22 | Dérive Architecturale | Tech | 🟢 Moyenne |
| 23 | Inefficience Flow | Flow / Process | 🟢 Moyenne |
| 28 | Inertie du Feedback Loop | Gouvernance | 🟢 Moyenne |

> **Note de sûreté :** le franchissement d'un seuil 🔴 Critique génère un blocage immédiat au niveau de la Gate d'entrée R2, ou l'ouverture instantanée d'une gouvernance HITL (*Human-In-The-Loop*).

---

### 🔴 Patterns Critiques (Priorité 1)

#### 01 — Effondrement Vélocité

* **Type de problème :** Performance équipe
* **Explication simple :** la vélocité de l'équipe s'effondre brutalement.
* **Seuil de déclenchement :**

```math
\text{Moyenne (2 derniers sprints)} < 50\% \text{ de la Baseline}
```

* **Action rapide :** réduire drastiquement le WIP, identifier immédiatement les points de blocage.

---

#### 02 — Sous-livraison Chronique

* **Type de problème :** Prédictibilité
* **Explication simple :** l'équipe livre systématiquement moins que ses engagements.
* **Seuil de déclenchement :**

```math
\text{Taux de prédictibilité} < 70\% \text{ mesuré sur 3 sprints consécutifs}
```

* **Action rapide :** réduire le périmètre (scope), recalibrer la capacité nominale de l'équipe.

---

#### 03 — Saturation WIP Critique

* **Type de problème :** Flux / WIP
* **Explication simple :** un nombre excessivement élevé de tickets sont ouverts en parallèle.
* **Seuil de déclenchement :**

```math
\text{WIP} > 3 \times \text{Vélocité} \quad \text{ET} \quad \text{Croissance du WIP} > 50\%
```

* **Action rapide :** stopper immédiatement l'entrée de nouveaux tickets, focus absolu sur la fermeture de l'existant.

---

#### 04 — Pic Injection Défauts

* **Type de problème :** Qualité
* **Explication simple :** augmentation soudaine et anormale de l'apparition de bugs.
* **Seuil de déclenchement :**

```math
\text{Nombre de défauts créés} > 200\% \text{ de la Baseline}
```

* **Action rapide :** lancer un audit qualité flash, marquer une pause sur les nouveaux développements.

---

#### 05 — Blocage Delivery Pipeline

* **Type de problème :** CI/CD
* **Explication simple :** le pipeline de livraison est ralenti ou totalement bloqué.
* **Seuil de déclenchement :**

```math
\text{P90 Cycle Time} > 300\% \text{ de la Baseline}
```

* **Action rapide :** intervenir sur le pipeline, analyser les principaux goulots d'étranglement techniques.

---

#### 06 — Spirale Qualité

* **Type de problème :** Qualité / Dette
* **Explication simple :** la dette technique et l'injection de défauts explosent simultanément.
* **Seuil de déclenchement :**

```math
\text{Taux de corrélation} > 70\% \text{ avec une tendance positive confirmée}
```

* **Action rapide :** planifier immédiatement un sprint de nettoyage dédié à la résorption de la dette.

---

#### 07 — Déraillement Feature

* **Type de problème :** Delivery Feature
* **Explication simple :** le temps de traversée d'une fonctionnalité est anormalement supérieur aux estimations.
* **Seuil de déclenchement :**

```math
\text{Lead Time actuel} > 500\% \text{ de l'estimation initiale}
```

* **Action rapide :** procéder à un découpage d'urgence de la Feature, escalader le blocage rapidement.

---

#### 08 — Paralysie Décisionnelle

* **Type de problème :** Gouvernance
* **Explication simple :** trop de fonctionnalités restent bloquées en attente d'arbitrage.
* **Seuil de déclenchement :**

```math
> 30\% \text{ des Features en statut "Waiting"} > 10 \text{ jours}
```

* **Action rapide :** escalader le problème aux instances décisionnelles du Train ou du Portfolio.

---

#### 25 — Désalignement Stratégique

* **Type de problème :** Stratégie
* **Explication simple :** l'exécution opérationnelle des trains (ART) dévie des thèmes stratégiques de l'entreprise.
* **Déclencheur :** rupture de correspondance constatée entre les Epics du Backlog et les Strategic Themes.
* **Action rapide :** convoquer une revue du Portfolio Kanban, re-prioriser le flux via le calcul du WSJF.

---

#### 27 — Budgétisation Rigide

* **Type de problème :** Lean Budget
* **Explication simple :** incapacité systémique à réallouer des financements entre les trains malgré les évolutions du marché.
* **Déclencheur :** verrouillage budgétaire fixe inter-flux sans ajustement dynamique.
* **Action rapide :** basculer le mode de gestion financière vers le Participatory Budgeting.

---

### 🟡 Patterns à Haute Criticité (Priorité 2)

#### 09 — Érosion Prédictibilité

* **Type de problème :** Prédictibilité
* **Seuil de déclenchement :**

```math
\Delta > 15\% \text{ de variation sur 2 sprints consécutifs}
```

* **Action rapide :** analyse des causes racines (*root cause*) et ajustements de capacité.

---

#### 10 — Explosion Dette Tech

* **Type de problème :** Dette technique
* **Seuil de déclenchement :**

```math
\text{Ratio de dette} > 40\% \quad \text{ou augmentation nette} > 15\%
```

* **Action rapide :** restreindre temporairement le périmètre fonctionnel (scope), rembourser la dette.

---

#### 11 — Défaillance Qualité

* **Type de problème :** Qualité
* **Seuil de déclenchement :**

```math
\text{Temps de résolution des bugs} > 200\% \text{ de la Baseline}
```

* **Action rapide :** renforcer l'activité de QA, enrichir et améliorer la couverture de tests.

---

#### 12 — Goulot Livraison

* **Type de problème :** Flow / Delivery
* **Seuil de déclenchement :**

```math
< 70\% \text{ des Features engagées effectivement livrées à mi-PI}
```

* **Action rapide :** rebalancer les ressources et expertises sur les goulets identifiés.

---

#### 13 — Surcharge Composant

* **Type de problème :** Architecture
* **Seuil de déclenchement :** un composant unique absorbe plus de 60 % de la charge globale.
* **Action rapide :** répartir la charge de développement, mettre en place des sessions de pairing.

---

#### 14 — Instabilité Équipe

* **Type de problème :** Performance
* **Seuil de déclenchement :**

```math
\text{Variance de la vélocité} > 40\%
```

* **Action rapide :** stabiliser la composition de l'équipe, abaisser drastiquement les limites de WIP.

---

#### 15 — Explosion Scope

* **Type de problème :** Scope
* **Seuil de déclenchement :** plus de 25 % de périmètre additionnel ajouté en cours de route.
* **Action rapide :** geler immédiatement le scope, mener un arbitrage avec la ligne business.

---

#### 16 — Gridlock Dépendances

* **Type de problème :** Dépendances
* **Seuil de déclenchement :** plus de 20 % des Features du train se retrouvent bloquées.
* **Action rapide :** découper les éléments de livraison, mener une coordination proactive inter-équipes.

---

#### 24 — Zombie Epics

* **Type de problème :** Portfolio
* **Explication simple :** des Epics restent bloquées à l'état « En cours » pendant des mois sans jamais livrer de MVP.
* **Action rapide :** appliquer strictement les Lean Budget Guardrails ; forcer un pivot ou l'arrêt de l'Epic.

---

#### 26 — Surcharge de la Solution

* **Type de problème :** Large Solution
* **Explication simple :** trop de grandes capacités (*Capabilities*) sont lancées simultanément entre plusieurs trains.
* **Action rapide :** réduire et limiter strictement le WIP au niveau du Solution Kanban.

---

### 🟢 Patterns à Criticité Moyenne (Priorité 3)

#### 17 — Dérive Innovation

* **Type de problème :** Innovation
* **Seuil de déclenchement :**

```math
\text{Temps ou capacité allouée à l'innovation} < 10\%
```

* **Action rapide :** sanctuariser et dédier une capacité spécifique aux activités d'innovation.

---

#### 18 — Explosion Lead Time

* **Type de problème :** Delivery Feature
* **Seuil de déclenchement :**

```math
\text{Lead Time global} > 2 \times \text{la Baseline}
```

* **Action rapide :** pratiquer le *thin slicing* (découpage fin des récits utilisateurs).

---

#### 19 — Déséquilibre Portfolio

* **Type de problème :** Portfolio
* **Seuil de déclenchement :** plus de 50 % de l'effort global concentré sur un seul et unique thème.
* **Action rapide :** rééquilibrer la roadmap et la répartition des investissements.

---

#### 20 — Faible ROI Features

* **Type de problème :** Business Value
* **Seuil de déclenchement :**

```math
> 30\% \text{ de Features affichant un ROI} < 1{,}5
```

* **Action rapide :** réauditer et revoir en profondeur les business cases associés.

---

#### 21 — Fragmentation Efforts

* **Type de problème :** Flux / Focus
* **Seuil de déclenchement :** plus de 10 Epics actives simultanément.
* **Action rapide :** mettre en place un quota strict et limiter le WIP au niveau des Epics.

---

#### 22 — Dérive Architecturale

* **Type de problème :** Tech
* **Seuil de déclenchement :** la part du travail absorbée par la dette technique dépasse 25 %.
* **Action rapide :** déclencher une revue d'architecture globale.

---

#### 23 — Inefficience Flow

* **Type de problème :** Flow / Process
* **Seuil de déclenchement :**

```math
\text{Flow Efficiency} < 30\%
```

* **Action rapide :** optimiser les étapes du processus de delivery, traquer et réduire le *waste*.

---

#### 28 — Inertie du Feedback Loop

* **Type de problème :** Gouvernance
* **Explication simple :** les données et métriques du terrain mettent trop de temps à remonter pour permettre l'ajustement de la Roadmap.
* **Action rapide :** augmenter immédiatement la fréquence des instances de Portfolio Sync.

---

## 🛠️ Traçabilité des Rapprochements Techniques

Pour garantir l'exactitude mathématique, les moteurs du Registre R1 croisent les données brutes extraites de vos plateformes. Voici les règles de ciblage utilisées par l'infrastructure :

### Extraction depuis l'API Jira

* **Calcul du WIP (Work In Progress) :** décompté via le dénombrement des IDs de tickets positionnés dans les colonnes mappées avec la catégorie de statut *In Progress*.
* **Indice WSJF (Weighted Shortest Job First) :** agrégation déterministe des champs personnalisés selon la formule suivante :

```math
\text{WSJF} = \frac{\text{User Business Value} + \text{Time Criticality} + \text{Risk Reduction / Opportunity Enablement}}{\text{Job Size}}
```

### Extraction depuis l'API GitHub Enterprise

* **P90 Cycle Time :** mesure automatique du delta temporel situé entre la date de première validation (`commit`) et la date de fusion finale (`pull_request.merged_at`), filtrée sur le 90ème percentile des livraisons.
* **Ratio de Dette Technique :** extrait par couplage avec les métriques de complexité cognitive et de couverture de code transmises par vos outils d'analyse statique branchés sur les workflows CI/CD.

---

## 🔄 Évolution et Maintenance des Seuils

Ces indicateurs et seuils de blocage sont dynamiques. Ils sont réévalués en fin de chaque PI (Program Increment) lors de l'événement **Inspect & Adapt** par le moteur `TemporalEngine`.

> Toute modification d'une formule de calcul ou d'un seuil critique doit faire l'objet d'un amendement répertorié dans le registre de gouvernance éthique de l'architecture.
