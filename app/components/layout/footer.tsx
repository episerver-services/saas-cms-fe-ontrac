import Link from 'next/link'
import { Icons } from '../ui/icons'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { optimizely } from '@/lib/optimizely/fetch'
import { castContent, SafeContent } from '@/lib/optimizely/types/type-utils'
import { SocialLink, FooterColumn, NavItem } from '@/lib/optimizely/sdk'

/**
 * Renders the site footer based on Optimizely CMS content.
 *
 * Fetches columns, social links, and copyright text based on the current locale.
 *
 * @param locale - The current locale string (e.g. `'en'`, `'fr'`)
 * @returns JSX element for the footer or `null` if no footer content is available.
 */
export async function Footer({ locale }: { locale: string }) {
  const validLocale = getValidLocale(locale)
  const locales = validLocale === 'ALL' ? null : [validLocale]

  const result = await optimizely.getFooter(
    { locales },
    { cacheTag: 'optimizely-footer' }
  )

  const footer = result.Footer?.item
  if (!footer || !('columns' in footer)) {
    return null
  }

  const { columns, socialLinks, copyrightText } = footer

  return (
    <footer className="border-t" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4 py-12">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* Footer navigation columns */}
        <div className="grid gap-8 md:grid-cols-4">
          {columns?.map((columnItem, index) => {
            const column = castContent<FooterColumn>(
              columnItem as SafeContent,
              'FooterColumn'
            )
            if (!column) return null

            return (
              <div key={index}>
                <h3 className="mb-4 font-bold">{column.title}</h3>
                <nav
                  aria-label={`${column.title} navigation`}
                  className="grid gap-2"
                >
                  {column.links?.map((linkItem, linkIndex) => {
                    const link = castContent<NavItem>(linkItem, 'NavItem')
                    if (!link) return null

                    return (
                      <Link
                        key={linkIndex}
                        href={link.href ?? '/'}
                        className="text-sm"
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            )
          })}
        </div>

        {/* Social media icons */}
        <div
          className="mt-8 flex justify-center gap-4"
          aria-label="Social media"
        >
          {socialLinks?.map((linkItem, index) => {
            const link = castContent<SocialLink>(
              linkItem as SafeContent,
              'SocialLink'
            )
            if (!link) return null

            const platform = link.platform as keyof typeof Icons
            const Icon = Icons[platform]

            return (
              <Link
                key={index}
                href={link.href ?? '/'}
                className="text-muted-foreground hover:text-foreground"
                aria-label={link.platform ?? 'Social link'}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </Link>
            )
          })}
        </div>

        {/* Footer copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          {copyrightText}
        </div>
      </div>
    </footer>
  )
}
