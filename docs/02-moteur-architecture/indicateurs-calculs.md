---
id: indicateurs-calculs
title: "📈 Référentiel des Indicateurs & Formules Mathématiques"
sidebar_label: Indicateurs & Calculs
slug: /indicateurs-calculs
---

# Référentiel des Indicateurs & Formules Mathématiques

Ce document est une **transcription du catalogue réel** implémenté par `engine/signals/pattern_detector.py` (Registre R1). Le code est la source de vérité ; ce fichier en est une lecture, régénérée manuellement le **2026-08-02** après audit (`AUDIT-01 §9`, `AUDIT-01 §1.2`, `AUDIT-03 §145`, `AUDIT-04`). Une version précédente de ce document décrivait 28 patterns sans aucune correspondance avec le code — voir `CHANGELOG-LOT1-02.md` pour l'historique de cette divergence.

---

## 🔬 Philosophie de la Mesure en R1

Conformément aux principes de Neuro-Scale V4, l'intégralité des calculs repose sur des données factuelles issues de Jira (`adapters/atlassian/`) et, pour le contexte documentaire, de Confluence (`engine/context/rag_confluence.py`).

* **Zéro Biais (avec exception connue) :** aucun modèle probabiliste ou LLM n'intervient dans `pattern_detector.py`. Une exception existe ailleurs dans le même module `engine/signals/` : `early_warning_engine.py` appelle un LLM par défaut (`use_llm=True`) — écart documenté sous `DRIFT-001`, arbitrage en attente.
* **Consommation du résultat :** aucune écriture automatique de `pattern_detector.py` vers l'`OntologyGraph` (Blackboard R2) n'a été trouvée dans le code (grep = 0 occurrence de `OntologyGraph`/`publish_agent_observation`). Le déclenchement des rituels et alertes R2 à partir d'un pattern franchi n'est pas câblé à ce niveau — ne pas l'affirmer tant que ce n'est pas vérifié ailleurs.

---

## 📊 Cartographie des Patterns de Blocage Systémiques

Catalogue réel des **15 patterns** détectés par `PatternDetector` (`engine/signals/pattern_detector.py`), constantes de seuils dans `THRESHOLDS` (lignes 78-94 du même fichier). La classification à trois niveaux (NORMAL / AVERTISSEMENT / CRITIQUE) est réelle — produite par la fonction `severity()` (`pattern_detector.py:97-109`), pas une invention documentaire.

> **Note sur le nombre 27/28** : le docstring de `pattern_detector.py` (ligne 3) affirme lui-même « détection déterministe des 27 patterns pathologiques SAFe », alors que 15 fonctions `detect_P0X` existent réellement (vérifié : aucun `P16` à `P29` trouvé dans le fichier). Cette affirmation erronée est dans le code, pas seulement dans la documentation — elle explique la contradiction C-08 avec `Registres.mdx` (« 27 patterns »). Ce chantier ne touche pas au code ; le correctif du docstring est hors périmètre de ce lot.

### Vue d'ensemble

| ID | Nom réel | Entrée consommée | Seuil `warn` | Seuil `crit` | Ligne |
| :--- | :--- | :--- | :--- | :--- | :--- |
| P01 | Carry-over Systématique | `sprint`, `status` | 30 % | 50 % | 195 |
| P02 | Expansion de Périmètre Invisible (Scope Creep) | `created_at` vs début de PI | 20 % | 35 % | 245 |
| P03 | Déséquilibre Feature / Enabler | `story_points`, `type`, `feature_link` | 80 % business | 90 % business | 277 |
| P04 | Engorgement du Ready (Backlog Non Raffiné) | `acceptance_criteria`, `story_points` | 25 % | 40 % | 312 |
| P05 | Dark Work (Travail Hors-Train) | `feature_link` | 15 % | 25 % | 342 |
| P06 | Effet Tunnel de Recette (Late Testing) | `type`, `status`, `stale_days` | 30 % | 50 % | 368 |
| P07 | Fragmentation des Équipes (Silos de Compétences) | `team`, `assignee` | 70 % | 90 % | 410 |
| P08 | Blocage par Dépendances Externes | `links.blocked_by`, appartenance équipe ART | 5 (compte) | 10 (compte) | 452 |
| P09 | Instabilité du Focus (Context Switching) | `assignee`, `feature_link`, `status` | 3 features/pers. | 5 features/pers. | 489 |
| P10 | Waterfall de Statuts (Workflow Trop Complexe) | `status` (valeurs distinctes) | 8 étapes | 12 étapes | 532 |
| P11 | Syndrome Big Bang de Clôture | `updated_at` des tickets Done vs fin de PI | 20 % | 35 % | 558 |
| P12 | Sous-estimation Chronique | `story_points` planifiés vs réalisés | -20 % delta | -35 % delta | 598 |
| P13 | Inactivité des Tickets (Stale Issues) | jours dans le statut, `status` | 3 (compte) | 7 (compte) | 625 |
| P14 | Absence de Hiérarchie SAFe | `feature_link`, `type`, `pi` des Features | 10 % | 20 % | 657 |
| P15 | Reopening Fréquent | champ `reopened` | 5 % | 10 % | 691 |

