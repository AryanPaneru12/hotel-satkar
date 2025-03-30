
// Global error handler
export const setupGlobalErrorHandler = () => {
  const originalOnError = window.onerror;
  
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', { message, source, lineno, colno, error });
    
    // Don't redirect for these common non-fatal errors
    const nonFatalErrors = [
      'ResizeObserver loop limit exceeded',
      'Script error',
      'ChunkLoadError',
      'Network Error',
      'Loading chunk',
      'Failed to fetch',
      'Loading CSS chunk',
      'The operation was aborted',
      'NetworkError',
      'Cannot read properties of undefined'
    ];
    
    if (!nonFatalErrors.some(e => message?.toString().includes(e))) {
      // Add error details to the URL for displaying on error page
      const errorMessage = encodeURIComponent(message?.toString() || 'Unknown error');
      window.location.href = `/error?source=${encodeURIComponent(source || '')}&message=${errorMessage}`;
    }
    
    // Call original handler if it exists
    if (typeof originalOnError === 'function') {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    // Don't redirect for network related errors to avoid loops
    const reasonStr = String(event.reason);
    const nonFatalErrors = [
      'Network Error',
      'Failed to fetch',
      'The operation was aborted',
      'NetworkError',
      'Loading CSS chunk'
    ];
    
    if (!nonFatalErrors.some(e => reasonStr.includes(e))) {
      const errorMessage = encodeURIComponent(reasonStr || 'Unhandled Promise Rejection');
      window.location.href = `/error?message=${errorMessage}`;
    }
    
    event.preventDefault();
  });
  
  console.log('Global error handlers initialized');
};

// Helper to manually redirect to error page
export const redirectToErrorPage = (error: Error | string) => {
  const errorMessage = encodeURIComponent(
    typeof error === 'string' ? error : (error.message || 'Unknown error')
  );
  window.location.href = `/error?message=${errorMessage}`;
};
