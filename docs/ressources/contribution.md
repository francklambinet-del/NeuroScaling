---
id: contribution
title: "🤝 Guide de Contribution : Open Theory & Seuils Algorithmiques"
sidebar_label: "🤝 Contribution"
slug: /ressources/contribution
---

# Guide de Contribution : Open Theory

Le framework **Neuro-Scale** repose sur un principe fondamental : la gouvernance du delivery ne doit pas s'appuyer sur des intuitions, mais sur des fondements scientifiques rigoureux et réversibles. C'est le cœur de notre démarche **Open Theory**.

Si vous êtes directeur de transformation, Release Train Engineer (RTE), architecte d'entreprise ou chercheur en systèmes complexes, vous pouvez participer activement à l'évolution du framework en proposant des améliorations, de nouveaux Distillats ou en contestant les seuils algorithmiques actuels.

---

## 1. Comment proposer une modification ?

Toute modification des règles métier ou des seuils critiques s'effectue hors du code des agents, directement au niveau des fichiers de configuration stockés dans le dossier `knowledge/`. Le moteur `distillats.py` se charge ensuite de propager ces règles de manière transparente.

Pour soumettre une contribution, votre proposition doit suivre un parcours d'évaluation en trois étapes :

* **Étape 1 : Formulation de l'Hypothèse**  
  Identifiez le pilier organisationnel concerné (SAFe 6.0, Team Topologies, Théorie des Contraintes, VSM) et formulez la modification sous forme d'une règle logique explicite (ex : conditions `IF / THEN`).
* **Étape 2 : Niveau de Preuve Scientifique**  
  Adossez votre proposition à un niveau de certitude méthodologique :
  * **Niveau Vert (Irréfutable) :** Basé sur des lois mathématiques ou des sciences cognitives établies (ex : Théorie de la Charge Cognitive de Sweller, Loi d'Ashby).
  * **Niveau Jaune (Robuste) :** Basé sur des frameworks industriels éprouvés et documentés (ex : Team Topologies, patterns SAFe).
* **Étape 3 : Soumission du Distillat**  
  Proposez la structure de données mise à jour ou le nouvel identifiant de règle (`rule_id`) pour intégration dans la matrice d'injection.

---

## 2. Format de Contrat de Règle Typé

Pour être validée par l'ingénierie du framework et le composant `diagnostic_orchestrator.py`, toute nouvelle règle ou modification de seuil doit respecter la structure de spécification suivante :

* **`rule_id`** : Identifiant unique et standardisé (ex : `TT-043`, `WIP-005`).
* **`trigger_condition`** : Le déclencheur exact basé sur les métriques factuelles du Registre R1.
* **`system_instruction`** : La directive claire transmise au prompt système de l'agent concerné, spécifiant le comportement attendu et les barrières de sécurité à appliquer.
* **`severity`** : Le niveau de criticité de la règle (`LOW`, `MEDIUM`, `HIGH`, `FATAL`).

---

## 3. Exemples de Chantiers Ouverts (Open Theory)

Nous encourageons particulièrement les contributions et les retours d'expérience terrain sur les axes suivants :

* **Ajustement des Seuils de Charge Cognitive :** Optimisation de la Zone Cible de Flow (actuellement fixée entre 40% et 65% d'après le modèle Sweller) selon la typologie des équipes (Stream-Aligned vs Complicated-Subsystem).
* **Extensions Team Topologies :** Modélisation de nouveaux patterns d'interaction temporaires lors des phases de bascule d'architecture ou de lancements de trains.
* **Modèles de Résilience Cognitive :** Intégration de nouvelles grilles de lecture sémantiques pour capter les signaux faibles et les baisses de sécurité psychologique lors des rituels de synchronisation.

---

## 🛡️ Gouvernance et Validation

Chaque proposition de contribution fait l'objet d'une revue de code et d'une analyse d'impact sur le *Total Traversal Time* du Blackboard Étendu pour s'assurer qu'aucune explosion combinatoire ne dégrade les performances en $O(1)$ du système.

Une fois validée par la communauté Open Theory, la règle est intégrée au référentiel centralisé et prend effet dès le sprint suivant sur l'ensemble de l'armée d'agents.