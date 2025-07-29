import '../../globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import DraftActions from '@/app/components/draft/draft-actions'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Root layout for all draft preview routes.
 *
 * Applies the configured locale, injects CMS editor script for communication,
 * loads font styles, and wraps the page with editor tooling and global styles.
 *
 * @param children - The page content for the current route
 * @param params - A promise resolving to an object containing the current locale
 *
 * @example
 * /en/draft/... renders with `lang="en"` and editor tools
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
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* CMS preview script for on-page editing */}
        <Script
          src={`${process.env.NEXT_PUBLIC_CMS_URL}/util/javascript/communicationinjector.js`}
        />
        {/* Floating draft UI controls */}
        <DraftActions />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
