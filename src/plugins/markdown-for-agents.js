const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function stripMdxSyntax(content) {
  return content
    .replace(/^import\s+.*$/gm, '')
    .replace(/<[A-Z][A-Za-z]*\s*\/>/g, '')
    .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildFrontmatter(title, description, url) {
  const lines = ['---'];
  if (title) lines.push(`title: ${JSON.stringify(title)}`);
  if (description) lines.push(`description: ${JSON.stringify(description)}`);
  if (url) lines.push(`url: ${JSON.stringify(url)}`);
  lines.push('---');
  return lines.join('\n');
}

function findMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (/\.mdx?$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

module.exports = function markdownForAgentsPlugin(context) {
  const { siteDir, siteConfig } = context;
  const siteUrl = siteConfig.url;

  return {
    name: 'markdown-for-agents',

    async postBuild({ outDir }) {
      let generated = 0;

      // --- Docs ---
      const docsDir = path.join(siteDir, 'versioned_docs', 'version-1.x');
      for (const filePath of findMarkdownFiles(docsDir)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(raw);
        const id =
          parsed.data.id || path.basename(filePath, path.extname(filePath));
        const relDir = path.relative(docsDir, path.dirname(filePath));

        const outDirForDoc =
          relDir && relDir !== '.'
            ? path.join(outDir, 'docs', relDir, id)
            : path.join(outDir, 'docs', id);

        const htmlPath = path.join(outDirForDoc, 'index.html');
        if (!fs.existsSync(htmlPath)) continue;

        const urlPath =
          relDir && relDir !== '.'
            ? `/docs/${relDir}/${id}/`
            : `/docs/${id}/`;

        const body = stripMdxSyntax(parsed.content);
        const fm = buildFrontmatter(
          parsed.data.title || id,
          parsed.data.description || '',
          `${siteUrl}${urlPath}`
        );

        fs.writeFileSync(
          path.join(outDirForDoc, 'index.md'),
          `${fm}\n\n${body}\n`
        );
        generated++;
      }

      // --- Blog posts ---
      const blogDir = path.join(siteDir, 'blog');
      if (fs.existsSync(blogDir)) {
        for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
          if (!entry.isDirectory()) continue;
          const postDir = path.join(blogDir, entry.name);
          const mdFile = findMarkdownFiles(postDir)[0];
          if (!mdFile) continue;

          const raw = fs.readFileSync(mdFile, 'utf-8');
          const parsed = matter(raw);
          const slug =
            parsed.data.slug ||
            entry.name.replace(/^\d{4}-\d{2}-\d{2}-/, '');

          const outDirForPost = path.join(outDir, 'blog', slug);
          const htmlPath = path.join(outDirForPost, 'index.html');
          if (!fs.existsSync(htmlPath)) continue;

          const body = stripMdxSyntax(parsed.content);
          const fm = buildFrontmatter(
            parsed.data.title || slug,
            parsed.data.description || '',
            `${siteUrl}/blog/${slug}/`
          );

          fs.writeFileSync(
            path.join(outDirForPost, 'index.md'),
            `${fm}\n\n${body}\n`
          );
          generated++;
        }
      }

      // --- Homepage ---
      const homepageMd = buildFrontmatter(
        siteConfig.title,
        siteConfig.tagline,
        siteUrl
      ) + `\n\n# ${siteConfig.title}\n\n${siteConfig.tagline}\n\n` +
        `## Quick Start\n\n` +
        `\`\`\`php\n` +
        `$volt = (new VoltTest('Load Test'))\n` +
        `    ->setVirtualUsers(50);\n\n` +
        `$volt->scenario('Checkout Flow')\n` +
        `    ->step('Visit Home')\n` +
        `    ->get('https://api.app.com')\n` +
        `    ->validateStatus('status', 200);\n\n` +
        `$volt->run(true);\n` +
        `\`\`\`\n\n` +
        `## Documentation\n\n` +
        `- [What is VoltTest?](${siteUrl}/docs/what-is-volttest/)\n` +
        `- [PHP SDK Docs](${siteUrl}/docs/introduction/)\n` +
        `- [Laravel Docs](${siteUrl}/docs/laravel/laravel-installation/)\n` +
        `- [Blog](${siteUrl}/blog/)\n`;

      fs.writeFileSync(path.join(outDir, 'index.md'), homepageMd);
      generated++;

      console.log(
        `[markdown-for-agents] Generated ${generated} markdown files for agent content negotiation.`
      );
    },
  };
};
