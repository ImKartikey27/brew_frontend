"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      gcTime: 1000 * 60 * 5, // 5 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 401 (Unauthorized)
        if (error?.response?.status === 401) {
          return false;
        }
        // Retry up to 2 times for network errors
        if (!error?.response) {
          return failureCount < 2;
        }
        // Don't retry on client errors (4xx except 401)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry on server errors (5xx)
        return failureCount < 2;
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry on 401 or client errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});

export function Providers({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          theme="system"
          richColors
          visibleToasts={3}
          closeButton
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
