
import { QueryClient } from "@tanstack/react-query";

// Configure query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // Using the correct syntax for error handling in React Query v5
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
          window.location.href = '/error';
        }
      }
    },
    mutations: {
      // Using the correct syntax for error handling in React Query v5
      meta: {
        onError: (error: Error) => {
          console.error('Mutation error:', error);
          window.location.href = '/error';
        }
      }
    }
  }
});

export default queryClient;
