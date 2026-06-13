---
id: sm-resilience
title: "Guide du Scrum Master : Gardien de la Résilience et du Flow"
sidebar_label: "Guide du SM"
slug: /guides/sm-resilience
---

# 🛡️ Guide du Scrum Master : Gardien de la Résilience et du Flow

## 1. La Protection de l'Équipe (CapacityAgent)

Le Scrum Master (SM) utilise le `CapacityAgent` pour prévenir l'épuisement des collectifs et garantir une dynamique de livraison soutenable.  

* **La Zone de Flow (40% – 65%)** : Il est essentiel de comprendre pourquoi le système envoie une alerte dès que le *Work In Progress* (WIP) cumulé d'un collectif franchit le seuil critique de 75%. Cette zone cible permet de maintenir un ratio optimal entre le temps de traitement actif et les temps d'attente.  
* **Loi de Sweller & Charge Cognitive** : Le SM doit utiliser les indicateurs de saturation pour stopper immédiatement l'insertion de nouvelles tâches ou User Stories en cours de Sprint.  
* **Le Badge "Surchauffe"** : Comment réagir et appliquer le protocole de réduction de charge quand l'agent signale un risque de chute de qualité par saturation cognitive extrinsèque.  

---

## 2. L'Anatomie du Blocage (DependencyAgent)

Le SM n'attend plus la réunion du Daily Stand-up pour identifier et traiter les obstacles qui ralentissent le flux.  

* **Détection des "Tickets Otages"** : Identifier via le `DependencyAgent` (fondé sur la Théorie des Contraintes - ToC) les éléments du backlog qui paralysent une part critique des points du sprint ou bloquent d'autres équipes du train.  
* **Analyse des Deadlocks** : Visualiser et cartographier les cycles de dépendances complexes (ex: l'Équipe A attend l'Équipe B qui attend elle-même l'Équipe A) avant qu'ils ne paralysent définitivement le Sprint.  
* **Résolution proactive** : Exploiter les preuves déterministes du Registre R1 pour solliciter les autres Scrum Masters ou escalader le blocage au RTE avec des faits précis et indiscutables.  

---

## 3. Le Diagnostic de Santé des Rituels (FlowMetrics)

Le framework NeuroScaling agit comme un miroir objectif sur les pratiques réelles et quotidiennes de l'équipe.  

* **Stabilité de la Vélocité** : Analyser les projections du `PredictiveEngine` sur la capacité réelle de l'équipe par rapport à ses engagements initiaux (*Commitment*).  
* **Qualité du Sprint** : Suivre les indicateurs clés tels que la "Densité de Défauts" (définie selon l'**ADR-032**) et le "Taux de Débordement" via le `FlowMetricsEngine`.  
* **L'Anti-Pattern "Shadow Work"** : Identifier les baisses de flux inexpliquées qui cachent du travail non documenté ou des requêtes de couloir grâce aux audits automatisés du `Quality Guard`.  

---

## 4. Le Mentorat Assisté (MentorAgent)

Le SM s'appuie sur la puissance de l'IA agentique pour enrichir ses rétrospectives et mener l'équipe vers l'amélioration continue.  

* **Patterns Historiques** : Le `MentorAgent` suggère des axes d'amélioration personnalisés en se basant sur les succès passés de l'organisation (*Double Loop Learning*).  
* **Format RPD en Rétrospective** : Présenter les diagnostics du système pour objectiver les débats internes et éliminer l'affect (ex: *"Le système recommande de réduire le WIP car notre Time-to-Market a augmenté de 20%"*).  

---

## 5. Focus Technique : L'Alerte de Saturation (Format RPD - ADR-006)

Le Scrum Master est le premier destinataire des alertes de "santé du système" émises en configuration de routine. Chaque alerte reçue respecte strictement l'**ADR-006** :  

### 📑 EXEMPLE DE DIAGNOSTIC RPD POUR LE SM
* **R (Action)** : Refuser l'ajout de la Story `[ID]` dans le Sprint actuel.  
* **P (Preuve R1)** : Le WIP actuel est à 82%. Le temps de cycle moyen a augmenté de 1.5 jour depuis lundi.  
* **D (Diagnostic R2)** : Le `CapacityAgent` détecte une saturation cognitive. L'ajout de périmètre à ce stade garantit un débordement de 30% des Stories en fin de Sprint.  

### Prochaines étapes pour le Scrum Master :
1. Pratiquer votre évaluation matinale à l'aide de la *Checklist de Survie Quotidienne du SM*.
2. Collaborer avec votre PO pour assainir le backlog à J-15 en consultant le *Mode PI Readiness*.