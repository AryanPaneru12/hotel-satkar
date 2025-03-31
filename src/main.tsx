
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Setup error tracking
console.log('Starting application - initializing error handlers');

// Custom error handler for render errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("Error caught in ErrorBoundary:", error);
    // Filter out non-fatal errors
    if (error.message.includes('lovable-tagger') || 
        error.message.includes('componentTagger')) {
      console.warn("Non-fatal error related to lovable-tagger:", error.message);
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Ignore lovable-tagger errors
    if (error.message.includes('lovable-tagger') || 
        error.message.includes('componentTagger')) {
      console.warn("Ignoring non-fatal error:", error.message);
      return;
    }
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return a fallback UI instead of redirecting
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden p-6">
            <h1 className="text-2xl font-bold mb-3 text-red-800">Something went wrong</h1>
            <p className="text-gray-700 mb-4">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

console.log('Mounting React application...');

// Apply background color to root element
if (rootElement) {
  rootElement.className += ' bg-background';
}

try {
  const root = createRoot(rootElement);

  // Prevent lovable-tagger errors from propagating
  window.addEventListener('error', (event) => {
    if (event.message.includes('lovable-tagger') || 
        event.message.includes('componentTagger') ||
        (event.filename && event.filename.includes('lovable-tagger'))) {
      console.warn("Suppressed lovable-tagger error:", event.message);
      event.preventDefault();
      return false;
    }
  }, true);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );

  console.log('React application mounted successfully');
} catch (error) {
  console.error('Failed to mount React application:', error);
  // Append a fallback error message to the DOM
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: #d32f2f;">Application Failed to Load</h1>
      <p>There was a problem initializing the application. Please try refreshing the page.</p>
      <button style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;" 
              onclick="window.location.reload()">
        Refresh Page
      </button>
      <pre style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px; overflow: auto;">
        ${error instanceof Error ? error.message : String(error)}
      </pre>
    </div>
  `;
}