**Seuils codés en dur (`THRESHOLDS`, `pattern_detector.py:78-94`)** : le commentaire du code (l.75) les qualifie de « configurables par ART », ce qui est faux — ce sont des constantes de module, non paramétrables sans modifier le fichier (`AUDIT-03 §145`, `DRIFT-005`). Ne pas reprendre l'idée de configurabilité. Deux patterns (P06, P11) ont leurs seuils inline dans la fonction plutôt que dans `THRESHOLDS` — même valeur numérique, mais source différente dans le code, notée pour la prochaine vérification.

---

### P01 — Carry-over Systématique

* **Fonction :** `detect_P01_carryover` — `engine/signals/pattern_detector.py:195`
* **Donnée consommée :** tickets groupés par `sprint`, comptage des statuts `Done`
* **Condition de déclenchement :** pour le sprint le plus dégradé, `(total - done) / total × 100` comparé aux seuils
* **Seuils :** `warn = 30 %` · `crit = 50 %`
* **Action associée :** « Revoir la capacité de sprint — stories trop volumineuses ou dépendances non résolues avant sprint »

---

### P02 — Expansion de Périmètre Invisible (Scope Creep)

* **Fonction :** `detect_P02_scope_creep` — `engine/signals/pattern_detector.py:245`
* **Donnée consommée :** `created_at` des tickets comparé à la date de début de PI
* **Condition de déclenchement :** part des tickets créés après le début du PI, en %
* **Seuils :** `warn = 20 %` · `crit = 35 %`
* **Action associée :** « Geler le périmètre PI après PI Planning — toute entrée post-planning passe par un arbitrage RTE »

---

### P03 — Déséquilibre Feature / Enabler

* **Fonction :** `detect_P03_feature_enabler` — `engine/signals/pattern_detector.py:277`
* **Donnée consommée :** `story_points` par `type` (Story avec `feature_link` vs Technical Story/Task/Spike)
* **Condition de déclenchement :** part des points business dans le total (business + enabler), en %
* **Seuils :** `warn = 80 % business` · `crit = 90 % business`
* **Action associée :** « Allouer 20-30% de la capacité aux Enablers techniques — dette technique = charge cognitive future »

---

### P04 — Engorgement du Ready (Backlog Non Raffiné)

* **Fonction :** `detect_P04_ready_backlog` — `engine/signals/pattern_detector.py:312`
* **Donnée consommée :** tickets actifs sans `acceptance_criteria` ou sans `story_points`
* **Condition de déclenchement :** part des tickets actifs non prêts, en %
* **Seuils :** `warn = 25 %` · `crit = 40 %`
* **Action associée :** « Activer BacklogAgent pour génération AC automatique — viser DoR > 80% avant sprint »

---

### P05 — Dark Work (Travail Hors-Train)

* **Fonction :** `detect_P05_dark_work` — `engine/signals/pattern_detector.py:342`
* **Donnée consommée :** présence du champ `feature_link` sur chaque ticket
* **Condition de déclenchement :** part des tickets sans `feature_link`, en %
* **Seuils :** `warn = 15 %` · `crit = 25 %`
* **Action associée :** « Tout ticket créé doit pointer vers une Feature PI — créer Feature 'Enabler Technique' pour le dark work légitime »

---

### P06 — Effet Tunnel de Recette (Late Testing)

* **Fonction :** `detect_P06_late_testing` — `engine/signals/pattern_detector.py:368`
* **Donnée consommée :** tickets de `type == "test"`, `status` ∈ (In Testing, In QA, Blocked), `stale_days`
* **Condition de déclenchement :** part des tickets de test bloqués/en attente depuis plus de 5 jours, en %. Si aucun ticket de type `test` n'existe, le pattern retourne `NORMAL` par défaut (donnée insuffisante).
* **Seuils :** `warn = 30 %` · `crit = 50 %` (valeurs inline dans la fonction, pas dans `THRESHOLDS`)
* **Action associée :** « Intégrer les tests en continu (shift-left) — objectif: 0 test en QA les 2 derniers jours »

