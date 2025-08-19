'use client'

import CTAButton from '@/app/components/ui/cta-button'
import { useRouter } from 'next/navigation'

/**
 * Renders draft-only page actions in the UI.
 * Includes buttons to refresh the current page or disable draft mode.
 */
const DraftActions = () => {
  const router = useRouter()

  /**
   * Sends a request to disable draft mode via API route.
   * After disabling, the user may need to manually navigate or refresh.
   */
  const handleDisableDraft = async () => {
    try {
      await fetch('/api/draft/disable')
      router.refresh()
    } catch (err) {
      console.error('Failed to disable draft mode:', err)
    }
  }

  return (
    <div className="flex justify-end gap-5 p-4">
      <CTAButton textDesktop="Refresh Page" onClick={() => router.refresh()} />
      <CTAButton textDesktop="Disable Draft" onClick={handleDisableDraft} />
    </div>
  )
}

export default DraftActions
