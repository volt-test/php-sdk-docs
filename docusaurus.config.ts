import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const {
    POSTHOG_API_KEY,
    POSTHOG_HOST,
    APP_URL,
} = process.env;

const config: Config = {
  title: 'VoltTest Documentation',
  tagline: 'Performance testing platform for PHP and Laravel. Scale from 1K to 10M+ concurrent users.',
  favicon: 'img/fav.png',

  // Set the production url of your site here
  url: 'https://docs.volt-test.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'volt-test', // Usually your GitHub org/user name.
  projectName: 'php-sdk-docs', // Usually your repo name.

  customFields: {
    appUrl: APP_URL || 'https://volt-test.com',
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
      [
          'posthog-docusaurus',
          {
              apiKey: POSTHOG_API_KEY,
              appUrl: POSTHOG_HOST,
              enableInDevelopment: true,
          },
      ],
      [
          'docusaurus-plugin-llms',
          {
              generateLLMsTxt: true,
              generateLLMsFullTxt: true,
              title: 'VoltTest Documentation',
              description: 'Performance testing platform for PHP and Laravel. Scale from 1K to 10M+ concurrent users.',
              excludeImports: true,
              removeDuplicateHeadings: true,
          },
      ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          lastVersion: '1.x',
          onlyIncludeVersions: ['1.x'],
          versions: {
            '1.x': {
              label: '1.x',
            },
          },
          editUrl:
            'https://github.com/volt-test/php-sdk-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/volt-test/php-sdk-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
            changefreq: 'weekly',
            priority: 0.5,
            // trailingSlash: false,
          filename: 'sitemap.xml',
          ignorePatterns: ['/markdown-page'],
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/OG-FOR-PHP-SDK.png',
    navbar: {
      title: '',
      logo: {
        alt: 'VoltTest',
        src: 'img/Blue.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/volt-test/php-sdk',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/BvQD6bptaD',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://x.com/vt_developers',
          label: 'X(Twitter)',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'What is VoltTest?',
              to: '/docs/what-is-volttest',
            },
            {
              label: 'PHP SDK',
              to: '/docs/introduction',
            },
            {
              label: 'Laravel Integration',
              to: '/docs/laravel/laravel-installation',
            },
            {
              label: 'Cloud Mode (PHP SDK)',
              to: '/docs/cloud-mode',
            },
            {
              label: 'Cloud Mode (Laravel)',
              to: '/docs/laravel/laravel-cloud-mode',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/BvQD6bptaD',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/volt-test/php-sdk/discussions',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/vt_developers',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'PHP SDK on GitHub',
              href: 'https://github.com/volt-test/php-sdk',
            },
            {
              label: 'Laravel Package on GitHub',
              href: 'https://github.com/volt-test/laravel-performance-testing',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a target="_blank" href='https://volt-test.com'>VoltTest</a>. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsLight,
      additionalLanguages: ['php'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
