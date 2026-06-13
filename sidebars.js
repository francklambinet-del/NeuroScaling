/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
    neuroscalingSidebar: [
        {
            type: 'doc',
            id: 'index', // Page d'accueil / Profil de l'Architecte
            label: '🏠 Accueil',
        },
        {
            type: 'doc',
            id: 'architecte',
            label: '👨‍💻 L\'Architecte',
        },
        {
            type: 'category',
            label: '📚 LES 4 COUCHES DE FONDATIONS',
            collapsible: true,
            collapsed: false,
            items: [
                'fondements-framework/theories-base',
                'fondements-framework/certitudes-gouvernance',
                'fondements-framework/sept-piliers',
            ],
        },
        {
            type: 'category',
            label: '⚙️ L\'INFRASTRUCTURE TECHNIQUE D EXÉCUTION',
            collapsible: true,
            collapsed: false,
            items: [
                'moteur-architecture/filtre-contextuel',
                'moteur-architecture/blackboard-etendu',
                'moteur-architecture/cerveau-core',
                'moteur-architecture/agents-specialite',
                'moteur-architecture/gestion-distillats',
            ],
        },
        {
            type: 'category',
            label: '🎯 LES PLAYBOOKS OPÉRATIONNELS (HUMAINS / COUCHE 3)',
            collapsible: true,
            collapsed: false,
            items: [
                'guides-roles/rte-commando',
                'guides-roles/nxe-pi-readiness',
                'guides-roles/po-value-management',
                'guides-roles/sm-resilience',
                'sm-checklist',

            ],
        },
        {
            type: 'category',
            label: '⚖️ CADRE DE CONFIANCE & INGÉNIERIE',
            collapsible: true,
            collapsed: false,
            items: [
                'gouvernance-ethique/decisions-index',
                'gouvernance-ethique/gouvernance-ethique',

            ],
        },

    ],
};

export default sidebars;