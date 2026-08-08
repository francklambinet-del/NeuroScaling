# Recette du lot 1 — 2026-08-03

## 1. Verdict

Le lot est globalement refermable sur le fond documentaire : les trois chantiers de remplacement (3.1, 3.2, 3.3) sont réellement écrits, pas seulement soustraits, et les échantillons de références/constantes vérifiés sont exacts. **Mais le lot n'a jamais été committé** — 21 fichiers modifiés + suppression + 3 nouveaux fichiers non tracés forment un état de travail intégralement dans l'arbre de travail (`git status` : que des `M`/`D`/`??`, aucun commit `docs(...)` du préfixe attendu n'existe dans l'historique, `--all` compris). Une incohérence de chemin (`Documentation/` vs `knowledge/`) subsiste dans un fichier non touché par le lot.

## 2. État git

`git log --oneline -30` ne contient **aucun** commit aux préfixes attendus (`docs(adr):`, `docs(indicateurs):`, `docs(registres):`, `docs(rte):`, `docs(agents):`, `docs(blackboard):`, `docs(influences):`). Recherche élargie à `git log --oneline --all | grep -iE` sur ces mêmes préfixes : **0 résultat**. Le dernier commit du dépôt est `7fa27f0` ("Ajout de l'influence d'ingénierie + logo Architecture NeuroScaling"), antérieur à toute trace du lot 1.

Le lot 1 existe uniquement comme **modifications non commitées** :

`git diff --numstat HEAD -- docs/` :

| Fichier | Ajouts | Suppressions | Ratio ajout/suppr |
|---|---|---|---|
| Influences-Ingenieries.md | 25 | 26 | ~1:1 |
| certitudes-gouvernance.md | 4 | 4 | ~1:1 |
| sept-piliers.md | 31 | 24 | net + |
| theories-base.md | 16 | 13 | net + |
| **Registres.md** | 0 | 239 | **suppression pure (fichier renommé/réécrit en `.mdx`, voir §3)** |
| agents-specialite.md | 39 | 51 | net − |
| blackboard-etendu.md | 63 | 53 | net + |
| cerveau-core.md | 60 | 69 | net − léger |
| filtre-contextuel.md | 27 | 21 | net + |
| gestion-distillats.md | 42 | 45 | ~1:1 |
| **indicateurs-calculs.md** | 161 | 319 | **net −158, le plus fort déséquilibre du lot** |
| po-value-management.md | 10 | 12 | ~1:1 |
| rte-commando.md | 10 | 12 | ~1:1 |
| rte-pi-readyness.md | 30 | 55 | net − |
| sm-resilience.md | 2 | 2 | ~1:1 |
| decisions-index.md | 70 | 56 | net + |
| gouvernance-ethique.md | 2 | 2 | ~1:1 |
| index.md | 73 | 7 | net ++ fort |
| contribution.md | 1 | 1 | ~1:1 |
| sm-checklist.md | 9 | 10 | ~1:1 |
| NEURO-SCALE_Manifeste_v1.3.md | 2 | 0 | net + |

Non commité également : `docusaurus.config.js` (+13/−0), `package.json`/`package-lock.json`, `sidebars.js` (+3/−1 seul changement : chemin `Registres`).

Non suivis (`??`) : `docs/01-fondements-framework/strategie_inSilico.md` (174 lignes, nouveau), `docs/02-moteur-architecture/Registres.mdx` (266 lignes, remplace `Registres.md`), `docs/adr/ADR-036-blackboard-zones-r2-r3.md` (48 lignes, nouveau), `src/components/HomepageFeatures/ZoomMermaid.js`.

**`indicateurs-calculs.md` est le fichier le plus soustractif du lot** (−158 net) : vérifié au §3, cette suppression correspond au retrait d'un catalogue de patterns fictif (27/28 sans correspondance code) remplacé par un catalogue réel de 15 patterns avec seuils — donc une suppression suivie d'un remplacement, pas d'un simple allégement (cf. §3).

## 3. Registres

`docs/02-moteur-architecture/Registres.md` a disparu de l'arbre de travail (statut `D`), remplacé par `docs/02-moteur-architecture/Registres.mdx` (non suivi, 266 lignes — contre 239 lignes supprimées de l'ancien `.md`, net +27 lignes).

