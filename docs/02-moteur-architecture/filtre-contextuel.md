---
id: filtre-contextuel
title: "🔍 Couche 2 : Le Filtre Contextuel & Traitement des Signaux"
sidebar_label: Le Filtre Contextuel & Traitement des Signaux
slug: /filtre-contextuel
---

# Le Filtre Contextuel & Traitement des Signaux

La puissance brute d'un modèle de langage (LLM) est inutile, voire dangereuse, si elle est appliquée directement sur le flux désordonné d'une infrastructure d'entreprise. Injecter des milliers de tickets Jira ou des logs Slack non triés dans un prompt système conduit inévitablement à deux pathologies logicielles : la **saturation du contexte** (infobésité) et l'**hallucination architecturale**.

La Couche 2 de Neuro-Scale agit comme un **interrupteur et filtre contextuel**. Elle intercepte les signaux bruts, les passe au tamis des 7 piliers organisationnels (SAFe, Team Topologies, ToC) et génère un **Distillat** hyper-filtré, mathématiquement exact et sémantiquement structuré.

---

## 1. Le Flux de Transformation du Signal

Le framework appliquant une logique de réduction de la complexité en quatre étapes successives :

```mermaid
graph TD
    %% Configuration des styles
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef step fill:#e1f5fe,stroke:#0288d1,stroke-width:1.5px;
    classDef capteur fill:#fff3e0,stroke:#ffb74d,stroke-width:1.5px;
    classDef engine fill:#f1f8e9,stroke:#558b2f,stroke-width:2px;

    %% Noeuds du flux
    Flux[Flux de Delivery Brut<br/>Jira, Confluence, Slack] --> E1
    
    subgraph Transformation [Processus de Réduction de Complexité]
        E1[Étape 1 : Captation & Certification<br/>flow_metrics_engine.py / quality_guard.py]
        E1 -->|Données Certifiées CALCULÉ| E2
        E1 -.->|Incohérences| Bruit[Marqué comme BRUIT]
        
        E2[Étape 2 : Classification Cynefin<br/>flow_dispatcher.py]
        E2 -->|Situations Compliquées| Det[Moteurs Déterministes<br/>NetworkX / Chemin Critique]
        E2 -->|Situations Complexes| R2[Registre Multi-Agents R2<br/>Analyse Sémantique]
        
        Det --> E3
        R2 --> E3
        
        E3[Étape 3 : Distillation Thématique<br/>distillats.py - Injection JSON] --> E4
        E4[Étape 4 : Exécution Contextualisée<br/>Architecture Blackboard / Format RPD]
    end

    E4 --> Output[Livrable Décisionnel Auditable<br/>rule_id unique]

    %% Assignation des classes
    class E1,E2,E3,E4 step;
    class Flux,Output engine;
    class Bruit,Det,R2 capteur;
    ```

### Étape 1 : Captation et Certification (Registre R1)
Les "Capteurs" de la Couche 3 (`flow_metrics_engine.py`, `quality_guard.py`) extraient les faits bruts des outils de delivery (Jira, Confluence). 
* **Action :** Le système valide l'intégrité de la donnée. Si une User Story n'est pas conforme aux critères INVEST ou si une Feature n'a pas de critères d'acceptation, le `Quality Guard` la marque comme `Bruit`. Les données certifiées reçoivent le badge `CALCULÉ`.

