---
id: index
title: "🛡️ NeuroScaling : Architecture de Résilience & Protection Cognitive"
sidebar_label: 🏠 Accueil
slug: /
---

# NeuroScaling Architecture

### La fin de l'infobésité pour les leaders Agiles.

Dans les organisations à grande échelle, la complexité n’est pas un défi, c’est un poison. NeuroScaling est une **infrastructure de confiance** conçue pour filtrer le bruit informationnel, protéger votre capacité de décision et garantir la prévisibilité du delivery au sein de vos Trains SAFe (Agile Release Trains).

Le pilotage d'un train complexe ne devrait pas consister à consolider manuellement des rapports Jira incohérents ou à subir la saturation des processus. NeuroScaling déploie plusieurs **agents spécialisés** (registre complet et compte vérifié : `02-moteur-architecture/Registres.mdx`) qui agissent comme le système immunitaire organisationnel de votre delivery.

---



---
## 📈 Une Trajectoire de Déploiement Pragmatique en 3 Phases

Pour éviter l'effet "boîte noire" et la fatigue d'alerte des systèmes d'IA non éprouvés, Neuro-Scale ne se déploie pas en mode "grand soir". Le framework s'implémente de manière incrémentale, sécurisée, pour générer ses propres preuves de valeur à chaque étape :

### 🔹 Phase 1 : Onboarding & Cartographie
* **Objectif :** Initialisation non intrusive.
* **Action :** Modélisation de la structure du train, description des équipes, des trains et alignement strict sur les cadences et dates de l'Agile Release Train (ART).

### 🔹 Phase 2 : Fiabilisation & Data Quality Score (Création de Valeur Immédiate)
* **Objectif :** Rendre vos données fiables avant de chercher à prédire (*Anti-Garbage in, Garbage out*).
* **Action :** Activation du Registre R1 (déterministe, 100% algorithmique, zéro LLM) pour calculer un score de qualité de données par équipe (complétude des liens Epic ➔ Feature ➔ Story, fraîcheur des statuts, conformité DoR). 
* **La Barrière de Sécurité (Gate) :** Le moteur d'IA probabiliste (Registre R2) reste structurellement désactivé tant que la qualité des données de l'équipe n'a pas atteint un seuil de confiance validé. Vous obtenez un livrable d'audit concret dès la deuxième semaine.

### 🔹 Phase 3 : Full Run MVP Instrumenté
* **Objectif :** Activer l'intelligence collective sans saturer le train.
* **Action :** Activation d'une surface restreinte à **4 ou 5 agents clés** seulement (Capacity, Dependency, QualityGuard). 
* **Gouvernance par la preuve :** Chaque diagnostic émis est soumis à une validation humaine en un clic (Human-In-The-Loop). Le système historise ces retours pour afficher, au bout d'un PI, le taux de précision réel et le temps économisé par le système.

## 🗺️ Cartographie Globale de l'Architecture

L'architecture globale de NeuroScaling est structurée en 4 couches et 3 piliers d'ingéniérie étanches, garantissant un passage fluide de la captation de données brutes jusqu'à la prise de décision humaine.


## 🏗️ Les 4 Couches Architecturales

```mermaid

flowchart TD

    subgraph C1["COUCHE 1 — Scientifique · Pourquoi ça marche"]
        direction LR
        S1[Sweller · CLT] --- S2[Kahneman · Dual Process] --- S3[Cynefin · Snowden] --- S4[Ashby · Requisite Variety]
        S5[Weick · HRO] --- S6[Argyris · Double Loop] --- S7[Holland · CAS] --- S8[Edmondson · Psych. Safety]
    end

    subgraph C2["COUCHE 2 — Organisationnelle · Dans quel contexte"]
        direction LR
        O1[SAFe 6.0] --- O2[Team Topologies] --- O3[Théorie des Contraintes] --- O4[Wardley Mapping]
        O5[OODA Loop · Boyd] --- O6[Viable System Model · Beer] --- O7[OKR Alignment]
    end

    subgraph C3["COUCHE 3 — Opérationnelle · Comment les humains travaillent"]
        direction LR
        P1[Cérémonies SAFe enrichies] --- P2[Workflows RTE · PO · SM] --- P3[Artefacts · Rapports · Dashboard]
    end

    subgraph C4["COUCHE 4 — Agentique · Comment les agents exécutent"]
        direction LR
        A1[Moteurs R1 · engine/] --- A2[Agents R2 · LangGraph] --- A3[HITL · interrupt_before] --- A4[Cockpit Streamlit] --- A5[Distillats · Documentation/]
    end

    C1 -->|légitime| C2
    C2 -->|contextualise| C3
    C3 -->|concrétise| C4

    %% Styles globaux des nœuds
    classDef default fill:#2b2b2b,stroke:#555,stroke-width:1px,color:#ffffff;

    %% Styles sombres contrastés
    style C1 fill:#0f2a4a,stroke:#185FA5,stroke-width:2px,color:#ffffff
    style C2 fill:#0a3a2f,stroke:#0F6E56,stroke-width:2px,color:#ffffff
    style C3 fill:#3d2403,stroke:#854F0B,stroke-width:2px,color:#ffffff
    style C4 fill:#232059,stroke:#534AB7,stroke-width:2px,color:#ffffff

  ```






---


