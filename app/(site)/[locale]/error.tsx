'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { Metadata } from 'next'

/**
 * SEO metadata for the 500 error page.
 */
export const metadata: Metadata = {
  title: 'Unexpected Error',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Renders the 500 "Unexpected Error" page.
 * Displayed when an error occurs during rendering.
 *
 * @param error - The runtime error object
 * @returns The error page UI
 */
export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error('Unexpected error occurred:', error)
    // Optionally send to Sentry or other monitoring service
  }, [error])

  return (
    <main
      role="main"
      aria-labelledby="page-title"
      className="flex min-h-screen flex-col items-center justify-center bg-background px-3 text-foreground"
    >
      <h1 id="page-title" className="mb-4 text-4xl font-bold">
        500 – Unexpected Error
      </h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Something went wrong. We are working on it.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
        <Button variant="ghost" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    </main>
  )
}
