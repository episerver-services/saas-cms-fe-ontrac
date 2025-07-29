import { optimizely } from '@/lib/optimizely/fetch'
import { mapPathWithoutLocale } from '@/lib/optimizely/utils/language'

export const dynamic = 'force-dynamic'

/**
 * Public-facing sitemap.xml generator.
 * Includes CMSPage and SEOExperience paths with optional lastmod.
 *
 * @returns A well-formed XML sitemap response for search engines.
 */
export async function GET() {
  const pageTypes = ['CMSPage', 'SEOExperience']
  const domain = process.env.SITE_DOMAIN ?? 'https://example.com'

  try {
    const result = await optimizely.AllPages({ pageType: pageTypes })
    const items = result._Content?.items ?? []

    const entries = items
      .map((item) => {
        const meta = item?._metadata

        // Only proceed if `url.default` exists — narrows to ContentMetadata
        if (!meta || !('url' in meta) || !meta.url?.default) return null

        const path = mapPathWithoutLocale(meta.url.default)
        const lastmod = meta.lastModified ?? meta.published ?? null

        return {
          loc: `${domain}${path}`,
          lastmod,
        }
      })
      .filter(
        (entry): entry is { loc: string; lastmod: string | null } => !!entry
      )

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
    return `  <url><loc>${loc}</loc>${lastmodTag}</url>`
  })
  .join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (err) {
    console.error('Error generating sitemap.xml:', err)
    return new Response('Sitemap generation error', { status: 500 })
  }
}
