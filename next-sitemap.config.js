/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // TODO: update this env var
  siteUrl: 'https://subsights.com',
  generateRobotsTxt: true,
  autoLastmod: false,
  // Generate a single clean sitemap.xml (no index/chunks)
  generateIndexSitemap: false,
  sitemapSize: 100000,
  transform: async (config, path) => ({ loc: path }),
  // Exclude sensitive/non-indexable routes
  exclude: ['/api/*', '/admin', '/demo/*'],
  // No additionalPaths needed when pages are static/SSG
}
