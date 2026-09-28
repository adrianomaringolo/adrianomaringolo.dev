'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado pelo Error Boundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold text-destructive mb-4">
                Ops! Algo deu errado
              </h2>
              <p className="text-muted-foreground mb-6">
                Ocorreu um erro inesperado. Por favor, recarregue a página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Recarregar página
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
