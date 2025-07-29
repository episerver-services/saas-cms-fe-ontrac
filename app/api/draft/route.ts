import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { optimizely } from '@/lib/optimizely/fetch'

/**
 * Handles Optimizely preview requests by enabling draft mode and redirecting to the appropriate draft route.
 * This is used when a user clicks "Preview" in the Optimizely CMS UI.
 *
 * Expected query parameters:
 * - `preview_token`: Auth token to validate preview request.
 * - `key`: Unique content key (GUID).
 * - `ver`: Content version number.
 * - `loc`: Current locale (e.g., "en", "fr").
 *
 * @param {NextRequest} request - The incoming request containing preview parameters.
 * @returns {Promise<Response>} Redirects to draft route or returns error if not possible.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const token = searchParams.get('preview_token')
    const key = searchParams.get('key')
    const ver = searchParams.get('ver')
    const loc = searchParams.get('loc')

    // Basic param validation
    if (!ver || !token || !key || !loc) {
      console.warn('Missing required preview parameters:', {
        token,
        key,
        ver,
        loc,
      })
      return notFound()
    }

    // Lookup content in preview mode
    const result = await optimizely.GetContentByKeyAndVersion(
      { key, ver },
      { preview: true }
    )

    if (!result || !result._Content?.item) {
      console.error('No preview content found for key/version:', {
        key,
        ver,
      })
      return new NextResponse('Content not found', { status: 400 })
    }

    const content = result._Content.item

    // Enable Next.js draft mode (sets cookies)
    ;(await draftMode()).enable()

    let newUrl = ''

    if (content.__typename === '_Experience') {
      newUrl = `/${loc}/draft/${ver}/experience/${key}`
    } else if (content.__typename === '_Component') {
      newUrl = `/${loc}/draft/${ver}/block/${key}`
    } else {
      const startPageBase = process.env.OPTIMIZELY_START_PAGE_URL ?? ''
      const hierarchicalUrl = content?._metadata?.url?.hierarchical?.replace(
        startPageBase,
        ''
      )

      const hierarchicalUrlWithoutLocale = hierarchicalUrl?.replace(
        `/${loc}/`,
        ''
      )

      if (!hierarchicalUrlWithoutLocale) {
        console.error('Could not resolve hierarchical URL:', {
          key,
          ver,
          hierarchicalUrl,
        })
        return new NextResponse('Invalid URL', { status: 400 })
      }

      newUrl = `/${loc}/draft/${ver}/${hierarchicalUrlWithoutLocale}`
    }

    // Redirect to appropriate preview route
    redirect(newUrl)
  } catch (err) {
    console.error('Error handling preview request:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
