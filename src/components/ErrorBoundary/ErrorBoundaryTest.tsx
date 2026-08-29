import { useState } from "react"
import { Button } from "@/components/ui/button"

/**
 * Dev-only helper to manually verify the global ErrorBoundary.
 * Renders nothing in production builds.
 */
export const ErrorBoundaryTest = () => {
  const [explode, setExplode] = useState(false)

  if (explode) {
    throw new Error("💥 ErrorBoundary manual test error")
  }

  if (!import.meta.env.DEV) return null

  return (
    <Button variant="destructive" size="sm" onClick={() => setExplode(true)}>
      Trigger error
    </Button>
  )
}