NeuroScaling structure sa logique de réduction de la complexité en quatre couches successives, allant des fondements scientifiques abstraits jusqu'à l'exécution logicielle concrète :

**Couche 1 — Scientifique (Le "Pourquoi")** : Le socle de légitimité académique. Chaque seuil algorithmique et alerte est adossé à des théories prouvées (Loi de Sweller sur la charge cognitive humaine, Loi de la variété requise d'Ashby, Double Boucle d'Argyris & Schön, Cadre Cynefin de Snowden).

**Couche 2 — Organisationnelle (Le "Où")** : Le filtre contextuel du terrain. Cette couche traduit les théories scientifiques dans le contexte de l'agilité à l'échelle à travers 7 Piliers Modélisateurs (SAFe 6.0, Team Topologies, Théorie des Contraintes, etc.). C'est ici que le bruit sémantique est transformé en Distillats.

**Couche 3 — Opérationnelle (Le "Comment")** : La couche de captation des signaux bas niveau. Elle se compose des "Capteurs" déterministes branchés directement sur l'outil de delivery — **Jira** (*correction : aucun adapter GitHub n'existe dans le dépôt* ; les adapters réels sont `atlassian`, `llm`, `transcription`, `vector`) — et matérialisés par les cérémonies, workflows et artefacts SAFe.

**Couche 4 — Agentique (Le "Qui")** : Le cerveau exécutif. Plusieurs agents spécialisés (`DependencyAgent`, `CapacityAgent`, `MentorAgent`, etc. — registre complet : `02-moteur-architecture/Registres.mdx`) qui émettent des diagnostics au format **RPD** (*correction : Recommandation / Preuve / Diagnostic — 3 champs sur 3 agents, pas « Recognition-Primed Decision »*).


---
![Architecture Globale Neuro-Scale](/img/Architecture_Globale.png)

## ⚙️ Les Trois Piliers du Système

### 1. Assainissement Déterministe (Registre R1)
Grâce au moteur **Quality Guard**, aucune analyse n'est produite sur des données corrompues. Le système valide mathématiquement l'intégrité de votre backlog (critères INVEST, conformité DoR/DoD) et certifie les mesures avant d'alimenter les couches supérieures. **Zéro LLM, zéro hallucination.**

### 2. Vigilance Agentique (Registre R2)
Nos agents spécialisés posent des diagnostics au format **RPD (Recommandation / Preuve / Diagnostic)**, transformant des métriques froides en arbitrages stratégiques immédiats.

### 3. Résilience Cognitive
En s'appuyant sur des fondements scientifiques rigoureux comme la Théorie de la Charge Cognitive (Sweller) et la Théorie des Contraintes (ToC), NeuroScaling protège l'énergie mentale de vos collectifs. Le système maintient l'organisation dans sa zone cible de flow et détecte les goulots d'étranglement structurels avant qu'ils ne paralysent votre PI (Program Increment).

---

## 🚀 Navigation par Persona

NeuroScaling adapte sa visibilité et ses indicateurs selon votre rôle au sein du train :

* **Release Train Engineer (RTE) :** Pilotez par exception. Activez le *Mode Commando* à J-15 et concentrez-vous uniquement sur les alertes de rupture et les risques de non-préparation du train.
* **Product Owner / Product Manager :** Maximisez la valeur. Utilisez le module *ValueArbitrator* pour défendre vos priorités budgétaires et détecter les désalignements avec vos objectifs stratégiques (OKRs).
* **Scrum Master :** Garantissez le Flow. Surveillez la santé systémique de votre équipe et protégez l'espace de Deep Work en neutralisant la charge cognitive extrinsèque.

---

> ⚖️ **Contrat de Sûreté (ADR-001) :** L'IA suggère, l'algorithme prouve, l'humain décide. Aucune donnée individuelle n'est collectée. Le framework est conçu exclusivement pour optimiser la topologie des flux et préserver la capacité décisionnelle des équipes.


* **"Performance et Éco-conception" :**

*⚡ Latence, Coûts et Performance Énergétique

Bien que Neuro-Scale orchestre théoriquement un réseau distribué d'agents, la surface opérationnelle est optimisée pour limiter l'empreinte de calcul et la latence :

* **Architecture asynchrone :** Les agents du Registre R2 ne bloquent pas le delivery. *Correction* : aucun scheduler, cron ou webhook n'a été trouvé dans le code applicatif — l'exécution se fait de façon synchrone via `POST /workflow/run` ou `scripts/run_pipeline_r1_r2.py`. Un cron GitHub Actions existe pour la boucle DQS-triage (`triage.yml`, quotidien) — c'est un mécanisme d'infrastructure CI, distinct de l'exécution des agents eux-mêmes.
* **Distillats :** l'injection de distillats statiques textuels dans le prompt (`knowledge/distillats.py`) réduit l'ingestion du référentiel méthodologique complet à chaque appel — *correction* : aucune mesure de réduction de coût n'a été publiée (l'affirmation « divise par 4 » n'est étayée par aucun benchmark), et `executor_node`, le Maker principal du graphe, n'utilise aucun distillat. Seuls 5 agents sur l'ensemble du registre en injectent (`MentorAgent`, `StrategicAdvisor`, `RetroAgent`, `TriageAgent`, `BacklogAgent`).
* **Mode MVP :** la réduction à une poignée d'agents actifs en phase de run initial garantit un coût d'infrastructure maîtrisé.