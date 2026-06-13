---
id: gestion-distillats
title: "⚙️ Couche 4 : Le Moteur de Gestion des Distillats"
sidebar_label: Le Moteur de Gestion des Distillats
slug: /gestion-distillats
---

# Le Moteur de Gestion des Distillats

L'un des défis majeurs de l'ingénierie agentique en entreprise est le contrôle du comportement des Modèles de Langage (LLM). Laisser un agent interroger un grand modèle en s'appuyant uniquement sur sa mémoire générale expose le système aux hallucinations réglementaires. À l'inverse, lui injecter des méthodologies entières (comme le framework SAFe de plusieurs centaines de pages) sature sa fenêtre de contexte et dégrade ses capacités de raisonnement.

Neuro-Scale résout ce paradigme par son **Moteur de Gestion des Distillats** (`distillats.py`). Ce composant extrait, filtre et assemble dynamiquement des fragments de connaissances méthodologiques stricts pour formater le prompt système de chaque agent à l'exécution.

---

## 1. Le Principe de la Triple Fusion Contextuelle

À l'activation d'un agent par le `DiagnosticOrchestrator`, le moteur compile une invite structurée en superposant trois niveaux de données étanches :

```mermaid
graph TD
    %% Configuration globale des styles
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef coucheA fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef coucheB fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef coucheC fill:#c8e6c9,stroke:#388e3c,stroke-width:2px;

    subgraph Fusion [Structure de la Triple Fusion Contextuelle]
        C[COUCHE C : SYNTHÈSE DIAGNOSTIQUE<br/>Registre R2 - Sémantique<br/>Historique des patterns · Signaux faibles · Corrélations]
        B[COUCHE B : GRAPH EVENTS<br/>Registre R1 - Déterministe<br/>Métriques de flux certifiées · WIP réel · Dépendances]
        A[COUCHE A : DISTILLATS STATIQUES<br/>Fichiers JSON - Connaissances<br/>Règles logiques strictes · Seuils · Identifiants rules]
        
        C --- B
        B --- A
    end

    class A coucheA;
    class B coucheB;
    class C coucheC;
    ```

* **La Couche A (Statique) :** Les règles immuables des frameworks (SAFe, Team Topologies, ToC) stockées sous forme de fichiers de connaissances statiques dans le dossier `knowledge/`.
* **La Couche B (Calculée) :** Les faits mathématiques bruts extraits en temps réel par les capteurs déterministes et publiés sur le Blackboard.
* **La Couche C (Recommandée) :** Les conclusions et patterns sémantiques identifiés lors des cycles précédents par les autres agents.

---

## 2. Spécification Technique de `distillats.py`

Le composant charge et distribue les règles selon une matrice de dépendances optimisée en mémoire via un cache de type LRU (`lru_cache`), évitant les accès disque redondants.

Structure d'un fichier de Distillat (knowledge/team_topologies.json)
```JSON
{
  "framework": "Team Topologies",
  "version": "4.0",
  "rules": [
    {
      "rule_id": "TT-042",
      "interaction_type": "Collaboration",
      "trigger_condition": "Friction inter-équipes prolongée sur composant partagé",
      "severity": "HIGH",
      "system_instruction": "IF friction_score > 0.75 AND boundary == 'Stream-Aligned/Complicated-Subsystem' THEN classifier comme dysfonctionnement topologique. Recommander un transfert de propriété du composant ou un alignement des backlogs."
    }
  ]
}
```

Le moteur s'appuie sur des schémas de configuration stricts où chaque règle métier se voit attribuer un identifiant unique, un type d'interaction qualifié, un déclencheur algorithmique précis ainsi qu'une sévérité d'exécution. Cela permet au script d'assembler ces éléments et d'injecter le bloc final directement en tête de la configuration de l'agent. 

### Exemple d'Empreinte Générée à l'Exécution (`_FRAMEWORK_HEADER`)

### SYSTEM INSTRUCTION : _FRAMEWORK_HEADER
[GOUVERNANCE] : Vous opérez sous le référentiel Neuro-Scale V4. Toute recommandation doit être adossée à une règle explicite.

[DISTILLAT PRIMAIRE : TEAM TOPOLOGIES | ID: TT-042]
* Règle : En cas de friction supérieure à 0.75 entre une équipe Stream-Aligned et une équipe Complicated-Subsystem, vous devez isoler les tickets otages et proposer un arbitrage topologique au RTE.

[FAITS BLACKBOARD CERTIFIÉS R1 : CALCULÉ]
* team_friction_score : 0.84
* blocked_story_points : 24
* active_gridlocks : 1

[DIRECTIVE DE SORTIE] : Générez votre diagnostic uniquement au format RPD (ADR-006) en citant le Rule_ID associé.

* **Gouvernance :** Vous opérez sous le référentiel Neuro-Scale V4. Toute recommandation doit être adossée à une règle explicite.
* **Distillat Primaire (Team Topologies - Règle active) :** En cas de friction supérieure à 0.75 entre une équipe Stream-Aligned et une équipe Complicated-Subsystem, vous devez isoler les tickets otages et proposer un arbitrage topologique au RTE.
* **Faits Blackboard Certifiés R1 (`CALCULÉ`) :** score de friction à 0.84, 24 Story Points bloqués, 1 blocage en chaîne actif.
* **Directive de Sortie :** Générez votre diagnostic uniquement au format RPD (ADR-006) en citant le `rule_id` associé.

---

## 3. Matrice de Granularité : Distillats Primaires vs Secondaires

Pour optimiser la vitesse de traitement et garantir l'étanchéité des rôles, le moteur distribue les connaissances selon deux niveaux de granularité :
* **Les Distillats Primaires (Mastery) :** L'agent possède la logique métier profonde du framework. Il est configuré pour interpréter les nuances sémantiques de ce domaine (ex : Le `DependencyAgent` maîtrise le distillat Team Topologies).
* **Les Distillats Secondaires (Guardrails) :** L'agent ne reçoit que les expressions logiques de surface sous forme de conditions IF/THEN strictes, agissant comme des barrières de sécurité pour son raisonnement (ex : Le `BacklogAgent` reçoit le distillat Theory of Constraints au niveau secondaire pour s'assurer que ses actions de raffinement aident à débloquer le goulot d'étranglement général du train).

---

## 4. Sûreté logicielle & Maintenance Centralisée

Ce modèle d'architecture offre deux garanties fondamentales pour la pérennité de votre infrastructure :
* **Zéro dérive de version (Single Source of Truth) :** Les règles d'entreprise et les seuils méthodologiques ne sont jamais codés en dur dans les invites des agents. Si vous ajustez la zone cible de charge cognitive de Sweller (ex : passage de 40-65% à 50-70%), la modification est effectuée à un seul endroit : dans le fichier de configuration de la Couche 1. Le moteur `distillats.py` propage instantanément la nouvelle règle à l'ensemble de l'armée d'agents au cycle suivant.
* **Auditabilité Totale :** En forçant l'intégration du `rule_id` tout au long de la chaîne de traitement, le framework permet de remonter instantanément de l'interface utilisateur (Bento Grid) jusqu'au fichier de configuration d'origine, garantissant une transparence totale pour les comités de gouvernance.