- **Tables R1 et R2** : présentes (`## 🔧 Registre R1`, `## 🤖 Registre R2`, tableaux `Cartographie des Composants`).
- **Deux blocs Mermaid** : confirmés — un schéma "Flux Métriques R1" et un schéma "Orchestration Multi-Agents (LangGraph)" (13 nœuds, topologie `budget_guard → … → evaluator → arbiter → executor/human_review`).
- **4 composants orphelins** (`PatternAgent`, `FlowMetricsAgent`, `EarlyWarningSystem`, `PIReadinessGraph`) : tous présents dans la table R2 avec le statut `🔶 Orphelin`, distinct de `✅ Vivant` — chacun accompagné d'une justification citant l'absence d'import réel (grep documenté dans le texte).
- **Références** : `sidebars.js:41` pointe vers `moteur-architecture/Registres` (résout vers `.mdx`, Docusaurus). 9 fichiers du corpus référencent `Registres.mdx` par son nouveau nom (`certitudes-gouvernance.md`, `Influences-Ingenieries.md`, `theories-base.md`, `agents-specialite.md`, `cerveau-core.md`, `indicateurs-calculs.md`, `rte-pi-readyness.md`, `index.md` ×2). Aucun lien mort trouvé vers l'ancien nom `Registres.md`.

Le bon 03 demandait un enrichissement : le fichier a gagné en volume net (239 → 266) tout en étant réécrit intégralement (statut `D` + nouveau fichier non suivi, pas un diff en place) — cohérent avec un enrichissement, pas un allégement.

## 4. Ajouts — tableau

| Élément attendu | Présent ? | Fichier(s) | Extrait |
|---|---|---|---|
| Diagramme LangGraph 13 nœuds réels | Oui | `Registres.mdx:191-233` | `flowchart TB` complet, `START → budget_guard → … → evaluator → arbiter → {executor / human_review / END}` |
| Statuts orphelins distincts | Oui | `Registres.mdx:151,158,164-165` | `🔶 Orphelin` sur EarlyWarningSystem, PIReadinessGraph, PatternAgent, FlowMetricsAgent |
| Colonne "Conformité code" | Oui | `decisions-index.md:38` | En-tête `Conformité code (2026-08-02)` avec légende à 5 valeurs |
| Section "Processus d'Audit" citant `test_invariants.py` | Oui | `decisions-index.md:97-99` | "10 tests d'analyse statique … résultat au 2026-08-02 : 5 `passed`, 5 `xfailed`" |

### 3.1 — `agents-specialite.md` §5 « Règle de Sûreté Logicielle »

**Remplacé, pas seulement supprimé.** Ligne 85 constate le retrait de l'ancien contrat `AgentSpecification` (5 champs, 4 sans occurrence dans le dépôt) avec justification ("vérification faite le 2026-08-02"). Lignes 89-93 le remplacent par trois éléments décrits avec preuves fichier:ligne : `NeuroScaleState` (`core/models.py:185`), `kg_anchors` (`state_monitor/graph.py:900,953`), `EvaluatorAgent` (`evaluator_agent.py`, 294 LOC, 4 checks nommés). La section répond toujours à la question "comment empêchez-vous les hallucinations ?" — avec en prime une réserve documentée (`DRIFT-003` : `kg_anchors` produit par le LLM n'est jamais résolu contre le KG, seul `source_id` l'est).

### 3.2 — `decisions-index.md`

Colonne "Conformité code" présente avec légende explicite (5 valeurs). Comptage par grep sur le fichier complet :

| Valeur | Occurrences |
|---|---|
| ✅ Vérifiée | 9 |
| ⚠️ Partielle | 9 |
| ❌ Violée | 10 |
| 👻 Sans objet en code | 7 |
| ❔ Non vérifiée | 3 |

Section "Processus d'Audit" (ligne 97-99) cite `tests/architecture/test_invariants.py` avec le résultat "5 `passed`, 5 `xfailed`". **Vérifié par exécution réelle** (`python -m pytest tests/architecture/test_invariants.py -q`) : sortie `5 passed, 5 xfailed in 1.55s` — la citation est exacte à ce jour.

### 3.3 — Mermaid R2

Existe dans `Registres.mdx:194-232`. Entrée réelle sur `budget_guard` (`START([Entrée]) --> BG[budget_guard]`), boucle `evaluator → arbiter → executor` explicite (`ARB -- arbiter_router RETRY --> EXE`), sortie `human_review` (`ARB -- arbiter_router HITL --> HR`, `HR --> END3`). Le diagramme déclare 13 nœuds — décompte manuel des nœuds nommés dans le bloc : `budget_guard, sentinel_loader, consolidator, flow_dispatcher, quality_guard, executor, capacity_maker, dependency_maker, human_review, value_arbitrator, predictive_engine, evaluator, arbiter` = 13, cohérent avec l'annonce.

## 5. Vérifiabilité des références

