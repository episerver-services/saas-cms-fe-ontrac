import { Suspense } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import '../../globals.css'
import { LOCALES } from '@/lib/optimizely/utils/language'
import { Header } from '@/app/components/layout/header'
import { Footer } from '@/app/components/layout/footer'
import VitalsInit from '@/app/components/vitals-init'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * Generates static parameters for locale-based routing.
 * Ensures that each supported locale will be statically rendered.
 *
 * @returns An array of locale param objects used by Next.js App Router
 */
export function generateStaticParams() {
  try {
    return LOCALES.map((locale) => ({ locale }))
  } catch (e) {
    console.error(e)
    return []
  }
}

/**
 * Root layout component for all pages.
 * Includes site-wide header, footer, global fonts, and layout structure.
 *
 * @param props - Component props containing locale and children
 * @param props.children - Page content to render inside layout
 * @param props.params - Async route parameters including locale
 * @returns HTML structure with layout wrappers and theming
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <VitalsInit />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 rounded bg-black px-4 py-2 text-white"
        >
          Skip to main content
        </a>
        <Suspense>
          <Header locale={locale} />
        </Suspense>
        <main id="main-content" className="container mx-auto min-h-screen px-4">
          {children}
        </main>
        <Suspense>
          <Footer locale={locale} />
        </Suspense>
      </body>
    </html>
  )
}
