import { Component, type ErrorInfo, type ReactNode } from "react"
import { ErrorFallback } from "./ErrorFallback"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (props: { error: Error; reset: () => void }) => ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error) {
      const { fallback } = this.props

      if (fallback) {
        return fallback({ error, reset: this.reset })
      }

      return <ErrorFallback error={error} reset={this.reset} />
    }

    return this.props.children
  }
}

export { ErrorBoundary }
