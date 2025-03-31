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
      'Cannot read properties of undefined',
      'lovable-tagger not available',
      'lovable-tagger',
      'componentTagger',
      '__require.resolve is not a function'
    ];
    
    // Only redirect if not a non-fatal error
    if (message && typeof message === 'string' && !nonFatalErrors.some(e => message.includes(e))) {
      // Instead of redirecting, log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error would normally redirect to error page:', message);
        return false;
      }
      
      // Add error details to the URL for displaying on error page
      const errorMessage = encodeURIComponent(message || 'Unknown error');
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
      'Loading CSS chunk',
      'lovable-tagger not available',
      'lovable-tagger',
      'componentTagger',
      '__require.resolve is not a function'
    ];
    
    if (!nonFatalErrors.some(e => reasonStr.includes(e))) {
      // In development, just log instead of redirecting
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unhandled rejection would normally redirect:', reasonStr);
        event.preventDefault();
        return;
      }
      
      const errorMessage = encodeURIComponent(reasonStr || 'Unhandled Promise Rejection');
      window.location.href = `/error?message=${errorMessage}`;
    }
    
    event.preventDefault();
  });
  
  // Explicitly handle lovable-tagger errors
  const originalConsoleError = console.error;
  console.error = (...args) => {
    // Check if this is a lovable-tagger related error
    const errorString = args.join(' ');
    if (
      errorString.includes('lovable-tagger') || 
      errorString.includes('componentTagger')
    ) {
      console.warn('Suppressed lovable-tagger error log:', ...args);
      return;
    }
    
    // Otherwise, proceed with normal error logging
    originalConsoleError(...args);
  };
  
  console.log('Global error handlers initialized');
};

// Helper to manually redirect to error page
export const redirectToErrorPage = (error: Error | string) => {
  const errorMessage = encodeURIComponent(
    typeof error === 'string' ? error : (error.message || 'Unknown error')
  );
  
  // Check if this is a lovable-tagger related error
  const errorStr = typeof error === 'string' ? error : error.message;
  if (
    errorStr.includes('lovable-tagger') || 
    errorStr.includes('componentTagger')
  ) {
    console.warn('Ignoring lovable-tagger error:', errorStr);
    return;
  }
  
  // In development, just log instead of redirecting
  if (process.env.NODE_ENV === 'development') {
    console.warn('Would redirect to error page with message:', decodeURIComponent(errorMessage));
    return;
  }
  
  window.location.href = `/error?message=${errorMessage}`;
};

// Utility to check if an error is related to lovable-tagger
export const isLovableTaggerError = (error: Error | string): boolean => {
  const errorMsg = typeof error === 'string' ? error : error.message;
  return (
    errorMsg.includes('lovable-tagger') || 
    errorMsg.includes('componentTagger') ||
    errorMsg.includes('__require.resolve')
  );
};
