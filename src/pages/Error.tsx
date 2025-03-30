
import React, { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface ErrorProps {
  title?: string;
  message?: string;
  error?: Error;
}

const Error = ({ title, message, error }: ErrorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get error details from URL params, state, or props
  const errorSource = searchParams.get('source') || '';
  const errorMessage = searchParams.get('message') || '';
  
  // Get error details from state if available
  const state = location.state as { error?: Error; title?: string; message?: string } | null;
  const errorTitle = title || state?.title || 'Something went wrong';
  const displayMessage = message || state?.message || errorMessage || 'An unexpected error occurred. Please try again.';
  const errorDetails = error || state?.error;

  // Log error details for debugging
  useEffect(() => {
    console.error('Error page loaded with:', {
      source: errorSource,
      message: displayMessage,
      details: errorDetails,
      state
    });
  }, [errorSource, displayMessage, errorDetails, state]);

  // Handler to go back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handler to go home
  const handleGoHome = () => {
    navigate('/');
  };

  // Handler to reload the page
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-50 p-6 flex items-center justify-center">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-3 text-red-800">{errorTitle}</h1>
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{displayMessage}</AlertDescription>
          </Alert>
          
          {errorSource && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-500">Source: {decodeURIComponent(errorSource)}</p>
            </div>
          )}
          
          {errorDetails && (
            <div className="bg-gray-50 p-4 rounded-md mb-6 overflow-auto max-h-40">
              <p className="text-sm font-mono text-gray-700 break-words">
                {errorDetails.toString()}
              </p>
              {errorDetails.stack && (
                <details className="mt-2">
                  <summary className="text-sm cursor-pointer text-gray-500">Show stack trace</summary>
                  <p className="mt-2 text-xs font-mono text-gray-600 whitespace-pre-wrap">
                    {errorDetails.stack}
                  </p>
                </details>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handleGoHome}
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            
            <Button 
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 ml-auto" 
              onClick={handleReload}
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>If the problem persists, please contact support.</p>
        <p className="mt-2">Hotel Satkar - Technical Support</p>
      </div>
    </div>
  );
};

export default Error;
