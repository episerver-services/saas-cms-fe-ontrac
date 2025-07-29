import type { Metadata } from 'next'

/**
 * The fallback title for all pages if no CMS or SEO content is available.
 */
const FALLBACK_TITLE = 'Optimizely FE PoC'

/**
 * The fallback description for all pages.
 */
const FALLBACK_DESCRIPTION = 'Frontend demo for Optimizely CMS SaaS'

/**
 * Site domain used in Open Graph metadata. Defaults to localhost during development.
 */
const SITE_DOMAIN = process.env.SITE_DOMAIN || 'http://localhost:3000'

/**
 * Default metadata used across the site when no specific metadata is provided.
 */
export const metadata: Metadata = {
  title: FALLBACK_TITLE,
  description: FALLBACK_DESCRIPTION,
  openGraph: {
    title: FALLBACK_TITLE,
    description: FALLBACK_DESCRIPTION,
    url: SITE_DOMAIN,
    siteName: FALLBACK_TITLE,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: FALLBACK_TITLE,
    description: FALLBACK_DESCRIPTION,
  },
}