57 références `fichier:ligne` uniques extraites du corpus (`rg -o -n "[a-zA-Z_/]+\.(py|json|yaml|yml):[0-9]+" docs/`). Résolution automatique contre l'arborescence réelle (`src/`, `tests/`, racine) par correspondance de nom de fichier, avec vérification du nombre de lignes du fichier cible :

- **Valides (ligne ≤ nombre de lignes du fichier)** : 57/57 dans l'échantillon testé, y compris les deux cas initialement ambigus par nom de fichier dupliqué :
  - `okr_engine.py:189` — deux fichiers `okr_engine.py` existent (`agents/flow_dispatcher/`, 23 lignes, et `engine/strategy/`, 291 lignes) ; le contexte de citation (`graph.py:33` → `okr_engine.build_flow_dispatcher_analysis`) résout sans ambiguïté vers `engine/strategy/okr_engine.py`, où la ligne 189 existe et correspond au corps de la fonction citée.
  - `pi_readiness_graph.py:118` — deux fichiers homonymes existent également (`agents/pi_readiness_graph.py`, 2 lignes, stub orphelin explicitement nommé comme tel dans le texte ; `agents/rituals/pi_readiness_graph.py`, 182 lignes). La citation complète dans `Registres.mdx:158` donne le chemin exact (`agents/rituals/pi_readiness_graph.py`) ; la ligne 118 existe dans ce fichier.
- **Fichier inexistant** : 0 dans l'échantillon.
- **Ligne hors plage ou contenu divergent** : 0 dans l'échantillon (contenu vérifié en profondeur uniquement sur les citations reprises aux §3-4 ci-dessus ; les 57 références n'ont pas toutes fait l'objet d'une lecture de contenu ligne-à-ligne complète — seule leur existence dans la plage du fichier a été vérifiée systématiquement).

Constantes/seuils nouvellement cités, vérifiés par grep direct dans `src/` :

| Symbole | Cité comme | Trouvé dans le code |
|---|---|---|
| `HITL_SP_THRESHOLD` | 20 | `dependency_agent.py:53` → `HITL_SP_THRESHOLD = 20` ✅ |
| `EVALUATOR_MODEL` | var d'env, défaut `qwen2.5-coder:7b` | `evaluator_agent.py:240` → `os.environ.get("EVALUATOR_MODEL", "qwen2.5-coder:7b")` ✅ |
| `FLOW_ZONE_MIN`/`FLOW_ZONE_MAX` | 40 / 65 | `capacity_agent.py:45-46` → `40`/`65` ✅ |
| `SWELLER_OVERLOAD_THRESHOLD` | 75 | `capacity_agent.py:49` → `75` ✅ |
| `WIP_LIMIT_DEFAULT` | 8 | `workload_optimizer.py:19` → `8` ✅ |
| `PI_READINESS_RISK_THRESHOLD` | 0.60 | `pi_readiness_engine.py:52` → `0.60` ✅ |

Toutes les valeurs échantillonnées correspondent exactement au code.

## 6. Étapes B

- `state/` contient bien `dqs_state.md`, `inbox`, `loop_journal.md`, `rule_proposals.md`.
- `dqs_state` (comme symbole de code) : 0 occurrence dans `src/`/`scripts/` — seul un fichier `state/dqs_state.md` porte ce nom.
- `type_topologie` : 0 occurrence trouvée.
- `sp_held_hostage` : présent et utilisé réellement (`dependency_agent.py:89,214,230,238`, `state_monitor/graph.py:951`).
- `INTERACT_AVEC` : présent réellement (`graph_builder.py:10,187`, `knowledge_graph.py:10,50`).
- `BLOQUEE_PAR` : 0 occurrence trouvée dans `src/`.
- `nocicepteur`/`thalamus` : persistent uniquement dans `src/fixtures/v4_pi27_enriched.json` (lignes 557, 3882, 4205 et suivantes) — cohérent avec la vigilance déjà consignée dans `CLAUDE.md` (renommage non terminé, fixtures non migrées) et avec `decisions-index.md` ADR-028 (`❌ Violée`, mentionne explicitement ces occurrences).
- `mentor_agent.py` : 0 occurrence de "hro" ou "checklist" — cohérent avec `decisions-index.md` ADR-008 (`❌ Violée`, "0 des 14 fichiers `AGENT-GUIDE_*.md` ne contient de checklist HRO").

**11 ADR jamais audités avant ce lot (002, 007, 008, 011, 014, 015, 016, 018, 020, 025, 027)** — état actuel de leur colonne "Conformité code" dans `decisions-index.md` :

