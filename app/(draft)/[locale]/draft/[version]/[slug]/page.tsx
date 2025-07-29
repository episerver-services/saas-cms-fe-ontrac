import ContentAreaMapper from '@/app/components/content-area/mapper'
import OnPageEdit from '@/app/components/draft/on-page-edit'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { checkDraftMode } from '@/lib/utils/draft-mode'
import { notFound } from 'next/navigation'

export const revalidate = 0
export const dynamic = 'force-dynamic'

/**
 * Renders a Visual Builder draft preview page for a CMS page identified by its locale, slug, and version.
 *
 * This route is used by Optimizely's Visual Builder to render full page content in draft mode.
 * It validates the draft preview state, fetches the page content by URL, and maps its content blocks.
 *
 * @param props - An async route object containing dynamic URL segments.
 * @param props.params - A promise that resolves to the route parameters:
 * - `locale`: The locale for the requested page (e.g. "en", "sv").
 * - `version`: The draft version identifier (GUID or version key).
 * - `slug` (optional): The URL path for the requested page.
 *
 * @returns A React layout rendering the requested draft content, or triggers `notFound()` if invalid.
 *
 * @example
 * /en/draft/7f42.../home → fetches `"/home"` in English from draft version `7f42...`
 */
export default async function CmsPage({
  params,
}: {
  params: Promise<{ locale: string; version: string; slug?: string }>
}) {
  const isDraftModeEnabled = await checkDraftMode()
  if (!isDraftModeEnabled) {
    return notFound()
  }

  const { locale, slug = '', version } = await params
  const locales = getValidLocale(locale)
  const formattedSlug = `/${slug}`

  const pageResponse = await optimizely.getPreviewPageByURL(
    { locales, slug: formattedSlug, version },
    { preview: true }
  )

  const blocks = (pageResponse.CMSPage?.item?.blocks ?? []).filter(Boolean)
  if (!blocks.length) return notFound()

  return (
    <div className="container py-10" data-epi-edit="blocks">
      <OnPageEdit
        version={version}
        currentRoute={`/${locale}/draft/${version}/${slug}`}
      />
      <ContentAreaMapper blocks={blocks} preview />
    </div>
  )
}
