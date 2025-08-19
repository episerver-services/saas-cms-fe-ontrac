import { Suspense } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import '../../globals.css'
import Header from '@/app/components/layout/header/header'
import Footer from '@/app/components/layout/footer'
import VitalsInit from '@/app/components/vitals-init'

// Temporary footer content for development preview
import { footerMockData } from '@/app/components/layout/footer/footer.mock'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * Root layout wrapper for all dynamic CMS pages.
 *
 * This layout includes:
 * - Global fonts (Geist Sans + Mono)
 * - Performance/init script injection (VitalsInit)
 * - Accessible skip link
 * - Suspense-wrapped Header and Footer components
 * - Temporary mock footer data until CMS integration is complete
 *
 * @param children - The React node tree rendered within the <main> section
 * @returns The full HTML document structure for content pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <VitalsInit />

        {/* Accessibility: Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 rounded bg-black px-4 py-2 text-white"
        >
          Skip to main content
        </a>

        {/* Site-wide header */}
        <Suspense>
          <Header />
        </Suspense>

        {/* Main page content */}
        <main id="main-content" className="container mx-auto min-h-screen px-4">
          {children}
        </main>

        {/* Site-wide footer (mocked for now) */}
        <Suspense>
          <Footer data={footerMockData} />
        </Suspense>
      </body>
    </html>
  )
}
