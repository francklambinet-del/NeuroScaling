// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NeuroScaling',
  tagline: 'Scaling Architecture',
  favicon: 'img/logo-neuroscaling_icon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://francklambinet-del.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/NeuroScaling/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'francklambinet-del', // Usually your GitHub org/user name.
  projectName: 'NeuroScaling', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  // Configuration d'activation globale de Mermaid.js pour MDX
  markdown: {
    mermaid: true,
  },

  // Intégration du thème et du parseur de diagrammes Mermaid
  themes: ['@docusaurus/theme-mermaid'],
  // À insérer juste au-dessus de presets: [
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQWJaXtaYnyODDOqAXfRI7ChT3GUDax96b4841DL',
      crossorigin: 'anonymous',
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // SÉCURITÉ MDX : Ajout des plugins pour parser le LaTeX et les accolades {}
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          routeBasePath: '/',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Ajout également sur le blog au cas où tu y glisses des formules
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/neuroscaling-banner.png',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'NeuroScaling',
        logo: {
          alt: 'NeuroScaling Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'neuroscalingSidebar',
            position: 'left',
            label: 'Framework',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Framework',
                to: '/architecte',
                label: 'L\'Architecte',
                position: 'left',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NeuroScaling, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;