import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container/container"

interface ErrorFallbackProps {
  error: Error
  reset: () => void
}

export const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          An unexpected error occurred. Try reloading the page, and if the
          problem persists, contact support.
        </p>
      </div>

        <pre className="max-w-full overflow-auto rounded-md bg-muted p-4 text-left text-xs text-destructive">
          {error.message}
        </pre>

      <div className="flex gap-2">
        <Button onClick={reset}>
          <RotateCw />
          Try again
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    </Container>
  )
}
