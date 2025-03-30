
import { QueryClient } from "@tanstack/react-query";
import { redirectToErrorPage } from "@/utils/errorHandlers";

// Configure query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Using the correct syntax for error handling in React Query v5
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
          redirectToErrorPage(error);
        }
      }
    },
    mutations: {
      // Using the correct syntax for error handling in React Query v5
      meta: {
        onError: (error: Error) => {
          console.error('Mutation error:', error);
          redirectToErrorPage(error);
        }
      }
    }
  }
});

export default queryClient;
