'use client'

import { useEffect } from 'react'
import CTAButton from '@/app/components/ui/cta-button'
import type { Metadata } from 'next'

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
 */
export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error('Unexpected error occurred:', error)
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
        <CTAButton
          textDesktop="Go back home"
          link={{
            href: '/',
            ariaLabel: 'Homepage',
          }}
        />
        <CTAButton
          textDesktop="Try again"
          link={{
            href: '#',
            ariaLabel: 'Try again',
          }}
          onClick={() => window.location.reload()}
        />
      </div>
    </main>
  )
}
