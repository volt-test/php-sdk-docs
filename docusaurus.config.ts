import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'VOLT TEST PHP SDK',
  tagline: 'Write and run performance, load, and stress tests directly in PHP.',
  favicon: 'img/fav.png',

  // Set the production url of your site here
  url: 'https://php.volt-test.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'volt-test', // Usually your GitHub org/user name.
  projectName: 'php-sdk-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
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
    image: 'img/OG-PHP-SDK.png',
    navbar: {
      title: 'PHP SDK',
      logo: {
        alt: 'Volt Test',
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
          title: 'Docs',
          items: [
            {
              label: 'Documentations',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'X(Twitter)',
              href: 'https://x.com/vt_developers',
            },
            {
              label: 'Github Discussions',
              href: 'https://github.com/volt-test/php-sdk/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/volt-test/php-sdk/issues',
            },
            {
              label: "Discord",
              href: "https://discord.gg/BvQD6bptaD",
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
              href: 'https://github.com/volt-test/php-sdk',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a target="_blank" href='https://volt-test.com'>Volt-Test</a>, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsLight,
      additionalLanguages: ['php'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
