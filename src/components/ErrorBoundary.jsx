import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
          <div className="card bg-base-100 shadow-xl max-w-md">
            <div className="card-body text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="card-title justify-center mb-4">Something went wrong</h2>
              <p className="text-base-content/70 mb-4">
                We encountered an unexpected error. Please refresh the page to try again.
              </p>
              <div className="card-actions justify-center">
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;