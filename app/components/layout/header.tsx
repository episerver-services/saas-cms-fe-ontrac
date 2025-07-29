import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { castContent, SafeContent } from '@/lib/optimizely/types/type-utils'
import { NavItem } from '@/lib/optimizely/sdk'
import { LanguageSwitcher } from './language-switcher'

/**
 * Builds a safe, locale-prefixed href for navigation.
 *
 * @param locale - The current locale string (e.g. 'en')
 * @param path - The raw href from CMS or config
 * @returns A valid path like `/en/about` or `/en`
 */
function withLocale(locale: string, path: string | null | undefined): string {
  const safePath = path ?? '/'
  return `/${locale}${safePath.startsWith('/') ? safePath : `/${safePath}`}`
}

/**
 * Site header component with logo, navigation, CTA, and language switcher.
 * Pulls content from Optimizely CMS and renders locale-aware links.
 *
 * @param locale - Current active locale (e.g. 'en', 'sv')
 * @returns Renders the main site header or null if CMS data is unavailable.
 */
export async function Header({ locale }: { locale: string }) {
  const validLocale = getValidLocale(locale)

  const result = await optimizely.getHeader(
    { locale: validLocale },
    { cacheTag: 'optimizely-header' }
  )

  const header = result?.Header?.item
  if (!header) return null

  const { logo, ctaHref, ctaText, navItems } = header

  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl font-bold lg:min-w-[150px]"
          >
            <Image
              src={logo || '/placeholder.svg'}
              width={50}
              height={50}
              alt="Company logo"
              priority
              unoptimized={!logo}
            />
          </Link>

          {/* Navigation Menu */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {navItems?.map((navItem) => {
              const item = castContent<NavItem>(
                navItem as SafeContent,
                'NavItem'
              )
              if (!item) return null

              return (
                <Link
                  key={item.href}
                  href={withLocale(locale, item.href)}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA + Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <Button variant="outline" asChild>
              <Link href={withLocale(locale, ctaHref)}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