---

### P07 — Fragmentation des Équipes (Silos de Compétences)

* **Fonction :** `detect_P07_silo` — `engine/signals/pattern_detector.py:410`
* **Donnée consommée :** répartition des tickets par `assignee` au sein de chaque `team`
* **Condition de déclenchement :** une équipe est « silotée » si un seul assignee concentre ≥ 70 % de ses tickets ; le pattern mesure la part d'équipes silotées sur le total, en %
* **Seuils :** `warn = 70 %` · `crit = 90 %`
* **Action associée :** « Organiser pair-programming inter-équipes — Team Topologies: activer mode Collaboration temporaire »

---

### P08 — Blocage par Dépendances Externes

* **Fonction :** `detect_P08_ext_dependency` — `engine/signals/pattern_detector.py:452`
* **Donnée consommée :** `links.blocked_by`, appartenance des tickets bloquants aux équipes de l'ART
* **Condition de déclenchement :** nombre de tickets bloqués par un ticket dont l'équipe n'appartient pas à l'ART
* **Seuils :** `warn = 5 (compte)` · `crit = 10 (compte)`
* **Action associée :** « Cartographier les dépendances hors-ART dès J-15 PI Planning — DependencyAgent alerte proactive »

---

### P09 — Instabilité du Focus (Context Switching)

* **Fonction :** `detect_P09_context_switch` — `engine/signals/pattern_detector.py:489`
* **Donnée consommée :** `assignee`, `feature_link` des tickets non `Done`
* **Condition de déclenchement :** moyenne du nombre de Features actives distinctes par personne
* **Seuils :** `warn = 3 features/personne` · `crit = 5 features/personne`
* **Action associée :** « Limiter à 2 Features actives / personne — CLI Engine: [nombre de personnes en surcharge, calculé dynamiquement] »

---

### P10 — Waterfall de Statuts (Workflow Trop Complexe)

* **Fonction :** `detect_P10_waterfall` — `engine/signals/pattern_detector.py:532`
* **Donnée consommée :** ensemble des valeurs distinctes du champ `status` sur tous les tickets
* **Condition de déclenchement :** nombre de statuts uniques utilisés (proxy documenté dans le code — ne mesure pas directement la complexité du workflow Jira)
* **Seuils :** `warn = 8 étapes` · `crit = 12 étapes`
* **Action associée :** « Simplifier le workflow Jira — cible: 5 statuts maximum (To Do / In Progress / In Review / Done / Blocked) »

---

### P11 — Syndrome Big Bang de Clôture

* **Fonction :** `detect_P11_big_bang` — `engine/signals/pattern_detector.py:558`
* **Donnée consommée :** `updated_at` des tickets `Done`, comparé à la date de fin de PI
* **Condition de déclenchement :** part des tickets `Done` mis à jour dans les derniers jours du PI (comparaison de préfixe de date), en %. Si aucun ticket `Done` n'existe, le pattern retourne `NORMAL` par défaut.
* **Seuils :** `warn = 20 %` · `crit = 35 %` (valeurs inline dans la fonction, pas dans `THRESHOLDS`)
* **Action associée :** « Agent Pulse quotidien — rappel automatique mise à jour tickets actifs > 48h sans update »

---

### P12 — Sous-estimation Chronique

* **Fonction :** `detect_P12_underestimate` — `engine/signals/pattern_detector.py:598`
* **Donnée consommée :** `story_points` planifiés vs `story_points` des tickets `Done`
* **Condition de déclenchement :** `(done_sp - planned_sp) / planned_sp × 100` — sévérité inversée (une valeur très négative est le signal du problème)
* **Seuils :** `warn = -20 % delta` · `crit = -35 % delta`
* **Action associée :** « Session d'estimation collective — revoir les référentiels SP par type de ticket »

---

### P13 — Inactivité des Tickets (Stale Issues)

* **Fonction :** `detect_P13_stale` — `engine/signals/pattern_detector.py:625`
* **Donnée consommée :** nombre de jours dans le statut courant, filtré sur `status == "En réalisation"`
* **Condition de déclenchement :** nombre de tickets actifs immobiles depuis plus de 14 jours (`CYCLE_TIME_AVG × 2`, avec `CYCLE_TIME_AVG = 7` codé en dur dans la fonction)
* **Seuils :** `warn = 3 (compte)` · `crit = 7 (compte)`
* **Action associée :** « Tickets In Progress > 14j — revue obligatoire en Daily Stand-up »

