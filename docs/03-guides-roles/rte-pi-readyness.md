---
id: nxe-pi-readiness
title: "🛡️ Couche 4 : Le Runtime NXE & Protocole PI Readiness"
sidebar_label: Mode Commando (PI Readiness)
slug: /nxe-pi-readiness
---

# Le Runtime NXE & Protocole PI Readiness (Mode Commando)

L'environnement de livraison Neuro-Scale s'appuie sur le **NeuroScaling Execution Engine (NXE)**, le runtime déterministe au sein duquel s'exécutent et se valident les graphes d'agents (Couche 4)[cite: 7]. 

À l'approche du PI Planning (**J-15 avant l'événement**), le système bascule automatiquement en **Mode Commando**[cite: 8]. Le NXE déploie alors le mécanisme du **Dual-Graph (ADR-025)** pour traquer les risques structurels et organisationnels qui condamnent habituellement les sessions de planification[cite: 4, 8].

---

## ⚙️ 1. Le Cycle de Validation du Runtime (NXE)

Avant qu'une **Agent Graph Instruction (AGI)** — une directive logicielle ou une reconfiguration de workflow — ne modifie le State du système à chaud, ou avant de valider l'état de préparation du train, le moteur NXE orchestre un protocole strict en trois barrières d'évaluation[cite: 7] :

1. **Validation Statique (Schéma)** : Vérification de la conformité de la structure du payload selon l'ADR-006[cite: 3, 7]. En cas de format invalide, l'instruction est immédiatement rejetée[cite: 7].
2. **Simulation Topologique (NXE)** : Analyse d'impact sur le graphe actif via les métriques de centralité NetworkX pour écarter tout risque de boucle infinie (*deadlocks*) ou de point de défaillance unique (SPOF)[cite: 7].
3. **Surveillance de la Maturité du Backlog** : Le moteur `PIReadinessEngine` (R1) s'interface asynchronement avec le registre agentique (R2) pour scanner chaque Feature candidate au Program Increment (PI)[cite: 3, 8]. Il leur attribue un label de confiance dynamique[cite: 3, 8] :
    * **Statut `CALCULÉ` :** Feature estimée, Stories liées, DoR respectée à 100% par le Registre R1[cite: 3, 8].
    * **Statut `PROBABLE` :** Estimation macro effectuée, mais dépendances externes non confirmées ou fondement théorique de niveau 🟡[cite: 3, 8].
    * **Statut `NON VÉRIFIÉ` :** Alerte critique. Données manquantes ou anomalies sur le `Quality Guard`. La Feature est bloquée avant d'entrer dans le plan[cite: 3, 8].

---

## 📐 2. Algorithme de Simulation d'Impact Topologique

Pour valider l'étape de simulation, le NXE modélise l'insertion de toute nouvelle directive dans la topologie active du graphe[cite: 7]. Le moteur projette l'impact théorique sur le **Facteur de Stress Combiné ($S_C$)** de l'organisation[cite: 7] :

$$S_C = \sum_{v \in V} (C_B(v) \cdot L_m(v))$$

Où :
* $C_B(v)$ est la centralité d'intermédiation du nœud d'agent $v$ (fournie par le `FlowMetricsEngine`)[cite: 3, 7].
* $L_m(v)$ est la latence moyenne ou la charge observée sur ce nœud[cite: 7].

Si l'introduction d'une configuration fait grimper $S_C$ au-delà du seuil critique configuré ($\gamma = 2.5$), le NXE lève une exception de type `SystemOverloadException` et suspend la mutation jusqu'à l'arbitrage souverain du **RTE humain**[cite: 1, 7].

---

## 🚨 3. Les 3 Alertes de Rupture (Format RPD - ADR-006)

Lors de la phase de préparation active (Mode Commando), le **RTE (Release Train Engineer) humain** reçoit des notifications pré-formatées selon le standard d'aide à la décision naturelle (RPD)[cite: 2, 3, 8] :

### A. Alerte de Saturation Cognitive (`CapacityAgent`)
* **R (Recommandation) :** Reporter la Feature [ID] au PI suivant ou augmenter la capacité de l'équipe Alpha[cite: 8].
* **P (Preuve - R1) :** La charge projetée est de 115% sur les sprints 1 et 2 du futur PI (Seuil empirique cible 40-65% dépassé)[cite: 5, 8].
* **D (Diagnostic - R2) :** Le `CapacityAgent` détecte un risque de surchauffe (WIP projeté > 75%) entraînant une chute de prévisibilité systémique dès le milieu du train[cite: 1, 8].

### B. Alerte de Dépendance Bloquante (`DependencyAgent`)
* **R (Recommandation) :** Organiser une synchronisation immédiate entre le Train A et le Train B pour sécuriser l'API "Core-Services"[cite: 8].
* **P (Preuve - R1) :** 3 Features critiques dépendent d'un composant non encore planifié par le Train fournisseur[cite: 8].
* **D (Diagnostic - R2) :** Le `DependencyAgent` identifie un goulot d'étranglement de type "Ticket Otage" via NetworkX : si la livraison du fournisseur glisse de 3 jours, 40% de la valeur totale du PI est compromise[cite: 4, 8].

### C. Alerte de Dérive de Valeur (`ValueArbitrator`)
* **R (Recommandation) :** Dé-prioriser la Feature [ID] au profit de la Feature [ID-2][cite: 8].
* **P (Preuve - R1) :** Le score WSJF de la Feature [ID] est inférieur à la moyenne du train, mais elle consomme 25% de la bande passante globale[cite: 8].
* **D (Diagnostic - R2) :** Le `ValueArbitrator` signale un désalignement critique avec l'OKR stratégique "Expansion Cloud" : effort technique disproportionné pour une valeur business marginale[cite: 4, 8].

---

## 🛑 4. Le Cran de Sûreté : L'Interrupteur `interrupt()`

Conformément à l'**ADR-001** (Sûreté Organisationnelle), l'IA ne prend aucune décision finale mais dispose d'un interrupteur de protection[cite: 3]. Si le score global composite de **PI Readiness** calculé par le NXE tombe sous le seuil critique de **60%**, le système déclenche la fonction `interrupt()`[cite: 7, 8].

> **Conséquence Opérationnelle pour le RTE :** La génération du rapport de synthèse final destiné au Management est verrouillée[cite: 8]. Le système exige l'une des deux actions suivantes :
> 1. Une remédiation immédiate des "Alertes Fatales" sur le backlog[cite: 8].
> 2. Un forçage manuel explicite avec traçabilité d'audit d'exception (le RTE humain valide qu'il accepte sciemment le risque)[cite: 8].

---

## 📋 5. Checklist de Sortie HRO (Gérée par le MentorAgent)

Avant de clore officiellement la phase de préparation et d'autoriser l'ouverture du PI Planning, le RTE valide la résilience du plan à l'aide du `MentorAgent`[cite: 4, 8] :

* [ ] **Prédictibilité :** La vélocité historique certifiée par le Registre R1 couvre-t-elle l'engagement du plan proposé[cite: 3, 8] ?
* [ ] **Anti-fragilité :** Avons-nous préservé une zone tampon de **15% de capacité non engagée** pour absorber l'imprévu et protéger la charge cognitive des équipes[cite: 5, 8] ?
* [ ] **Clarté :** 100% des Features prioritaires possèdent-elles des critères d'acceptation validés et conformes au `Quality Guard`[cite: 3, 8] ?