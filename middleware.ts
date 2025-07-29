import { DEFAULT_LOCALE, LOCALES } from '@/lib/optimizely/utils/language'
import { createUrl, leadingSlashUrlPath } from '@/lib/utils'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Negotiator from 'negotiator'

const COOKIE_NAME_LOCALE = '__LOCALE_NAME'
const HEADER_KEY_LOCALE = 'X-Locale'

/**
 * Determines whether a path should be excluded from locale handling.
 *
 * @param path - The pathname from the request.
 * @returns `true` if the path should bypass middleware processing.
 */
function shouldExclude(path: string): boolean {
  return (
    path.startsWith('/static') || path.includes('/api/') || path.includes('.')
  )
}

/**
 * Attempts to determine the browser's preferred language from the Accept-Language header.
 *
 * @param request - The incoming Next.js request object.
 * @param locales - The list of supported locale strings.
 * @returns The best matching locale or `undefined` if none match.
 */
function getBrowserLanguage(
  request: NextRequest,
  locales: string[]
): string | undefined {
  const headerLanguage = request.headers.get('Accept-Language')
  if (!headerLanguage) return undefined

  const languages = new Negotiator({
    headers: { 'accept-language': headerLanguage },
  }).languages()

  for (const lang of languages) {
    if (locales.includes(lang)) return lang
    const langPrefix = lang.split('-')[0]
    if (locales.includes(langPrefix)) return langPrefix
  }

  return undefined
}

/**
 * Resolves the user's locale from cookie or browser settings, or falls back to the default.
 *
 * @param request - The Next.js request.
 * @param locales - Supported locales.
 * @returns A valid locale string.
 */
function getLocale(request: NextRequest, locales: string[]): string {
  const cookieLocale = request.cookies.get(COOKIE_NAME_LOCALE)?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  const browserLang = getBrowserLanguage(request, locales)
  if (browserLang && locales.includes(browserLang)) {
    return browserLang
  }

  return DEFAULT_LOCALE
}

/**
 * Updates the user's locale cookie and response headers for locale tracking.
 *
 * @param request - The incoming request.
 * @param response - The outgoing response.
 * @param locale - Optional locale to set; if not provided, clears the cookie and header.
 */
function updateLocaleCookies(
  request: NextRequest,
  response: NextResponse,
  locale?: string
): void {
  const cookieLocale = request.cookies.get(COOKIE_NAME_LOCALE)?.value

  if (locale !== cookieLocale) {
    if (locale) {
      response.cookies.set(COOKIE_NAME_LOCALE, locale)
    } else {
      response.cookies.delete(COOKIE_NAME_LOCALE)
    }
  }

  if (locale) {
    response.headers.append(HEADER_KEY_LOCALE, locale)
  } else {
    response.headers.delete(HEADER_KEY_LOCALE)
  }
}

/**
 * Middleware for handling locale-aware routing and rewriting.
 *
 * - Extracts the locale from the path or browser settings.
 * - Rewrites the request to include the locale prefix.
 * - Sets locale cookies and headers.
 *
 * @param request - The incoming request.
 * @returns A `NextResponse` with rewrites or redirects applied.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname
  let response = NextResponse.next()

  if (shouldExclude(pathname)) {
    return response
  }

  const localeInPathname = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (localeInPathname) {
    const pathnameWithoutLocale = pathname.replace(`/${localeInPathname}`, '')
    const newUrl = createUrl(
      `/${localeInPathname}${leadingSlashUrlPath(pathnameWithoutLocale)}`,
      request.nextUrl.searchParams
    )
    response = NextResponse.rewrite(new URL(newUrl, request.url))
    updateLocaleCookies(request, response, localeInPathname)
    return response
  }

  const locale = getLocale(request, LOCALES)
  const newUrl = createUrl(
    `/${locale}${leadingSlashUrlPath(pathname)}`,
    request.nextUrl.searchParams
  )

  response =
    locale === DEFAULT_LOCALE
      ? NextResponse.rewrite(new URL(newUrl, request.url))
      : NextResponse.redirect(new URL(newUrl, request.url))

  updateLocaleCookies(request, response, locale)

  return response
}

/**
 * Defines which paths the middleware should apply to.
 * This excludes API routes, static assets, and favicon.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
