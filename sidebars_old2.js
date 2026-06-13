/**
 * Configuration de la structure latérale pour NeuroScaling
 * Optimisée pour la navigation du "Pourquoi" vers le "Comment"
 */

const sidebars = {
  // Barre latérale principale pour la section Documentation
  docsSidebar: [
    {
      type: 'category',
      label: '🚀 Introduction',
      collapsed: false,
      items: [
        'vision-valeurs', // Basé sur le Manifeste v1.3
        'glossaire-neuroscaling', // Définition Cerveau, Capteurs, Distillats
      ],
    },
    {
      type: 'category',
      label: '🧠 Couche 1 : Fondements',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Fondements Scientifiques',
        description: 'La légitimité de l\'architecture basée sur les neurosciences et la cybernétique.',
      },
      items: [
        'theories-base', // Flux, Double Loop, Cynefin
        'niveaux-certitude', // Explication des codes couleur 🟢🟡🔴
        'liaison-scientifique-agents', // Comment la science devient action
      ],
    },
    {
      type: 'category',
      label: '🏢 Couche 2 : Organisation',
      collapsed: false,
      items: [
        'sept-piliers', // SAFe, Team Topologies, Wardley, etc.
        'filtre-contextuel', // Compréhension du terrain par les agents
      ],
    },
    {
      type: 'category',
      label: '🛠️ Architecture & Agents',
      items: [
        'cerveau-core', // Diagnostic Orchestrator, Flow Dispatcher
        'blackboard-etendu', // Spécifications Réseaux de Connaissances
        'agents-specialite', // Backlog, Dependency, Mentor Agents
      ],
    },
    {
      type: 'category',
      label: '⚙️ Mécanismes Décisionnels',
      items: [
        'gestion-distillats', // Fusion Framework + Blackboard
        'boucles-retroaction', // OODA Loop et tempo décisionnel
      ],
    },
  ],

  // Barre latérale pour la section Ressources (ADR et Spécifications)
  ressourcesSidebar: [
    'index-ressources',
    {
      type: 'category',
      label: 'Architecture Decision Records (ADR)',
      items: [
        'adr/adr-011-double-loop',
        'adr/adr-025-pi-readiness',
      ],
    },
    {
      type: 'category',
      label: 'Open Theory (Contribution)',
      items: [
        'contribution/challenge-seuils',
        'contribution/nouveaux-distillats',
        'contribution/validation-scientifique',
      ],
    },
  ],
};

export default sidebars;