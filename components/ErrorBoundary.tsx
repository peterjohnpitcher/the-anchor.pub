'use client'

import React, { Component, ReactNode } from 'react'
import { analytics } from '@/lib/analytics'
import { Alert } from '@/components/ui/feedback/Alert'
import { Button } from '@/components/ui/primitives/Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  context?: string
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { context = 'unknown', onError } = this.props

    // Log error to analytics
    analytics.error('form', `ErrorBoundary: ${context} - ${error.message}`)

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught error:', {
        context,
        error,
        errorInfo,
        componentStack: errorInfo.componentStack
      })
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo)
    }

    // Update state with error info
    this.setState({
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      // Default error UI
      return (
        <div className="min-h-[200px] flex items-center justify-center p-4">
          <Alert variant="error" className="max-w-md">
            <h3 className="font-semibold mb-2">Something went wrong</h3>
            <p className="mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 text-sm">
                <summary className="cursor-pointer font-medium mb-2">Error details</summary>
                <pre className="bg-red-50 p-2 rounded text-xs overflow-auto">
                  {this.state.error.message}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex gap-2">
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </div>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}