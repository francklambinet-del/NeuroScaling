---
id: gouvernance-ethique
title: "⚖️ Gouvernance, Éthique & Contrat de Confiance (ADR-004)"
sidebar_label: Gouvernance & Éthique
slug: /gouvernance-ethique
---

# Gouvernance, Éthique & Contrat de Confiance

L'introduction de l'intelligence artificielle agentique au sein des structures d'ingénierie logicielle et des cadres d'agilité à l'échelle (SAFe) soulève des questions fondamentales de souveraineté, de transparence et de respect des collectifs. 

NeuroScaling n'a pas été conçu pour surveiller, évaluer ou micro-manager les individus. Il s'agit d'une **infrastructure de protection cognitive et de résilience systémique**. Sa mission exclusive est de sécuriser le flux de valeur d'un train (Agile Release Train - ART) en absorbant la surcharge informationnelle et en protégeant la capacité de décision humaine.

Ce document formalise les règles d'éthique et de gouvernance logicielle du framework, gravées dans le référentiel d'ingénierie sous l'identifiant **ADR-004**.

---

## 1. Le Principe d'Agrégation Exclusive (Anti-Flicage)

La règle absolue du framework est l'étanchéité totale vis-à-vis des données individuelles. NeuroScaling applique une politique de restriction stricte au niveau de ses capteurs de données (Registre R1) :

* **Zéro métrique individuelle :** Le système ne calcule, ne stocke et ne projette aucun indicateur nominatif. Les notions de performance individuelle, de classement de développeurs ou de traque d'activité personnelle sont absentes du code source.
* **Agrégation au niveau de l'Équipe :** Le flux de travail, la charge cognitive (Loi de Sweller) et la vélocité sont mesurés exclusivement à l'échelle collective de l'équipe (Scrum Team) ou du train (ART).
* **Anonymisation des signaux faibles :** Lorsque l'agent `CapacityAgent` détecte un risque de surchauffe ou de saturation, l'alerte émise signale un épuisement de la capacité de l'équipe induit par des frictions de processus (ex: *context-switching* ou *Shadow Backlog*), sans jamais pointer de responsabilité individuelle.

---

## 2. Immutabilité et Transparence des Registres (ADR-001)

Pour bâtir un environnement de haute fiabilité (HRO), les utilisateurs doivent avoir une confiance absolue dans la véracité des diagnostics affichés. NeuroScaling résout ce défi par un découplage architectural strict :




* **Immutabilité des Faits (R1) :** Les composants déterministes (`flow_metrics_engine.py`, `quality_guard.py`) écrivent les faits mathématiques bruts sur le Blackboard. Les agents du Registre R2 disposent d'un droit de lecture universel mais n'ont **aucun droit d'écriture ou de modification** sur ces métriques. L'IA peut interpréter le flux, elle ne peut jamais falsifier ou lisser une mesure algorithmique.
* **Auditabilité Totale (rule_id) :** Aucune recommandation ou alerte n'est issue de la "mémoire générale" ou de l'improvisation d'un Grand Modèle de Langage (LLM). Chaque diagnostic publié sur l'interface doit obligatoirement citer le `rule_id` issu des fichiers de configuration des distillats. Le cheminement logique est auditable par n'importe quel délégué à la protection des données ou auditeur système.

---

## 3. Les Trois Niveaux de Confiance de l'Interface

NeuroScaling affiche de manière transparente la marge d'erreur ou le niveau de fiabilité scientifique de ses analyses à travers trois badges de confiance explicites :

1. **CALCULÉ (Indice de Haute Fidélité) :** Activé uniquement lorsque les données brutes fournies par R1 sont complètes et conformes à 100%, et que le fondement théorique sous-jacent est de niveau Vert (Irréfutable, comme la Loi de Sweller).
2. **PROBABLE (Marge d'Erreur Signalée) :** Déclenché si les données d'entrée présentent des légères lacunes ou si le diagnostic s'appuie sur une théorie d'organisation de niveau Jaune (Robuste, nécessitant une validation contextuelle par l'humain).
3. **NON VÉRIFIÉ (Sécurité Systémique) :** Émis dès que le score d'intégrité du `Quality Guard` s'effondre (données Jira corrompues, incohérences majeures). Dans ce mode, **le système verrouille le Registre R2** et refuse de générer des recommandations pour empêcher toute prise de décision basée sur des hallucinations ou du bruit informationnel.

---

## 4. Alignement RGPD & Souveraineté des Données

NeuroScaling est conçu pour respecter les standards de sécurité et de conformité les plus exigeants (notamment pour les marchés européens et canadiens) :

* **Collecte Minimale :** Le framework n'aspire pas les données textuelles non structurées des conversations privées (Slack, Teams). Il se concentre exclusivement sur les métadonnées de livraison (cycles de vie des tickets, liaisons de dépendances, statuts d'avancement).
* **Exécutable Souverain :** L'infrastructure de traitement R1 et l'orchestration des agents R2 (LangGraph) sont conçues pour être déployées au sein du cloud privé ou du tenant sécurisé de l'entreprise. Les données de flux ne sont jamais partagées avec des modèles tiers ou utilisées pour l'entraînement de LLM publics.

---

## 5. Le Manifeste NeuroScaling : L'IA au Service des Collectifs

1. **L'IA suggère, l'algorithme prouve, l'humain décide :** Le système n'automatise aucune décision managériale. Il éclaire les arbitrages par des faits.
2. **Un bouclier, pas une arme :** Le framework sert à démontrer la surcharge et à justifier scientifiquement le besoin de délester une équipe en situation de surchauffe face aux exigences du métier.
3. **Le droit à l'anomalie :** Les variations de vélocité ou les dérives de trajectoire sont traitées comme des anomalies systémiques à résoudre par l'amélioration des processus (Double Boucle d'Apprentissage), et non comme des fautes ou des baisses de performance humaine.