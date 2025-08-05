import Link from 'next/link'
import Image from 'next/image'
import type { FooterData } from './footer.types'
import { Icons } from '@/app/components/ui/icons'

const EMPTY_DATA: FooterData = {
  logo: { src: '/image/logo.svg', alt: 'OnTrac', href: '/' },
  footerLinks: [],
  policyLinks: [],
  policyText: '',
  socialText: '',
  socialLinks: [],
}

type Props = { data?: FooterData }

const LINKS_PER_COLUMN = 10

/**
 * Footer component displaying brand logo, social links, navigation links,
 * and policy text for desktop and mobile layouts.
 *
 * @param data - Optional footer content. Falls back to `EMPTY_DATA` if not provided.
 */
const Footer = ({ data = EMPTY_DATA }: Props) => {
  const links = data.footerLinks ?? []
  const leftLinks = links.slice(0, LINKS_PER_COLUMN)
  const rightLinks = links.slice(LINKS_PER_COLUMN, LINKS_PER_COLUMN * 2)

  return (
    <footer className="bg-background text-textMain py-20">
      <div className="mx-auto w-full max-w-max px-5 sm:px-10 md:px-20">
        {/* Mobile ( < 1024 ): show logo at top */}
        {data.logo?.src && (
          <div className="mb-10 lg:hidden">
            <Link
              href={data.logo.href || '/'}
              aria-label="Homepage"
              className="inline-block w-[230px]"
            >
              <Image
                src={data.logo.src}
                alt={data.logo.alt || 'OnTrac Logo'}
                width={230}
                height={40}
                sizes="100vw"
                className="h-auto w-full"
                priority
              />
            </Link>
          </div>
        )}

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-stretch lg:justify-between">
          {/* LEFT column (desktop only) */}
          <div className="hidden lg:flex lg:basis-[45%] lg:max-w-[580px] lg:flex-col lg:justify-between lg:gap-4">
            {data.logo?.src && (
              <Link
                href={data.logo.href || '/'}
                aria-label="Homepage"
                className="inline-block w-[350px] lg:w-[400px] xl:w-[460px]"
              >
                <Image
                  src={data.logo.src}
                  alt={data.logo.alt || 'Logo'}
                  width={460}
                  height={80}
                  sizes="100vw"
                  className="h-auto w-full"
                  priority
                />
              </Link>
            )}

            <div className="lg:mt-4 lg:mb-6">
              {data.socialText && (
                <h3 className="text-[13px] font-normal uppercase text-brand">
                  {data.socialText}
                </h3>
              )}

              {/* Social icons */}
              <ul className="mt-5 flex gap-3">
                {(data.socialLinks ?? []).map((link) => {
                  const Icon = Icons[link.platform as keyof typeof Icons]
                  if (!Icon) {
                    console.warn(
                      `Icon not found for platform: ${link.platform}`
                    )
                    return null
                  }

                  return (
                    <li key={link.platform}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-borderLight hover:opacity-80"
                      >
                        <Icon className="h-5 w-5 text-textMain" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="lg:mt-6">
              <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[18px]">
                {(data.policyLinks ?? []).map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {data.policyText && (
                <p className="mt-5 text-[16px] text-textMuted">
                  {data.policyText}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT nav — 2 equal columns */}
          <nav
            aria-label="Footer navigation links"
            className="grid grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2 lg:basis-[45%]"
          >
            {[leftLinks, rightLinks].map((group, idx) => (
              <ul key={idx} className="space-y-4">
                {group.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[18px] transition-colors hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Mobile / tablet content (below lists; hidden at ≥1024) */}
        <div className="mt-8 space-y-6 lg:hidden">
          {data.socialText && (
            <h3 className="text-[13px] font-normal uppercase text-brand">
              {data.socialText}
            </h3>
          )}

          <div className="flex gap-3">
            {(data.socialLinks ?? []).map((link) => {
              const Icon = Icons[link.platform as keyof typeof Icons]
              if (!Icon) {
                console.warn(`Icon not found for platform: ${link.platform}`)
                return null
              }

              return (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-borderLight hover:opacity-80"
                >
                  <Icon className="h-5 w-5 text-textMain" />
                </a>
              )
            })}
          </div>

          <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[18px]">
            {(data.policyLinks ?? []).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {data.policyText && (
            <p className="text-[16px] text-textMuted">{data.policyText}</p>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
