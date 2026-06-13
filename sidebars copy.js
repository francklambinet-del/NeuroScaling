/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
    neuroscalingSidebar: [
        {
            type: 'doc',
            id: 'architecte', // Page d'accueil / Profil de l'Architecte
        },
        {
            type: 'category',
            label: '📚 LES 4 COUCHES DE FONDATIONS',
            collapsible: true,
            collapsed: false,
            items: [
                '01-fondements-framework/theories-base',
                '01-fondements-framework/certitudes-gouvernance',
                '01-fondements-framework/sept-piliers',
            ],
        },
        {
            type: 'category',
            label: '⚙️ L'INFRASTRUCTURE TECHNIQUE D EXÉCUTION',
            collapsible: true,
            collapsed: false,
            items: [
                '02-moteur-architecture/filtre-contextuel',
                '02-moteur-architecture/blackboard-etendu',
                '02-moteur-architecture/cerveau-core',
                '02-moteur-architecture/agents-specialite',
                '02-moteur-architecture/gestion-distillats',
            ],
        },
        {
            type: 'category',
            label: '🎯 LES PLAYBOOKS OPÉRATIONNELS (HUMAINS / COUCHE 3)',
            collapsible: true,
            collapsed: false,
            items: [
                '03-playbooks-operationnels/rte-commando',
                '03-playbooks-operationnels/rte-pi-readiness',
                '03-playbooks-operationnels/po-value-management',
                '03-playbooks-operationnels/sm-resilience',

                '03-playbooks-operationnels/sm-checklist',

            ],
        },
        {
            type: 'category',
            label: '⚖️ CADRE DE CONFIANCE & INGÉNIERIE',
            collapsible: true,
            collapsed: false,
            items: [
                '04-confiance-ethique/decisions-index',
                '04-confiance-ethique/gouvernance-ethique',

            ],
        },
    ],
};

export default sidebars;