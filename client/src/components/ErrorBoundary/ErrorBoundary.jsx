import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-md mx-auto my-12">
          <span className="text-4xl mb-4" role="img" aria-label="Warning icon">⚠️</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something Went Wrong</h2>
          <p className="text-gray-500 mb-6">We encountered an unexpected error. Please refresh or try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            aria-label="Reload current page"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;