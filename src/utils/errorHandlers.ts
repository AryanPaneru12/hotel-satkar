
// Global error handler
export const setupGlobalErrorHandler = () => {
  const originalOnError = window.onerror;
  
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', { message, source, lineno, colno, error });
    
    // Don't redirect for these common non-fatal errors
    const nonFatalErrors = [
      'ResizeObserver loop limit exceeded',
      'Script error',
      'ChunkLoadError'
    ];
    
    if (!nonFatalErrors.some(e => message?.toString().includes(e))) {
      window.location.href = `/error?source=${encodeURIComponent(source || '')}`;
    }
    
    // Call original handler if it exists
    if (typeof originalOnError === 'function') {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    return false;
  };
};
