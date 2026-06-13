---
id: sm-checklist
title: Daily Health Check & Checklist de Survie du Scrum Master
sidebar_label: SM Daily Checklist
---

# Daily Health Check : Checklist de Survie du SM

Ce protocole décrit les actions mathématiques et analytiques que le Scrum Master (SM) doit impérativement exécuter chaque matin **avant 9h00 (Heure du Daily Scrum)**. 

L'objectif est d'identifier les dérives du flux de production (goulots d'étranglement, tâches fantômes) afin de transformer le Daily en un point d'alignement tactique plutôt qu'en une simple mise à jour de statuts.

---

## 📐 1. Les Métriques de Santé du Flux

Le SM s'appuie sur trois indicateurs clés pour mesurer la friction opérationnelle de l'équipe.

### A. Le Taux de Saturation de l'Encours (WIP Saturation)
 Le framework définit une limite d'encours (Work In Progress) par développeur, basée sur une calibration empirique initiale ajustable selon le contexte du train:

$$
\text{WIP Saturation} = \frac{\text{Nombre de Stories actives (In Progress + In Review)}}{\text{Nombre de Développeurs} \times 1.5} \times 100
$$

> 🚨 **Seuil d'Alerte :** Si le taux dépasse 75%, le flux est considéré comme saturé. Le SM doit interdire l'ouverture de toute nouvelle Story lors du Daily et forcer la résolution des tâches en cours ("Stop starting, start finishing").

### B. L'Index de Stagnation (Stories Zombies)
Une User Story (US) est classée comme **Zombie** si elle n'a subi aucune transition de statut ou mise à jour de ticket depuis plus de 48 heures.

$$
\text{Age Zombie} = t_{\text{actuel}} - t_{\text{dernière\_activité}} > 2 \text{ jours}
$$

### C. Le Ratio d'Étranglement de la QA (Review Bottleneck)
Mesure l'accumulation des tickets en attente de validation ou de relecture :

$$
\text{Ratio QA} = \frac{\text{Stories en 'In Review' / 'Ready for QA'}}{\text{Stories en 'In Progress'}}
$$

---

## ⏱️ 2. Protocole Opérationnel Matinal (7-Minute Check)

Le SM exécute le script d'inspection visuelle et analytique suivant sur le tableau Jira ou Azure DevOps :

* **08:45 — [Étape 1]** Extraire la liste des User Stories actives du sprint.
* **08:47 — [Étape 2]** Calculer le taux de saturation de l'encours (WIP Saturation) et le ratio d'étranglement de la QA.
* **08:49 — [Étape 3]** Identifier et marquer les "Stories Zombies" (plus de 48 heures sans aucune activité ou log).
* **08:51 — [Étape 4]** Analyser les anomalies d'assignation (détection du multi-tasking ou surcharge individuelle).
* **08:52 — [Étape 5]** Rédiger le Flash-Alerte synthétique à projeter au début du Daily Scrum.

---

## 💻 3. Logique Algorithmique du Script d'Alerte `sm_health_check.py`

L'automatisation de ce diagnostic matinal repose sur un composant d'analyse du tableau, généralement déclenché par la CI/CD pour préparer le rapport du Scrum Master. La logique métier se structure autour des axes suivants :

* **Initialisation des Contraintes** : Le système se base sur le nombre de développeurs actifs pour instancier la limite maximale théorique du WIP (calculée via le facteur de tolérance de 1.5).
* **Analyse d'État et Itération** : Le script parcourt l'intégralité des tickets du sprint pour trier les statuts actifs (`In Progress`, `In Review`, `Ready for QA`), isoler la phase spécifique de QA par rapport au développement pur, et mesurer l'écart temporel avec la dernière mise à jour.
* **Génération Automatique des Alertes** : 
    * Si le seuil de saturation du WIP dépasse 75%, une alerte critique est levée pour bloquer l'ouverture de nouvelles tâches.
    * Si le ratio QA franchit la valeur de 1.0, un avertissement signale un goulot d'étranglement sur les revues de code.
    * Si des anomalies temporelles sont détectées, la liste des tickets zombies est extraite avec précision pour être traitée en priorité.

---

## 📋 4. Ordre du Jour du Daily Scrum "Focus-Flux"

En s'appuyant sur les résultats du diagnostic, le SM oriente le Daily selon l'ordre du jour restrictif suivant :

* **Traitement des Zombies (2 min)** : « L'US-422 n'a pas bougé depuis 3 jours. Quel est le point de blocage ? Qui vient en renfort pour la terminer ? »
* **Résolution du Goulot QA (3 min)** : « Notre ratio QA est critique. Avant de coder les tâches du jour, qui prend en charge la relecture de la PR de l'US-425 ? »
* **Alignement du Reste à Faire (10 min max)** : Revue des tâches nominales. Rappel strict de la règle : interdiction formelle de déplacer un ticket de "To Do" à "In Progress" tant que la saturation générale n'est pas redescendue sous la barre des 60%.