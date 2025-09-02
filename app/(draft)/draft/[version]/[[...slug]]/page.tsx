import ContentAreaMapper from '@/app/components/content-area/mapper'
import OnPageEdit from '@/app/components/draft/on-page-edit'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { checkDraftMode } from '@/lib/utils/draft-mode'
import { notFound } from 'next/navigation'

export const revalidate = 0
export const dynamic = 'force-dynamic'

/**
 * Renders a Visual Builder draft preview page for a CMS page identified by its slug and version.
 *
 * This route is used by Optimizely's Visual Builder to render full page content in draft mode.
 * It validates the draft preview state, fetches the page content by version, and maps its content blocks.
 *
 * @param props - Route props including dynamic segments:
 *   - `version`: The draft version ID (e.g., GUID).
 *   - `slug` (optional): The URL path for the requested page (e.g., "about-us").
 *
 * @returns A React layout rendering the requested draft content, or triggers `notFound()` if missing or invalid.
 *
 * @example
 * /preview/7f42.../home → fetches "/home" from draft version "7f42..."
 */
export default async function CmsPage({
  params,
}: {
  params: Promise<{ version: string; slug?: string }>
}) {
  // Await the params Promise in Next.js 15+
  const { version, slug = '' } = await params

  const isDraftModeEnabled = await checkDraftMode()
  if (!isDraftModeEnabled) return notFound()

  const locales = getValidLocale('en')

  const pageResponse = await optimizely.GetPreviewStartPage({
    locales: [locales],
    version,
  })

  const blocks = (pageResponse?.StartPage?.item?.blocks ?? []).filter(Boolean)
  if (!blocks.length) return notFound()

  return (
    <div className="container py-10" data-epi-edit="blocks">
      {process.env.MOCK_OPTIMIZELY !== 'true' && (
        <OnPageEdit
          version={version}
          currentRoute={`/preview/${version}/${slug}`}
        />
      )}
      <ContentAreaMapper blocks={blocks} preview />
    </div>
  )
}
