import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

/**
 * SEO metadata for the 404 page.
 */
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Renders the 404 "Not Found" error page.
 * Displayed when a route does not match an existing page.
 */
export default function NotFound() {
  return (
    <main
      role="main"
      aria-labelledby="page-title"
      className="flex min-h-screen flex-col items-center justify-center bg-background px-3 text-foreground"
    >
      <h1 id="page-title" className="mb-4 text-4xl font-bold">
        404 – Page Not Found
      </h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Oops! The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </main>
  )
}
