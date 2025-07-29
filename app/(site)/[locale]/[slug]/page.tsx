import ContentAreaMapper from '@/app/components/content-area/mapper'
import DraftModeCmsPage from '@/app/components/draft/draft-mode-cms-page'
import { DraftModeLoader } from '@/app/components/draft/draft-mode-loader'
import FallbackErrorUI from '@/app/components/errors/fallback-error-ui'
import VisualBuilderExperienceWrapper from '@/app/components/visual-builder/wrapper'
import { optimizely } from '@/lib/optimizely/fetch'
import { SafeVisualBuilderExperience } from '@/lib/optimizely/types/experience'
import {
  getValidLocale,
  mapPathWithoutLocale,
} from '@/lib/optimizely/utils/language'
import { generateAlternates } from '@/lib/utils/metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

/**
 * Generates SEO metadata for a given locale and slug.
 * Attempts to retrieve metadata from CMSPage or Experience content.
 *
 * @param props - Async props containing locale and slug from route params
 * @returns Metadata object used in the <head> section of the page
 */
export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug?: string }>
}): Promise<Metadata> {
  const { locale, slug = '' } = await props.params
  const locales = getValidLocale(locale)
  const formattedSlug = `/${slug}`

  if (process.env.IS_BUILD === 'true') {
    return {
      title: 'Optimizely Page',
      description: '',
    }
  }

  try {
    const pageData = await optimizely.getPageByURL({
      locales: [locales],
      slug: formattedSlug,
    })

    const page = pageData?.CMSPage?.item
    if (!page) {
      const experienceData = await optimizely.GetVisualBuilderBySlug({
        locales: [locales],
        slug: formattedSlug,
      })

      const experience = experienceData?.SEOExperience?.item
      if (experience) {
        return {
          title: experience.title,
          description: experience.shortDescription || '',
          keywords: experience.keywords ?? '',
          alternates: generateAlternates(locale, formattedSlug),
        }
      }

      return {}
    }

    return {
      title: page.title,
      description: page.shortDescription || '',
      keywords: page.keywords ?? '',
      alternates: generateAlternates(locale, formattedSlug),
    }
  } catch (error) {
    console.error('generateMetadata fallback:', error)
    return {
      title: `Optimizely Page${slug ? ` - ${slug}` : ''}`,
    }
  }
}

/**
 * Generates all static paths (slug + locale) for prerendering.
 * Falls back to dynamic rendering if running inside a Docker build.
 *
 * @returns An array of static params for each known CMS or Experience route
 */
export async function generateStaticParams() {
  if (process.env.IS_BUILD === 'true') {
    return [] // Skip during Docker build
  }

  try {
    const pageTypes = ['CMSPage', 'SEOExperience']
    const pathsResp = await optimizely.AllPages({ pageType: pageTypes })
    const paths = pathsResp._Content?.items ?? []

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
      slug,
    }))
  } catch (e) {
    console.error('generateStaticParams fallback:', e)
    return []
  }
}

/**
 * Renders a hybrid page from either a CMS content page or a Visual Builder experience.
 * Supports draft mode rendering and falls back to notFound() if no content is found.
 *
 * @param props - Route params including locale and slug
 * @returns React component tree for the rendered page
 */
export default async function CmsPage(props: {
  params: Promise<{ locale: string; slug?: string }>
}) {
  const { locale, slug = '' } = await props.params
  const locales = getValidLocale(locale)
  const formattedSlug = `/${slug}`

  const { isEnabled: isDraftModeEnabled } = await draftMode()
  if (isDraftModeEnabled) {
    return (
      <Suspense fallback={<DraftModeLoader />}>
        <DraftModeCmsPage locales={locales} slug={formattedSlug} />
      </Suspense>
    )
  }

  let page = null
  try {
    const pageData = await optimizely.getPageByURL({
      locales: [locales],
      slug: formattedSlug,
    })
    page = pageData?.CMSPage?.item ?? null
  } catch (err) {
    return <FallbackErrorUI error={err} />
  }

  if (!page?._modified) {
    let experience = null
    try {
      const experienceData = await optimizely.GetVisualBuilderBySlug({
        locales: [locales],
        slug: formattedSlug,
      })
      const rawExperience = experienceData?.SEOExperience?.item
      const isValidExperience =
        rawExperience?.composition !== null &&
        rawExperience?.composition !== undefined

      if (isValidExperience) {
        experience = rawExperience as SafeVisualBuilderExperience
      }
    } catch (err) {
      return <FallbackErrorUI error={err} />
    }

    if (experience) {
      return (
        <Suspense>
          <VisualBuilderExperienceWrapper experience={experience} />
        </Suspense>
      )
    }

    return notFound()
  }

  const blocks = (page.blocks ?? []).filter(Boolean)

  return (
    <Suspense>
      <ContentAreaMapper blocks={blocks} />
    </Suspense>
  )
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60