---

### P14 — Absence de Hiérarchie SAFe

* **Fonction :** `detect_P14_hierarchy` — `engine/signals/pattern_detector.py:657`
* **Donnée consommée :** Stories sans `feature_link`, Features sans `pi` renseigné
* **Condition de déclenchement :** part des tickets orphelins (Stories sans Feature + Features sans PI) sur le total, en %
* **Seuils :** `warn = 10 %` · `crit = 20 %`
* **Action associée :** « QualityGuard: dimension Traçabilité — toute Story sans Feature bloquée en DoR »

---

### P15 — Reopening Fréquent

* **Fonction :** `detect_P15_reopening` — `engine/signals/pattern_detector.py:691`
* **Donnée consommée :** champ optionnel `reopened` (booléen) sur chaque ticket
* **Condition de déclenchement :** part des tickets marqués `reopened = true` sur le total, en %
* **Seuils :** `warn = 5 %` · `crit = 10 %`
* **Action associée :** « Revoir la Definition of Done — ajouter critères de test automatisés obligatoires »

---

## 🛠️ Traçabilité des Rapprochements Techniques

**Calcul du WIP (Work In Progress)** : `WorkloadOptimizer.get_team_wip` (`agents/advisors/workload_optimizer.py:72-90`) compte les tickets Jira au statut `"In Progress"` ou `"In Review"` dans le sprint ouvert, via une requête JQL directe (`search_issues`) — pas un mapping de colonnes Kanban généralisé. La charge cognitive est `(wip / wip_limit) × 100`, plafonnée à 100.

---

## 🔄 Évolution et Maintenance des Seuils

Les 30 seuils (`warn`/`crit` × 15 patterns) sont des **constantes statiques** du module `pattern_detector.py` (`THRESHOLDS`, lignes 78-94, plus deux jeux de valeurs inline pour P06 et P11). `engine/core/temporal_engine.py` calcule des tendances de vélocité mais **ne réévalue aucun seuil** (grep sur `THRESHOLDS`/`threshold` dans ce fichier = 0 occurrence) — il n'existe pas de mécanisme d'ajustement automatique en fin de PI. Toute modification de seuil passe aujourd'hui par une édition directe du code ; leur migration vers un mécanisme configurable (distillats) est un arbitrage en attente (`DRIFT-005`).

> Toute modification d'une formule de calcul ou d'un seuil critique doit faire l'objet d'un amendement répertorié dans le [registre de gouvernance éthique](../04-gouvernance-ethique/decisions-index.md).

---

## 📋 Feuille de route — Ambitions non implémentées

Les éléments suivants apparaissaient dans une version précédente de ce document comme s'ils étaient calculés par le code. Aucun n'a de fonction, seuil ou source de données correspondante dans `pattern_detector.py` ni ailleurs dans `src/neuro_scale/` (vérifié par grep). Ils sont conservés ici comme intentions, sans formule ni seuil chiffré — statut 📋 Tracée.

**Patterns supplémentaires envisagés** (noms uniquement, aucun mécanisme de détection existant) :

* Effondrement Vélocité
* Sous-livraison Chronique
* Saturation WIP Critique
* Pic Injection Défauts
* Blocage Delivery Pipeline
* Spirale Qualité
* Déraillement Feature
* Paralysie Décisionnelle
* Érosion Prédictibilité
* Explosion Dette Tech
* Défaillance Qualité
* Goulot Livraison
* Surcharge Composant
* Instabilité Équipe
* Explosion Scope
* Gridlock Dépendances
* Dérive Innovation
* Explosion Lead Time
* Déséquilibre Portfolio
* Faible ROI Features
* Fragmentation Efforts
* Dérive Architecturale
* Inefficience Flow
* Zombie Epics
* Désalignement Stratégique
* Surcharge de la Solution
* Budgétisation Rigide
* Inertie du Feedback Loop

**Sources de données envisagées, non connectées** :

* **API GitHub Enterprise** — `pull_request.merged_at` pour un P90 Cycle Time, couplage CI/CD pour un ratio de dette technique. `0 occurrence` de `github`/`pull_request`/`merged_at` dans `src/neuro_scale/` ; les adapters réels sont `atlassian`, `llm`, `transcription`, `vector`.
* **Indice WSJF (Weighted Shortest Job First)** — agrégation de champs personnalisés Jira (`User Business Value`, `Time Criticality`, `Risk Reduction/Opportunity Enablement`, `Job Size`). Aucun calcul WSJF trouvé dans le code.
