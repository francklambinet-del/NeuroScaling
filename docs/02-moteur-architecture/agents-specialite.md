---
id: agents-specialite
title: "🤖 Couche 4 : Catalogue des Agents de Spécialité (NeuroScaling v4.0)"
sidebar_label: Les Agents spécialisés
slug: /agents-specialite
---

# Le Catalogue des Agents de Spécialité

L'infrastructure de **Couche 4** répartit sa puissance de calcul et d'analyse sémantique à travers un réseau distribué de **24 agents cognitifs**. Chaque agent est un conteneur de logique spécialisé, totalement étanche de ses pairs, interagissant uniquement par lecture et écriture de messages typés sur l'architecture Blackboard Étendue.

Voici les spécifications d'ingénierie des 4 agents maîtres du framework.

---

## 1. DependencyAgent (Le Cartographe du Réseau)

### Mission
Le `DependencyAgent` a pour rôle de neutraliser les risques systémiques de livraison en qualifiant la nature des frictions inter-équipes. Il transcende la simple liste de blocages Jira pour modéliser la topologie réelle des flux.
* **Fondement Scientifique :** Loi de la Variété Requise (Ashby) (Niveau vert - Irréfutable) et Team Topologies (Niveau jaune - Robuste)
* **Triggers (Déclencheurs) :**
  * Détection par le Registre R1 d'un lien bloquant non résolu à J-7 d'un changement de sprint.
  * Création d'une dépendance impliquant une équipe identifiée comme « Goulot » par la Théorie des Contraintes.
* **Comportement Algorithmique :** Utilise des algorithmes de théorie des graphes (via NetworkX en R1) pour identifier trois structures pathologiques : les blocages cycliques (*Deadlocks*), les frictions en chaîne (*Gridlocks*) où une cascade dépasse trois interdépendances linéaires, et les « Tickets Otages » (une User Story unique bloquée paralysant plus de 20% des Story Points de l'itération).

```mermaid
graph LR
    %% Configuration des styles
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef team fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef alerte fill:#ffcdd2,stroke:#d32f2f,stroke-width:2px;

    A[Équipe A] -->|Attend / S'appuie sur| B[Équipe B]
    B -->|Attend / Bloquée par| A

    subgraph Deadlock [Structure Cyclique Détectée]
        A
        B
    end

    class A,B team;
    class Deadlock alerte;
    ```

---

## 2. CapacityAgent (Le Gardien du Flow)

### Mission
Le `CapacityAgent` protège la santé cognitive des collectifs et sécurise la prévisibilité du delivery. Il agit comme un pare-feu biologique contre l'infobésité et le sur-engagement.
* **Fondement Scientifique :** Théorie de la Charge Cognitive (Sweller) (Niveau vert - Irréfutable)
* **Triggers (Déclencheurs) :**
  * Taux de Work In Progress (WIP) cumulé d'une équipe franchissant le seuil critique de 75%.
  * Volume d'alertes ou de modifications de scope dans Jira dépassant 5 événements par tranche de 24 heures sur un même périmètre.
* **Comportement Algorithmique :** Il calcule l'indice de charge cognitive extrinsèque du train. Lorsque le seuil de saturation est dépassé, il pousse un diagnostic RPD sommant le management de réduire le WIP ou de geler temporairement l'injection de nouvelles tâches pour ramener le système dans sa Zone Cible de Flow (40% à 65%).

---

## 3. ValueArbitrator (Le Protecteur Stratégique)

### Mission
Le `ValueArbitrator` audite en continu l'alignement entre l'effort opérationnel réel du train et la stratégie macro de l'entreprise. Il empêche l'essoufflement technologique sur des chantiers à faible valeur business.
* **Fondement Scientifique :** Wardley Mapping et Alignement OKR (Niveau jaune - Robuste)
* **Triggers (Déclencheurs) :**
  * Clôture d'un sprint affichant une dérive budgétaire ou temporelle sur une Feature à faible score WSJF (*Weighted Shortest Job First*).
  * Incohérence sémantique détectée (via embeddings R2) entre les User Stories d'un backlog et la description de l'OKR parent.
* **Comportement Algorithmique :** Il croise les données de coût de delivery avec les objectifs de valeur business. Si une équipe consomme plus de 25% de sa bande passante sur un composant mature ou commoditisé sans alignement stratégique direct, l'agent lève une alerte de dérive de valeur et propose une dé-priorisation immédiate.

---

## 4. MentorAgent (Le Catalyseur de Posture)

### Mission
Le `MentorAgent` agit comme un conseiller d'architecture et de gouvernance à haute posture pour le Release Train Engineer (RTE). Il utilise l'historique de l'organisation pour transformer les incidents en apprentissages profonds.
* **Fondement Scientifique :** Apprentissage en Double Boucle (Argyris & Schön) (Niveau vert - Irréfutable) et Naturalistic Decision Making (Niveau jaune - Robuste)
* **Triggers (Déclencheurs) :**
  * Activation du Mode Commando (PI Readiness) à J-15 du PI Planning.
  * Échec répété d'un indicateur de delivery sur deux sprints consécutifs (activation de la boucle de rétroaction).
* **Comportement Algorithmique :** Il extrait les patterns historiques de réussite et d'échec du train. Plutôt que de suggérer des corrections de planification de surface (Boucle Simple), il soumet des diagnostics structurels basés sur le modèle VSM de Beer, invitant à redéfinir les frontières d'équipes ou les processus d'arbitrage budgétaire (Boucle Double).

---

## 5. Règle de Sûreté Logicielle : Validation des Entrées/Sorties

Chaque agent de la Couche 4 est bridé par un contrat d'interface strict (gouverné par l'ADR-006). Pour qu'une recommandation d'un agent soit publiée sur le Blackboard et affichée sur le design Bento Grid de l'utilisateur, elle doit obligatoirement valider la structure de son contrat d'interface :

* **`agent_id`** : Identifiant unique de l'agent.
* **`trigger_source`** : Origine du signal de déclenchement ("R1" ou "R2").
* **`rule_id`** : Référence exacte dans le JSON des Distillats.
* **`confidence_label`** : Niveau de certitude (`CALCULÉ` | `PROBABLE` | `NON VÉRIFIÉ`).
* **`rpd_payload`** : Le bloc décisionnel contenant l'action concrète immédiate (Recommandation limitée à deux lignes maximum), le dysfonctionnement sémantique ou structurel identifié (Pattern détecté), et les preuves mathématiques issues du Registre R1 (Données probatoires).

```TypeScript
interface AgentSpecification {
  agent_id: string;             // Identifiant unique de l'agent
  trigger_source: "R1" | "R2";  // Origine du signal de déclenchement
  rule_id: string;              // Référence exacte dans le JSON des Distillats
  confidence_label: string;     // CALCULÉ | PROBABLE | NON VÉRIFIÉ
  rpd_payload: {
    recommandation: string;     // Action concrète immédiate (Max 2 lignes)
    pattern_detected: string;   // Dysfonctionnement sémantique ou structurel
    evidence_facts: string[];   // Preuves mathématiques issues du Registre R1
  }
}
```

> **Sécurité Systémique :** Si le payload généré par l'IA ne contient pas les preuves issues de R1 ou omet de citer le `rule_id` du distillat d'origine, le `DiagnosticOrchestrator` rejette la publication, consigne une erreur d'intégrité et maintient le système en sécurité.