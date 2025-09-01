import ContentAreaMapper from '@/app/components/content-area/mapper'
import DraftModeCmsPage from '@/app/components/draft/draft-mode-cms-page'
import { DraftModeLoader } from '@/app/components/draft/draft-mode-loader'
import FallbackErrorUI from '@/app/components/errors/fallback-error-ui'
import { optimizely } from '@/lib/optimizely/fetch'
import { mapPathWithoutLocale } from '@/lib/optimizely/utils/language'
import { generateAlternates } from '@/lib/utils/metadata'
import { resolveSlugAndLocale } from '@/lib/utils/routing'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

/**
 * Type guard to check for modified metadata on CMS content.
 * Used to determine if a page is valid or should 404.
 *
 * @param page - The CMS page object to inspect
 * @returns True if _metadata.modified is present and valid
 */
function hasModifiedMetadata(
  page: unknown
): page is { _metadata: { modified: string } } {
  return (
    typeof page === 'object' &&
    page !== null &&
    '_metadata' in page &&
    typeof (page as any)._metadata?.modified === 'string'
  )
}

// Define expected CMSPage item shape
type CMSPageItem = {
  title: string
  shortDescription?: string
  keywords?: string
  blocks?: {
    __typename: string
    [key: string]: unknown
  }[]
  _metadata?: {
    modified?: string
    [key: string]: unknown
  }
}

/**
 * Generates SEO metadata for a given CMS page based on the locale and slug.
 * Falls back to static defaults or minimal metadata when previewing or in error states.
 *
 * Returns fallback if MOCK_OPTIMIZELY or IS_BUILD is enabled.
 *
 * @param props - Object containing the locale and slug from dynamic route params.
 * @returns Metadata used in the <head> of the rendered page.
 */
export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> {
  const { locale, slug } = await props.params
  const { localeCode, formattedSlug } = resolveSlugAndLocale(locale, slug)

  if (
    process.env.IS_BUILD === 'true' ||
    process.env.MOCK_OPTIMIZELY === 'true'
  ) {
    console.warn(
      '[generateMetadata] Using fallback due to IS_BUILD or MOCK_OPTIMIZELY'
    )
    return {
      title: 'Optimizely Page',
      description: '',
    }
  }

  try {
    const { isEnabled: isDraftModeEnabled } = await draftMode()

    const pageData = await optimizely.getPageByURL(
      {
        locales: [localeCode],
        slug: formattedSlug,
      },
      {
        preview: isDraftModeEnabled,
      }
    )

    const item = pageData?.CMSPage?.item

    if (!item || typeof item !== 'object' || !('title' in item)) {
      console.warn('[generateMetadata] No valid CMSPage item found')
      return {
        title: `Optimizely Page${slug ? ` - ${slug.join('/')}` : ''}`,
      }
    }

    const page = item as CMSPageItem

    return {
      title: page.title,
      description: page.shortDescription || '',
      keywords: page.keywords ?? '',
      alternates: generateAlternates(locale, formattedSlug),
    }
  } catch (error) {
    console.error('generateMetadata fallback:', error)
    return {
      title: `Optimizely Page${slug ? ` - ${slug.join('/')}` : ''}`,
    }
  }
}

/**
 * Generates all static paths (slug arrays) for ISR or static export.
 * Skips path generation if running inside a Docker container build
 * or when mock mode is active.
 *
 * @returns An array of objects containing `slug` arrays for prerendering.
 */
export async function generateStaticParams() {
  if (
    process.env.IS_BUILD === 'true' ||
    process.env.MOCK_OPTIMIZELY === 'true'
  ) {
    console.warn(
      '[generateStaticParams] Skipped due to IS_BUILD or MOCK_OPTIMIZELY'
    )
    return []
  }

  try {
    const pageTypes = ['CMSPage']
    const pathsResp = await optimizely.AllPages?.({ pageType: pageTypes })

    const paths = pathsResp?._Content?.items ?? []

    const uniquePaths = new Set<string>()
    paths.forEach((path) => {
      const metadata = path?._metadata
      if (
        metadata &&
        typeof metadata === 'object' &&
        'url' in metadata &&
        typeof metadata.url?.default === 'string'
      ) {
        uniquePaths.add(mapPathWithoutLocale(metadata.url.default))
      }
    })

    return Array.from(uniquePaths).map((slug) => ({
      slug: slug.split('/').filter(Boolean),
    }))
  } catch (e) {
    console.error('generateStaticParams fallback:', e)
    return []
  }
}

/**
 * Main page renderer for CMSPage content.
 * Determines whether to render draft-mode or published content,
 * and falls back to notFound or error UI appropriately.
 *
 * @param props - Object containing the locale and slug route parameters.
 * @returns The rendered React component tree for the page.
 */
export default async function CmsPage(props: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { locale, slug } = await props.params
  const { localeCode, formattedSlug } = resolveSlugAndLocale(locale, slug)

  const { isEnabled: isDraftModeEnabled } = await draftMode()
  if (isDraftModeEnabled) {
    return (
      <Suspense fallback={<DraftModeLoader />}>
        <DraftModeCmsPage locales={localeCode} slug={formattedSlug} />
      </Suspense>
    )
  }

  let page: CMSPageItem | null = null
  try {
    const pageData = await optimizely.getPageByURL(
      {
        locales: [localeCode],
        slug: formattedSlug,
      },
      {
        preview: false,
      }
    )

    const item = pageData?.CMSPage?.item

    if (item && typeof item === 'object') {
      page = item as CMSPageItem
    }
  } catch (err) {
    return (
      <FallbackErrorUI
        title="Failed to load content"
        message="An error occurred while retrieving this page from the CMS."
        showHomeLink
        error={err}
      />
    )
  }

  if (!page || !hasModifiedMetadata(page)) {
    return notFound()
  }

  const blocks = (page.blocks ?? []).filter(Boolean)

  return (
    <Suspense fallback={<div>Loading page content...</div>}>
      <ContentAreaMapper blocks={blocks} />
    </Suspense>
  )
}

/**
 * Defines the ISR (Incremental Static Regeneration) interval for this route.
 * Set to revalidate every 60 seconds.
 */
export const revalidate = 60
