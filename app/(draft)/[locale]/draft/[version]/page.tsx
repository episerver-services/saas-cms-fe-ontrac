import ContentAreaMapper from '@/app/components/content-area/mapper'
import OnPageEdit from '@/app/components/draft/on-page-edit'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { checkDraftMode } from '@/lib/utils/draft-mode'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

/**
 * Renders the draft preview for the site homepage.
 *
 * This route is used to preview the root StartPage (homepage) from the CMS
 * in draft mode. It ensures draft mode is enabled, fetches the page content
 * by version, and renders the mapped block content.
 *
 * @param props - Async route parameters
 * @param props.params - A promise resolving to:
 * - `locale`: The requested locale.
 * - `version`: The preview version of the homepage content.
 *
 * @returns JSX content for the draft homepage, or a 404 if content is missing.
 *
 * @example
 * /en/draft/1a2b3c → renders the draft homepage in English
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string; version: string }>
}) {
  const isDraftModeEnabled = await checkDraftMode()
  if (!isDraftModeEnabled) {
    return notFound()
  }

  const { locale, version } = await params
  const locales = getValidLocale(locale)

  const pageResponse = await optimizely.GetPreviewStartPage(
    { locales, version },
    { preview: true }
  )

  const startPage = pageResponse?.StartPage?.item
  if (!startPage) {
    console.warn('StartPage not found, skipping render.')
    return notFound()
  }

  const blocks = (startPage.blocks ?? []).filter(Boolean)

  return (
    <div data-epi-edit="blocks">
      <OnPageEdit
        version={version}
        currentRoute={`/${locale}/draft/${version}`}
      />
      <Suspense>
        <ContentAreaMapper blocks={blocks} preview />
      </Suspense>
    </div>
  )
}
