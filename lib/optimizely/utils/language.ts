import { Locales } from '../sdk'

/**
 * The default locale to fall back to when an invalid locale is encountered.
 */
export const DEFAULT_LOCALE: Locales = 'en'

/**
 * List of supported locales for the site.
 * Extend this array if your CMS and frontend support additional locales.
 */
export const LOCALES: Locales[] = ['en']

/**
 * Validates a provided locale string against the list of supported locales.
 * Falls back to DEFAULT_LOCALE if the input is invalid.
 *
 * @param locale - The locale string to validate (e.g., 'en', 'fr', 'de').
 * @returns A valid `Locales` type, guaranteed to be supported by the system.
 */
export const getValidLocale = (locale: string): Locales => {
  return LOCALES.includes(locale as Locales)
    ? (locale as Locales)
    : DEFAULT_LOCALE
}

/**
 * Retrieves all supported locales.
 *
 * @returns An array of all valid locales.
 */
export const getLocales = (): Locales[] => {
  return LOCALES
}

/**
 * Removes the locale prefix from a path string.
 * For example, `/en/about` becomes `about`.
 *
 * @param path - A path that may include a locale prefix.
 * @returns The path without a locale prefix.
 */
export const mapPathWithoutLocale = (path: string): string => {
  const parts = path.split('/').filter(Boolean)

  // If the first segment is a known locale, remove it.
  if (LOCALES.includes(parts[0] as Locales)) {
    parts.shift()
  }

  return `${parts.join('/')}`
}
