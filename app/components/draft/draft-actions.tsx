'use client'

import { Button } from '../ui/button'
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
      router.refresh() // Optional: refresh to reflect exit
    } catch (err) {
      console.error('Failed to disable draft mode:', err)
    }
  }

  return (
    <div className="flex justify-end gap-5 p-4">
      <Button onClick={() => router.refresh()}>Refresh Page</Button>
      <Button onClick={handleDisableDraft}>Disable Draft</Button>
    </div>
  )
}

export default DraftActions
