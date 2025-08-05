'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import type { CTAButtonProps } from './cta-button.types'

/**
 * Determines if a link is external (URL, tel:, or mailto:).
 */
function isExternal(href: string) {
  return (
    /^https?:\/\//i.test(href) ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  )
}

/**
 * Returns Tailwind classes for button style variants.
 */
function variantClasses(style: CTAButtonProps['style']) {
  // Base shape + motion
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-[16px] font-bold uppercase transition-colors duration-200 ease-in-out'

  if (style === 'white') {
    // White bg, dark text, subtle border, hover dim
    return twMerge(
      base,
      'bg-white text-textMain border border-borderLight hover:brightness-95'
    )
  }

  // Default: red bg, white text, darken on hover
  return twMerge(
    base,
    'bg-brand text-white hover:bg-[rgb(var(--brand-red-hover))]'
  )
}

/**
 * CTAButton – A reusable call-to-action button that supports:
 * - Internal and external links
 * - Responsive label text (desktop + mobile)
 * - Style variants (red, white)
 * - Optional "close bar" functionality
 */
export default function CTAButton({
  textDesktop,
  textMobile,
  link,
  style = 'red',
  className,
  closeBarOnClick,
  onCloseBar,
}: CTAButtonProps) {
  const labelMobile = textMobile?.trim() || textDesktop
  const classes = twMerge(variantClasses(style), className)
  const rel =
    link.openIn === '_blank'
      ? [link.rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
      : link.rel || undefined

  const handleClick = () => {
    if (closeBarOnClick && typeof onCloseBar === 'function') {
      onCloseBar()
    }
  }

  // Internal vs external handling
  if (!isExternal(link.href)) {
    return (
      <Link
        href={link.href}
        aria-label={link.ariaLabel}
        className={classes}
        onClick={handleClick}
      >
        {/* Mobile label (<= lg) */}
        <span className="lg:hidden">{labelMobile}</span>
        {/* Desktop label (>= lg) */}
        <span className="hidden lg:inline">{textDesktop}</span>
      </Link>
    )
  }

  return (
    <a
      href={link.href}
      target={link.openIn || '_self'}
      rel={rel}
      aria-label={link.ariaLabel}
      className={classes}
      onClick={handleClick}
    >
      <span className="lg:hidden">{labelMobile}</span>
      <span className="hidden lg:inline">{textDesktop}</span>
    </a>
  )
}