### Étape 2 : Classification par la Complexité (Cynefin Router)
Le composant `flow_dispatcher.py` qualifie la nature de l'anomalie ou de la friction selon le cadre Cynefin :
* **Situations Compliquées :** Routées vers des moteurs de calcul purement déterministes (ex : calcul d'un chemin critique de dépendances via NetworkX).
* **Situations Complexes :** Routées vers l'orchestration multi-agents du Registre R2 pour une analyse probabiliste et sémantique.

### Étape 3 : Distillation Thématique (`distillats.py`)
Pour l'analyse agentique, le module extrait statiquement les règles métiers (fichiers JSON dans `knowledge/`) correspondant à l'arborescence de l'organisation. L'agent ne reçoit que ce qui est strictement nécessaire à sa fonction (Distillats Primaires vs Secondaires), limitant l'empreinte mémoire du prompt.

### Étape 4 : Exécution Contextualisée (Registre R2)
L'agent s'exécute sur l'architecture Blackboard Extended. Son livrable de sortie est structuré au format **RPD (Recognition-Primed Decision)**, associant systématiquement chaque diagnostic à un identifiant unique (`rule_id`) issu du distillat cadre.

---

## 2. Anatomie d'un Distillat à l'Exécution

Le "Distillat" final poussé dans le prompt système d'un agent de la Couche 4 n'est pas une simple chaîne de texte. C'est une **superposition dynamique de trois couches de confiance** :

```mermaid
graph TD
    %% Styles
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef coucheA fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef coucheB fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef coucheC fill:#c8e6c9,stroke:#388e3c,stroke-width:2px;

    subgraph Distillat [Structure Multi-Couches du Prompt Système]
        C[COUCHE C : Synthèse Diagnostique<br/>DiagnosticConsolidator<br/>Label: RECOMMANDÉ · Patterns sémantiques croisés] 
        B[COUCHE B : GraphEvents du Blackboard R1<br/>Indicateurs Certifiés<br/>Label: CALCULÉ · Vélocité / WIP / DoR / Graphes]
        A[COUCHE A : Distillats Frameworks<br/>JSON Statiques de Connaissances<br/>Label: STATIQUE · Règles logiques IF/THEN / Seuil Sweller]
        
        C --- B
        B --- A
    end

    class A coucheA;
    class B coucheB;
    class C coucheC;
```

### Exemple de Prompt Injecté (`_FRAMEWORK_HEADER`)
Lorsqu'un agent comme le `DependencyAgent` est sollicité, le système assemble à la volée le contexte suivant :

#### Référentiel Décisionnel NEURO-SCALE (Couche A - Statique)
* **Source :** `TeamTopologies.json` | Rule_ID: `TT-042`
* **Règle :** IF friction_inter_equipes == HAUTE AND type_frontiere == 'Stream-Aligned/Complicated-Subsystem' THEN HITL_Niveau = 2 (Arbitrage RTE).

#### Faits Certifiés du Blackboard (Couche B - Calculé)
* **Statut :** `CALCULÉ` (QualityGuard Score: 0.94)
* **Métriques :** CycleTime: +14j | Tickets_Otages: 3 | Story_Points_Bloqués: 24.
* **Graphe :** Dépendance cyclique détectée entre l'Équipe A et l'Équipe B.

#### Diagnostic Consolidé (Couche C - Recommandé)
* **Pattern détecté :** Anti-pattern SAFe #12 (Architecture en silo masquée par des rituels de synchronisation artificiels).

---

## 3. Les Trois Niveaux de Confiance de l'Interface

Grâce au filtrage contextuel, l'interface utilisateur (le design Bento Grid) et le Release Train Engineer disposent d'un indicateur de transparence absolue sur la provenance des informations :

* **CALCULÉ (Indice de Haute Fidélité) :** Généré uniquement lorsque les données brutes de R1 sont complètes et que le fondement scientifique associé est de niveau vert (Irréfutable).
* **PROBABLE (Marge d'Erreur) :** Activé si les données R1 sont partielles ou si le diagnostic s'appuie sur une théorie organisationnelle de niveau jaune (Robuste, nécessitant l'interprétation humaine).
* **NON VÉRIFIÉ (Sécurité Systémique) :** Déclenché si le score du `Quality Guard` s'effondre (données Jira corrompues ou incohérentes). Le système verrouille alors le registre R2 et refuse d'émettre des recommandations pour empêcher toute prise de décision basée sur des hallucinations.

---

## 4. Traçabilité Totale et Immutabilité

* **Immutabilité des Faits :** Le Filtre Contextuel garantit qu'aucun agent de l'infrastructure R2 ne possède les droits d'écriture sur le Registre R1. L'IA peut interpréter les métriques de flux, elle ne peut en aucun cas les modifier ou les lisser.
* **Auditabilité :** Chaque notification reçue par le management affiche en note de bas de page la traçabilité complète de son filtrage :
  > `[Diagnostic: Agent-Dependency | Source: R1-QualityGuard | Distillat: TeamTopologies-JSON | Rule_ID: TT-042 | Confiance: CALCULÉ]`