| ADR | Valeur actuelle |
|---|---|
| ADR-002 | ❌ Violée |
| ADR-007 | ❌ Violée |
| ADR-008 | ❌ Violée |
| ADR-011 | ⚠️ Partielle |
| ADR-014 | ⚠️ Partielle |
| ADR-015 | 👻 Sans objet |
| ADR-016 | 👻 Sans objet |
| ADR-018 | ✅ Vérifiée |
| ADR-020 | ❌ Violée |
| ADR-025 | 👻 Sans objet |
| ADR-027 | ❔ Non vérifiée |

10 des 11 ADR listés comme "jamais audités" portent désormais une valeur affirmative (✅/⚠️/❌/👻), chacune accompagnée d'une preuve fichier:ligne ou d'un résultat de grep documenté dans la colonne "Impact". Un seul (ADR-027, complexité algorithmique du Blackboard) porte `❔ Non vérifiée`, avec justification explicite ("non falsifiable par simple lecture de code ; nécessiterait un benchmark").

## 7. Cohérence transverse

- Décompte "8 agents cognitifs" : une seule occurrence dans le corpus (`Registres.mdx:183`), qui **désamorce** explicitement le chiffre plutôt que de le réaffirmer ("ne correspond à aucun découpage explicite du code — c'est une coïncidence numérique"). Pas de valeur multiple concurrente trouvée pour "15/19 composants".
- Patterns : une seule valeur subsiste, "15 patterns" (`indicateurs-calculs.md:25`, `Registres.mdx:51`), avec mention explicite que le docstring du code annonce à tort "27 patterns" — traité comme une divergence documentée entre code et doc, pas comme une divergence interne au site.
- Nœuds du graphe : une seule valeur subsiste, "13 nœuds" (`Registres.mdx:147,193`), avec mention explicite qu'un ancien schéma en montrait 9 sans qu'aucun des 13 réels n'y figure.
- **Divergence résiduelle non touchée par le lot** : `docs/ressources/contribution.md:18` affirme encore que les règles métier sont stockées dans le dossier `knowledge/` et propagées par `distillats.py` — alors que trois autres fichiers du lot (`sept-piliers.md:98`, `filtre-contextuel.md:68`, `gestion-distillats.md:45`) corrigent explicitement ce chemin vers `Documentation/`. Ce fichier n'apparaît dans aucun diff significatif (`+1/−1`, `git diff --numstat`) — la correction de chemin n'a pas été propagée jusqu'à lui.
- Numérotation ADR citée dans le corpus (`rg -o -n "ADR-0[0-9]{2}"`) : ADR-001 à ADR-036 présents, y compris ADR-034/035/036 non listés dans le tableau `decisions-index.md` principal (034/035 non retrouvés comme entrées de tableau — seul ADR-036 a une entrée narrative dédiée ligne 110 et son propre fichier `docs/adr/ADR-036-blackboard-zones-r2-r3.md`). **Non vérifié** : la correspondance exacte sujet/numéro pour chaque citation isolée du corpus (hors tableau `decisions-index.md`) n'a pas été contrôlée une à une — seule l'existence de la plage 001-036 est confirmée.

## 8. Build

`npm run build` (Docusaurus) : succès — `[SUCCESS] Generated static files in "build"`, compilation client et serveur sans erreur ni avertissement bloquant.

## 9. NON VÉRIFIÉ

- **Contenu ligne-à-ligne exhaustif** des 57 références `fichier:ligne` : seule l'existence de la ligne dans la plage du fichier a été vérifiée systématiquement ; la correspondance fine entre le contenu de chaque ligne citée et l'affirmation qui l'accompagne n'a été contrôlée qu'en profondeur sur l'échantillon cité aux §3-5 (seuils, `test_invariants.py`, `okr_engine.py`, `pi_readiness_graph.py`). Raison : volume (57 citations), hors budget de cette recette en lecture seule.
- **ADR-034/ADR-035** : cités par grep global mais absents d'une entrée dédiée dans le tableau principal de `decisions-index.md` — leur statut de "Conformité code" n'a pas pu être localisé ni évalué. Raison : pas de ligne de tableau identifiée les portant explicitement.
- **Concordance sujet/numéro exhaustive** pour chaque citation isolée `ADR-0XX` hors tableau (ex. dans `rte-commando.md`, `gouvernance-ethique.md`) : seule la présence de la plage 001-036 a été confirmée, pas la cohérence individuelle de chaque renvoi contextuel. Raison : hors échantillon traité en détail.
- **Pourquoi le lot n'a jamais été committé** : aucune trace dans l'historique ni dans les fichiers du dépôt n'explique si l'absence de commit est intentionnelle (relecture en cours) ou un oubli. Raison : information hors du dépôt, non déductible par lecture seule.
