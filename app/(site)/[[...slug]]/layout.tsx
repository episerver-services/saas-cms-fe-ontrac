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
 * Layout component for all pages.
 * Includes site-wide header, footer, global fonts, and layout structure.
 *
 * @param props.children - Page content to render inside layout
 * @returns HTML structure with layout wrappers and theming
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 rounded bg-black px-4 py-2 text-white"
        >
          Skip to main content
        </a>
        <Suspense>
          <Header />
        </Suspense>
        <main id="main-content" className="container mx-auto min-h-screen px-4">
          {children}
        </main>
        <Suspense>
          <Footer data={footerMockData} />
        </Suspense>
      </body>
    </html>
  )
}
