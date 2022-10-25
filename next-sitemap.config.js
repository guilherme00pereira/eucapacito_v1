/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://eucapacito.com.br',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: [
        '/[slug]',
        '/bolsa-de-estudo/[slug]',
        '/curso-ec/[slug]',
        '/empregabilidade/[slug]',
        '/jornada/[slug]'
    ],
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    }
}