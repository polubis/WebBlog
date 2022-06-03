import React, { ReactNode } from "react"

export class ErrorBoundary extends React.Component<{
  fallback: () => ReactNode
  onError: () => void
}> {
  state = { hasError: false } as const

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback()
    }

    return this.props.children
  }
}
